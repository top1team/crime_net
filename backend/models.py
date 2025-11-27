# backend/models.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid

def new_uuid() -> str:
    return str(uuid.uuid4())

class Crime(SQLModel, table=True):
    id: str = Field(default_factory=new_uuid, primary_key=True)
    title: str
    description: Optional[str] = None
    category: str   # e.g. Murder, GBV, Theft, Fraud, Traffic, etc.
    ai_confidence: Optional[float] = None
    risk_score: Optional[int] = None
    lat: float
    lng: float
    location_text: Optional[str] = None
    evidence_json: Optional[str] = None
    reporter_id: Optional[str] = None
    reporter_name: Optional[str] = None
    anonymous: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

class User(SQLModel, table=True):
    id: str = Field(default_factory=new_uuid, primary_key=True)
    email: str = Field(index=True, unique=True)
    password_hash: str
    full_name: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserCreate(SQLModel):
    email: str
    password: str
    full_name: Optional[str] = None

class UserRead(SQLModel):
    id: str
    email: str
    full_name: Optional[str] = None
    created_at: datetime

class Token(SQLModel):
    access_token: str
    token_type: str
