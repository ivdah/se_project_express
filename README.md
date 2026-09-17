# WTWR (What to Wear?): Back End

The back-end project is focused on creating a server for the WTWR application. You’ll gain a deeper understanding of how to work with databases, set up security and testing, and deploy web applications on a remote machine. The eventual goal is to create a server with an API and user authorization.

## Requirements

Node.js, npm, and a local MongoDB server are required. The application connects to the `wtwr_db` database at `mongodb://127.0.0.1:27017/wtwr_db`.

## Installation

Install the project dependencies from the repository root:

```bash
npm install
```

## Running the Project

Start the server on port `3001`:

```bash
npm run start
```

For development with automatic reloads:

```bash
npm run dev
```

The API is available at `http://localhost:3001` by default. Set the `PORT` environment variable to use another port.

## Linting

```bash
npm run lint
```

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
