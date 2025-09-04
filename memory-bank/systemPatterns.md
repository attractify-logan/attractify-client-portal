# System Patterns - Attractify Client Portal

## 🏗️ Architecture Overview

### **System Design Pattern**
**Modular Component Architecture** with clear separation of concerns:
- **Presentation Layer**: React components with UI logic
- **Data Layer**: localStorage utilities for persistence
- **Business Logic**: Embedded within components (opportunity for extraction)
- **Styling Layer**: Tailwind CSS + Shadcn/UI components

### **Current Architecture Diagram**
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   UI Components │────│   App Router     │────│   Data Layer    │
│   (Shadcn/UI)   │    │  (React Router)  │    │  (localStorage) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Tailwind CSS   │    │   State Mgmt     │    │   Utility Libs  │
│   (Styling)     │    │  (React Hooks)   │    │   (localStorage)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🔧 Code Organization Patterns

### **Component Structure Pattern**
```javascript
// Standard component structure used throughout
function ComponentName() {
  // 1. State declarations
  const [state, setState] = useState(initialValue);
  
  // 2. Effect hooks
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // 3. Event handlers
  const handleAction = () => {
    // Action logic
  };
  
  // 4. Render logic
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

### **Data Management Pattern**
```javascript
// localStorage utilities pattern
export const dataFunction = () => {
  try {
    const data = localStorage.getItem('key');
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error('Error:', error);
    return defaultValue;
  }
};
```

### **Styling Pattern**
```javascript
// Consistent Tailwind + Shadcn/UI pattern
<div className="flex flex-col space-y-4 p-6 bg-white rounded-lg shadow-sm border">
  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
    Action Button
  </Button>
