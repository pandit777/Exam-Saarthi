#!/bin/bash

echo "📦 Installing dependencies..."
pip install -r requirements.txt

echo "🔄 Running migrations..."
python manage.py makemigrations --noinput
python manage.py migrate --noinput

echo "📥 Importing papers..."
python manage.py import_papers || true
python manage.py import_mtech_papers || true
python manage.py import_bca_papers || true
python manage.py import_bba_papers || true
python manage.py import_bsc_papers || true
python manage.py import_msc_papers || true
python manage.py import_ba_papers || true
python manage.py import_ma_papers || true
python manage.py import_bcom_papers || true
python manage.py import_mcom_papers || true

echo "👤 Creating superuser..."
python -c "import os, django; os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'loginproject.settings'); django.setup(); from django.contrib.auth.models import User; User.objects.filter(username='admin').delete(); user = User.objects.create_user('admin', 'gs8901346287@gmail.com', 'Gourav@2005to2026'); user.first_name = 'Gourav'; user.last_name = 'Sharma'; user.is_staff = True; user.is_superuser = True; user.save(); print('✅ Superuser Created Successfully!')"

echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

echo "✅ Build completed successfully!"
