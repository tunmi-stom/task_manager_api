from sqlalchemy import Boolean, Column, Integer, String
from database.database import Base


class Tasks(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    content = Column(String)
    is_done = Column(Boolean)
