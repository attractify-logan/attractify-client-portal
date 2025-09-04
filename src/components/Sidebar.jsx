import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  CheckSquare, 
  Video, 
  BarChart3, 
  Calendar, 
  HelpCircle,
  Menu,
  X,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const Sidebar = ({ isOpen, setIsOpen, currentUser = null }) => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Clients', href: '/clients', icon: Users },
    { name: 'Onboarding', href: '/onboarding', icon: CheckSquare },
    { name: 'Content Recording', href: '/recording', icon: Video },
    { name: 'Analytics Setup', href: '/analytics', icon: BarChart3 },
    { name: 'Timeline', href: '/timeline', icon: Calendar },
    { name: 'Support', href: '/support', icon: HelpCircle },
  ]

  // Generate initials from user name
  const getInitials = (name) => {
    if (!name) return 'U'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const displayName = currentUser?.name || 'User'
  const displayRole = currentUser?.role || 'Team Member'
  const initials = getInitials(displayName)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-md"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-center h-16 bg-slate-800 px-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/attractify-logo.png" 
              alt="Attractify Marketing" 
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-white text-lg font-bold">Client Portal</h1>
              <p className="text-gray-300 text-xs">Team Dashboard</p>
            </div>
          </div>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{initials}</span>
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-white text-sm font-medium truncate">{displayName}</p>
                <p className="text-gray-400 text-xs truncate">{displayRole}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default Sidebar

