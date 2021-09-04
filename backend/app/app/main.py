from app.db.session import Session, engine
from app.db.base_class import Base

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse

from app.api.user import router as user_router
from app.api.expense import router as expense_router

Base.metadata.create_all(engine)
db_session = Session()

app = FastAPI()

app.include_router(user_router, prefix="/user", tags=["Users"])
app.include_router(expense_router, prefix="/expense", tags=["Expenses"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


@app.get("/")
def main():
    return RedirectResponse(url="/docs/")

# if __name__ == "__main__":
#     uvicorn.run(app,host="127.0.0.1",port=8080)
