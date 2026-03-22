# Bank Management System

A full-stack bank management application built with Node.js, Express, MongoDB, and Handlebars. Manage users, accounts, ATM cards, loans, and transactions with both REST API and web interface.

## Features

- **User Management**: Create and manage bank users with profile information
- **Accounts**: Open and manage bank accounts with balance tracking
- **ATM Cards**: Issue debit and credit cards linked to accounts
- **Loans**: Create loans that automatically credit account balances
- **Transactions**: Process deposits and withdrawals with real-time balance updates
- **REST API**: Full JSON API for all operations
- **Web Interface**: Beautiful Handlebars templates for CRUD operations
- **Data Validation**: Client-side and server-side validation for all operations
- **Date Formatting**: Human-readable date formatting in web interface

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **View Engine**: Handlebars (express-handlebars)
- **Development**: Nodemon for auto-reload
- **Styling**: Custom CSS with responsive design

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally on `mongodb://localhost:27017`)
- npm or yarn

## Installation

1. Clone or navigate to the project directory:
```bash
cd bank_mngmnt
```

2. Install dependencies:
```bash
npm install
```

3. Ensure MongoDB is running on your system.

## Running the Project

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

- **Web Interface**: http://localhost:3000/web
- **Health Check**: http://localhost:3000/health
- **API Base**: http://localhost:3000

## Project Structure

```
bank_mngmnt/
├── app.js                 # Express app setup and Handlebars config
├── index.js              # Server entry point
├── package.json          # Dependencies and scripts
├── database/
│   └── db.js            # MongoDB connection
├── models/
│   ├── User.js          # User schema
│   ├── Account.js       # Account schema with balance
│   ├── AtmCard.js       # ATM Card schema
│   ├── Loan.js          # Loan schema
│   └── Transaction.js   # Transaction schema
├── router/
│   ├── userRouter.js         # User REST API routes
│   ├── accountRouter.js      # Account REST API routes
│   ├── atmCardRouter.js      # ATM Card REST API routes
│   ├── loanRouter.js         # Loan REST API routes
│   ├── transactionRouter.js  # Transaction REST API routes
│   └── webRouter.js          # Web interface routes with CRUD
├── views/
│   ├── layouts/main.handlebars  # Main layout template
│   ├── home.handlebars          # Dashboard
│   ├── users.handlebars         # User management page
│   ├── accounts.handlebars      # Account management page
│   ├── atm-cards.handlebars     # ATM card management page
│   ├── loans.handlebars         # Loan management page
│   └── transactions.handlebars  # Transaction management page
└── public/
    └── styles.css         # Global styles
```

## Database Models

### User
```javascript
{
  name: String,
  phone: String,
  dob: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Account
```javascript
{
  acno: String,
  balance: Number (min: 0),
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### ATM Card
```javascript
{
  cardno: String (required),
  account: ObjectId (ref: Account),
  expDate: Date,
  cardType: String (enum: ["credit", "debit"]),
  createdAt: Date,
  updatedAt: Date
}
```

### Loan
```javascript
{
  amount: Number (min: 1, required),
  account: ObjectId (ref: Account),
  date: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

### Transaction
```javascript
{
  amount: Number (min: 1, required),
  account: ObjectId (ref: Account),
  type: String (enum: ["withdrawal", "deposit"]),
  date: Date (default: now),
  createdAt: Date,
  updatedAt: Date
}
```

## REST API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Accounts
- `GET /accounts` - Get all accounts (populated with user)
- `GET /accounts/:id` - Get account by ID
- `POST /accounts` - Create new account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

### ATM Cards
- `GET /atm-cards` - Get all ATM cards (populated with account)
- `GET /atm-cards/:id` - Get ATM card by ID
- `POST /atm-cards` - Create new ATM card
- `PUT /atm-cards/:id` - Update ATM card
- `DELETE /atm-cards/:id` - Delete ATM card

### Loans
- `GET /loans` - Get all loans (populated with account)
- `GET /loans/:id` - Get loan by ID
- `POST /loans` - Create new loan (credits account balance)
- `PUT /loans/:id` - Update loan
- `DELETE /loans/:id` - Delete loan

### Transactions
- `GET /transactions` - Get all transactions (populated with account)
- `GET /transactions/:id` - Get transaction by ID
- `POST /transactions` - Create new transaction (updates balance)
- `PUT /transactions/:id` - Update transaction
- `DELETE /transactions/:id` - Delete transaction

## Web Interface Routes

- `GET /web` - Dashboard with statistics
- `GET /web/users` - User management page
- `POST /web/users` - Create user from web form
- `POST /web/users/delete/:id` - Delete user
- `GET /web/accounts` - Account management page
- `POST /web/accounts` - Create account from web form
- `POST /web/accounts/delete/:id` - Delete account
- `GET /web/atm-cards` - ATM card management page
- `POST /web/atm-cards` - Create ATM card from web form
- `POST /web/atm-cards/delete/:id` - Delete ATM card
- `GET /web/loans` - Loan management page
- `POST /web/loans` - Create loan from web form (credits balance)
- `POST /web/loans/delete/:id` - Delete loan
- `GET /web/transactions` - Transaction management page
- `POST /web/transactions` - Create transaction from web form (updates balance)

## Key Features

### Balance Management
- **Loans**: Creating a loan automatically credits the account balance
- **Transactions**: 
  - Deposits credit the account balance
  - Withdrawals debit the account balance (fails if insufficient balance)

### Data Population
All API responses populate referenced documents:
- Account responses include full User object
- ATM Card responses include full Account object
- Loan responses include full Account object
- Transaction responses include full Account object

### Web Interface Features
- Create new records via forms
- View all records in data tables
- Delete records with action buttons
- Success/error messages after operations
- Formatted dates in human-readable format (e.g., "22 Mar 2026")
- Account balance displayed in dropdowns for reference

### Validation
- Loan amounts must be greater than 0
- Transaction amounts must be greater than 0
- Withdrawal transactions validate sufficient balance
- Account and user existence checks before operations

## Error Handling

The web interface provides user-friendly error messages:
- "Account not found" - When trying to create loan/transaction for non-existent account
- "Insufficient account balance" - When withdrawal exceeds balance
- "Loan amount must be greater than 0" - Invalid loan amount
- "Transaction amount must be greater than 0" - Invalid transaction amount

## API Request Examples

### Create User
```bash
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "dob": "1990-05-15"
}
```

### Create Account
```bash
POST /accounts
Content-Type: application/json

{
  "acno": "ACC001",
  "user": "USER_ID",
  "balance": 5000
}
```

### Create Loan
```bash
POST /loans
Content-Type: application/json

{
  "account": "ACCOUNT_ID",
  "amount": 10000,
  "date": "2026-03-22"
}
```

### Create Transaction (Deposit)
```bash
POST /transactions
Content-Type: application/json

{
  "account": "ACCOUNT_ID",
  "amount": 2500,
  "type": "deposit",
  "date": "2026-03-22"
}
```

### Create Transaction (Withdrawal)
```bash
POST /transactions
Content-Type: application/json

{
  "account": "ACCOUNT_ID",
  "amount": 1000,
  "type": "withdrawal",
  "date": "2026-03-22"
}
```

## Future Enhancements

- User authentication and authorization
- Transaction history and reporting
- Account interest calculations
- Loan repayment tracking
- Card activation/deactivation
- Admin dashboard with analytics
- Email notifications for transactions
- Two-factor authentication
- Export to CSV/PDF

## License

ISC

## Author

Bank Management System
