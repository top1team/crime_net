# backend/seed_crimes.py
from sqlmodel import Session, select

from db import create_db_and_tables
from db import engine
from models import Crime

SAMPLE = [
    {"title":"Nairobi CBD - Murder", "description":"Man shot near market", "category":"Murder", "lat":-1.2921, "lng":36.8219},
    {"title":"Mombasa - GBV report", "description":"Assault and GBV reported near the port", "category":"GBV", "lat":-4.0435, "lng":39.6682},
    {"title":"Kisumu - Theft", "description":"Phone snatched at the bus park", "category":"Theft", "lat":-0.0917, "lng":34.7679},
    {"title":"Nakuru - Robbery", "description":"Robbery at ATM", "category":"Robbery", "lat":-0.3031, "lng":36.0800},
    {"title":"Thika - Traffic Crash", "description":"Multiple vehicle collision on A2", "category":"Traffic", "lat":-1.0364, "lng":37.0690},
    {"title":"Nairobi - Fraud", "description":"MPESA scam reported", "category":"Fraud", "lat":-1.286389, "lng":36.817223},
    # add more points if you want
]

def seed():
    try:
        create_db_and_tables()
        print("tables created (or already exists")
    except Exception as e:
        print(f"error while trying to seed: {e}")

    with Session(engine) as session:
        existing = session.exec(select(Crime)).first()
        if existing:
            print("Crimes table already has data. Skipping seed.")
            return
        for s in SAMPLE:
            crime = Crime(
                title=s["title"],
                description=s["description"],
                category=s["category"],
                ai_confidence=0.95,
                risk_score=6,
                lat=s["lat"],
                lng=s["lng"],
                location_text=s["title"]
            )
            session.add(crime)
        session.commit()
        print(f"Seeded {len(SAMPLE)} crime points.")

if __name__ == "__main__":
    seed()
