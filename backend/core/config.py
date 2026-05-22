import os 
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME = "Task Manager API"
    PROJECT_V1_STR = "/api/v1"
    DATABASE_URL = os.getenv("DATABASE_URL")
    
settings = Settings() 