import { MenuItem, Review, RestaurantInfo } from '@/types'

export const RESTAURANT_INFO: RestaurantInfo = {
  name: "Tutu's Cafe and Kitchen",
  address: "Madikeri Road, Somwarpet, Karnataka 571236",
  phone: "9379978866",
  additional_phones: ["9019912901", "9448712901"],
  email: "tutuscafe2022@gmail.com",
  hours: {
    monday: "11:00 AM - 11:00 PM",
    tuesday: "11:00 AM - 11:00 PM",
    wednesday: "11:00 AM - 11:00 PM",
    thursday: "11:00 AM - 11:00 PM",
    friday: "11:00 AM - 11:00 PM",
    saturday: "11:00 AM - 11:00 PM",
    sunday: "11:00 AM - 11:00 PM"
  },
  price_range: "₹200–400 per person",
  rating: 4.3,
  review_count: 340,
  service_options: ["Dine-in", "Kerbside Pickup", "No-Contact Delivery"]
}

export const USP_ITEMS = [
  { icon: "🍃", text: "Authentic North Indian Cuisine" },
  { icon: "👨‍🍳", text: "Expert Tandoor Specialists" },
  { icon: "🌿", text: "Fresh Local Ingredients" },
  { icon: "👨‍👩‍👧‍👦", text: "Family-Friendly Atmosphere" }
]

export const MENU_CATEGORIES = [
  "Starters",
  "Main Course",
  "Biryani & Rice",
  "Breads",
  "Desserts",
  "Beverages"
]

// Sample menu data - will be replaced with Supabase data
export const SAMPLE_MENU_ITEMS: MenuItem[] = [
  {
    id: "1",
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces",
    price: 320,
    category: "Main Course",
    is_veg: false,
    featured: true
  },
  {
    id: "2",
    name: "Paneer Butter Masala",
    description: "Rich and creamy tomato gravy with soft paneer cubes",
    price: 280,
    category: "Main Course",
    is_veg: true,
    featured: true
  },
  {
    id: "3",
    name: "Chicken Lollipop",
    description: "Crispy fried chicken wings with Indo-Chinese seasoning",
    price: 240,
    category: "Starters",
    is_veg: false,
    featured: true
  },
  {
    id: "4",
    name: "Garlic Naan",
    description: "Soft bread topped with garlic butter",
    price: 60,
    category: "Breads",
    is_veg: true
  },
  {
    id: "5",
    name: "Mutton Biryani",
    description: "Aromatic basmati rice with tender mutton pieces",
    price: 350,
    category: "Biryani & Rice",
    is_veg: false,
    featured: true
  },
  {
    id: "6",
    name: "Veg Biryani",
    description: "Fragrant rice with mixed vegetables and aromatic spices",
    price: 220,
    category: "Biryani & Rice",
    is_veg: true
  },
  {
    id: "7",
    name: "Tandoori Chicken",
    description: "Marinated chicken grilled in traditional tandoor",
    price: 380,
    category: "Starters",
    is_veg: false
  },
  {
    id: "8",
    name: "Gulab Jamun",
    description: "Soft milk dumplings soaked in sugar syrup",
    price: 120,
    category: "Desserts",
    is_veg: true
  }
]

// Sample reviews - will be replaced with Supabase data
export const SAMPLE_REVIEWS: Review[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    rating: 5,
    text: "The butter chicken here is absolutely amazing! Best I've had in Coorg region. The staff is very friendly and the ambiance is perfect for family dinners.",
    date: "2024-01-15",
    verified: true
  },
  {
    id: "2",
    name: "Priya Kumar",
    rating: 4,
    text: "Great food and wonderful service. The garlic naan is a must-try. Prices are reasonable for the quality you get.",
    date: "2024-01-10",
    verified: true
  },
  {
    id: "3",
    name: "Arun Patel",
    rating: 5,
    text: "Excellent tandoori dishes and very clean restaurant. The mutton biryani is full of flavor. Highly recommend for authentic North Indian cuisine.",
    date: "2024-01-05",
    verified: true
  }
]