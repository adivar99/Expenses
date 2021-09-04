from sqlalchemy import Column, Integer, String, Date, Enum, Float

from app.db.base_class import Base
from app.models.enums import Categories, ExpenseType


class Expense(Base):
    ___tablename__ = "expense"

    id = Column(Integer, primary_key=True)
    date = Column(Date)
    amount = Column(Float)
    remark = Column(String)
    category = Column(Enum(Categories, native_enum=False, create_constraint=False))
    expense_type = Column(Enum(ExpenseType, native_enum=False, create_constraint=False))
    user_id = Column(Integer)