'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const menuData = {
  "Starters (Non-Veg)": ["Chicken 65", "Chicken Chilli", "Chicken Fry", "Chicken Garlic", "Chicken Ginger", "Chicken Lemon", "Chicken Manchurian", "Chicken Oil Fry Kebab", "Chicken Pepper", "Chicken Lollipop", "Chicken Spring Roll", "Egg Bhurji", "Egg Chilli", "Egg Pakoda", "Egg Omelette", "Fish Chilli", "Fish Fry", "Fish Manchurian", "Mutton Fry", "Mutton Pepper", "Prawn Chilli", "Prawn Fry", "Prawn Golden Fry", "Prawn Manchurian"],
  "Tandoori Starters (Veg)": ["Aloo Tikka", "Paneer Tikka", "Mushroom Tikka", "Baby Corn Tikka", "Gobi Tikka", "Veg Seekh Kebab", "Paneer Seekh Kebab"],
  "Tandoori Starters (Non-Veg)": ["Chicken Hariyali Kebab", "Chicken Kalmi Kebab", "Chicken Leg Kebab", "Chicken Malai Kebab", "Chicken Reshmi Kebab", "Chicken Shole Kebab", "Chicken Tandoori", "Chicken Tikka", "Fish Tikka", "Prawn Tikka"],
  "BBQ": ["Veg BBQ (Aloo, Baby Corn, Mushroom, Gobi)", "Seafood BBQ (Fish Tikka, Prawn Tikka)", "Chicken BBQ (Chicken Tikka, Chicken Hariyali, Chicken Shole)", "Mix Non-Veg BBQ (Chicken, Fish, Prawn)"],
  "Soups (Veg)": ["Tomato Soup", "Veg Clear Soup", "Veg Garlic Soup", "Veg Ginger Soup", "Veg Hot & Sour Soup", "Veg Manchow Soup", "Veg Mushroom Soup", "Veg Noodle Soup", "Veg Sweet Corn Soup", "Burnt Garlic Soup"],
  "Soups (Non-Veg)": ["Chicken Clear Soup", "Chicken Cream Soup", "Chicken Garlic Soup", "Chicken Ginger Soup", "Chicken Hot & Sour Soup", "Chicken Manchow Soup", "Chicken Mushroom Soup", "Chicken Noodle Soup", "Chicken Sweet Corn Soup"],
  "Main Course (Veg)": ["Aloo Gobi Mutter Masala", "Aloo Jeera", "Aloo Mutter Masala", "Aloo Palak", "Aloo Tomato", "Aloo Gobi Masala", "Baby Corn Masala", "Capsicum Masala", "Chana Masala", "Cream Palak", "Dal Makhani", "Dal Tadka Black", "Dal Tadka Yellow", "Dal Yellow Fry", "Green Peas Masala", "Kadai Paneer", "Kadai Veg", "Kaju Curry", "Kaju Masala", "Mix Veg Curry", "Mushroom Masala", "Mushroom Palak", "Palak Paneer", "Paneer Butter Masala", "Paneer Kofta", "Paneer Pasinda", "Paneer Shahi", "Paneer Tikka Masala", "Plain Palak", "Tutu's Malai Kofta", "Tutu's Veg Deewani Handi", "Tutu's Veg Kofta", "Tutu's Veg Hyderabadi", "Tutu's Veg Kolhapuri"],
  "Main Course (Non-Veg)": ["Chicken Butter Masala", "Chicken Curry", "Chicken Hyderabadi", "Chicken Kadai", "Chicken Kalimirch", "Chicken Masala", "Chicken Patiyala", "Tutu's Chicken Hot Pot", "Tutu's Chicken Noorani", "Egg Curry", "Egg Masala", "Fish Curry", "Fish Masala", "Mutton Curry", "Mutton Masala", "Tutu's Mutton Rogan Josh", "Prawn Curry", "Prawn Masala"],
  "Rice (Veg)": ["Curd Rice", "Dal Khichdi", "Ghee Rice", "Jeera Rice", "Lemon Rice", "Green Peas Pulav", "Mix Veg Fried Rice", "Mix Veg Noodle", "Mushroom Biryani", "Mushroom Fried Rice", "Paneer Biryani", "Paneer Noodle", "Paneer Fried Rice", "Paneer Schezwan Noodle", "Paneer Schezwan Fried Rice", "Plain Rice", "Veg Biryani", "Veg Pulav", "Veg Noodle", "Veg Hakka Noodle", "Veg Schezwan Noodle", "Veg Fried Rice", "Veg Schezwan Fried Rice", "Veg American Chop Suey", "Veg Kushka Rice"],
  "Rice (Non-Veg)": ["Chicken Biryani", "Egg Biryani", "Fish Biryani", "Mutton Biryani", "Prawn Biryani", "Chicken Hakka Noodle", "Chicken Noodle", "Chicken Schezwan Noodle", "Egg Noodle", "Egg Schezwan Noodle", "Mix Non-Veg Noodle", "Chicken Fried Rice", "Chicken Schezwan Fried Rice", "Egg Fried Rice", "Fish Fried Rice", "Mix Non-Veg Fried Rice", "Prawn Fried Rice", "Chicken American Chop Suey", "Non-Veg Kushka Rice"],
  "Indian Bread": ["Tawa Roti", "Tawa Roti Butter", "Tandoori Roti", "Tandoori Roti Butter", "Sattu Paratha", "Paneer Paratha", "Lachha Paratha", "Green Peas Paratha", "Gobi Paratha", "Plain Paratha", "Paneer Naan", "Garlic Naan", "Stuffed Naan", "Butter Naan", "Naan", "Missi Roti", "Kulcha", "Stuffed Kulcha", "Aloo Kulcha", "Butter Kulcha", "Gobi Kulcha", "Onion Kulcha", "Garlic Kulcha", "Masala Kulcha"],
  "Salads & Sides": ["Green Salad", "Cucumber Salad", "Onion Salad", "Mix Raita", "Curd", "Papad (Dry/Fry)", "Masala Papad"],
  "Hot & Cold Beverages": ["Tea", "Coffee", "Cold Coffee", "Cold Coffee Ice Cream"],
  "Sweets": ["Gulab Jamun", "Shahi Tukda", "Bihari Sattu Peda", "Arun Ice Cream"],
  "Cool Beverages": ["Buttermilk", "Soft Drinks", "Fresh Lime Soda", "Fresh Lime Water", "Salt Lassi", "Sweet Lassi", "Masala Pepsi", "Sattu Lassi", "Mineral Water"],
  "100% Sugar-Free Specials": ["Fresh Lime Soda (Sweet)", "Fresh Lime Soda (Sweet & Salt)", "Fresh Lime Water (Sweet)", "Fresh Lime Water (Sweet & Salt)", "Sweet Lassi (Sugar-Free)"],
  "Flavoured Soda": ["Banana", "Black Currant", "Blueberry", "Butterscotch", "Guava", "Kiwi", "Litchi", "Mango", "Orange", "Pineapple", "Strawberry", "Chickoo"],
  "Milkshakes": ["Banana", "Black Currant", "Blueberry", "Butterscotch", "Guava", "Kiwi", "Litchi", "Mango", "Orange", "Pineapple", "Strawberry", "Chickoo"]
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
      <main className="flex-1 bg-gray-50">
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
          <div className="rounded-xl shadow-sm border border-[#E4E4E7] p-8 mb-12" style={{ backgroundColor: '#E8F0E3' }}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Menu</h2>
            <div className="space-y-6">
              {Object.entries(menuData).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-[#18181B] mb-3">{category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {items.map((item) => (
                      <div key={item} className="text-sm text-gray-700">
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
              <p className="text-gray-600 mt-4">Loading menu...</p>
            </div>
          ) : menuImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No menu images uploaded yet</p>
              <p className="text-gray-400 text-sm mt-2">Upload menu images through the admin panel to see them here</p>
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