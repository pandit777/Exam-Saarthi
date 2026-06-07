"""
Middleware for handling initial setup on first request.
Handles admin creation and migrations when database becomes available.
Gracefully falls back if database is unavailable.
"""
import threading
import os
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from django.core.management import call_command
from django.db import connection
from django.db.utils import OperationalError, DatabaseError

# Flag to track if setup has been attempted
_setup_done = False
_setup_lock = threading.Lock()
_db_unavailable = False

class InitializeOnFirstRequestMiddleware(MiddlewareMixin):
    """
    Initialize database on first request if not already done.
    Runs migrations and creates admin user on first successful DB connection.
    Gracefully handles database unavailability.
    """
    
    def process_request(self, request):
        global _setup_done, _db_unavailable
        
        if _setup_done or _db_unavailable:
            return None
        
        with _setup_lock:
            if _setup_done or _db_unavailable:
                return None
            
            try:
                # Try to establish database connection
                connection.ensure_connection()
                
                # Check if database is configured
                db_url = os.environ.get('DATABASE_URL', '')
                if not db_url:
                    print("ℹ️  No DATABASE_URL set - using SQLite (development mode)")
                else:
                    print("ℹ️  Using PostgreSQL database")
                
                # Run migrations
                try:
                    call_command('migrate', '--no-input', verbosity=0)
                    print("✅ Migrations completed on first request")
                except Exception as e:
                    print(f"⚠️  Migrations error: {str(e)[:100]}")
                
                # Create admin user if doesn't exist
                try:
                    if not User.objects.filter(username='admin').exists():
                        User.objects.create_superuser('admin', 'admin@examsaarthi.com', 'admin123')
                        print("✅ Admin user created: admin / admin123")
                    else:
                        print("✓ Admin user already exists")
                except Exception as e:
                    print(f"⚠️  Admin creation error: {str(e)[:100]}")
                
                _setup_done = True
                
            except (OperationalError, DatabaseError) as e:
                # Database temporarily unavailable, will retry on next request
                error_msg = str(e)
                if 'failed to resolve host' in error_msg or 'does not exist' in error_msg:
                    print(f"⚠️  Database unavailable: {error_msg[:100]}")
                    print("ℹ️  Create PostgreSQL on Render or configure DATABASE_URL")
                else:
                    print(f"⏳ Database not ready yet: {error_msg[:100]}")
                return None
            except Exception as e:
                print(f"⚠️  Setup error: {str(e)[:100]}")
                _setup_done = True
        
        return None
