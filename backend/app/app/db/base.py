# Import all the models, so that Base has them before being imported by alembic

from app.db_models.user import User