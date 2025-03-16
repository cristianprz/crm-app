# Beverage Order API

This project is a Node.js API for managing beverage orders, built with Express. It follows best practices in architecture and includes a structured setup for controllers, routes, models, middleware, and utilities.

## Features

- Create and manage beverage orders
- Authentication middleware
- Error handling middleware
- Unit and integration tests

## Technologies Used

- Node.js
- Express
- ESLint
- Prettier
- Jest

## Project Structure

```
beverage-order-api
├── src
│   ├── app.js                # Initializes the Express application
│   ├── server.js             # Starts the server
│   ├── controllers           # Contains controllers for handling requests
│   ├── routes                # Defines API routes
│   ├── models                # Contains data models
│   ├── middleware            # Middleware for authentication and error handling
│   ├── utils                 # Utility functions
│   └── config                # Database configuration
├── tests                     # Contains unit and integration tests
├── .eslintrc.json            # ESLint configuration
├── .prettierrc               # Prettier configuration
├── jest.config.js            # Jest configuration
├── package.json              # NPM configuration
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd beverage-order-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the database connection in `src/config/db.js`.

4. Start the server:
   ```
   npm start
   ```

5. Run tests:
   ```
   npm test
   ```

## Usage

- API endpoints for managing beverage orders can be accessed at the base URL after starting the server.
- Refer to the routes defined in `src/routes` for specific endpoints and their usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.