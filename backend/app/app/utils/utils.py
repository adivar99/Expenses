import re
from typing import List
from app.db.session import Session
from random import randint


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