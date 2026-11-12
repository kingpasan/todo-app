# TODO App — Backend

A RESTful API for the TODO management application, built with **Node.js, Express, TypeScript, and MongoDB using Mongoose**.

The backend provides endpoints for creating, retrieving, updating, completing, and deleting tasks.

## Features

- REST API for TODO management.
- Create, read, update, and delete operations.
- Dedicated endpoint for changing task completion status.
- MongoDB persistence using Mongoose.
- Request validation using Zod.
- Environment-based configuration.
- Centralized error handling.
- CORS configuration for frontend development.

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod
- dotenv
- cors
- tsx

## Prerequisites

Install the following before running the backend:

- Node.js (a recent LTS version is recommended)
- npm
- A MongoDB instance, either local or hosted on MongoDB Atlas

## Installation

### 1. Navigate to the backend directory

From the project root:

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
CLIENT_URL=http://localhost:5173
```

Update these values to match your environment.

**Environment variables**

| Variable      | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| `PORT`        | Port on which the Express server listens                       |
| `NODE_ENV`    | Application environment, such as `development` or `production` |
| `MONGODB_URI` | MongoDB connection string                                      |
| `CLIENT_URL`  | Frontend origin allowed by CORS                                |

Do not commit `.env` files containing credentials to version control. Add `.env` to `.gitignore` and provide a `.env.example` file containing placeholder values if needed.

## MongoDB Configuration

### Option A: Local MongoDB

1. Install MongoDB Community Server.
2. Start the MongoDB service.
3. Use the following connection string in `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
```

The database name is `todo_app`. Mongoose can create the database and collection when the application first writes data.

### Option B: MongoDB Atlas

1. Create a MongoDB Atlas cluster.
2. Create a database user with appropriate permissions.
3. Configure the cluster's network access rules to allow connections from your development environment.
4. Copy the connection string provided by Atlas.
5. Set `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-host>/todo_app?retryWrites=true&w=majority
```

Replace the placeholders with your actual Atlas credentials and cluster hostname.

If your password contains special characters, URL-encode them before placing them in the connection string.

**Security note:** Do not expose the MongoDB connection string in frontend code or commit it to a public repository.

## Running the Backend

Start the development server:

```bash
npm run dev
```

The server should listen on the port configured in `.env`, typically:

```text
http://localhost:3000
```

Use the development script defined in `package.json`. If the script is not configured, a typical setup using `tsx` is:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

Adjust the entry-point path if your server bootstrap file has a different name.

## API Endpoints

The base path is `/api/todos`.

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | `/api/todos`          | Retrieve all tasks                |
| POST   | `/api/todos`          | Create a task                     |
| PUT    | `/api/todos/:id`      | Update a task                     |
| PATCH  | `/api/todos/:id/done` | Update a task's completion status |
| DELETE | `/api/todos/:id`      | Delete a task                     |

### Create a task

Example request body:

```json
{
  "title": "Complete project assignment",
  "description": "Finish the remaining project tasks."
}
```

### Update completion status

Example request body:

```json
{
  "done": true
}
```

The API validates request data according to the backend schemas. Requests must follow the expected field names and formats.

## Testing the API

You can test the endpoints using Postman, Insomnia, or curl.

Retrieve all tasks:

```bash
curl http://localhost:3000/api/todos
```

Create a task:

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test task","description":"Testing the TODO API"}'
```

The backend must be running and MongoDB must be reachable before these requests can succeed.

## Production Build

Compile TypeScript:

```bash
npm run build
```

Start the compiled application using the configured start script:

```bash
npm start
```

Ensure the production environment has the required environment variables and a valid MongoDB connection string.

## Assumptions and Limitations

- The API uses MongoDB and Mongoose for persistence.
- MongoDB must be available and reachable when the backend starts or performs database operations, depending on the connection implementation.
- Request validation is handled by Zod schemas.
- The frontend is expected to use the documented endpoint paths and request body formats.
- The development frontend origin defaults to `http://localhost:5173`.
- The API currently does not include authentication, authorization, or user-specific task ownership.
- The API does not currently implement pagination, rate limiting, or real-time updates.
- Error responses depend on the configured Express error-handling middleware.
- Production deployment requires secure environment variables, appropriate CORS settings, and a properly configured MongoDB instance.

## Troubleshooting

**MongoDB connection fails**

- Ensure the local MongoDB service is running, or verify your Atlas cluster is available.
- Check `MONGODB_URI` for typos.
- For Atlas, verify the database user credentials and network access rules.

**Port is already in use**

- Change `PORT` in `.env` and update the frontend Vite proxy target accordingly.

**Frontend requests fail**

- Confirm the Express server is running.
- Check that `CLIENT_URL` matches the frontend origin.
- Verify the API routes and Vite proxy configuration.

**Validation errors**

- Confirm request bodies include the required fields and follow the Zod schemas.

## License

This project was developed as a TODO application assignment by Pasan Semage 2026 (kingpasan)
