# Task Manager App

A full-stack task manager built with FastAPI for the backend and React + Vite for the frontend.

## Overview

This project lets you create, view, update, complete, and delete tasks through a simple web interface. The backend exposes a REST API, and the frontend communicates with it using configurable API URLs.

## Features

- Create, read, update, and delete tasks
- Mark tasks as complete or active
- Filter tasks by status
- Persistent storage with SQLAlchemy
- Interactive API documentation with Swagger UI and ReDoc
- Frontend settings bar to switch the backend base URL

## Tech Stack

- Backend: FastAPI, SQLAlchemy, Pydantic, Uvicorn, python-dotenv
- Frontend: React, Vite, CSS Modules, Lucide icons

## Project Structure

```text
backend/
  main.py                  # FastAPI app entrypoint
  core/config.py           # Application configuration
  database/database.py     # SQLAlchemy engine and session factory
  model/models.py          # ORM models
  routers/tasks_router.py  # Task API routes
  schemas/schemas.py       # Pydantic schemas
  services/todo_services.py # Business logic

frontend/
  src/                     # React application source
  package.json             # Frontend dependencies and scripts
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- npm
- pip

## Backend Setup

1. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

2. Install Python dependencies:

```bash
pip install fastapi uvicorn sqlalchemy python-dotenv
```

3. Create a `.env` file in the project root with a database URL:

```env
DATABASE_URL=sqlite:///./task_manager.db
```

4. Start the backend:

```bash
uvicorn backend.main:app --reload --port 8000
```

The API will be available at:

- http://localhost:8000/
- http://localhost:8000/docs
- http://localhost:8000/redoc

## Frontend Setup

1. Install frontend dependencies:

```bash
cd frontend
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open http://localhost:5173 in your browser.

4. In the app, use the settings bar to point the frontend at the backend, for example:

```text
http://localhost:8000
```

## API Reference

Base URL: /api/v1

### Health

- GET /
  - Returns a simple status message.

### Tasks

- GET /api/v1/tasks/
- GET /api/v1/tasks/{id}
- POST /api/v1/tasks/create-task
- PUT /api/v1/tasks/update-task/{id}
- DELETE /api/v1/tasks/delete-task/{id}

Example create request:

```json
{
  "title": "Prepare deployment checklist",
  "content": "Verify environment variables and database connectivity.",
  "is_done": false
}
```

## Notes

- The backend creates database tables automatically on startup.
- PostgreSQL is used by default for local development.
- For production, replace the permissive CORS settings with explicit trusted origins and use a stronger database backend.