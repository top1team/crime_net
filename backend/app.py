from fastapi import FastAPI, HTTPException, Depends, Form, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from models import Crime
from db import get_session, create_db_and_tables
from typing import List, Optional
import requests
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm
from auth import get_password_hash, verify_password, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from models import Crime, User, UserCreate, UserRead, Token, timedelta
from fastapi.security import OAuth2PasswordRequestForm
from auth import get_password_hash, verify_password, create_access_token, get_current_user, ACCESS_TOKEN_EXPIRE_MINUTES
from models import Crime, User, UserCreate, UserRead, Token

import os

app = FastAPI(title="CrimeNet API")

# CORS middleware
origins = ["http://localhost:3000"]
if os.getenv("FRONTEND_URL"):
    origins.append(os.getenv("FRONTEND_URL"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

def geocode_location(location: str) -> tuple[float, float]:
    """Simple geocoding using Nominatim API"""
    try:
        url = f"https://nominatim.openstreetmap.org/search?q={location}, Kenya&format=json&limit=1"
        response = requests.get(url, headers={'User-Agent': 'CrimeNet/1.0'})
        data = response.json()
        if data:
            return float(data[0]['lat']), float(data[0]['lon'])
    except:
        pass
    # Default to Nairobi coordinates if geocoding fails
    return -1.2921, 36.8219

@app.post("/api/crimes", response_model=Crime)
def create_crime(
    title: str = Form(...),
    category: str = Form(...),
    location: str = Form(...),
    description: Optional[str] = Form(None),
    anonymous: bool = Form(False),
    session: Session = Depends(get_session)
):
    # Geocode the location
    lat, lng = geocode_location(location)
    
    crime = Crime(
        title=title,
        description=description,
        category=category,
        lat=lat,
        lng=lng,
        location_text=location,
        anonymous=anonymous,
        created_at=datetime.utcnow()
    )
    
    session.add(crime)
    session.commit()
    session.refresh(crime)
    return crime

@app.get("/api/crimes", response_model=List[Crime])
def get_crimes(session: Session = Depends(get_session)):
    crimes = session.exec(select(Crime)).all()
    return crimes


@app.post("/api/auth/register", response_model=UserRead)
def register(user: UserCreate, session: Session = Depends(get_session)):
    statement = select(User).where(User.email == user.email)
    existing_user = session.exec(statement).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = get_password_hash(user.password)
    db_user = User(
        email=user.email,
        password_hash=hashed_password,
        full_name=user.full_name
    )
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

@app.post("/api/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    statement = select(User).where(User.email == form_data.username)
    user = session.exec(statement).first()
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/auth/me", response_model=UserRead)
def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)