import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import OnboardingChecklist from './components/OnboardingChecklist'
import ContentRecording from './components/ContentRecording'
import AnalyticsSetup from './components/AnalyticsSetup'
import Timeline from './components/Timeline'
import Support from './components/Support'
import ClientCreationForm from './components/ClientCreationForm'
import ClientList from './components/ClientList'
import { localStorageDB } from './lib/localStorage'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // State for managing clients and data
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedClientId, setSelectedClientId] = useState(null)
  const [showClientForm, setShowClientForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    name: 'User',
    email: 'user@attractifymarketing.com',
    role: 'Marketing Manager'
  })

  // Load clients on app start
  useEffect(() => {
    loadClients()
  }, [])

  const loadClients = async () => {
    try {
      setLoading(true)
      const result = await localStorageDB.getClients()
      if (result.data) {
        setClients(result.data)
      }
    } catch (error) {
      console.error('Error loading clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleClientSelect = (clientId) => {
    setSelectedClientId(clientId)
  }

  const handleClientCreated = (newClient) => {
    // Add to local state for immediate UI update
    setClients(prev => [newClient, ...prev])
    setShowClientForm(false)
    setEditingClient(null)
    
    // Show success message
    alert(`${newClient.company_name} added successfully!`)
  }

  const handleClientUpdated = (updatedClient) => {
    // Update local state
    setClients(prev => 
      prev.map(client => 
        client.id === updatedClient.id ? updatedClient : client
      )
    )
    setShowClientForm(false)
    setEditingClient(null)
    
    // Show success message
    alert(`${updatedClient.company_name} updated successfully!`)
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setShowClientForm(true)
  }

  const handleCancelForm = () => {
    setShowClientForm(false)
    setEditingClient(null)
  }

  const handleDeleteClient = async (clientId) => {
    const client = clients.find(c => c.id === clientId)
    if (!client) return

    if (confirm(`Are you sure you want to delete ${client.company_name}?`)) {
      try {
        await localStorageDB.deleteClient(clientId)
        setClients(prev => prev.filter(c => c.id !== clientId))
        alert('Client deleted successfully')
      } catch (error) {
        console.error('Error deleting client:', error)
        alert('Failed to delete client')
      }
    }
  }

  // Calculate dashboard stats
  const calculateStats = () => {
    return {
      totalClients: clients.length,
      activeOnboarding: clients.filter(c => c.status === 'onboarding').length,
      completedThisMonth: clients.filter(c => {
        const thisMonth = new Date().getMonth()
        const clientMonth = new Date(c.updated_at).getMonth()
        return c.status === 'completed' && clientMonth === thisMonth
      }).length,
      averageHealthScore: clients.length > 0 
        ? Math.round(clients.reduce((sum, c) => sum + (c.health_score || 75), 0) / clients.length)
        : 75
    }
  }

  // Client Management Page Component
  const ClientManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
        <button
          onClick={() => setShowClientForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <span>+</span>
          <span>Add New Client</span>
        </button>
      </div>

      {showClientForm ? (
        <ClientCreationForm
          client={editingClient}
          onClientCreated={editingClient ? handleClientUpdated : handleClientCreated}
          onCancel={handleCancelForm}
        />
      ) : (
        <ClientList 
          clients={clients}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-lg font-medium text-gray-900">Loading Employee Portal...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait while we load your data</div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen}
          currentUser={currentUser}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <div className="container mx-auto px-6 py-8">
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Dashboard 
                      currentUser={currentUser}
                      clients={clients}
                      stats={calculateStats()}
                      onAddClient={() => setShowClientForm(true)}
                    />
                  } 
                />
                <Route 
                  path="/onboarding" 
                  element={
                    <OnboardingChecklist 
                      clients={clients}
                      selectedClientId={selectedClientId}
                      onClientSelect={handleClientSelect}
                    />
                  } 
                />
                <Route 
                  path="/recording" 
                  element={
                    <ContentRecording 
                      clients={clients}
                    />
                  } 
                />
                <Route 
                  path="/analytics" 
                  element={
                    <AnalyticsSetup 
                      clients={clients}
                      selectedClientId={selectedClientId}
                      onClientSelect={handleClientSelect}
                    />
                  } 
                />
                <Route 
                  path="/timeline" 
                  element={
                    <Timeline 
                      clients={clients}
                      selectedClientId={selectedClientId}
                      onClientSelect={handleClientSelect}
                    />
                  } 
                />
                <Route path="/support" element={<Support />} />
                
                {/* Client Management Routes */}
                <Route path="/clients" element={<ClientManagement />} />
                <Route path="/clients/new" element={<ClientManagement />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App

