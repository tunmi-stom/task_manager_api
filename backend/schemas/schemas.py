from pydantic import BaseModel
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    content: Optional[str]
    is_done: bool
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "Baking Cake",
                "content": "Content goes here...",
                "is_done": False,
            }
        }

class TaskResponse(BaseModel):
    id: int
    title: str
    content: Optional[str]
    is_done: bool
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "id": 1,
                "title": "Baking Cake",
                "content": "Content goes here...",
                "is_done": True,
            }
        }
        
class Task(BaseModel):
    title: str
    content: Optional[str]
    is_done: bool
    
    class Config:
        from_attributes = True
        json_schema_extra = {
            "example": {
                "title": "Baking Cake",
                "content": "Content goes here...",
                "is_done": True,
            }
        }