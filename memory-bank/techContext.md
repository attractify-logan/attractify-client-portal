# Technical Context - Attractify Client Portal

## 🛠️ Technology Stack

### **Frontend Framework**
- **React 18**: Latest stable version with concurrent features
- **Vite**: Fast build tool and development server
- **JavaScript**: ES6+ with modern syntax
- **JSX**: React component templating

### **UI & Styling**
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: High-quality React component library
- **Lucide React**: Modern icon library
- **Sonner**: Toast notification library
- **Responsive Design**: Mobile-first approach

### **Routing & Navigation**
- **React Router DOM**: Client-side routing
- **Hash-based routing**: For GitHub Pages compatibility
- **Programmatic navigation**: useNavigate hook

### **State Management**
- **React Hooks**: useState, useEffect, useMemo, useCallback
- **Local State**: Component-level state management
- **localStorage**: Browser-based data persistence
- **No global state library**: Simple state architecture

## 📦 Dependencies

### **Production Dependencies**
```json
{
  "@radix-ui/react-*": "UI component primitives",
  "react": "^18.2.0",
  "react-dom": "^18.2.0", 
  "react-router-dom": "^6.x",
  "lucide-react": "Latest",
  "class-variance-authority": "Styling utilities",
  "clsx": "Conditional className utility",
  "tailwind-merge": "Tailwind class merging"
}
```

### **Development Dependencies**
```json
{
  "@vitejs/plugin-react": "Vite React plugin",
  "vite": "Latest stable",
  "tailwindcss": "^3.x",
  "postcss": "CSS processing",
  "autoprefixer": "CSS vendor prefixes",
  "eslint": "Code linting"
}
```

## 🏗️ Build & Development Tools

### **Vite Configuration**
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  base: '/attractify-client-portal/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

### **Development Server**
- **Port**: 5173 (Vite default)
- **Hot Reload**: Instant updates during development
- **Fast Refresh**: React state preservation
- **Asset Processing**: Automatic optimization

### **Build Process**
- **Production Build**: `npm run build`
- **Preview**: `npm run preview`
- **Assets**: Automatic bundling and optimization
- **Output**: Static files in `dist/` directory

## 💾 Data Architecture

### **Storage Solution**
- **Current**: Browser localStorage
- **Format**: JSON serialization
- **Capacity**: ~5-10MB per domain
- **Persistence**: Local browser only
- **Backup**: No automatic backup

### **Data Models**
```javascript
// Client data structure
const ClientSchema = {
  id: String,           // Timestamp-based unique ID
  company_name: String, // Required
  industry: String,
  contact_name: String, // Required
  contact_email: String,// Required, validated
  phone: String,
  website: String,      // URL format
  notes: String,        // Long text
  status: Enum,         // "onboarding" | "active" | "completed"
  health_score: Number, // 0-100 range
  created_at: Date,     // ISO string
  updated_at: Date,     // ISO string
  onboarding_steps: Array // Step objects
}

// Onboarding step structure
const StepSchema = {
  id: Number,           // Sequential ID
  title: String,        // Step name
  description: String,  // Step description
  status: Enum,         // "pending" | "in_progress" | "completed"
  completed_at: Date,   // ISO string when completed
  link: String          // External URL (optional)
}
```

### **Storage Functions**
```javascript
// Core CRUD operations
getClients()                    // Retrieve all clients
addClient(clientData)           // Create new client
updateClient(id, updates)       // Update existing client
deleteClient(id)                // Remove client
getClientProgress(id)           // Calculate progress
updateOnboardingStep(...)       // Update step status
```

## 🎨 Styling Architecture

### **Tailwind CSS Setup**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Attractify brand colors
        primary: '#3B82F6',
        secondary: '#1E40AF'
      }
    }
  }
}
```

### **Component Styling Pattern**
```javascript
// Consistent styling approach
const baseClasses = "flex flex-col space-y-4 p-6";
const cardClasses = "bg-white rounded-lg shadow-sm border";
const buttonClasses = "bg-blue-600 hover:bg-blue-700 text-white";

// Usage in components
<div className={`${baseClasses} ${cardClasses}`}>
  <Button className={buttonClasses}>Action</Button>
</div>
```

### **Responsive Design**
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Mobile First**: Base styles for mobile, progressively enhanced
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch Targets**: Appropriately sized for mobile interaction

## 🔧 Development Environment

### **Local Development**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### **File Structure**
```
attractify-client-portal/
├── public/                # Static assets
│   ├── attractify-logo.png
│   ├── attractify-logo.webp
│   └── favicon.ico
├── src/
│   ├── components/        # React components
│   │   ├── Dashboard.jsx
│   │   ├── ClientList.jsx
│   │   └── ui/           # Shadcn components
│   ├── lib/              # Utilities
│   │   ├── localStorage.js
│   │   ├── utils.js
│   │   └── supabase.js   # Future database
│   ├── hooks/            # Custom hooks
│   ├── assets/           # Build assets
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   ├── App.css
│   └── index.css
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── package.json          # Dependencies & scripts
└── README.md            # Documentation
```

## 🔌 External Integrations

### **Current Integrations**
- **Calendly**: Onboarding call scheduling
  - URL: `https://calendly.com/admin-attractifymarketing/onboarding-call`
  - Integration: Direct links in onboarding steps
  
- **Google Analytics 4**: Setup wizard
  - Configuration: Step-by-step GA4 setup
  - Integration: Embedded setup instructions
  
- **Google Tag Manager**: Configuration wizard
  - Setup: GTM container configuration
  - Integration: Code snippets and instructions
  
- **Riverside.fm**: Content recording platform
  - URL: `https://riverside.fm`
  - Integration: Session management interface
  
