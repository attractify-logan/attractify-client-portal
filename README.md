# Attractify Marketing - Client Portal

A professional client onboarding and management portal for Attractify Marketing's AI-powered marketing strategies.

## 🎯 Overview

This portal streamlines the client onboarding process with a comprehensive 7-step workflow, real-time progress tracking, and integrated tools for analytics setup, content recording, and client management.

## ✨ Features

### **Client Management**
- ✅ Professional client creation and editing
- ✅ Real-time client list with search and filtering
- ✅ Individual client progress tracking
- ✅ Client health scores and status management

### **Onboarding Workflow**
- ✅ 7-step comprehensive onboarding process
- ✅ Interactive step management (Start, Complete, Reopen)
- ✅ Visual progress tracking with percentages
- ✅ External tool integration (Calendly, Admatic.io, GA4, GTM, Riverside)

### **Analytics Integration**
- ✅ Google Analytics 4 setup wizard
- ✅ Google Tag Manager configuration
- ✅ Step-by-step setup instructions
- ✅ Code snippet generation

### **Content Recording**
- ✅ Riverside.fm integration
- ✅ Recording schedule management
- ✅ Quality checklist and preparation workflows
- ✅ Session tracking and management

### **Professional Interface**
- ✅ Attractify Marketing branding
- ✅ Responsive design for all devices
- ✅ Modern, clean UI with intuitive navigation
- ✅ Real-time updates and progress indicators

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or pnpm package manager
- Modern web browser

### **Installation**

1. **Clone or download the repository**
   ```bash
   git clone <your-repo-url>
   cd attractify-client-portal
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📦 Production Deployment

### **Build for Production**
```bash
npm run build
# or
pnpm run build
```

### **Preview Production Build**
```bash
npm run preview
# or
pnpm run preview
```

### **Deploy to Static Hosting**
The `dist` folder contains all static files ready for deployment to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 🛠️ Development

### **Project Structure**
```
attractify-client-portal/
├── public/                 # Static assets
│   ├── attractify-logo.png # Attractify logo
│   └── favicon.ico        # Site favicon
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx  # Main dashboard
│   │   ├── Sidebar.jsx    # Navigation sidebar
│   │   ├── ClientCreationForm.jsx
│   │   ├── ClientList.jsx
│   │   ├── OnboardingChecklist.jsx
│   │   ├── AnalyticsSetup.jsx
│   │   ├── ContentRecording.jsx
│   │   ├── Timeline.jsx
│   │   └── Support.jsx
│   ├── lib/
│   │   └── localStorage.js # Data persistence
│   ├── App.jsx           # Main application
│   └── main.jsx          # Entry point
├── package.json          # Dependencies
├── vite.config.js       # Build configuration
└── tailwind.config.js   # Styling configuration
```

### **Key Technologies**
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Professional icon library
- **localStorage** - Client-side data persistence

## 📊 Data Management

### **Storage System**
- **localStorage** for client data persistence
- **JSON format** for easy data management
- **Real-time synchronization** across components
- **Automatic backup** and data validation

### **Data Structure**
```javascript
{
  "id": "unique-client-id",
  "company_name": "Client Company",
  "contact_email": "client@email.com",
  "status": "onboarding",
  "health_score": 85,
  "onboarding_steps": [
    {
      "id": 1,
      "title": "Schedule Onboarding Call",
      "status": "completed",
      "completed_at": "2024-09-04T14:30:00.000Z"
    }
  ]
}
```

## 🎨 Customization

### **Branding**
- Update logo in `/public/attractify-logo.png`
- Modify colors in `tailwind.config.js`
- Update contact information in components

### **Onboarding Steps**
Edit `/src/components/OnboardingChecklist.jsx`:
- Add/remove steps
- Update external links
- Modify instructions
- Change time estimates

### **Analytics Integration**
Update `/src/components/AnalyticsSetup.jsx`:
- Add new analytics platforms
- Update setup instructions
- Modify verification processes

## 🔧 Configuration

### **Environment Variables**
Create `.env.local` for environment-specific settings:
```env
VITE_APP_TITLE=Attractify Client Portal
VITE_CONTACT_EMAIL=admin@attractifymarketing.com
VITE_CALENDLY_URL=https://calendly.com/your-link
VITE_ADMATIC_URL=https://app.admatic.io/#/connect/your-token
```

### **External Integrations**
- **Calendly**: Update booking links in onboarding steps
- **Admatic.io**: Configure social media integration URLs
- **Riverside.fm**: Set up recording studio links
- **Google Analytics**: Add tracking IDs for client setups

## 📱 Mobile Support

The portal is fully responsive and optimized for:
- ✅ Desktop computers
- ✅ Tablets (iPad, Android tablets)
- ✅ Mobile phones (iOS, Android)
- ✅ Touch-friendly interface
- ✅ Responsive navigation

## 🔒 Security

### **Data Protection**
- Client data stored locally in browser
- No server-side data transmission
- HTTPS recommended for production
- Regular data validation and sanitization

### **Best Practices**
- Input validation on all forms
- XSS protection through React
- Secure external link handling
- Regular dependency updates

## 📈 Performance

### **Optimization Features**
- Code splitting and lazy loading
- Optimized bundle size (~164KB gzipped)
- Fast development server with HMR
- Production build optimization

### **Browser Support**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🆘 Support

### **Getting Help**
- **Email**: admin@attractifymarketing.com
- **Documentation**: This README and inline comments
- **Issues**: Create GitHub issues for bugs or feature requests

### **Common Issues**

**Development server won't start:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

**Build fails:**
```bash
# Check for syntax errors
npm run build 2>&1 | grep -i error
```

**Styling issues:**
```bash
# Rebuild Tailwind CSS
npm run build:css
```

## 🚀 Deployment Options

### **1. Netlify**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### **2. Vercel**
1. Import GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### **3. GitHub Pages**
1. Build project: `npm run build`
2. Push `dist` folder to `gh-pages` branch
3. Enable GitHub Pages in repository settings

### **4. Self-Hosted**
1. Build project: `npm run build`
2. Upload `dist` folder to web server
3. Configure web server for SPA routing

## 📝 License

This project is proprietary software developed for Attractify Marketing.

## 🤝 Contributing

This is an internal tool for Attractify Marketing. For modifications or enhancements, please contact the development team.

---

## 📞 Contact

**Attractify Marketing**
- Website: https://attractifymarketing.com
- Email: admin@attractifymarketing.com
- Portal: AI-powered marketing strategies and client onboarding

---

*Built with ❤️ for Attractify Marketing's client success*

