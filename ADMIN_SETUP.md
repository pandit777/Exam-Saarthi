# Admin Panel Setup Guide

## Initial Admin Setup

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

### First Time Login
1. Go to: `http://yourdomain.com/admin/`
2. Enter username: `admin`
3. Enter password: `admin123`
4. Click **Login**

## Changing Admin Password

### Via Django Admin Interface (Recommended)
1. Login to admin panel with default credentials
2. Click on "admin" in top-right corner → **Change password**
3. Enter your current password
4. Enter your new password (twice)
5. Click **Change password**

### Via Management Command
If you need to reset admin password or create a new one:

```bash
# Set new password for existing admin user
python manage.py setup_admin --password "your_new_password"

# This will update the password and display the credentials
```

## Managing Papers

### Adding New Papers
1. Login to admin panel
2. Select the course type you want to add papers for:
   - **IGU Papers** → B.Tech papers
   - **IGU M.Tech Papers** → M.Tech papers
   - **IGU BCA Papers** → BCA papers
   - **IGU BBA Papers** → BBA papers
   - **IGU BSc Papers** → BSc papers
   - **IGU MSc Papers** → MSc papers
   - **IGU BA Papers** → BA papers
   - **IGU MA Papers** → MA papers
   - **IGU B.Com Papers** → B.Com papers
   - **IGU M.Com Papers** → M.Com papers

3. Click **"+ Add"** button
4. Fill in the paper details:
   - **Paper ID**: Unique identifier (e.g., "12476")
   - **Paper Name**: Full name of the subject
   - **Semester**: Select from dropdown (1st to 8th)
   - **Year**: Year of the exam (e.g., "2024")
   - **PDF Link**: Direct link to PDF or Google Drive share link
5. Click **Save**

### Viewing All Papers
1. Click on any course paper model
2. See all papers with filters by:
   - Semester
   - Year
3. Use search to find papers by ID, name, or course

## Security Notes

⚠️ **Important**:
1. **Change the default password immediately** after first login
2. Keep your admin credentials secure
3. Don't share admin credentials with unauthorized users
4. Use strong passwords (mix of uppercase, lowercase, numbers, special chars)

## Troubleshooting

### Admin Login Not Working
- Verify username is `admin` (case-sensitive)
- Check if you're using the correct password
- Try using the management command to reset: `python manage.py setup_admin --password admin123`

### Can't Access Admin Panel
- Ensure you're logged in as a superuser
- Check if `/admin/` URL is enabled in `loginproject/urls.py`
- Verify Django admin app is installed in INSTALLED_APPS

### Paper Not Showing on Frontend
- Ensure the paper is saved with a valid PDF link
- Check if the semester and year match the course
- Wait for page cache to refresh if using caching
- Verify the paper is in the correct course model (B.Tech ≠ M.Tech)

## Useful Admin Features

- **Search**: Use the search box to find papers by ID, name, or course
- **Filters**: Click semester/year to filter papers quickly
- **Bulk Actions**: Select multiple papers for batch operations (delete)
- **Read-only Fields**: `created_at` and `updated_at` fields auto-update

---

**Questions?** Check logs in Django console or contact the development team.
