from app.models.enums import Categories, ExpenseType
import datetime
from typing import Union

from app.db_models.expense import Expense as db_model
from app.models.expense import Expense as model

class Expense(self):
    def __init__(
        self,
        id: int,
        date: Union[str, datetime.date],
        amount: float,
        remark: str,
        category: Categories,
        expense_type: ExpenseType,
        user_id: int
        ):
        self.id = id
        if isinstance(date, datetime.date):
            self.date = date
        else:
            self.date = datetime.datetime.strptime(date, "%d-%m-%Y").date(),
        
        self.amount = amount
        self.remark = remark
        self.category = category
        self.expense_type = expense_type
        self.user_id = user_id

    @classmethod
    def load_from_record(cls, record: db_model):
        return cls.__init__(
            id=record.id,
            date=record.date,
            amount=record.amount,
            remark=record.remark,
            category=record.category,
            expense_type=record.expense_type,
            user_id=record.user_id
        )