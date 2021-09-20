import re
from typing import List
from random import randint
from fastapi import Request

from app.db.session import Session
from app.jwt.auth_bearer import decodeJWT

def get_db():
    """
    Return Session variable
    """
    try:
        db = Session()
        yield db
    finally:
        db.close()


def get_randID(ids: list):
    """
    Return random integer between 0->999999 which doesn't exist in input ids list
    """
    id = randint(0, 999999)
    while id in ids:
        id = randint(0, 999999)
    
    return id

def valid_email(email: str) -> bool:
    email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if re.fullmatch(email_regex, email):
        return True
    else:
        return False

def get_current_user_from_token(req: Request, db_session: Session):
    from app.crud.user import get_by_email
    token = req.headers['authorization'].split()[1]
    uid = decodeJWT(token)["user_id"]
    _user = get_by_email(db_session, uid)
    return _user