from sqlalchemy.orm import Session
from typing import Optional, List
from sqlalchemy.sql import func
from fastapi.exceptions import HTTPException
from starlette import status

from app.models.user import UserInDB
from app.db_models.expense import Expense as db_model
from app.models.expense import Expense as model, ExpenseCreate, ExpenseInDB, ExpenseUpdate
from app.utils.utils import get_randID
from app.models.enums import Categories

def get_by_id(db_session: Session, id: int):
    """
    Return Expense by Id
    """
    return (
        db_session.query(db_model)
        .filter(db_model.id == id)
        .first()
    )

def get_all(db_session: Session):
    """
    Return all expenses
    """
    return (
        db_session.query(db_model)
        .all()
    )

def get_by_category(db_session: Session, category: Categories) -> List[model]:
    """
    Return expense by category
    """
    return (
        db_session.query(db_model)
        .filter(db_model.category == category)
        .all()
    )

def sum_of_category(db_session: Session, category: Categories):
    return (
        db_session.query(func.sum(db_model.amount).label("sum"))
        .filter(db_model.category == category)
        .first()
    )

def sum_of_categories(db_session: Session, user: UserInDB):
    return (
        db_session.query(db_model.category, func.sum(db_model.amount))
        .filter(db_model.user_id == user.id)
        .group_by(db_model.category)
        .all()
    )

def get_ids(db_session: Session) -> List[int]:
    expenses = get_all(db_session)

    li = []
    for expense in expenses:
        li.append(expense.id)
    
    return li

def get_by_user(db_session: Session, user_id: int):
    return (
        db_session.query(db_model)
        .filter(db_model.user_id == user_id)
        .all()
    )


def create(db_session: Session, expense_in: ExpenseCreate) -> ExpenseInDB:
    """
    Create expense instance in db
    """
    print(expense_in.dict())
    t_id = get_randID(get_ids(db_session))
    expense = db_model(
        id=str(t_id),
        **expense_in.dict()
    )
    db_session.add(expense)
    db_session.commit()
    # db_session.refresh(expense)
    return expense


def update(db_session: Session, id: str, expense_in: ExpenseUpdate) -> model:
    """
    update details of expense based on input id
    """
    if id not in get_ids(db_session):
        return (False, "Expense doesn't exist")
    expense = get_by_id(db_session, id)
    if expense is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Expense to update not found")
    update_data = expense_in.dict(exclude_unset=True)
    for field in update_data:
        setattr(expense, field, getattr(expense_in, field))
    db_session.add(expense)
    db_session.commit()
    # db_session.refresh(db_model)
    return expense


def delete(db_session: Session, id: str):
    """
    Delete expense based on input id
    """
    print(id)
    if id not in get_ids(db_session):
        print("expense doesn't exist")
        return (False, "Expense does not exist")
    try:
        expense = db_session.query(db_model).get(id)
        db_session.delete(expense)
        db_session.commit()
        print("deleted")
        return (True, "Success")
    except Exception as e:
        print("Not deleted. Error raised: "+str(e))
        return (False, str(e))