# TODO App — Frontend

A responsive TODO management application built with **React, TypeScript, Vite, Tailwind CSS, and shadcn/ui**. The application allows users to create, view, edit, complete, search, filter, sort, and delete tasks.

## Features

- Create new tasks with a title and description.
- Edit existing tasks.
- Mark tasks as completed or active.
- Delete tasks with confirmation.
- Search tasks by title or description.
- Filter tasks by all, active, or completed status.
- Sort tasks by creation date.
- View task summaries, including total, active, and completed tasks.
- Responsive layout for desktop, tablet, and mobile screens.
- Communicate with the Express backend through REST API endpoints.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Lucide React
- Fetch API for HTTP requests

## Prerequisites

Make sure the following are installed:

- Node.js (a recent LTS version is recommended)
- npm
- The TODO backend running locally or at a configured API host

## Installation

### 1. Navigate to the frontend directory

From the project root, run:

```bash
cd client
```

Replace `client` with your actual frontend directory name if it differs.

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the API proxy

The Vite development server should proxy API requests to the Express backend.

Example `vite.config.ts` configuration:

```ts
server: {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      changeOrigin: true,
    },
  },
},
```

This allows the frontend to call endpoints such as `/api/todos` without hardcoding the backend URL.

If your backend uses a different port, update the proxy target accordingly.

### 4. Start the development server

```bash
npm run dev
```

Vite will display the local URL in the terminal. By default, this is usually:

```text
http://localhost:5173
```

Open that URL in your browser.

## Running the Full Application

Start the backend and ensure MongoDB is available before testing API-dependent functionality.

1. Start MongoDB locally or configure your MongoDB Atlas connection.
2. Start the backend using the instructions in `server/README.md`.
3. Start the frontend with `npm run dev`.
4. Open the frontend URL and test the task management features.

## API Integration

The frontend communicates with the backend using these endpoints:

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/api/todos`          | Retrieve all tasks       |
| POST   | `/api/todos`          | Create a task            |
| PUT    | `/api/todos/:id`      | Update a task            |
| PATCH  | `/api/todos/:id/done` | Update completion status |
| DELETE | `/api/todos/:id`      | Delete a task            |

The API base path is `/api/todos`. In development, Vite proxies these requests to the backend.

## Build for Production

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated files are placed in the `dist` directory.

## Assumptions and Limitations

- The backend is expected to be available and MongoDB must be connected for persistent task management.
- The development proxy assumes the backend runs at `http://localhost:3000`.
- The API response format must match the frontend API service expectations.
- The application does not currently include user authentication or user-specific task ownership.
- Tasks are stored in MongoDB through the backend; browser refreshes should retain successfully saved tasks.
- Search, filtering, and sorting are performed on the tasks loaded by the frontend.
- The application does not currently implement pagination, real-time synchronization, or offline support.
- Production deployment requires configuring the frontend and backend URLs appropriately.

## Troubleshooting

**The task list does not load**

- Confirm the backend is running.
- Confirm MongoDB is connected.
- Check the browser's Developer Tools → Network tab for failed API requests.

**API requests return 404**

- Verify the endpoint paths in the frontend API service match the backend routes.
- Confirm the Vite proxy configuration.

**Changes are not saved**

- Check the backend terminal for validation or database errors.
- Verify the MongoDB connection string and database permissions.

## License

This project was developed as a TODO application assignment by Pasan Semage 2026 (kingpasan)
