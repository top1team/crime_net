from fastapi import FastAPI, HTTPException, Depends, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from models import Crime
from db import get_session, create_db_and_tables
from typing import List, Optional
import requests
from datetime import datetime

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)