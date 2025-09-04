import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Users, 
  TrendingUp,
  Plus,
  FileText,
  Bell
} from 'lucide-react';

const Dashboard = ({ currentUser = null, clients = [], stats = null, onAddClient }) => {
  const [progress, setProgress] = useState(0);

  // Calculate progress based on real data
  useEffect(() => {
    if (clients.length > 0) {
      const totalSteps = clients.reduce((acc, client) => acc + 7, 0); // 7 steps per client
      const completedSteps = clients.reduce((acc, client) => {
        const completed = client.onboarding_steps?.filter(step => step.status === 'completed').length || 0;
        return acc + completed;
      }, 0);
      const calculatedProgress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;
      setProgress(calculatedProgress);
    }
  }, [clients]);

  // Calculate real stats from client data
  const calculateStats = () => {
    const activeOnboarding = clients.filter(c => c.status === 'onboarding').length;
    const completedThisMonth = clients.filter(c => {
      const thisMonth = new Date().getMonth();
      const clientMonth = new Date(c.updated_at).getMonth();
      return c.status === 'completed' && clientMonth === thisMonth;
    }).length;
    const averageHealthScore = clients.length > 0 
      ? Math.round(clients.reduce((sum, c) => sum + (c.health_score || 75), 0) / clients.length)
      : 75;

    return {
      totalClients: clients.length,
      activeOnboarding,
      completedThisMonth,
      averageHealthScore
    };
  };

  const displayStats = stats || calculateStats();
  const displayName = currentUser?.name || 'User';
  const recentClients = clients.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Attractify Client Portal!
            </h1>
            <p className="text-gray-600 mt-2">
              {clients.length > 0 
                ? `Managing ${clients.length} client${clients.length !== 1 ? 's' : ''} today.`
                : 'Ready to start managing your clients with AI-powered marketing strategies.'
              }
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onAddClient}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>New Client</span>
            </button>
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">Overall Progress</h2>
          <p className="text-blue-100">
            {clients.length > 0 
              ? "Current onboarding completion rate across all clients"
              : "No active clients - add your first client to get started"
            }
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-3">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{progress}%</div>
            <div className="text-sm text-blue-100">Complete</div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{displayStats.totalClients}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Onboarding</p>
              <p className="text-2xl font-bold text-gray-900">{displayStats.activeOnboarding}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed This Month</p>
              <p className="text-2xl font-bold text-gray-900">{displayStats.completedThisMonth}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Health Score</p>
              <p className="text-2xl font-bold text-gray-900">{displayStats.averageHealthScore}%</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Clients */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Clients</h2>
            <button
              onClick={() => window.location.href = '/clients'}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>

          {recentClients.length > 0 ? (
            <div className="space-y-4">
              {recentClients.map((client) => (
                <div key={client.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{client.company_name}</p>
                    <p className="text-sm text-gray-600">{client.contact_email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      client.status === 'completed' ? 'bg-green-100 text-green-800' :
                      client.status === 'onboarding' ? 'bg-yellow-100 text-yellow-800' :
                      client.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {client.status}
                    </span>
                    <div className="text-xs text-gray-500">
                      {new Date(client.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No clients yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first client.
              </p>
              <button
                onClick={onAddClient}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Add First Client
              </button>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button
              onClick={() => window.location.href = '/timeline'}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All →
            </button>
          </div>

          {clients.length > 0 ? (
            <div className="space-y-4">
              {clients.slice(0, 3).map((client) => (
                <div key={client.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {client.company_name} was added to the system
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(client.created_at).toLocaleDateString()} at {new Date(client.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No recent activity</h3>
              <p className="mt-1 text-sm text-gray-500">
                Activity will appear here as you work with clients.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <p className="text-gray-600">Common tasks and shortcuts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={onAddClient}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg h-20 flex flex-col items-center justify-center space-y-2"
          >
            <Plus className="h-6 w-6" />
            <span>Add New Client</span>
          </button>
          <button
            onClick={() => window.location.href = '/onboarding'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg h-20 flex flex-col items-center justify-center space-y-2"
          >
            <CheckCircle className="h-6 w-6" />
            <span>Start Onboarding</span>
          </button>
          <button
            onClick={() => window.location.href = '/analytics'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg h-20 flex flex-col items-center justify-center space-y-2"
          >
            <TrendingUp className="h-6 w-6" />
            <span>Setup Analytics</span>
          </button>
          <button
            onClick={() => window.location.href = '/recording'}
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 p-4 rounded-lg h-20 flex flex-col items-center justify-center space-y-2"
          >
            <Calendar className="h-6 w-6" />
            <span>Schedule Recording</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

