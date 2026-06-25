# Task Manager API

A production-ready FastAPI service for managing tasks with CRUD operations, SQLAlchemy persistence, and OpenAPI-based documentation.

## Overview

This application exposes a REST API for creating, retrieving, updating, and deleting tasks. It is designed to be easy to run locally, simple to extend, and suitable for deployment behind a reverse proxy or container runtime.

## Features

- Create, read, update, and delete tasks
- Pydantic-based request and response validation
- SQLAlchemy ORM integration
- Automatic database table creation on startup
- Interactive API docs via Swagger UI and ReDoc
- CORS middleware support for frontend integration

## Tech Stack

- Python 3.10+
- FastAPI
- SQLAlchemy
- Pydantic
- Uvicorn
- python-dotenv

## Project Structure

```text
backend/
  main.py                 # FastAPI application entrypoint
  core/config.py          # Application settings
  database/database.py    # SQLAlchemy engine and session factory
  model/models.py         # ORM models
  routers/tasks_router.py # API routes
  schemas/schemas.py      # Request/response schemas
  services/todo_services.py # Business logic
```

## Prerequisites

- Python 3.10 or newer
- pip
- A database URL supported by SQLAlchemy (SQLite is used by default for local development)

## Installation

1. Clone the repository and change into the project directory.
2. Create and activate a virtual environment:

```bash
python -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:

```bash
pip install fastapi uvicorn sqlalchemy python-dotenv
```

4. Create an environment file:

```bash
copy .env
```

## Configuration

Set the required environment variables in the `.env` file.

Example:

```env
DATABASE_URL=sqlite:///./task_manager.db
```

Recommended production settings:

- Use a managed database such as PostgreSQL or MySQL
- Set strict CORS origins instead of allowing all origins
- Keep secrets and connection strings out of source control
- Use environment-specific configuration for development, staging, and production

## Running the Application

Start the development server:

```bash
uvicorn backend.main:app --reload --port 8000
```

The API will be available at:

- API root: http://localhost:8000/
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Reference

Base URL: `/api/v1`

### Health Check

- `GET /`
- Returns a simple status message.

### Tasks

- `GET /api/v1/tasks/`
  - Returns all tasks.
- `GET /api/v1/tasks/{id}`
  - Returns a single task by ID.
- `POST /api/v1/tasks/create-task`
  - Creates a new task.
- `PUT /api/v1/tasks/update-task/{id}`
  - Updates an existing task.
- `DELETE /api/v1/tasks/delete-task/{id}`
  - Deletes a task by ID.

### Example Create Task Request

```json
{
  "title": "Prepare deployment checklist",
  "content": "Verify environment variables and database connectivity.",
  "is_done": false
}
```

### Example Response

```json
{
  "detail": "task added successfuly"
}
```

## Error Handling

The API returns standard HTTP exceptions for common failure cases:

- `400 Bad Request` for invalid input or missing resources
- `404`-style behavior is surfaced through the service layer with descriptive messages

## Production Deployment Notes

For production deployment:

1. Replace wildcard CORS settings with explicit trusted origins.
2. Use a production-grade database instead of SQLite.
3. Run the app with a process manager such as Gunicorn or Supervisor.
4. Serve behind Nginx or a similar reverse proxy if needed.
5. Enable logging and monitoring for uptime and error tracking.
6. Configure HTTPS and secure headers.

Example production start command:

```bash
gunicorn -w 4 -k uvicorn.workers.UvicornWorker backend.main:app
```

## Security Notes

- Do not commit `.env` files to version control.
- Restrict API access using authentication and authorization if this service is exposed publicly.
- Validate and sanitize inputs before persistence.
- Review CORS and dependency versions regularly.

## Future Improvements

- Adding authentication and role-based access control
- Adding pagination and filtering for task lists
- Adding unit and integration tests
- Adding Docker support for containerized deployment
- Adding database migrations with Alembic
