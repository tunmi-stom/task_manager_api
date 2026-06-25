from fastapi import status, HTTPException
from sqlalchemy.orm import Session
from model.models import Tasks
from schemas.schemas import TaskCreate


class TodoServices:
    @staticmethod
    def create_task(db: Session, task: TaskCreate):
        db_task = Tasks(
            title=task.title,
            content=task.content,
            is_done=task.is_done,
        )
        try:
            db.add(db_task)
            db.commit()
            db.refresh(db_task)  # Refresh to get DB-generated fields like id
        except Exception as e:
            db.rollback()  # Rollback on error
            raise e  # Re-raise exception for higher-level handling

        return "task added successfuly"

    @staticmethod
    def get_tasks(db: Session):
        tasks = db.query(Tasks).all()
        if not tasks:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="No tasks found"
            )
        return tasks

    @staticmethod
    def update_task(db: Session, task: Tasks, id: int):
        task_in_db = db.query(Tasks).filter(Tasks.id == id).first()
        if task_in_db:
            task_in_db.title = task.title
            task_in_db.content = task.content
            task_in_db.is_done = task.is_done

            db.commit()

            return "task updated successfuly"

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Task doesn't exists",
        )

    @staticmethod
    def delete_task(db: Session, id: int):
        task = db.query(Tasks).filter(Tasks.id == id).first()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Task not found"
            )
        db.delete(task)
        db.commit()
        return "Task Deleted"

    @staticmethod
    def get_task(db: Session, id: int):
        task = db.query(Tasks).filter(Tasks.id == id).first()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail=f"Task {id} not found"
            )
        return task
