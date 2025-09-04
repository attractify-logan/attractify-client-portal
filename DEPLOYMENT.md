# Deployment Guide - Attractify Client Portal

This guide covers all deployment options for the Attractify Client Portal, from local development to production hosting.

## 🏠 Local Development Setup

### **Prerequisites**
- Node.js 18+ ([Download](https://nodejs.org/))
- npm (comes with Node.js) or pnpm ([Install pnpm](https://pnpm.io/installation))
- Git ([Download](https://git-scm.com/))

### **Step 1: Clone Repository**
```bash
# Clone the repository
git clone <your-github-repo-url>
cd attractify-client-portal

# Or if you downloaded the zip file
unzip attractify-client-portal.zip
cd attractify-client-portal
```

### **Step 2: Install Dependencies**
```bash
# Using npm
npm install

# Or using pnpm (recommended for faster installs)
pnpm install
```

### **Step 3: Environment Setup**
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your specific settings
# Update URLs, contact information, and feature flags
```

### **Step 4: Start Development Server**
```bash
# Using npm
npm run dev

# Or using pnpm
pnpm run dev
```

### **Step 5: Access Portal**
Open your browser and navigate to:
```
http://localhost:5173
```

## 🌐 Production Deployment

### **Build for Production**
```bash
# Create optimized production build
npm run build

# Or with pnpm
pnpm run build
```

This creates a `dist` folder with all static files ready for deployment.

### **Preview Production Build Locally**
```bash
# Preview the production build
npm run preview

# Or with pnpm
pnpm run preview
```

## 🚀 Hosting Options

### **Option 1: Netlify (Recommended)**

**Automatic Deployment from GitHub:**
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18
6. Click "Deploy site"

**Manual Deployment:**
1. Build the project: `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag and drop the `dist` folder to Netlify

**Custom Domain:**
1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain
3. Configure DNS settings as instructed

### **Option 2: Vercel**

**Automatic Deployment:**
1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Deploy

**Manual Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### **Option 3: GitHub Pages**

**Setup:**
1. Build the project: `npm run build`
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to package.json scripts:
   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```
4. Deploy: `npm run deploy`
5. Enable GitHub Pages in repository settings

### **Option 4: AWS S3 + CloudFront**

**Setup S3 Bucket:**
1. Create S3 bucket with public read access
2. Enable static website hosting
3. Upload `dist` folder contents

**CloudFront Distribution:**
1. Create CloudFront distribution
2. Set S3 bucket as origin
3. Configure for SPA (Single Page Application):
   - Error pages: 404 → /index.html (200)
   - Error pages: 403 → /index.html (200)

### **Option 5: Self-Hosted Server**

**Requirements:**
- Web server (Apache, Nginx, IIS)
- HTTPS certificate (recommended)

**Apache Configuration:**
```apache
<VirtualHost *:80>
    ServerName your-domain.com
    DocumentRoot /path/to/dist
    
    # SPA routing support
    <Directory /path/to/dist>
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    # SPA routing support
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔧 Environment Configuration

### **Production Environment Variables**
Create `.env.local` for production:

```env
# Production Configuration
VITE_APP_TITLE=Attractify Client Portal
VITE_CONTACT_EMAIL=admin@attractifymarketing.com

# Update with your actual URLs
VITE_CALENDLY_URL=https://calendly.com/your-actual-link
VITE_ADMATIC_URL=https://app.admatic.io/#/connect/your-token

# Analytics (optional)
VITE_GA4_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
VITE_GTM_CONTAINER_ID=GTM-YOUR-ACTUAL-ID

# Production settings
VITE_DEV_MODE=false
VITE_DEBUG_LOGGING=false
```

### **Security Considerations**
- Use HTTPS in production
- Update default passwords/tokens
- Configure proper CORS if using APIs
- Regular security updates

## 📱 Mobile Optimization

The portal is fully responsive, but for optimal mobile experience:

1. **PWA Setup** (optional):
   ```bash
   npm install vite-plugin-pwa
   ```

2. **Mobile Testing**:
   - Test on actual devices
   - Use browser dev tools mobile simulation
   - Verify touch interactions

## 🔍 Performance Optimization

### **Build Optimization**
```bash
# Analyze bundle size
npm run build -- --analyze

# Or with webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer
```

### **CDN Configuration**
For better performance, serve static assets from CDN:
1. Upload assets to CDN
2. Update asset URLs in build
3. Configure cache headers

### **Monitoring**
Set up monitoring for:
- Page load times
- Error tracking
- User analytics
- Performance metrics

## 🆘 Troubleshooting

### **Common Issues**

**Build Fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Routing Issues in Production:**
- Ensure server is configured for SPA routing
- Check that all routes redirect to index.html

**Assets Not Loading:**
- Verify base URL configuration
- Check file paths and permissions
- Ensure CORS is properly configured

**Performance Issues:**
- Enable gzip compression on server
- Optimize images and assets
- Use CDN for static files

### **Debug Mode**
Enable debug mode in `.env.local`:
```env
VITE_DEBUG_LOGGING=true
VITE_DEV_MODE=true
```

## 📊 Monitoring & Analytics

### **Error Tracking**
Consider integrating:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for usage metrics

### **Performance Monitoring**
- Lighthouse CI for performance testing
- Web Vitals monitoring
- Real User Monitoring (RUM)

## 🔄 Updates & Maintenance

### **Regular Updates**
```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit
npm audit fix
```

### **Backup Strategy**
- Regular code backups to GitHub
- Database backups (if using external DB)
- Configuration backups

### **Rollback Plan**
- Keep previous builds available
- Document rollback procedures
- Test rollback process

## 📞 Support

For deployment issues:
- **Email**: admin@attractifymarketing.com
- **Documentation**: Check README.md
- **GitHub Issues**: Create issues for bugs

---

**Deployment Checklist:**
- [ ] Code tested locally
- [ ] Environment variables configured
- [ ] Production build successful
- [ ] Domain/hosting configured
- [ ] SSL certificate installed
- [ ] Mobile testing completed
- [ ] Performance testing done
- [ ] Monitoring set up
- [ ] Backup strategy in place

*Happy deploying! 🚀*

