from pydantic import BaseModel, Field

class UserBase(BaseModel):
    name: str = Field("", title="Name of the User", example="John Doe")
    username: str = Field(..., title="Username of the user", example="jdoe21")
    email: str = Field(..., title="Email of the user", example="jdoe21@example.com")
    password: str = Field(..., title="Password of the user", example="password123")

    class Config:
        orm_mode=True

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class UserLogin(BaseModel):
    user_email: str = Field(..., title="User's username or email", example="jdoe21")
    password: str = Field(..., title="User's password", example="password123")

class UserInDB(UserBase):
    id: int = Field(..., title="Id of the User", example=300)

class User(UserBase):
    pass