from app.core.security import get_password_hash, verify_password
from sqlalchemy.orm import Session
from typing import Optional, List
from sqlalchemy import func
from fastapi.exceptions import HTTPException
from starlette import status

from app.db_models.user import User as db_model
from app.models.user import User as model, UserCreate, UserLogin, UserUpdate
from app.utils.utils import get_randID

def get_by_id(db_session: Session, id: int) -> model:
    """
    Return User by Id
    """
    return (
        db_session.query(db_model)
        .filter(db_model.id == id)
        .first()
    )

def get_all(db_session: Session) -> List[model]:
    """
    Return all users
    """
    return (
        db_session.query(db_model)
        .all()
    )

def get_by_username(db_session: Session, username: str) -> Optional[model]:
    """
    Return user by user name
    """
    for user in get_all(db_session):
        print(username.lower(), user.username.lower(), username.lower()==user.username.lower())
    return (
        db_session.query(db_model)
        .filter(db_model.username == username)
        .first()
    )

def get_by_email(db_session: Session, email: str):
    return (
        db_session.query(db_model)
        .filter(db_model.email == email)
        .first()
    )

def get_ids(db_session: Session) -> List[int]:
    users = get_all(db_session)

    li = []
    for user in users:
        li.append(user.id)
    
    return li

def check_user(db_session: Session, login: UserLogin) -> bool:
    for user in get_all(db_session):
        if user.username == login.user_email or user.email == login.user_email:
            if verify_password(login.password, user.password):
                return True
    return False


def create(db_session: Session, user_in: UserCreate) -> db_model:
    """
    Create user instance in db
    """
    t_id = get_randID(get_ids(db_session))
    user = db_model(
        id=str(t_id),
        name=user_in.name,
        username=user_in.username,
        email=user_in.email,
        password=get_password_hash(user_in.password)
    )
    db_session.add(user)
    db_session.commit()
    # db_session.refresh(user)
    return user


def update(db_session: Session, id: str, user_in: UserUpdate):
    """
    update details of user based on input id
    """
    if id not in get_ids(db_session):
        return (False, "User doesn't exist")
    user = get_by_id(db_session, id)
    if user is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User to update not found")
    update_data = user_in.dict(exclude_unset=True)
    for field in update_data:
        setattr(user, field, getattr(user_in, field))
    db_session.add(user)
    db_session.commit()
    # db_session.refresh(db_model)
    return user


def delete(db_session: Session, id: str):
    """
    Delete user based on input id
    """
    print(id)
    if id not in get_ids(db_session):
        print("user doesn't exist")
        return (False, "User does not exist")
    try:
        user = db_session.query(db_model).get(id)
        db_session.delete(user)
        db_session.commit()
        print("deleted")
        return (True, "Success")
    except Exception as e:
        print("Not deleted. Error raised: "+str(e))
        return (False, str(e))