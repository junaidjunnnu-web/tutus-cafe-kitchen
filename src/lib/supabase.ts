import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Storage bucket names
export const BUCKETS = {
  IMAGES: 'restaurant-images'
}

// Image categories
export const IMAGE_CATEGORIES = {
  HERO: 'hero',
  MENU: 'menu',
  GALLERY_FOOD: 'gallery-food',
  GALLERY_INTERIOR: 'gallery-interior',
  GALLERY_EVENTS: 'gallery-events',
  CHEF: 'chef',
  ABOUT: 'about'
} as const