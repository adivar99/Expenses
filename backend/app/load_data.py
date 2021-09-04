import csv
import enum
from datetime import datetime

from app.models.enums import Categories, ExpenseType
from app.db_models.expense import Expense as db_model
from app.crud.expense import create
from app.db.session import Session

db = Session()

def transpose_enum(e_num: enum.Enum, val: str):
    if val in e_num.__members__:
        return e_num.__members__[val]

with open("data.csv",'r') as file:
    csv_reader = csv.DictReader(file, fieldnames=['id','date','amount','remark','category','expense_type'])
    count = 0

    for row in csv_reader:
        print(row)
        count = count + 1
        if count == 1:
            continue
        db_row = db_model(
            id=row['id'],
            date=datetime.strptime(row['date'], "%d-%m-%Y").date(),
            amount=row['amount'],
            remark=row['remark'],
            category=transpose_enum(Categories, row['category']),
            expense_type=transpose_enum(ExpenseType, row['expense_type']),
            user_id=407178
        )
        db.add(db_row)
        db.commit()

db.close()