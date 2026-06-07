#!/usr/bin/env python
"""
Initialize admin user on startup if it doesn't exist.
This runs before Django app starts on Render.
Includes retry logic for database availability.
"""
import os
import sys
import django
import time
from django.db import connection
from django.db.utils import OperationalError

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'loginproject.settings')
sys.path.insert(0, os.path.dirname(__file__))

django.setup()

from django.contrib.auth.models import User

def wait_for_db(max_retries=10, delay=2):
    """Wait for database to be ready with retries."""
    for attempt in range(max_retries):
        try:
            connection.ensure_connection()
            print("✓ Database connection successful")
            return True
        except OperationalError as e:
            if attempt < max_retries - 1:
                print(f"⏳ Waiting for database... (attempt {attempt + 1}/{max_retries})")
                time.sleep(delay)
            else:
                print(f"❌ Database unavailable after {max_retries} attempts")
                return False
        except Exception as e:
            print(f"⚠️  Database check error: {str(e)[:100]}")
            return False
    return False

def create_admin_if_not_exists():
    """Create default admin user if it doesn't exist."""
    try:
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@examsaarthi.com', 'admin123')
            print("✅ Admin user created: admin / admin123")
        else:
            print("✓ Admin user already exists")
        return True
    except Exception as e:
        print(f"⚠️  Admin user error: {str(e)[:100]}")
        return False

if __name__ == '__main__':
    try:
        if wait_for_db():
            create_admin_if_not_exists()
        else:
            print("⚠️  Skipping admin initialization - database not ready")
    except Exception as e:
        print(f"⚠️  Unexpected error: {str(e)[:100]}")
        pass
