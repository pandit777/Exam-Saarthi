"""
Middleware for handling initial setup on first request.
Handles admin creation and migrations when database becomes available.
"""
import threading
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from django.core.management import call_command
from django.db import connection
from django.db.utils import OperationalError

# Flag to track if setup has been attempted
_setup_done = False
_setup_lock = threading.Lock()

class InitializeOnFirstRequestMiddleware(MiddlewareMixin):
    """
    Initialize database on first request if not already done.
    Runs migrations and creates admin user on first successful DB connection.
    """
    
    def process_request(self, request):
        global _setup_done
        
        if _setup_done:
            return None
        
        with _setup_lock:
            if _setup_done:  # Double-check pattern
                return None
            
            try:
                # Try to establish database connection
                connection.ensure_connection()
                
                # Run migrations
                try:
                    call_command('migrate', '--no-input', verbosity=0)
                    print("✅ Migrations completed on first request")
                except Exception as e:
                    print(f"⚠️  Migrations failed: {str(e)[:100]}")
                
                # Create admin user if doesn't exist
                try:
                    if not User.objects.filter(username='admin').exists():
                        User.objects.create_superuser('admin', 'admin@examsaarthi.com', 'admin123')
                        print("✅ Admin user created: admin / admin123")
                except Exception as e:
                    print(f"⚠️  Admin creation failed: {str(e)[:100]}")
                
                _setup_done = True
                
            except OperationalError:
                # Database not ready yet, will retry on next request
                print("⏳ Database not ready yet, will retry...")
                return None
            except Exception as e:
                print(f"⚠️  Setup error: {str(e)[:100]}")
                _setup_done = True  # Mark as done to avoid repeated attempts
        
        return None
