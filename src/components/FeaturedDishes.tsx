'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function FeaturedDishes() {
  const [menuImages, setMenuImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenuImages = async () => {
      try {
        const response = await fetch('/api/images?category=menu')
        const data = await response.json()
        if (data.success) {
          // Show first 4 images
          setMenuImages(data.images.slice(0, 4))
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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-gray-600">Our most loved dishes, crafted to perfection</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading dishes...</p>
          </div>
        ) : menuImages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No menu images uploaded yet</p>
            <p className="text-gray-400 text-sm mt-2">Upload menu images through the admin panel to see them here</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {menuImages.map((image) => (
                <div key={image.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square bg-gradient-to-br from-orange-50 to-red-50">
                    <img
                      src={image.public_url}
                      alt="Featured dish"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a
                href="/menu"
                className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}