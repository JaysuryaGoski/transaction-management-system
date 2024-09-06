# Application Documentation

## Overview
This application is designed to manage transactions, including creating, updating, and deleting transactions. It also includes a feature to request the deletion of transactions.

## Prerequisites
- Node.js
- npm (Node Package Manager)
- Postman (for testing endpoints)

## Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    PORT=3000
    DATABASE_URL=<your-database-url>
    JWT_SECRET=<your-jwt-secret>
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Running the Application

1. **Start the server:**
    ```bash
    npm start
    ```

2. **Access the application:**
    Open your browser and go to `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register a new user**
    - **URL:** `/api/auth/register`
    - **Method:** `POST`
    - **Description:** Register a new user.
    - **Body:**
        ```json
        {
            "username": "exampleUser",
            "password": "examplePassword",
            "email": "user@example.com"
        }
        ```

- **Login a user**
    - **URL:** `/api/auth/login`
    - **Method:** `POST`
    - **Description:** Login a user.
    - **Body:**
        ```json
        {
            "username": "exampleUser",
            "password": "examplePassword"
        }
        ```

### Transactions

- **Get all transactions**
    - **URL:** `/api/transactions`
    - **Method:** `GET`
    - **Description:** Retrieve a list of all transactions.

- **Get a single transaction**
    - **URL:** `/api/transactions/:id`
    - **Method:** `GET`
    - **Description:** Retrieve a single transaction by its ID.

- **Create a new transaction**
    - **URL:** `/api/transactions`
    - **Method:** `POST`
    - **Description:** Create a new transaction.
    - **Body:**
        ```json
        {
            "customer_id": "123",
            "transaction_date": "2024-09-05",
            "amount": 100.00,
            "status": "completed",
            "payment_method": "credit_card",
            "currency": "USD"
        }
        ```

- **Update a transaction**
    - **URL:** `/api/transactions/:id`
    - **Method:** `PUT`
    - **Description:** Update an existing transaction by its ID.
    - **Body:**
        ```json
        {
            "transaction_id": "1",
            "customer_id": "123",
            "transaction_date": "2024-09-05",
            "amount": 150.00,
            "status": "completed",
            "payment_method": "credit_card",
            "currency": "USD"
        }
        ```

- **Delete a transaction**
    - **URL:** `/api/transactions/:id`
    - **Method:** `DELETE`
    - **Description:** Delete a transaction by its ID.

### Deletion Requests

- **Create a deletion request**
    - **URL:** `/api/deletion-requests`
    - **Method:** `POST`
    - **Description:** Request the deletion of a transaction.
    - **Body:**
        ```json
        {
            "transaction_id": "1",
            "user_id": "456"
        }
        ```

## Testing with Postman

1. **Open Postman.**
2. **Create a new collection** to organize your requests.
3. **Add requests** to the collection using the endpoints listed above.
4. **Set the request method** (GET, POST, PUT, DELETE) and the URL.
5. **Add headers** if necessary (e.g., `Authorization` for protected routes).
6. **Add request body** for POST and PUT requests.
7. **Send the request** and check the response.

## Conclusion

