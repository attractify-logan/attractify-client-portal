// Simple local storage utility for client data
// This replaces Supabase for now to make the app work immediately

const CLIENTS_KEY = 'employee_portal_clients';

export const localStorageDB = {
  // Get all clients
  async getClients() {
    try {
      const clients = localStorage.getItem(CLIENTS_KEY);
      return { data: clients ? JSON.parse(clients) : [], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Add a new client
  async addClient(clientData) {
    try {
      const clients = await this.getClients();
      if (clients.error) throw clients.error;

      const newClient = {
        ...clientData,
        id: Date.now().toString(), // Simple ID generation
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const updatedClients = [...clients.data, newClient];
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
      
      return { data: newClient, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update a client
  async updateClient(id, updates) {
    try {
      const clients = await this.getClients();
      if (clients.error) throw clients.error;

      const updatedClients = clients.data.map(client => 
        client.id === id 
          ? { ...client, ...updates, updated_at: new Date().toISOString() }
          : client
      );

      localStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
      
      const updatedClient = updatedClients.find(c => c.id === id);
      return { data: updatedClient, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Delete a client
  async deleteClient(id) {
    try {
      const clients = await this.getClients();
      if (clients.error) throw clients.error;

      const updatedClients = clients.data.filter(client => client.id !== id);
      localStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
      
      return { data: null, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update onboarding step status for a client
  async updateOnboardingStep(clientId, stepId, status) {
    try {
      const clients = await this.getClients();
      if (clients.error) throw clients.error;

      const updatedClients = clients.data.map(client => {
        if (client.id === clientId) {
          const onboardingSteps = client.onboarding_steps || this.getDefaultOnboardingSteps();
          const updatedSteps = onboardingSteps.map(step => 
            step.id === stepId 
              ? { ...step, status, completed_at: status === 'completed' ? new Date().toISOString() : null }
              : step
          );
          
          return {
            ...client,
            onboarding_steps: updatedSteps,
            updated_at: new Date().toISOString()
          };
        }
        return client;
      });

      localStorage.setItem(CLIENTS_KEY, JSON.stringify(updatedClients));
      
      const updatedClient = updatedClients.find(c => c.id === clientId);
      return { data: updatedClient, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get default onboarding steps template
  getDefaultOnboardingSteps() {
    return [
      {
        id: 1,
        title: 'Schedule Onboarding Call',
        description: 'Book initial consultation call with client',
        icon: 'Calendar',
        estimatedTime: '5 minutes',
        link: 'https://calendly.com/admin-attractifymarketing/onboarding-call',
        details: 'Use Calendly to schedule the initial onboarding call. This call will cover project scope, timeline, and expectations.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 2,
        title: 'Website Access Setup',
        description: 'Obtain administrator access to client website',
        icon: 'Globe',
        estimatedTime: '10 minutes',
        details: 'Request admin access to client website. Email should be admin@attractifymarketing.com. If non-admin access is provided, additional setup guidance will be required.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 3,
        title: 'Social Media Integration',
        description: 'Connect Google & social media accounts',
        icon: 'Share2',
        estimatedTime: '15 minutes',
        link: 'https://app.admatic.io/#/connect/tk88dkkt49',
        details: 'Connect client\'s Google and social media accounts through Admatic.io. If accounts don\'t exist, assist with creation during the onboarding call.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 4,
        title: 'Recording Schedule Planning',
        description: 'Set up recurring content recording schedule',
        icon: 'Video',
        estimatedTime: '10 minutes',
        details: 'Choose from: 1 hour weekly, 2 hours bi-weekly, or 4 hours monthly. Schedule should be committed to and added to calendar during onboarding call.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 5,
        title: 'Google Analytics 4 Setup',
        description: 'Configure GA4 property and tracking',
        icon: 'BarChart3',
        estimatedTime: '20 minutes',
        details: 'Create GA4 property, configure data streams, install tracking code, and set up enhanced measurement features.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 6,
        title: 'Google Tag Manager Setup',
        description: 'Install and configure GTM container',
        icon: 'Settings',
        estimatedTime: '25 minutes',
        details: 'Create GTM container, install tracking codes, configure GA4 tags, and set up conversion tracking.',
        status: 'pending',
        completed_at: null
      },
      {
        id: 7,
        title: 'Final Verification',
        description: 'Test all integrations and tracking',
        icon: 'CheckCircle',
        estimatedTime: '15 minutes',
        details: 'Verify all tracking codes are working, test data flow, and confirm all integrations are functioning properly.',
        status: 'pending',
        completed_at: null
      }
    ];
  },

  // Initialize onboarding steps for a client if they don't exist
  async initializeOnboardingSteps(clientId) {
    try {
      const clients = await this.getClients();
      if (clients.error) throw clients.error;

      const client = clients.data.find(c => c.id === clientId);
      if (!client) throw new Error('Client not found');

      if (!client.onboarding_steps) {
        const defaultSteps = this.getDefaultOnboardingSteps();
        await this.updateClient(clientId, { onboarding_steps: defaultSteps });
      }

      return { data: true, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

