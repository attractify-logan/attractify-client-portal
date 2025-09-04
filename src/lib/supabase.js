import { createClient } from '@supabase/supabase-js'

// Supabase configuration
// These would normally come from environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database helper functions
export const db = {
  // Client operations
  clients: {
    // Get all clients
    async getAll() {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          onboarding_steps(*),
          timeline_items(*),
          recording_sessions(*),
          analytics_setup(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },

    // Get client by ID
    async getById(id) {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          onboarding_steps(*),
          timeline_items(*),
          recording_sessions(*),
          analytics_setup(*)
        `)
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    },

    // Create new client
    async create(clientData) {
      const { data, error } = await supabase
        .from('clients')
        .insert([clientData])
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    // Update client
    async update(id, updates) {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    // Delete client
    async delete(id) {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
      
      if (error) throw error
    }
  },

  // Onboarding steps operations
  onboardingSteps: {
    async getByClientId(clientId) {
      const { data, error } = await supabase
        .from('onboarding_steps')
        .select('*')
        .eq('client_id', clientId)
        .order('step_order')
      
      if (error) throw error
      return data
    },

    async updateStatus(id, status) {
      const { data, error } = await supabase
        .from('onboarding_steps')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()
      
      if (error) throw error
      return data
    },

    async createDefault(clientId) {
      const defaultSteps = [
        { step_order: 1, title: 'Schedule Onboarding Call', description: 'Book initial consultation call with client', estimated_time: '5 minutes' },
        { step_order: 2, title: 'Website Access Setup', description: 'Obtain administrator access to client website', estimated_time: '10 minutes' },
        { step_order: 3, title: 'Social Media Integration', description: 'Connect Google & social media accounts', estimated_time: '15 minutes' },
        { step_order: 4, title: 'Recording Schedule Planning', description: 'Set up recurring content recording schedule', estimated_time: '10 minutes' },
        { step_order: 5, title: 'Google Analytics 4 Setup', description: 'Configure GA4 property and tracking', estimated_time: '20 minutes' },
        { step_order: 6, title: 'Google Tag Manager Setup', description: 'Install and configure GTM container', estimated_time: '25 minutes' },
        { step_order: 7, title: 'Final Verification', description: 'Test all integrations and tracking', estimated_time: '15 minutes' }
      ]

      const stepsWithClientId = defaultSteps.map(step => ({
        ...step,
        client_id: clientId,
        status: 'pending'
      }))

      const { data, error } = await supabase
        .from('onboarding_steps')
        .insert(stepsWithClientId)
        .select()
      
      if (error) throw error
      return data
    }
  },

  // Timeline operations
  timeline: {
    async getByClientId(clientId) {
      const { data, error } = await supabase
        .from('timeline_items')
        .select('*')
        .eq('client_id', clientId)
        .order('month', { ascending: true })
      
      if (error) throw error
      return data
    },

    async createDefault(clientId) {
      const defaultTimeline = [
        {
          month: 1,
          title: 'Setup & Orientation',
          description: 'Initial setup and client onboarding',
          status: 'pending',
          progress: 0
        },
        {
          month: 2,
          title: 'Content & Monitoring',
          description: 'Content creation and performance monitoring',
          status: 'pending',
          progress: 0
        },
        {
          month: 3,
          title: 'Analysis & Optimization',
          description: 'Traffic analysis and strategy optimization',
          status: 'pending',
          progress: 0
        }
      ]

      const timelineWithClientId = defaultTimeline.map(item => ({
        ...item,
        client_id: clientId
      }))

      const { data, error } = await supabase
        .from('timeline_items')
        .insert(timelineWithClientId)
        .select()
      
      if (error) throw error
      return data
    }
  },

  // Recording sessions operations
  recordingSessions: {
    async getByClientId(clientId) {
      const { data, error } = await supabase
        .from('recording_sessions')
        .select('*')
        .eq('client_id', clientId)
        .order('scheduled_date', { ascending: true })
      
      if (error) throw error
      return data
    },

    async create(sessionData) {
      const { data, error } = await supabase
        .from('recording_sessions')
        .insert([sessionData])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  },

  // Analytics setup operations
  analyticsSetup: {
    async getByClientId(clientId) {
      const { data, error } = await supabase
        .from('analytics_setup')
        .select('*')
        .eq('client_id', clientId)
        .single()
      
      if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
      return data
    },

    async createOrUpdate(clientId, setupData) {
      const { data, error } = await supabase
        .from('analytics_setup')
        .upsert([{ client_id: clientId, ...setupData }])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  },

  // Activity log operations
  activities: {
    async getRecent(limit = 10) {
      const { data, error } = await supabase
        .from('activity_log')
        .select(`
          *,
          clients(name)
        `)
        .order('created_at', { ascending: false })
        .limit(limit)
      
      if (error) throw error
      return data
    },

    async create(activityData) {
      const { data, error } = await supabase
        .from('activity_log')
        .insert([activityData])
        .select()
        .single()
      
      if (error) throw error
      return data
    }
  }
}

// Real-time subscriptions
export const subscriptions = {
  // Subscribe to client changes
  subscribeToClients(callback) {
    return supabase
      .channel('clients')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, callback)
      .subscribe()
  },

  // Subscribe to onboarding step changes
  subscribeToOnboardingSteps(clientId, callback) {
    return supabase
      .channel(`onboarding_steps_${clientId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'onboarding_steps',
        filter: `client_id=eq.${clientId}`
      }, callback)
      .subscribe()
  }
}

export default supabase

