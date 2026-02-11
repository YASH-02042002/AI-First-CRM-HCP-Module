"""
Database initialization script
Run this to create the database tables
"""
from database import engine
from models import Base
import os
from dotenv import load_dotenv

load_dotenv()

def init_database():
    """Create all database tables"""
    print("Creating database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Database tables created successfully!")
        print("\nTables created:")
        print("  - hcp_interactions")
        print("\nYou can now run: python main.py")
    except Exception as e:
        print(f"✗ Error creating database tables: {e}")
        print("\nTroubleshooting:")
        print("1. Check your DATABASE_URL in .env file")
        print("2. Make sure PostgreSQL/MySQL is running")
        print("3. Verify database exists and credentials are correct")

if __name__ == "__main__":
    init_database()