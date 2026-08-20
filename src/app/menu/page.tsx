'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const menuData = {
  "SOUP VEG": ["Tomato", "Veg Hot 'n' Sour", "Veg Manchow", "Veg Sweet Corn"],
  "SOUP NON-VEG": ["Chicken Garlic", "Chicken Hot 'n' Sour", "Chicken Manchow", "Chicken Sweet Corn"],
  "TANDOORI STARTER VEG": ["Aloo Tikka", "Paneer Tikka"],
  "TANDOORI STARTER NON-VEG": ["Chicken Hariyali Kebab", "Chicken Kalmi Kebab", "Chicken Malai Kebab", "Chicken Tandoori (Half)", "Chicken Tandoori (Full)", "Chicken Shole Kebab", "Chicken Tikka", "Fish Tikka", "Prawn Tikka"],
  "STARTER VEG": ["French Fry", "French Fry Piri Piri", "Onion Pakoda", "Paneer Pakoda", "Potato Chilli", "Potato Manchurian", "Paneer Chilli", "Paneer Manchurian", "Baby Corn Chilli", "Baby Corn Manchurian", "Gobi Chilli", "Gobi Manchurian", "Mushroom Chilli", "Mushroom Manchurian", "Peanut Masala", "Paneer Pepper", "Veg Hara Bhara Kebab", "Veg Spring Roll", "Tutu's Spl. Veg Ginger"],
  "STARTER NON-VEG": ["Chicken 65 (B)", "Chicken 65 (B/L)", "Chicken Chilli (B)", "Chicken Chilli (B/L)", "Chicken Fry (B)", "Chicken Fry (B/L)", "Chicken Lemon (B)", "Chicken Lemon (B/L)", "Chicken Lollipop", "Chicken Manchurian (B)", "Chicken Manchurian (B/L)", "Chicken Oil Fry Kebab (B)", "Chicken Oil Fry Kebab (B/L)", "Chicken Spring Roll", "Egg Bhurji", "Egg Chilli", "Egg Omlet", "Egg Pakoda", "Fish Chilli", "Fish Fry", "Fish Manchurian", "Mutton Fry (B)", "Mutton Pepper (B)", "Prawn Chilli", "Prawn Fry", "Prawn Manchurian"],
  "BIHARI": ["Litti Chokha", "Sattu Paratha", "Sattu Lassi"],
  "MAIN COURSE VEG": ["Alu Gobi / Alu Mutter Masala", "Alu Gobi Mutter Masala", "Alu Jeera/Alu Palak", "Alu Tomato", "Baby Corn Masala", "Bhindi Masala", "Capsicum Masala", "Green Peas Masala", "Kadai Paneer", "Kadai Veg", "Kaju Masala", "Kadhi Pakoda", "Mix Veg Curry", "Mushroom Masala", "Palak Paneer", "Paneer Butter Masala", "Plain Palak", "Dal Makhani", "Dal Tadka Yellow", "Tutu's Spl. Malai Kofta", "Tutu's Veg Kofta", "Tutu's Veg Hyderabadi", "Tutu's Veg Kolhapuri"],
  "MAIN COURSE NON-VEG": ["Chicken Butter Masala (B)", "Chicken Butter Masala (B/L)", "Chicken Curry (B)", "Chicken Curry (B/L)", "Chicken Kadai (B)", "Chicken Kadai (B/L)", "Chicken Kalimirch (B)", "Chicken Kalimirch (B/L)", "Chicken Masala (B)", "Chicken Masala (B/L)", "Tutu's Chicken Patiyala (B)", "Tutu's Chicken Patiyala (B/L)", "Egg Masala", "Egg Curry", "Fish Curry", "Fish Masala", "Mutton Curry (B)", "Mutton Masala (B)", "Mutton Rogan Josh Tutu's Spl.", "Prawn Curry", "Prawn Masala"],
  "INDIAN BREAD": ["Tawa Roti", "Tawa Butter Roti", "Tandoori Roti", "Tandoori Butter Roti", "Chilli Butter Tandoori Roti", "Aloo Paratha", "Chilli Paratha", "Laccha Paratha", "Methi Paratha", "Paneer Paratha", "Sattu Paratha", "Stuffed Paratha", "Naan", "Butter Naan", "Garlic Naan", "Chilli Garlic Butter Naan", "Paneer Naan", "Stuffed Naan", "Kulcha", "Stuffed Kulcha", "Alu Kulcha", "Butter Kulcha", "Onion Kulcha", "Garlic Kulcha", "Masala Kulcha", "Chilli Garlic Butter Kulcha"],
  "INDIAN RICE VEG": ["Curd Rice", "Dal Khichdi", "Ghee Rice/Jeera Rice", "Green Peas Pulav", "Lemon Rice", "Plain Rice", "Veg Kushka Rice", "Veg Pulav", "Mushroom Biryani", "Paneer Biryani", "Veg Biryani"],
  "INDIAN RICE NON-VEG": ["Chicken Biryani (B)", "Chicken Biryani (B/L)", "Egg Biryani", "Mutton Biryani (B)", "Non-Veg Kushka Rice"],
  "CHINESE RICE AND NOODLES VEG": ["Paneer Noodle", "Paneer Schezwan Noodle", "Veg Hakka Noodle", "Veg Noodle", "Veg Schezwan Noodle", "Mushroom Fried Rice", "Paneer Fried Rice", "Paneer Schezwan Fried Rice", "Veg Fried Rice", "Veg Schezwan Fried Rice"],
  "CHINESE RICE AND NOODLES NON-VEG": ["Chicken Noodle", "Chicken Schezwan Noodle", "Egg Noodle", "Egg Schezwan Noodle", "Mix Non-Veg Noodle", "Chicken Fried Rice", "Chicken Schezwan Fried Rice", "Egg Fried Rice", "Egg Schezwan Fried Rice", "Mix Non-Veg Fried Rice"],
  "SIZZLER VEG": ["Veg Sizzler", "Paneer Sizzler"],
  "SIZZLER NON-VEG": ["Chicken Sizzler"],
  "SALAD": ["Green Salad", "Cucumber Salad", "Onion Salad"],
  "RAITA": ["Mix Raita", "Curd", "Boondi Raita"],
  "PAPAD": ["Papad Dry/Fry", "Masala Papad"],
  "COOL BEVERAGE": ["Butter Milk", "Soft Drink", "Fresh Lime Soda", "Fresh Lime Water", "Lassi Salt/Sweet", "Lassi Gud Ka (Jaggery)", "Masala Pepsi/Sattu Lassi", "Mineral Water 1 LT"],
  "FLAVOURED SODA": ["Banana/Kiwi/Litchi/Mango", "Black Current/Blueberry", "Butter Scotch/Guava/Orange", "Pineapple/Strawberry/Chikoo"],
  "FLAVOURED MILK SHAKE": ["Banana/Kiwi/Litchi/Mango", "Black Current/Blueberry", "Butter Scotch/Guava/Orange", "Pineapple/Strawberry/Chikoo"],
  "SWEET": ["Gulab Jamun", "Shahi Tukda", "Bihari Sattu Peda", "Arun Ice Cream"]
}

