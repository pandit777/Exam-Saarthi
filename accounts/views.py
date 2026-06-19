# accounts/views.py (Improved version)
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contact, IGUPaper, IGUMtechPaper, IGUBcaPaper, IGUBbaPaper, IGUBscPaper, IGUMscPaper, IGUBaPaper, IGUMaPaper, IGUBcomPaper, IGUMcomPaper
from django.core.mail import send_mail

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        if not username or not password:
            messages.error(request, 'Please fill all fields')
            return render(request, 'login.html')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            name = user.first_name if user.first_name else username
            messages.success(request, f'Welcome back, {name}!')
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password')
            return render(request, 'login.html')
    
    return render(request, 'login.html')

@login_required
def profile_view(request):
    user = request.user
    context = {
        'username': user.username,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email,
        'full_name': f"{user.first_name} {user.last_name}".strip(),
        'date_joined': user.date_joined,
        'last_login': user.last_login
    }
    return render(request, 'profile.html', context)

def logout_view(request):
    logout(request)
    messages.info(request, 'Logged out successfully!')
    return redirect('home')

def register_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password', '')
        
        if not username or not password or not confirm_password or not first_name or not email:
            messages.error(request, 'Please fill all required fields')
            return render(request, 'register.html')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists')
            return render(request, 'register.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered')
            return render(request, 'register.html')
        
        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'register.html')
        
        if len(password) < 6:
            messages.error(request, 'Password must be at least 6 characters')
            return render(request, 'register.html')
        
        user = User.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        
        messages.success(request, f'Account created for {first_name}! Please login.')
        return redirect('login')
    
    return render(request, 'register.html')

@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        try:
            name = request.POST.get('name', '')
            email = request.POST.get('email', '')
            university = request.POST.get('university', '')
            course = request.POST.get('course', '')
            message = request.POST.get('message', '')
            
            if not name or not email or not university or not message:
                return JsonResponse({'success': False, 'message': 'Please fill all required fields'})
            
            contact = Contact.objects.create(
                name=name,
                email=email,
                university=university,
                course=course,
                message=message
            )
            
            try:
                send_mail(
                    f"New Contact Form Submission from {name}",
                    f"Name: {name}\nEmail: {email}\nUniversity: {university}\nCourse: {course}\nMessage: {message}",
                    'gs8901346287@gmail.com',
                    ['gs8901346287@gmail.com'],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Email error: {e}")
            
            return JsonResponse({
                'success': True, 
                'message': 'Thank you! Your message has been sent successfully.'
            })
            
        except Exception as e:
            return JsonResponse({'success': False, 'message': f'Error: {str(e)}'})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

# Paper views with error handling
def get_papers_view(model, template):
    try:
        papers = model.objects.all().order_by('semester', 'year')
        return render(request, template, {'papers': papers})
    except Exception as e:
        print(f"Error in {template}: {e}")
        return render(request, template, {'papers': [], 'error': 'No papers found'})

def igu_btech_view(request):
    return get_papers_view(IGUPaper, 'igu-btech.html')

def igu_mtech_view(request):
    return get_papers_view(IGUMtechPaper, 'igu-mtech.html')

def igu_bca_view(request):
    return get_papers_view(IGUBcaPaper, 'igu-bca.html')

def igu_bba_view(request):
    return get_papers_view(IGUBbaPaper, 'igu-bba.html')

def igu_bsc_view(request):
    return get_papers_view(IGUBscPaper, 'igu-bsc.html')

def igu_msc_view(request):
    return get_papers_view(IGUMscPaper, 'igu-msc.html')

def igu_ba_view(request):
    return get_papers_view(IGUBaPaper, 'igu-ba.html')

def igu_ma_view(request):
    return get_papers_view(IGUMaPaper, 'igu-ma.html')

def igu_bcom_view(request):
    return get_papers_view(IGUBcomPaper, 'igu-bcom.html')

def igu_mcom_view(request):
    return get_papers_view(IGUMcomPaper, 'igu-mcom.html')
