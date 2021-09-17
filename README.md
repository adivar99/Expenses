# Expenses
 Personal Finance Project
 
## Backend
### To setup
 - navigate to backend
 - run `pip install -r requirements.txt` (if you don't have pip, install it)

### To run backend
 - navigate to `backend/app`
 - run `uvicorn app.main:app --reload --port=8080`

### To run frontend
 - navigate to `frontend/expenses`
 - run `yarn install` to install all required packages
 - run `yarn start` to start development server
 - The website should open by itself in Chrome.

### To view and interact with API Endpoints
 - open your browser
 - enter `localhost:8080`
 - use login api to receive jwt token
 - paste the token in the `Authorize` window
 - interact with the APIs

### To interact with Website
 - open `localhost:3000'
 - login/register using UI
