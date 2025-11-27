# backend/db.py
import os
from sqlmodel import create_engine, SQLModel, Session
from typing import Generator
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./crimenet.db")

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args["check_same_thread"] = False

# echo=True will print SQL executed; set to False in production if noisy
engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)
