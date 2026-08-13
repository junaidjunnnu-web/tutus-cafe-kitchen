export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  is_veg: boolean
  image_url?: string
  featured?: boolean
}

export interface Review {
  id: string
  name: string
  rating: number
  text: string
  date: string
  image_url?: string
  photo_url?: string
  verified?: boolean
  status?: 'pending' | 'approved' | 'rejected'
  submitted_at?: string
  approved_at?: string
  rejected_at?: string
  rejection_reason?: string
}

export interface GalleryImage {
  id: string
  url: string
  category: 'food' | 'interior' | 'events'
  caption?: string
}

export interface Reservation {
  name: string
  phone: string
  date: string
  time: string
  party_size: number
  special_requests?: string
}

export interface RestaurantInfo {
  name: string
  address: string
  phone: string
  additional_phones?: string[]
  email: string
  hours: {
    [key: string]: string
  }
  price_range: string
  rating: number
  review_count: number
  service_options: string[]
}