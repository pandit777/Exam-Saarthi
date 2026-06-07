#!/usr/bin/env python
"""
Render startup script - minimal approach
Just start gunicorn without waiting for database.
Database operations are handled on-demand by Django.
"""
import os
import sys
import subprocess
import time

def start_gunicorn():
    """Start the Gunicorn application server."""
    port = os.environ.get('PORT', '8000')
    print(f"🚀 Starting Gunicorn on port {port}...")
    print("ℹ️  Database operations will be handled on-demand")
    
    # Start gunicorn in the foreground
    os.execvp('gunicorn', [
        'gunicorn',
        'loginproject.wsgi:application',
        '--bind', f'0.0.0.0:{port}',
        '--workers', '2',
        '--timeout', '60',
        '--access-logfile', '-',
        '--error-logfile', '-',
        '--log-level', 'info',
    ])

if __name__ == '__main__':
    try:
        print("⏳ Waiting for system initialization...")
        time.sleep(3)
        start_gunicorn()
    except KeyboardInterrupt:
        print("\n⛔ Interrupted")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)
