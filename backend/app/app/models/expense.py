from typing import Union
from pydantic import BaseModel, Field
from datetime import date as datetime_date

from app.models.enums import Categories, ExpenseType

class ExpenseBase(BaseModel):
    date: datetime_date = Field("", title="date of the expense", example=datetime_date.today())
    amount: float = Field(..., title="Amount of the expense", example=122.45)
    remark: str = Field(..., title="Description of the expense", example="Kaati rolls")
    category: Categories = Field(..., title="Category of the expense", example=Categories.FOOD)
    expense_type: ExpenseType = Field(ExpenseType.MINOR, title="Type of expense", example=ExpenseType.MINOR)
    user_id: int = Field(..., title="Id of the user with the expense", example=300)

    class Config:
        orm_mode=True

class ExpenseCreate(ExpenseBase):
    pass

class ExpenseUpdate(ExpenseBase):
    pass

class ExpenseInDB(ExpenseBase):
    id: int = Field(..., title="Id of the ", example=300)

class Expense(ExpenseBase):
    pass

class ExpenseByCategory(BaseModel):
    category: str
    sum: float

    class Config:
        orm_mode: True