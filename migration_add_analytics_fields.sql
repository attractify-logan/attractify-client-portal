-- Migration to add Google Analytics fields to clients table
-- Run this in your Supabase SQL editor

-- Add analytics-related columns to clients table
ALTER TABLE clients
ADD COLUMN IF NOT EXISTS google_analytics_id TEXT,
ADD COLUMN IF NOT EXISTS analytics_setup_complete BOOLEAN DEFAULT FALSE;

-- Create analytics_setup table if it doesn't exist
CREATE TABLE IF NOT EXISTS analytics_setup (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  measurement_id TEXT,
  website_url TEXT,
  enhanced_measurement BOOLEAN DEFAULT TRUE,
  cross_domain_tracking BOOLEAN DEFAULT FALSE,
  setup_status TEXT DEFAULT 'pending',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add unique constraint to prevent duplicate analytics setups per client
CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_setup_client_id
ON analytics_setup(client_id);

-- Enable RLS (Row Level Security)
ALTER TABLE analytics_setup ENABLE ROW LEVEL SECURITY;

-- Create policies for analytics_setup table
CREATE POLICY "Users can view their own analytics setups"
ON analytics_setup FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own analytics setups"
ON analytics_setup FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own analytics setups"
ON analytics_setup FOR UPDATE
USING (auth.uid() IS NOT NULL);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_analytics_setup_updated_at
    BEFORE UPDATE ON analytics_setup
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
