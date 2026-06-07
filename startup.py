#!/usr/bin/env python
"""
Render startup script with database availability checks.
Handles database connection issues gracefully.
"""
import os
import sys
import subprocess
import time

def check_database_url():
    """Check if DATABASE_URL is properly configured."""
    db_url = os.environ.get('DATABASE_URL', '').strip()
    if not db_url:
        print("⚠️  DATABASE_URL not set - skipping migrations")
        return False
    if db_url.startswith('sqlite'):
        print("ℹ️  Using SQLite database")
        return True
    print(f"ℹ️  DATABASE_URL configured (PostgreSQL)")
    return True

def run_migrations():
    """Run Django migrations with timeout."""
    print("🔄 Running migrations...")
    try:
        result = subprocess.run(
            ['python', 'manage.py', 'migrate', '--no-input'],
            capture_output=True,
            text=True,
            timeout=30
        )
        if result.returncode == 0:
            print("✅ Migrations completed")
            return True
        else:
            print(f"⚠️  Migration warning: {result.stderr[:200] if result.stderr else 'Unknown error'}")
            return False
    except subprocess.TimeoutExpired:
        print("⚠️  Migrations timed out - continuing without them")
        return False
    except Exception as e:
        print(f"⚠️  Migrations error: {str(e)[:200]}")
        return False

def create_admin():
    """Create admin user."""
    print("👤 Initializing admin user...")
    try:
        result = subprocess.run(
            ['python', 'init_admin.py'],
            capture_output=True,
            text=True,
            timeout=30
        )
        print(result.stdout)
        if result.stderr:
            print(result.stderr)
        return True
    except Exception as e:
        print(f"⚠️  Admin init warning: {str(e)[:200]}")
        return False

def start_gunicorn():
    """Start the Gunicorn application server."""
    port = os.environ.get('PORT', '8000')
    print(f"🚀 Starting Gunicorn on port {port}...")
    os.execvp('gunicorn', [
        'gunicorn',
        'loginproject.wsgi:application',
        '--bind', f'0.0.0.0:{port}',
        '--workers', '2',
        '--access-logfile', '-',
        '--error-logfile', '-',
    ])

if __name__ == '__main__':
    try:
        # Wait for database service to initialize
        print("⏳ Waiting for services to be ready...")
        time.sleep(5)
        
        # Check database configuration
        if check_database_url():
            # Try migrations
            run_migrations()
            # Try admin creation
            create_admin()
        else:
            print("⚠️  Skipping database operations")
        
        # Start Gunicorn
        start_gunicorn()
    except KeyboardInterrupt:
        print("\n⛔ Interrupted")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Fatal error: {str(e)}")
        sys.exit(1)
