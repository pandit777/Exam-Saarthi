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
            # Use first_name if available, otherwise username
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
        # Get all form data
        username = request.POST.get('username', '').strip()
        first_name = request.POST.get('first_name', '').strip()
        last_name = request.POST.get('last_name', '').strip()
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password', '')
        confirm_password = request.POST.get('confirm_password', '')
        
        # Validation - Check all required fields
        if not username or not password or not confirm_password or not first_name or not email:
            messages.error(request, 'Please fill all required fields (Username, First Name, Email, Password)')
            return render(request, 'register.html', {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
        
        # Check if username exists
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username already exists. Please choose another.')
            return render(request, 'register.html', {
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
        
        # Check if email exists
        if User.objects.filter(email=email).exists():
            messages.error(request, 'Email already registered. Please use another email.')
            return render(request, 'register.html', {
                'username': username,
                'first_name': first_name,
                'last_name': last_name
            })
        
        # Check password match
        if password != confirm_password:
            messages.error(request, 'Passwords do not match')
            return render(request, 'register.html', {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
        
        # Check password length
        if len(password) < 6:
            messages.error(request, 'Password must be at least 6 characters long')
            return render(request, 'register.html', {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
        
        try:
            # Create user with all fields
            user = User.objects.create_user(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email
            )
            
            # Success message
            messages.success(request, f'Account created successfully for {first_name} {last_name}! Please login.')
            
            # Optional: Send welcome email
            try:
                send_mail(
                    'Welcome to Our Platform',
                    f'Hello {first_name},\n\nYour account has been created successfully.\nUsername: {username}\nEmail: {email}\n\nThank you for registering!',
                    'gs8901346287@gmail.com',
                    [email],
                    fail_silently=True,
                )
            except:
                pass  # Email fail ho toh bhi registration success ho
            
            return redirect('login')
            
        except Exception as e:
            messages.error(request, f'Error creating account: {str(e)}')
            return render(request, 'register.html', {
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'email': email
            })
    
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
            
            # Validation
            if not name or not email or not university or not message:
                return JsonResponse({'success': False, 'message': 'Please fill all required fields'})
            
            # Save to database
            contact = Contact.objects.create(
                name=name,
                email=email,
                university=university,
                course=course,
                message=message
            )
            
            # Email notification
            try:
                subject = f"New Contact Form Submission from {name}"
                email_body = f"""
                New Contact Form Submission:
                
                Name: {name}
                Email: {email}
                University: {university}
                Course: {course}
                Message: {message}
                
                Submitted at: {contact.created_at}
                """
                send_mail(
                    subject,
                    email_body,
                    'gs8901346287@gmail.com',
                    ['gs8901346287@gmail.com'],
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Error sending email: {str(e)}")
            
            return JsonResponse({
                'success': True, 
                'message': 'Thank you! Your message has been sent successfully.'
            })
            
        except Exception as e:
            print(f"Error in submit_contact: {str(e)}")
            return JsonResponse({'success': False, 'message': f'Error: {str(e)}'})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

def igu_btech_view(request):
    papers = IGUPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-btech.html', {'papers': papers})

def igu_mtech_view(request):
    papers = IGUMtechPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-mtech.html', {'papers': papers})

def igu_bca_view(request):
    papers = IGUBcaPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-bca.html', {'papers': papers})

def igu_bba_view(request):
    papers = IGUBbaPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-bba.html', {'papers': papers})

def igu_bsc_view(request):
    papers = IGUBscPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-bsc.html', {'papers': papers})

def igu_msc_view(request):
    papers = IGUMscPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-msc.html', {'papers': papers})

def igu_ba_view(request):
    papers = IGUBaPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-ba.html', {'papers': papers})

def igu_ma_view(request):
    papers = IGUMaPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-ma.html', {'papers': papers})

def igu_bcom_view(request):
    papers = IGUBcomPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-bcom.html', {'papers': papers})

def igu_mcom_view(request):
    papers = IGUMcomPaper.objects.all().order_by('semester', 'year')
    return render(request, 'igu-mcom.html', {'papers': papers})