export default function MenuPage() {
  const [menuImages, setMenuImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const response = await fetch('/api/images?category=menu')
        const data = await response.json()
        if (data.success) {
          setMenuImages(data.images)
        }
      } catch (error) {
        console.error('Failed to fetch menu images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuImages()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1" style={{ backgroundColor: '#9B9992' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-xl text-gray-200">
              Authentic North Indian cuisine crafted with passion
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Text Menu */}
          <div className="rounded-xl shadow-sm border border-[#E4E4E7] p-8 mb-12" style={{ backgroundColor: '#141414' }}>
            <h2 className="text-2xl font-bold text-white mb-6">Full Menu</h2>
            <div className="space-y-6">
              {Object.entries(menuData).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-white mb-3">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {items.map((item) => (
                      <div key={item} className="text-sm" style={{ color: '#EAD9A0' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Images Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18181B] mx-auto"></div>
              <p className="text-white mt-4">Loading menu...</p>
            </div>
          ) : menuImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-white text-lg">No menu images uploaded yet</p>
              <p className="text-gray-300 text-sm mt-2">Upload menu images through the admin panel to see them here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {menuImages.map((image) => (
                <div
                  key={image.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gradient-to-br from-[#F4F4F5] to-[#52525B]">
                    <img
                      src={image.public_url}
                      alt={image.file_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}