#!/usr/bin/env bash
set -o errexit

echo "🚀 Starting build process..."

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --no-input 2>&1 || true

# Apply database migrations
echo "🗄️ Running migrations..."
python manage.py migrate --noinput

# Create superuser
echo "👤 Creating superuser..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
user, created = User.objects.get_or_create(
    username='admin',
    defaults={
        'email': 'gs8901346287@gmail.com',
        'first_name': 'Gourav',
        'last_name': 'Sharma',
        'is_superuser': True,
        'is_staff': True,
    }
)
if created:
    user.set_password('Gourav@2005to2026')
    user.save()
    print('✅ Superuser created successfully!')
else:
    print('✅ User already exists!')
EOF

echo "✅ Build completed successfully!"
