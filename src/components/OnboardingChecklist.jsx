import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Calendar,
  Globe,
  Share2,
  Video,
  BarChart3,
  Settings,
  ExternalLink,
  Play,
  Users,
  Plus,
  ChevronDown
} from 'lucide-react';
import { localStorageDB } from '../lib/supabase';

const OnboardingChecklist = ({ clients = [], selectedClientId = null, onClientSelect = () => {} }) => {
  const [currentClientId, setCurrentClientId] = useState(selectedClientId);
  const [currentClient, setCurrentClient] = useState(null);
  const [onboardingSteps, setOnboardingSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Icon mapping for steps
  const iconMap = {
    Calendar,
    Globe,
    Share2,
    Video,
    BarChart3,
    Settings,
    CheckCircle
  };

  // Load client data when client is selected
  useEffect(() => {
    if (currentClientId) {
      loadClientOnboardingData(currentClientId);
    } else {
      setCurrentClient(null);
      setOnboardingSteps([]);
    }
  }, [currentClientId, clients]);

  const loadClientOnboardingData = async (clientId) => {
    setLoading(true);
    try {
      // Initialize onboarding steps if they don't exist
      await localStorageDB.initializeOnboardingSteps(clientId);
      
      // Get updated client data
      const result = await localStorageDB.getClients();
      if (result.data) {
        const client = result.data.find(c => c.id === clientId);
        if (client) {
          setCurrentClient(client);
          setOnboardingSteps(client.onboarding_steps || []);
        }
      }
    } catch (error) {
      console.error('Error loading client onboarding data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClientChange = (clientId) => {
    setCurrentClientId(clientId);
    setDropdownOpen(false);
    onClientSelect(clientId);
  };

  const handleStepStatusChange = async (stepId, newStatus) => {
    if (!currentClientId) return;

    setLoading(true);
    try {
      const result = await localStorageDB.updateOnboardingStep(currentClientId, stepId, newStatus);
      if (result.data) {
        setCurrentClient(result.data);
        setOnboardingSteps(result.data.onboarding_steps || []);
      }
    } catch (error) {
      console.error('Error updating step status:', error);
      alert('Failed to update step status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Completed</span>;
      case 'in-progress':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>In Progress</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Pending</span>;
    }
  };

  const completedSteps = onboardingSteps.filter(step => step.status === 'completed').length;
  const progressPercentage = onboardingSteps.length > 0 ? Math.round((completedSteps / onboardingSteps.length) * 100) : 0;

  if (clients.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onboarding Checklist</h1>
            <p className="text-gray-600 mt-1">Complete client setup step by step</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Clients Yet</h3>
          <p className="text-gray-600 mb-6">
            Add your first client to start the onboarding process.
          </p>
          <button
            onClick={() => window.location.href = '/clients'}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Add First Client</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Checklist</h1>
          <p className="text-gray-600 mt-1">Complete client setup step by step</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progressPercentage}%</div>
          <div className="text-sm text-gray-600">Complete</div>
        </div>
      </div>

      {/* Client Selection and Progress Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Client Progress</h2>
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Select Client:</label>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-64 bg-white border border-gray-300 rounded-lg px-3 py-2 text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className="text-gray-900">
                    {currentClient ? currentClient.company_name : 'Choose a client'}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                {dropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                    {clients.map((client) => (
                      <button
                        key={client.id}
                        onClick={() => handleClientChange(client.id)}
                        className="w-full px-3 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="font-medium text-gray-900">{client.company_name}</div>
                        <div className="text-sm text-gray-500">{client.contact_email}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => window.location.href = '/clients'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Client</span>
          </button>
        </div>
        
        {currentClient && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">{completedSteps} of {onboardingSteps.length} steps completed</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Started</span>
              <span>In Progress</span>
              <span>Complete</span>
            </div>
          </div>
        )}
      </div>

      {/* Onboarding Steps */}
      {currentClient ? (
        <div className="space-y-4">
          {loading && (
            <div className="text-center py-4">
              <div className="text-gray-600">Loading...</div>
            </div>
          )}
          
          {!loading && onboardingSteps.map((step, index) => {
            const IconComponent = iconMap[step.icon] || Settings;
            const isActive = step.status === 'in-progress';
            
            return (
              <div key={step.id} className={`bg-white rounded-lg shadow-sm p-6 transition-all ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getStatusIcon(step.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <IconComponent className="mr-2 h-5 w-5 text-gray-600" />
                        Step {step.id}: {step.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(step.status)}
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                          {step.estimatedTime}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{step.description}</p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <p className="text-sm text-gray-700">{step.details}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {step.status === 'pending' && (
                        <button
                          onClick={() => handleStepStatusChange(step.id, 'in-progress')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                          disabled={loading}
                        >
                          <Play className="h-4 w-4" />
                          <span>Start Step</span>
                        </button>
                      )}
                      
                      {step.status === 'in-progress' && (
                        <button
                          onClick={() => handleStepStatusChange(step.id, 'completed')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                          disabled={loading}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark Complete</span>
                        </button>
                      )}
                      
                      {step.link && (
                        <a
                          href={step.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Open Tool</span>
                        </a>
                      )}
                      
                      {step.status === 'completed' && (
                        <button
                          onClick={() => handleStepStatusChange(step.id, 'in-progress')}
                          className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                          disabled={loading}
                        >
                          <Clock className="h-4 w-4" />
                          <span>Reopen</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Client</h3>
          <p className="text-gray-600">
            Choose a client from the dropdown above to view their onboarding progress.
          </p>
        </div>
      )}

      {/* Next Steps */}
      {currentClient && onboardingSteps.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-blue-900">Next Steps</h2>
            <p className="text-blue-700">
              Recommended actions to continue the onboarding process
            </p>
          </div>
          <div className="space-y-3">
            {onboardingSteps
              .filter(step => step.status === 'pending')
              .slice(0, 3)
              .map((step, index) => (
                <div key={step.id} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm text-blue-900">{step.title}</span>
                </div>
              ))}
          </div>
          
          {onboardingSteps.filter(step => step.status === 'pending').length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-200">
              <button
                onClick={() => {
                  const nextStep = onboardingSteps.find(step => step.status === 'pending');
                  if (nextStep) {
                    handleStepStatusChange(nextStep.id, 'in-progress');
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                disabled={loading}
              >
                Continue to Next Step
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnboardingChecklist;
