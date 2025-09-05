# Attractify Client Portal - Deployment Guide

## Overview
This guide covers deploying the Attractify Client Portal with Supabase integration for database persistence.

## Prerequisites
- Node.js 18+ and pnpm installed
- Supabase account and project created
- Git repository for version control

## Environment Variables
The application requires the following environment variables to connect to Supabase:

```env
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Getting Your Supabase Credentials
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to Settings → API
4. Copy your Project URL and Anon/Public Key

## Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/attractify-logan/attractify-client-portal.git
cd attractify-client-portal
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```bash
cp .env.example .env
```
Then edit `.env` with your Supabase credentials.

### 4. Run Development Server
```bash
pnpm run dev
```
The application will be available at http://localhost:5173

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Select the attractify-client-portal project

2. **Configure Environment Variables**
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add the following:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - Production URL will be provided by Vercel

### Option 2: Netlify

1. **Build Command**
   ```bash
   pnpm run build
   ```

2. **Publish Directory**
   ```
   dist
   ```

3. **Environment Variables**
   - Add in Netlify dashboard under Site Settings → Environment Variables
   - Same variables as above

### Option 3: Manual Deployment

1. **Build for Production**
   ```bash
   pnpm run build
   ```

2. **Preview Production Build**
   ```bash
   pnpm run preview
   ```

3. **Deploy Files**
   - Upload contents of `dist/` folder to your web server
   - Ensure environment variables are set on the server

## Database Schema

The application uses the following Supabase tables:

### Core Tables
- **clients**: Stores client information
- **onboarding_steps**: Tracks onboarding progress
- **timeline_items**: Project timeline data
- **recording_sessions**: Content recording sessions
- **analytics_setup**: Analytics configuration
- **activity_log**: Activity tracking

All tables are created automatically when you set up the Supabase project using the provided SQL migrations.

## Security Considerations

### Row Level Security (RLS)
Currently, RLS is not enabled. For production deployment:

1. Enable RLS on all tables in Supabase
2. Create appropriate policies based on your authentication needs
3. Example policy for authenticated users:
   ```sql
   CREATE POLICY "Users can view their own data" ON clients
     FOR ALL USING (auth.uid() = user_id);
   ```

### API Keys
- **Never commit** `.env` files to version control
- Use environment variables for all sensitive data
- Rotate keys regularly
- Consider implementing server-side API routes for additional security

## Testing the Deployment

### 1. Verify Database Connection
- Open browser console
- Check for any Supabase connection errors
- Verify data loads correctly

### 2. Test Core Functions
- Create a new client
- Update client information
- Complete onboarding steps
- Delete test client

### 3. Monitor Performance
- Check network tab for API response times
- Monitor Supabase dashboard for query performance
- Enable Supabase real-time subscriptions if needed

## Troubleshooting

### Common Issues

#### "Missing Supabase environment variables" Error
- Ensure `.env` file exists and contains valid credentials
- Restart development server after changing `.env`
- Verify environment variables are set in production

#### Data Not Persisting
- Check Supabase dashboard for table data
- Verify API credentials are correct
- Check browser console for error messages

#### CORS Issues
- Ensure your domain is added to Supabase allowed origins
- Settings → API → CORS Allowed Origins

## Maintenance

### Regular Tasks
- Monitor Supabase usage and quotas
- Review database performance
- Update dependencies: `pnpm update`
- Backup database regularly

### Scaling Considerations
- Enable connection pooling for high traffic
- Consider implementing caching strategies
- Use Supabase Edge Functions for complex operations
- Monitor and optimize slow queries

## Support

For issues or questions:
- Check the [Supabase Documentation](https://supabase.com/docs)
- Review the project README
- Contact the development team

## Migration from Local Storage

If you have existing data in localStorage that needs to be migrated:

1. Export existing data before deploying
2. Use the Supabase import tools or SQL commands
3. Verify data integrity after migration

## Next Steps

After successful deployment:
1. Set up monitoring and alerts
2. Configure backups
3. Implement authentication if needed
4. Add custom domain
5. Set up CI/CD pipeline for automated deployments
