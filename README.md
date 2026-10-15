# Hiring Fullstack TODO App

A full-stack TODO management application developed for the **Type B Digital Fullstack TODO Assignment** by Pasan Semage.

The project is organized as an npm workspaces monorepo containing a React frontend and an Express backend, with MongoDB for persistent storage.

## Project Overview

### Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React

**Backend**

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Zod

**Development Tools**

- npm workspaces
- concurrently
- tsx

## Project Structure

```text
hiring-fullstack-todo/
├── client/                 # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── server/                 # Express + MongoDB backend
│   ├── src/
│   ├── package.json
│   ├── .env                # Local environment configuration
│   └── README.md
├── package.json            # Root workspace configuration
├── package-lock.json
└── README.md
```

The directory structure above is representative. Some files and folders may vary depending on the final implementation.

## Prerequisites

Install the following before running the project:

- Node.js (a recent LTS version is recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB Atlas account

Verify your installation:

```bash
node --version
npm --version
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd hiring-fullstack-todo
```

Replace `<repository-url>` with the actual repository URL.

If you already have the project locally, navigate to its root directory instead.

### 2. Install dependencies

Run this command from the project root:

```bash
npm install
```

npm installs dependencies for the root project and its `client` and `server` workspaces.

You generally do not need to run `npm install` separately inside each workspace when using the root workspace setup.

### 3. Configure the backend environment

Create a `.env` file inside the `server` directory.

Example configuration for local MongoDB:

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/todo_app
CLIENT_URL=http://localhost:5173
```

For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

Make sure MongoDB is running and the connection settings are correct before starting the application.

Do not commit `.env` files containing credentials to version control.

### 4. Start the application

From the project root, run:

```bash
npm run dev
```

This command starts both workspaces concurrently:

- **Backend:** Express API, typically at `http://localhost:3000`
- **Frontend:** Vite development server, typically at `http://localhost:5173`

The exact URLs depend on the ports configured in the application.

Open the frontend URL in your browser to use the TODO app.

## Available Root Scripts

| Command              | Description                           |
| -------------------- | ------------------------------------- |
| `npm install`        | Install dependencies for the monorepo |
| `npm run dev`        | Start both frontend and backend       |
| `npm run dev:client` | Start only the frontend               |
| `npm run dev:server` | Start only the backend                |

The root `dev` script uses `concurrently` to run both workspace development scripts. The `-k` option stops the other process if one of the processes exits.

## Running Workspaces Independently

You can also start the applications separately.

### Frontend

```bash
npm run dev:client
```

### Backend

```bash
npm run dev:server
```

Start MongoDB before running the backend if your configuration requires a reachable database connection.

## API Integration

The frontend communicates with the backend through the `/api/todos` REST API.

| Method | Endpoint              | Description                   |
| ------ | --------------------- | ----------------------------- |
| GET    | `/api/todos`          | Retrieve all tasks            |
| POST   | `/api/todos`          | Create a task                 |
| PUT    | `/api/todos/:id`      | Update a task                 |
| PATCH  | `/api/todos/:id/done` | Change task completion status |
| DELETE | `/api/todos/:id`      | Delete a task                 |

During local development, the Vite proxy should forward requests beginning with `/api` to the Express backend, typically at `http://localhost:3000`.

Refer to `client/README.md` for frontend setup and `server/README.md` for backend configuration and API details.

## Application Features

- Create and edit tasks.
- Mark tasks as completed or active.
- Delete tasks.
- Search tasks by title or description.
- Filter tasks by status.
- Sort tasks by creation date.
- View total, active, and completed task counts.
- Responsive user interface for desktop, tablet, and mobile.
- Persist tasks using MongoDB through the backend API.

## MongoDB Notes

The application supports a local MongoDB instance or MongoDB Atlas, provided the backend connection configuration supports the selected deployment.

For local development, the default database connection is:

```text
mongodb://127.0.0.1:27017/todo_app
```

For Atlas, configure the connection string, database user, and network access settings in the backend environment.

The database name and connection details can be changed through `MONGODB_URI`.

## Assumptions and Limitations

- The project uses npm workspaces with `client` and `server` as workspace directories.
- The root development command assumes both workspaces define a `dev` script in their respective `package.json` files.
- The frontend development proxy assumes the backend runs on port `3000` unless configured otherwise.
- MongoDB must be accessible for persistent task operations.
- Authentication, authorization, and user-specific task ownership are not currently implemented.
- Pagination, offline support, and real-time synchronization are not currently included.
- Production build and deployment commands depend on the scripts configured in each workspace.
- Environment variables and production URLs must be configured appropriately for deployment.

## Troubleshooting

### Dependencies fail to install

Run the installation command from the project root:

```bash
npm install
```

Check that your Node.js and npm versions are compatible with the project dependencies.

### The frontend cannot reach the backend

- Confirm both workspaces are running.
- Check the Vite proxy configuration in `client/vite.config.ts`.
- Verify the backend port and API endpoint paths.
- Inspect the browser's Developer Tools → Network tab.

### MongoDB connection fails

- Confirm the local MongoDB service is running, or verify your Atlas cluster is accessible.
- Check `MONGODB_URI` in `server/.env`.
- Verify Atlas credentials and network access settings when using Atlas.

### A workspace fails to start

Try running it independently:

```bash
npm run dev:client
```

or:

```bash
npm run dev:server
```

Review the terminal output for missing dependencies, invalid environment variables, port conflicts, or TypeScript errors.
