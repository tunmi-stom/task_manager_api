from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
import model.models as models
from routers import tasks_router
from database.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Task Manager API",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://app.localhost:5173"],  # edit in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(
    tasks_router.router,
    prefix=settings.PROJECT_V1_STR,
)


@app.get("/", tags=["root"])
async def root():
    message = "Simple Todo list App"
    return {"detail": message}
