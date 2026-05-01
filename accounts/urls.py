from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('profile/', views.profile_view, name='profile'),
    path('logout/', views.logout_view, name='logout'),
    path('submit_contact/', views.submit_contact, name='submit_contact'),
    path('igu-btech/', views.igu_btech_view, name='igu_btech'),
    path('igu-mtech/', views.igu_mtech_view, name='igu_mtech'),
    path('igu-bca/', views.igu_bca_view, name='igu_bca'),
    path('igu-bba/', views.igu_bba_view, name='igu_bba'),
    path('igu-bsc/', views.igu_bsc_view, name='igu_bsc'),
    path('igu-msc/', views.igu_msc_view, name='igu_msc'),
    path('igu-ba/', views.igu_ba_view, name='igu_ba'),
    path('igu-ma/', views.igu_ma_view, name='igu_ma'),
    path('igu-bcom/', views.igu_bcom_view, name='igu_bcom'),
    path('igu-mcom/', views.igu_mcom_view, name='igu_mcom'),
]