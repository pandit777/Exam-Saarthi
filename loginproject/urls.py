from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
from accounts.views import igu_btech_view, igu_mtech_view, igu_bca_view, igu_bba_view, igu_bsc_view, igu_msc_view, igu_ba_view, igu_ma_view, igu_bcom_view, igu_mcom_view

def home_view(request):
    return render(request, 'index.html')

def university_view(request):
    return render(request, 'university.html')

def igu_view(request):
    return render(request, 'igu.html')

def about_view(request):
    return render(request, 'about.html')

def contact_view(request):
    return render(request, 'contact.html')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', home_view, name='home'),
    path('university/', university_view, name='university'),
    path('igu/', igu_view, name='igu'),
    path('about/', about_view, name='about'),
    path('contact/', contact_view, name='contact'),
    path('igu-btech/', igu_btech_view, name='igu_btech'),
    path('igu-mtech/', igu_mtech_view, name='igu_mtech'),
    path('igu-bca/', igu_bca_view, name='igu_bca'),
    path('igu-bba/', igu_bba_view, name='igu_bba'),
    path('igu-bsc/', igu_bsc_view, name='igu_bsc'),
    path('igu-msc/', igu_msc_view, name='igu_msc'),
    path('igu-ba/', igu_ba_view, name='igu_ba'),
    path('igu-ma/', igu_ma_view, name='igu_ma'),  # ✅ Add this line
    path('igu-bcom/', igu_bcom_view, name='igu_bcom'),  # ✅ Add this line
    path('igu-mcom/', igu_mcom_view, name='igu_mcom'),  # ✅ Add this line
]