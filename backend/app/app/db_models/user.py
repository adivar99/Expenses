from sqlalchemy import Column, Integer, String

from app.db.base_class import Base


class User(Base):
    __tablename__ = "user"
    
    id = Column(Integer, primary_key=True)
    name = Column(String)
    username = Column(String,unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)