from datetime import date, datetime
import enum

class Categories(str, enum.Enum):
    ENTERTAINMENT = "entertainment"
    FOOD = "food"
    NECESSARY = "necessary"
    OUTING = "outing"
    SHOPPING = "shopping"
    TRAVEL = "travel"
    OTHER = "other"

class ExpenseType(str, enum.Enum):
    MAJOR = "major"
    MINOR = "minor"
    CREDIT = "credit"

class TokenSubject(str, enum.Enum):
    ACCESS = "access"
    REFRESH = "refresh"
    PASSWORD_RESET = "reset"

class StartTimePeriods(str, enum.Enum):
    NONE = None
    WEEK = "7"
    MONTH = "30"
    MONTH_3 = "90"
    MONTH_6 = "183"
    THIS_YEAR = str((datetime.now() - datetime((date.today().year), 1, 1)).days)
    YTD = str((datetime.now() - datetime((date.today().year-1), date.today().month, date.today().day)).days)
