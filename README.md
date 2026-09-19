# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Project Description

WTWR (What to Wear?) is a backend REST API for a weather-based clothing application. The server currently provides user management functionality and stores user data in MongoDB. A frontend can use the API to retrieve all users, retrieve one user by ID, and create new users with a name and avatar URL.

### Functionality

- `GET /users` returns all users.
- `GET /users/:userId` returns one user by MongoDB ID.
- `POST /users` creates a user after validating the request data.
- Invalid user data returns status `400` with a JSON `message`.
- Invalid user IDs return status `400`, and valid IDs that do not match a user return status `404`.
- Unexpected database errors return status `500` with a JSON `message`.

## Technologies and Techniques

- **Node.js** provides the JavaScript runtime for the server.
- **Express** handles HTTP requests, JSON parsing, routing, and response status codes.
- **MongoDB** stores application data locally in the `wtwr_db` database.
- **Mongoose** defines schemas, validates user data, and provides database queries.
- **Validator** checks that avatar values are valid URLs.
- The project uses a **controller and router structure**: routes map URLs to controller functions, while controllers contain request and database logic.
- Database operations use **asynchronous Promise-based queries** with `.then()` and `.catch()`.
- **Nodemon** automatically restarts the server during development.
- **ESLint** checks the code for style and quality issues.

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
