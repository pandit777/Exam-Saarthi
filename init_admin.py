#!/usr/bin/env python
"""
Initialize admin user on startup if it doesn't exist.
This runs before Django app starts on Render.
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'loginproject.settings')
sys.path.insert(0, os.path.dirname(__file__))

django.setup()

from django.contrib.auth.models import User

def create_admin_if_not_exists():
    """Create default admin user if it doesn't exist."""
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@examsaarthi.com', 'admin123')
        print("✅ Admin user created: admin / admin123")
    else:
        print("✓ Admin user already exists")

if __name__ == '__main__':
    try:
        create_admin_if_not_exists()
    except Exception as e:
        print(f"⚠️  Admin initialization warning: {str(e)}")
        # Don't fail the app startup if admin creation fails
        pass