- **Admatic.io**: Marketing platform
  - URL: `https://app.admatic.io/#/connect/tk88dkkt49`
  - Integration: Direct connection links

### **Integration Pattern**
```javascript
// Standard integration configuration
const integrations = {
  calendly: {
    name: 'Calendly',
    url: 'https://calendly.com/admin-attractifymarketing/onboarding-call',
    type: 'external_link'
  },
  googleAnalytics: {
    name: 'Google Analytics 4',
    type: 'setup_wizard',
    steps: [...setupSteps]
  }
}
```

## 🔒 Security Considerations

### **Current Security State**
- ⚠️ **No Authentication**: Open access to application
- ⚠️ **Client-side Only**: All data stored in browser
- ⚠️ **No Data Validation**: Limited input sanitization
- ⚠️ **No Rate Limiting**: Unlimited client creation
- ⚠️ **No Audit Trail**: No logging of user actions

### **Security Best Practices Needed**
1. **Authentication**: User login system
2. **Input Validation**: Comprehensive form validation
3. **Data Sanitization**: XSS protection
4. **HTTPS Enforcement**: Secure connections
5. **Session Management**: Proper user sessions

## 🚀 Performance Optimization

### **Current Performance**
- ✅ **Fast Initial Load**: Vite optimized build
- ✅ **Small Bundle Size**: Minimal dependencies
- ✅ **Responsive UI**: Fast local state updates
- ✅ **Asset Optimization**: Automatic image optimization
- ⚠️ **localStorage Limitations**: No pagination for large datasets

### **Performance Monitoring**
```javascript
// Basic performance tracking
const performanceMetrics = {
  initialLoad: performance.now(),
  clientsLoaded: Date.now(),
  renderTime: performance.now() - start
}
```

### **Optimization Opportunities**
1. **Code Splitting**: Lazy load components
2. **Image Optimization**: WebP format, responsive images
3. **Caching Strategy**: Service worker for offline support
4. **Bundle Analysis**: Identify large dependencies
5. **Database Migration**: Move from localStorage to database

## 🔄 Development Workflow

### **Version Control**
- **Git**: Standard version control
- **GitHub**: Repository hosting
- **Branches**: Feature-based branching
- **Commits**: Conventional commit messages

### **Deployment**
- **GitHub Pages**: Static site deployment
- **Vercel**: Alternative deployment option (documented)
- **Netlify**: Alternative deployment option (documented)
- **Build Process**: Automated via Vite
- **Domain**: Custom domain ready
- **SSL**: Automatic HTTPS
- **Git Workflow**: Automated feature branching via .clinerules

### **Testing Strategy**
- **Manual Testing**: Comprehensive user flow testing
- **Browser Testing**: Cross-browser compatibility
- **Mobile Testing**: Responsive design validation
- **Future**: Unit tests with Jest/React Testing Library

## 🔮 Future Technical Roadmap

### **Database Migration**
```javascript
// Planned Supabase integration
const supabaseConfig = {
  url: process.env.VITE_SUPABASE_URL,
  key: process.env.VITE_SUPABASE_ANON_KEY
}

// Future database schema
const clientsTable = {
  id: 'uuid primary key',
  company_name: 'text not null',
  industry: 'text',
  contact_name: 'text not null',
  contact_email: 'text not null unique',
  created_at: 'timestamp with time zone default now()',
  // ... other fields
}
```

### **Authentication System**
```javascript
// Planned Google OAuth integration
const authConfig = {
  provider: 'google',
  redirectUrl: window.location.origin,
  scopes: ['email', 'profile']
}
```

### **API Layer**
```javascript
// Future API structure
const apiClient = {
  clients: {
    list: () => fetch('/api/clients'),
    create: (data) => fetch('/api/clients', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => fetch(`/api/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id) => fetch(`/api/clients/${id}`, { method: 'DELETE' })
  }
}
```

## 🛠️ Development Best Practices

### **Code Quality**
- **ESLint**: JavaScript linting rules
- **Prettier**: Code formatting (future addition)
- **Component Organization**: Single responsibility principle
- **Naming Conventions**: Consistent naming across codebase
- **Error Handling**: Try-catch blocks for data operations

### **Performance Guidelines**
- **Minimize Re-renders**: useMemo and useCallback optimization
- **Efficient Queries**: Optimize localStorage operations
- **Image Optimization**: Use appropriate formats and sizes
- **Bundle Size**: Monitor and minimize dependencies
- **Lazy Loading**: Load components when needed

### **Accessibility**
- **Semantic HTML**: Proper HTML elements
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG 2.1 compliance
- **Focus Management**: Proper focus indicators

## 📊 Technical Metrics

### **Bundle Analysis**
- **Main Bundle**: ~200KB (estimated)
- **Vendor Bundle**: ~300KB (React + dependencies)
- **Assets**: ~50KB (images and icons)
- **Total**: ~550KB initial load

### **Performance Targets**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3s

## 🚨 Technical Debt & Limitations

### **Current Limitations**
1. **localStorage Only**: No server-side persistence
2. **No Real-time Updates**: Manual refresh required
3. **Limited Search**: Basic filtering only
4. **No Offline Support**: Network dependency
5. **Single User**: No multi-user support

### **Technical Debt Items**
1. **Component Size**: Some components could be smaller
2. **Error Boundaries**: Missing error handling
3. **Loading States**: Inconsistent loading indicators
4. **Type Safety**: No TypeScript implementation
5. **Testing Coverage**: No automated tests

### **Migration Path**
1. **Phase 1**: Add TypeScript gradually
2. **Phase 2**: Implement proper testing
3. **Phase 3**: Add authentication system
4. **Phase 4**: Migrate to database backend
5. **Phase 5**: Add real-time features
