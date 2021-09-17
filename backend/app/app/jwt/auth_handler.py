import jwt
from typing import Dict
from datetime import datetime, timedelta

from app.core import config

def token_response(token: str):
    return {
        "token": token
    }

def signJWT(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": (datetime.utcnow() + timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES)).strftime(format="%d-%m-%YT%H:%M:%S")
    }
    token = jwt.encode(payload, config.SECRET_KEY, algorithm=config.ALGORITHM)
    return token_response(token)

def decodeJWT(token: str):
    try:
        decoded_token = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        print("decoded_token:", decoded_token, datetime.utcnow())
        print("condition:", datetime.strptime(decoded_token['expires'], "%d-%m-%YT%H:%M:%S") > datetime.utcnow())
        return decoded_token if datetime.strptime(decoded_token['expires'], "%d-%m-%YT%H:%M:%S") > datetime.utcnow() else None
    except Exception as e:
        print(e)
        return {}

