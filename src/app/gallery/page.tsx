'use client'

import { useState, useEffect } from 'react'
import { X, Filter } from 'lucide-react'
import { cn } from '@/lib/utils'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type GalleryCategory = 'all' | 'food' | 'interior' | 'events'

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all')
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch('/api/images')
        const data = await response.json()
        if (data.success) {
          setGalleryImages(data.images)
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGalleryImages()
  }, [])

  // Map gallery categories to database categories
  const categoryMap: Record<GalleryCategory, string[]> = {
    'all': ['gallery-food', 'gallery-interior', 'gallery-events'],
    'food': ['gallery-food'],
    'interior': ['gallery-interior'],
    'events': ['gallery-events']
  }

  const categories: { value: GalleryCategory; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'food', label: 'Food' },
    { value: 'interior', label: 'Interior' },
    { value: 'events', label: 'Events' },
  ]

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => categoryMap[selectedCategory].includes(img.category))

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
            <p className="text-xl text-gray-200">
              A visual journey through our food, ambience, and celebrations
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Filter Gallery</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    selectedCategory === category.value
                      ? "bg-[#18181B] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18181B] mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading gallery...</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => setSelectedImage(image)}
                    className="relative aspect-square bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
                  >
                    <img
                      src={image.public_url}
                      alt="Gallery image"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No images in this category</p>
                  <p className="text-gray-400 text-sm mt-2">Upload images through the admin panel to see them here</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.public_url}
              alt="Gallery image"
              className="w-full rounded-xl aspect-square object-cover"
            />
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}