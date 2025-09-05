# Step-by-Step Vercel Deployment Guide for Attractify Client Portal

## Prerequisites
Before starting, ensure you have:
- ✅ Your code pushed to GitHub (we'll handle this)
- ✅ A Vercel account (free tier works perfectly)
- ✅ Your Supabase credentials ready (.env file)

---

## Step 1: Prepare Your Code for Deployment

### 1.1 First, let's commit your current changes to Git:

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "feat: Add Supabase integration and prepare for deployment"

# Push to GitHub
git push origin develop
```

### 1.2 Merge to main branch (Vercel deploys from main by default):

```bash
# Switch to main branch
git checkout main

# Merge develop into main
git merge develop

# Push main to GitHub
git push origin main
```

---

## Step 2: Create Your Vercel Account

### 2.1 Sign Up for Vercel
1. Go to https://vercel.com/signup
2. Click **"Continue with GitHub"** (recommended)
3. Authorize Vercel to access your GitHub account
4. You'll be redirected to the Vercel dashboard

---

## Step 3: Import Your Project to Vercel

### 3.1 Import from GitHub
1. In Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"attractify-client-portal"**
4. Click **"Import"** next to it

### 3.2 Configure Your Project (IMPORTANT!)

On the configuration screen, you'll see:

**Framework Preset**: Vercel should auto-detect "Vite" - if not, select it manually

**Root Directory**: Leave as `./` (default)

**Build and Output Settings**:
- Build Command: `pnpm run build` (should be auto-filled)
- Output Directory: `dist` (should be auto-filled)
- Install Command: `pnpm install` (should be auto-filled)

**Node.js Version**: Select 18.x or higher

---

## Step 4: Add Environment Variables (CRITICAL!)

### 4.1 In the same configuration screen, expand **"Environment Variables"**

### 4.2 Add your Supabase credentials:

Click **"Add"** for each variable:

**Variable 1:**
- Name: `VITE_SUPABASE_URL`
- Value: `https://gvmzsycxleaopairzqmg.supabase.co`
- Environment: Select all (Production, Preview, Development)

**Variable 2:**
- Name: `VITE_SUPABASE_ANON_KEY`
- Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bXpzeWN4bGVhb3BhaXJ6cW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNDAxMTcsImV4cCI6MjA3MjYxNjExN30.lpxcau61cvdCkM-HInfbJ0hlEm7coBe66U-51e0hfUg`
- Environment: Select all (Production, Preview, Development)

⚠️ **Double-check these values** - copy them exactly from your .env file

---

## Step 5: Deploy Your Project

### 5.1 Click **"Deploy"** button
- Vercel will start building your project
- You'll see real-time logs of the build process
- This usually takes 1-3 minutes

### 5.2 Monitor the Build
You'll see:
1. ⏳ Installing dependencies (pnpm install)
2. 🔨 Building project (pnpm run build)
3. 📦 Uploading static files
4. ✅ Deployment complete!

---

## Step 6: Access Your Deployed Site

### 6.1 Once deployment is complete:
- You'll get a production URL like: `https://attractify-client-portal.vercel.app`
- Click the URL to visit your live site
- Vercel also provides preview URLs for each deployment

### 6.2 Custom Domain (Optional)
To add your own domain:
1. Go to Project Settings → Domains
2. Add your domain (e.g., `portal.attractifymarketing.com`)
3. Follow Vercel's DNS configuration instructions

---

## Step 7: Verify Everything Works

### 7.1 Test Your Deployed Application:
1. **Visit your production URL**
2. **Test creating a client** - should save to Supabase
3. **Refresh the page** - data should persist
4. **Check Supabase Dashboard** - verify data appears in tables

### 7.2 Check for Issues:
- Open browser console (F12) → Console tab
- Look for any red errors
- Check Network tab for failed requests

---

## Step 8: Set Up Automatic Deployments

### 8.1 Vercel automatically sets up:
- **Production deployments** when you push to `main` branch
- **Preview deployments** when you push to other branches or create PRs

### 8.2 Your Workflow Going Forward:
```bash
# Work on develop branch
git checkout develop
# Make changes...
git add .
git commit -m "your message"
git push origin develop
# When ready for production
git checkout main
git merge develop
git push origin main
# Vercel auto-deploys to production!
```

---

## Troubleshooting Common Issues

### Issue 1: "Missing Supabase environment variables"
**Solution**: Go to Vercel Project Settings → Environment Variables and verify both variables are added

### Issue 2: Build fails with "pnpm: command not found"
**Solution**: Vercel should auto-detect pnpm from your lockfile. If not, set Install Command to `npm install -g pnpm && pnpm install`

### Issue 3: Page shows but no data loads
**Solution**: 
1. Check environment variables are set correctly
2. Verify Supabase project is active (not paused)
3. Check browser console for CORS errors

### Issue 4: 404 errors on page refresh
**Solution**: This is handled automatically by Vercel for SPAs, but if issues persist, create a `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

---

## Quick Checklist

Before clicking deploy, verify:
- [ ] Code is pushed to GitHub
- [ ] You're on the main branch
- [ ] Environment variables are added in Vercel
- [ ] Supabase project is active (not paused)
- [ ] You've selected the correct framework (Vite)

---

## What Happens Next?

After successful deployment:

1. **Your site is live!** Share the URL with your team
2. **Automatic deployments** are enabled - just push to GitHub
3. **Preview deployments** for testing - push to any branch
4. **Analytics** are available in Vercel dashboard
5. **Performance monitoring** is built-in

---

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: Available through dashboard
- **Check deployment logs**: Project → Functions tab → View logs
- **Status page**: https://vercel-status.com

---

## 🎉 Congratulations!

Your Attractify Client Portal is now:
- ✅ Live on the internet
- ✅ Connected to Supabase
- ✅ Auto-deploying on Git pushes
- ✅ Ready for production use

Save your production URL and share it with your team!
