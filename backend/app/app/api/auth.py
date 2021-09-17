import sqlite3
from fastapi import Depends, APIRouter, status
from fastapi.exceptions import HTTPException
from sqlalchemy.orm.session import Session
from starlette.responses import JSONResponse

from app.models.user import UserCreate, UserInDB, UserLogin
from app.utils.utils import get_db, valid_email
from app.crud.user import check_user, create, get_by_username, get_by_email
from app.jwt.auth_handler import signJWT

router = APIRouter()

@router.post("/login")
async def user_login(user: UserLogin, db_session: Session = Depends(get_db)):
    print(user, user.__dict__)
    if check_user(db_session, user):
        if not valid_email(user.username):
            _user = get_by_username(db_session, user.username)
        else:
            _user = get_by_email(db_session, user.username)
        return JSONResponse(status_code=200,content=signJWT(_user.email))
    else:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"msg":"Invalid User Credentials"}
        )


@router.post(
    "/register",
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