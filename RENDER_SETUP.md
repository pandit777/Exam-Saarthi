# Render PostgreSQL Setup Instructions

## Problem
You deleted the PostgreSQL database on Render, so `DATABASE_URL` environment variable is no longer set.

## Solution - Recreate PostgreSQL

### Step 1: Go to Render Dashboard
1. Visit https://dashboard.render.com/
2. Click on your project

### Step 2: Create PostgreSQL Database
1. Click **"New +"** button (top right)
2. Select **"PostgreSQL"**
3. Configure:
   - Name: `exam-saarthi-db` (or any name)
   - Database: `exam_saarthi`
   - User: `exam_saarthi`
   - Plan: Free
4. Click **"Create Database"**

### Step 3: Link to Web Service
1. Render will automatically create `DATABASE_URL` environment variable
2. Go to your Web Service (Exam-Saarthi)
3. Go to **Settings**
4. In Environment, you should see `DATABASE_URL` is now set
5. Click **"Deploy"** to rebuild the service

### Step 4: Verify
- Wait for deployment to complete
- Check logs for:
  ```
  ✅ Migrations completed on first request
  ✅ Admin user created: admin / admin123
  ```
- Visit your app URL and login with `admin / admin123`

## Alternative: Use SQLite (Development Only)
If you don't need PostgreSQL for now, the app will automatically use SQLite:
- DATABASE_URL is not set → Uses `db.sqlite3` (local development mode)
- Just visit the app, it will initialize on first request
- Login: `admin / admin123`

**Note**: SQLite on Render's free tier has filesystem limitations for production use. Recommend PostgreSQL for stability.
