from typing import List
from sqlalchemy.orm import Session
from starlette.responses import JSONResponse
import sqlite3
from fastapi import HTTPException, Depends, APIRouter, status

from app.models.expense import Expense as model, ExpenseCreate, ExpenseInDB, ExpenseUpdate
from app.crud.expense import create, delete, get_all, sum_of_categories
from app.crud.expense import update, get_by_id, get_by_category, sum_of_category
from app.utils.utils import get_db
from app.models.enums import Categories
from app.auth.auth_bearer import JWTBearer

router = APIRouter()

@router.get("/getExpense/{id}", dependencies=[Depends(JWTBearer())], response_model=model)
def get_expense(id: int, db_session: Session = Depends(get_db)):
    _expense = get_by_id(db_session, id)
    return _expense

@router.get("/getByCategory/{category}", dependencies=[Depends(JWTBearer())], response_model=List[model])
def get_expense_by_category(category: Categories, db_session: Session = Depends(get_db)):
    _expense = get_by_category(db_session, category)
    return _expense

@router.get("/getSumByCategory/{category}", dependencies=[Depends(JWTBearer())])
def get_sum_by_category(category: Categories, db_session: Session = Depends(get_db)):
    _expense = sum_of_category(db_session, category)
    return _expense

@router.get("/getSummary", dependencies=[Depends(JWTBearer())])
def get_sum_by_category(db_session: Session = Depends(get_db)):
    _expense = sum_of_categories(db_session)
    return _expense

@router.post("/createExpense", dependencies=[Depends(JWTBearer())], response_model=ExpenseInDB)
def create_expense(expense_in: ExpenseCreate, db_session: Session = Depends(get_db)):
    try:
        res = create(db_session, expense_in)
        print(res.__dict__)
        if res is None:
            raise HTTPException(
                status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
                detail="Node not created"
            )
    except sqlite3.IntegrityError:
        raise HTTPException(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            detail="SQLite Error: Unique Constraint Failed"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Request Failed: " + str(e)
        )
    return res

@router.post("/updateExpense", dependencies=[Depends(JWTBearer())], response_model=model)
def update_expense(id: str, expense_in: ExpenseUpdate, db_session: Session = Depends(get_db)):
    return update(db_session, id, expense_in)


@router.delete("/deleteExpense", dependencies=[Depends(JWTBearer())])
def delete_expense(id: str, db_session: Session = Depends(get_db)):
    result = delete(db_session, id)
    if result[0]:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"msg": result[1]})
    else:
        raise HTTPException(
            status_code=status.HTTP_501_NOT_IMPLEMENTED,
            detail=result[1]
        )