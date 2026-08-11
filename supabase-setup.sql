-- Create reviews table for customer submissions
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  photo_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_reviews_submitted_at ON reviews(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert reviews (pending status only)
CREATE POLICY "Allow public review submissions"
ON reviews
FOR INSERT
TO anon
WITH CHECK (
  status = 'pending' AND
  length(name) >= 2 AND
  length(text) >= 10 AND
  rating >= 1 AND rating <= 5
);

-- Policy: Allow anyone to read approved reviews
CREATE POLICY "Allow public to read approved reviews"
ON reviews
FOR SELECT
TO anon
USING (status = 'approved');

-- Policy: Allow authenticated service role to manage all reviews
CREATE POLICY "Allow service role full access"
ON reviews
TO service_role
USING (true)
WITH CHECK (true);

-- Create a simple rate limiting table (optional, for additional spam protection)
CREATE TABLE IF NOT EXISTS review_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_ip_submission UNIQUE (ip_address, submitted_at)
);

-- Enable RLS on rate limiting table
ALTER TABLE review_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to manage rate limiting
CREATE POLICY "Allow service role rate limit access"
ON review_submissions
TO service_role
USING (true)
WITH CHECK (true);

-- Clean up old rate limit entries (older than 1 hour)
-- This can be run as a scheduled job or manually
DELETE FROM review_submissions 
WHERE submitted_at < NOW() - INTERVAL '1 hour';

-- Create site_images table for managing website images by category
CREATE TABLE IF NOT EXISTS site_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('hero', 'menu', 'gallery-food', 'gallery-interior', 'gallery-events', 'chef', 'about')),
  file_name TEXT NOT NULL,
  file_size INTEGER,
  content_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_site_images_category ON site_images(category);

-- Create index on active status
CREATE INDEX IF NOT EXISTS idx_site_images_active ON site_images(is_active);

-- Enable Row Level Security
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to manage all site images
CREATE POLICY "Allow service role full access to site_images"
ON site_images
TO service_role
USING (true)
WITH CHECK (true);

-- Policy: Allow public to read active site images
CREATE POLICY "Allow public to read active site_images"
ON site_images
FOR SELECT
TO anon
USING (is_active = true);

-- Create reservations table for table booking requests
CREATE TABLE IF NOT EXISTS reservations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  party_size INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE
);

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- Create index on submitted_at for sorting
CREATE INDEX IF NOT EXISTS idx_reservations_submitted_at ON reservations(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to manage all reservations
CREATE POLICY "Allow service role full access to reservations"
ON reservations
TO service_role
USING (true)
WITH CHECK (true);