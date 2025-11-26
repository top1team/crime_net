# CrimeNet Backend Setup

## Quick Start

1. **Run the setup script:**
   ```bash
   ./setup_and_run.sh
   ```

## Manual Setup (Alternative)

1. **Activate virtual environment:**
   ```bash
   source bin/activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup database:**
   ```bash
   python manage.py create_tables
   python manage.py seed
   ```

4. **Start server:**
   ```bash
   python start.py
   ```

## Access Points

- **API Server:** http://localhost:8000
- **API Documentation:** http://localhost:8000/docs
- **Interactive API:** http://localhost:8000/redoc

## Environment Variables

The backend uses PostgreSQL by default. Check `.env` file for database configuration:
```
DATABASE_URL=postgresql://crime_user:mypassword@localhost:5432/crime_net
```

## Available Commands

- `python manage.py create_tables` - Create database tables
- `python manage.py seed` - Add sample crime data
- `python manage.py drop_tables` - Drop all tables (dangerous!)