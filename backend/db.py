# backend/db.py
import os
from sqlmodel import create_engine, SQLModel, Session
from typing import Generator
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://crime_user:crime@db:5432/crime_net")

# echo=True will print SQL executed; set to False in production if noisy
engine = create_engine(DATABASE_URL, echo=False)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)
