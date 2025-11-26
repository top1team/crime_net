# CrimeNet

A crime reporting and mapping application with FastAPI backend and Next.js frontend.

## Backend Setup

### Prerequisites
- Python 3.12+
- pip

### Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   source venv/bin/activate  # Linux/Mac
   # or
   venv\Scripts\activate     # Windows
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the server:**
   ```bash
   python start.py
   ```

### Access Points

- **API Server:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Interactive API:** http://localhost:8000/redoc

### Database

The backend uses SQLite by default for easy setup. The database file (`crimenet.db`) will be created automatically when you first run the server.

### Available Management Commands

```bash
# Create database tables
python manage.py create_tables

# Add sample crime data
python manage.py seed

# Drop all tables (dangerous!)
python manage.py drop_tables
```

## Frontend Setup

*Frontend setup instructions to be added*