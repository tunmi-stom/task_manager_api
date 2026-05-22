from fastapi import status, Depends, APIRouter
from typing import Annotated
from sqlalchemy.orm import Session
from backend.schemas.schemas import TaskCreate, Task
from backend.database.database import get_db
from backend.services.todo_services import TodoServices

router = APIRouter(
    prefix='/tasks',
    tags=['tasks']
)
db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/')
async def get_list_of_task(db: db_dependency):
    tasks = TodoServices.get_tasks(db)
    return {'detail': tasks}

@router.get('/{id}')
async def get_task(db: db_dependency, id: int):
    task = TodoServices.get_task(db, id)
    return {'detail': task}

@router.post('/create-task', status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, db: db_dependency):
    message = TodoServices.create_task(db, task)
    return {'detail': message}

@router.put('/update-task/{id}')
async def update_task(db: db_dependency, task: Task, id: int):
    message = TodoServices.update_task(db, task, id)
    return {'detail': message}
        
@router.delete('/delete-task/{id}')
async def delete_task(id: int, db: db_dependency):
    message = TodoServices.delete_task(db, id)
    return {"detail": message}