from fastapi import Request
from app.jwt.auth_bearer import JWTBearer
from app.jwt.auth_handler import decodeJWT, signJWT
from typing import List, Optional
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
import sqlite3
from fastapi import HTTPException, Depends, APIRouter, status, Request

from app.jwt.auth_bearer import JWTBearer
from app.jwt.auth_handler import decodeJWT, signJWT
from app.models.user import User as model, UserCreate, UserInDB, UserLogin, UserUpdate
from app.crud.user import create, delete, get_all, check_user
from app.crud.user import update, get_by_username, get_by_id, get_by_email
from app.crud.expense import get_by_user
from app.utils.utils import get_db, valid_email

router = APIRouter()

@router.get(
    "/getUser/{id}",
    dependencies=[Depends(JWTBearer())],
    response_model=model
)
def get_user(id: int, db_session: Session = Depends(get_db)):
    _user = get_by_id(db_session, id)
    return _user

@router.get(
    "/getUsers",
    dependencies=[Depends(JWTBearer())],
    response_model=List[model]
)
def get_all_users(db_session: Session = Depends(get_db)):
    _users = get_all(db_session)
    return _users

@router.get(
    "/details/",
    dependencies=[Depends(JWTBearer())],
    response_model=model
)
def get_details(req: Request, db_session: Session = Depends(get_db)):
    # print(req.headers['authorization'])
    token = req.headers['authorization'].split()[1]
    uid = decodeJWT(token)["user_id"]
    _user = get_by_email(db_session, uid)
    # print(uid, _user)
    data = {
        "id": _user.id,
        "name": _user.name,
        "username": _user.username,
        "email": _user.email
    }
    ret = JSONResponse(status_code=200, content=data)
    # print(ret, ret.__dict__)
    return ret

@router.post("/login")
async def user_login(user: UserLogin, db_session: Session = Depends(get_db)):
    if check_user(db_session, user):
        if not valid_email(user.username):
            _user = get_by_username(db_session, user.username)
        else:
            _user = get_by_email(db_session, user.username)
        return signJWT(_user.email)
    else:
        return {
            "error": "Wrong login details"
        }

@router.get(
    "/details",
    dependencies=[Depends(JWTBearer())],
    response_model=model
)
def details(request: Request, db_session: Session = Depends(get_db)):
    token = request.headers['authorization'].split()[1]
    user_id = decodeJWT(token)['user_id']
    user = get_by_email(db_session, user_id)
    return user


@router.get(
    "/getUsername/{username}",
    dependencies=[Depends(JWTBearer())],
    response_model=UserInDB
)
def get_user_by_username(username: str, db_session: Session = Depends(get_db)):
    _user = get_by_username(db_session, username)
    return _user

@router.get(
    "/getEmail/{email}",
    dependencies=[Depends(JWTBearer())],
    response_model=model
)
def get_user_by_username(email: str, db_session: Session = Depends(get_db)):
    _user = get_by_email(db_session, email)
    return _user

@router.post("/checkuser")
def check_login(login: UserLogin, db_session: Session = Depends(get_db)):
    res = check_user(db_session, login)
    return res

@router.post(
    "/createUser",
    dependencies=[Depends(JWTBearer())],
    response_model=UserInDB)
def create_user(user_in: UserCreate, db_session: Session = Depends(get_db)):
    try:
        res = create(db_session, user_in)
        if res is None:
            raise HTTPException(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                detail="Node not created"
            )
    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="SQLite Error: Unique Constraint Failed"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Request Failed: " + str(e)
        )
    return res

@router.post(
    "/updateUser",
    dependencies=[Depends(JWTBearer())],
    response_model=model)
def update_user(id: str, user_in: UserUpdate, db_session: Session = Depends(get_db)):
    return update(db_session, id, user_in)


@router.delete(
    "/deleteUser",
    dependencies=[Depends(JWTBearer())]
)
def delete_user(id: str, db_session: Session = Depends(get_db)):
    expenses = get_by_user(db_session, id)
    # print(trees, type(trees)) 
    if len(expenses) == 0:
        result = delete(db_session, id)
        if result[0]:
            return JSONResponse(status_code=status.HTTP_200_OK, content={"msg": result[1]})
        else:
            raise HTTPException(
                status_code=status.HTTP_501_NOT_IMPLEMENTED,
                detail=result[1]
            )
    else:
        return JSONResponse(
            status_code=status.HTTP_412_PRECONDITION_FAILED,
            content={
                "msg": "Dependent expenses to user found. Delete the user expenses first",
                "dependents": str(expenses)
            }
        )