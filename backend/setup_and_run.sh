-- Active: 1760445955231@@127.0.0.1@5432@crime_net
#!/bin/bash

# CrimeNet Backend Setup and Run Script

echo "🚀 Setting up CrimeNet Backend..."

# Check if virtual environment exists
if [ ! -d "bin" ]; then
    echo "❌ Virtual environment not found. Creating one..."
    python3 -m venv .
fi

# Activate virtual environment
echo "📦 Activating virtual environment..."
source bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create database tables
echo "🗄️ Setting up database..."
python manage.py create_tables

# Seed sample data (optional)
echo "🌱 Seeding sample data..."
python manage.py seed

# Start the server
echo "🌐 Starting FastAPI server..."
echo "Backend will be available at: http://localhost:8000"
echo "API docs available at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
python start.py