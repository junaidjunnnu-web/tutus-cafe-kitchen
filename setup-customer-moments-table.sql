-- Setup script for customer_moments table
-- Run this in your Supabase SQL editor to create the table

CREATE TABLE IF NOT EXISTS customer_moments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  photo_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at for sorting by most recent
CREATE INDEX IF NOT EXISTS idx_customer_moments_created_at ON customer_moments(created_at DESC);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE customer_moments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (for displaying on homepage)
CREATE POLICY "Allow public read access to customer_moments"
  ON customer_moments FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public insert (for customer uploads)
CREATE POLICY "Allow public insert to customer_moments"
  ON customer_moments FOR INSERT
  TO public
  WITH CHECK (true);

-- Note: Admin deletion is handled via service role key in the API, 
-- so no public delete policy is needed

-- Storage folder note: 
-- The moments will be uploaded to restaurant-images/moments/ folder
-- This folder structure is handled automatically by the upload API
