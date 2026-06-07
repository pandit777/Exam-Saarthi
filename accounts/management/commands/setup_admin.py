from django.core.management.base import BaseCommand
from django.contrib.auth.models import User


class Command(BaseCommand):
    help = 'Setup default admin user or update admin password'

    def add_arguments(self, parser):
        parser.add_argument(
            '--password',
            type=str,
            help='Set password for admin user',
            default='admin123'
        )

    def handle(self, *args, **options):
        password = options.get('password')
        username = 'admin'

        # Check if admin user exists
        try:
            admin_user = User.objects.get(username=username)
            admin_user.set_password(password)
            admin_user.save()
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Admin user "{username}" password updated successfully!'
                )
            )
        except User.DoesNotExist:
            # Create new admin user
            User.objects.create_superuser(
                username=username,
                email='admin@examsaarthi.com',
                password=password
            )
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Admin user "{username}" created successfully!'
                )
            )

        self.stdout.write(
            self.style.WARNING(
                f'\n📋 Login Credentials:\n'
                f'   Username: {username}\n'
                f'   Password: {password}\n\n'
                f'⚠️  Please change the password after first login!'
            )
        )