</div>
```

## 📁 File Organization Patterns

### **Directory Structure**
```
src/
├── components/           # All React components
│   ├── [Feature].jsx    # Main feature components
│   └── ui/              # Reusable UI components (Shadcn)
├── lib/                 # Utility libraries
│   ├── localStorage.js  # Data persistence
│   ├── utils.js        # General utilities
│   └── supabase.js     # Future database integration
├── hooks/              # Custom React hooks
└── assets/            # Static assets
```

### **Naming Conventions**
- **Components**: PascalCase (`ClientList.jsx`)
- **Files**: camelCase for utilities (`localStorage.js`)
- **CSS Classes**: kebab-case (Tailwind standard)
- **Variables**: camelCase (`clientData`)
- **Constants**: UPPER_CASE (`DEFAULT_STEPS`)

## 🔄 State Management Patterns

### **Local State Pattern**
```javascript
// Individual component state management
const [clients, setClients] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Standard loading/error/success pattern
const handleAction = async () => {
  setLoading(true);
  try {
    const result = await operation();
    setData(result);
    setError(null);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### **Data Flow Pattern**
```
User Action → Component Handler → localStorage Utility → State Update → UI Re-render
```

## 🎨 UI/UX Patterns

### **Consistent Layout Pattern**
```javascript
// Standard page layout structure
<div className="flex h-screen bg-gray-50">
  <Sidebar />
  <main className="flex-1 overflow-y-auto">
    <div className="container mx-auto p-6">
      {/* Page content */}
    </div>
  </main>
</div>
```

### **Form Pattern**
```javascript
// Standard form structure with validation
<form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <Label htmlFor="field">Field Name</Label>
    <Input 
      id="field" 
      value={value} 
      onChange={onChange}
      className="w-full"
    />
  </div>
  <Button type="submit" disabled={loading}>
    {loading ? 'Saving...' : 'Save'}
  </Button>
</form>
```

### **Card Pattern**
```javascript
// Consistent card layout for data display
<Card className="p-6">
  <CardHeader>
    <CardTitle>{title}</CardTitle>
    <CardDescription>{description}</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
</Card>
```

## 🔍 Data Patterns

### **Client Data Structure**
```javascript
// Standard client object pattern
const clientSchema = {
  id: "timestamp-based-id",
  company_name: "string",
  industry: "string",
  contact_name: "string", 
  contact_email: "email",
  phone: "string",
  website: "url",
  notes: "text",
  status: "onboarding|active|completed",
  health_score: "number (0-100)",
  created_at: "ISO date string",
  updated_at: "ISO date string",
  onboarding_steps: [
    {
      id: "number",
      title: "string",
      description: "string", 
      status: "pending|in_progress|completed",
      completed_at: "ISO date string",
      link: "url"
    }
  ]
}
```

### **localStorage Pattern**
```javascript
// Standard localStorage operations
const STORAGE_KEY = 'attractify_clients';

const getFromStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
```

## 🚀 Performance Patterns

### **Component Optimization**
```javascript
// Memoization pattern for expensive computations
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);

// Callback memoization for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

### **Lazy Loading Pattern**
```javascript
// Dynamic imports for code splitting (when needed)
const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## 🛠️ Development Patterns

### **Error Handling Pattern**
```javascript
// Consistent error handling approach
const handleOperation = async () => {
  try {
    const result = await riskyOperation();
    return { success: true, data: result };
  } catch (error) {
    console.error('Operation failed:', error);
    return { success: false, error: error.message };
  }
};
```

### **Validation Pattern**
```javascript
// Input validation pattern
const validateClient = (client) => {
  const errors = {};
  
  if (!client.company_name?.trim()) {
    errors.company_name = 'Company name is required';
  }
  
  if (!isValidEmail(client.contact_email)) {
    errors.contact_email = 'Valid email is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
```

## 🔄 Integration Patterns

### **External Service Pattern**
```javascript
// Pattern for external service integration
const integrateService = (serviceConfig) => {
  return {
    name: serviceConfig.name,
    url: serviceConfig.url,
    status: 'pending',
    setupSteps: serviceConfig.steps
  };
};
```

### **Event Handling Pattern**
```javascript
// Standard event handling pattern
const handleUserAction = (action, payload) => {
  switch (action) {
    case 'CREATE':
      return handleCreate(payload);
    case 'UPDATE':
      return handleUpdate(payload);
    case 'DELETE':
      return handleDelete(payload);
    default:
      console.warn(`Unknown action: ${action}`);
  }
};
```

## 📊 Analytics Pattern

### **Progress Calculation**
```javascript
// Standard progress calculation pattern
const calculateProgress = (steps) => {
  const completed = steps.filter(step => step.status === 'completed').length;
  const total = steps.length;
  return Math.round((completed / total) * 100);
};
```

## 🎯 Future Pattern Considerations

### **Scalability Patterns**
- **Component Composition**: Break down large components
- **Custom Hooks**: Extract reusable logic
- **Context API**: For global state when localStorage isn't sufficient
- **Service Layer**: Separate business logic from components

### **Security Patterns**
- **Input Sanitization**: Validate and sanitize all user inputs
- **Authentication**: JWT or OAuth patterns for user management
- **Data Validation**: Server-side validation when database is added

### **Testing Patterns**
- **Component Testing**: React Testing Library patterns
- **Integration Testing**: Full user workflow testing
- **Mock Patterns**: Mock external services and localStorage

## 🔧 Refactoring Opportunities

### **Current Technical Debt**
1. **Business Logic in Components**: Extract to custom hooks or services
2. **No Global State Management**: Consider Context API or state library
3. **Limited Error Boundaries**: Add error boundaries for better UX
4. **No Loading States**: Standardize loading indicators
5. **localStorage Limitations**: Plan migration to database

### **Recommended Patterns for Growth**
1. **Service Layer Pattern**: Abstract business logic
2. **Repository Pattern**: Standardize data access
3. **Observer Pattern**: For real-time updates
4. **Command Pattern**: For undo/redo functionality
5. **Factory Pattern**: For creating different client types
