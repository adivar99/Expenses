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

