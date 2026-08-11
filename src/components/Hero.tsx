'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const [heroImages, setHeroImages] = useState<any[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        const response = await fetch('/api/images?category=hero')
        const data = await response.json()
        if (data.success) {
          setHeroImages(data.images)
        }
      } catch (error) {
        console.error('Failed to fetch hero images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroImages()
  }, [])

  // Auto-rotate hero images every 3 seconds
  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [heroImages.length])

  const nextSlide = () => {
    if (heroImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }
  }

  const prevSlide = () => {
    if (heroImages.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
    }
  }

  // Fallback content if no images are uploaded
  const fallbackContent = (
    <div className="text-white">
      <div className="text-8xl mb-4">🍛</div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        Welcome to Tutu's Cafe and Kitchen
      </h1>
      <p className="text-xl md:text-2xl text-orange-100 mb-8">
        Experience the rich flavors of India in the heart of Coorg
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/menu"
          className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
        >
          View Menu
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
        <a
          href="/reservations"
          className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
        >
          Book a Table
        </a>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="relative bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative bg-gradient-to-br from-orange-500 to-red-600 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-white">
            {heroImages.length > 0 ? (
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                  Welcome to Tutu's Cafe and Kitchen
                </h1>
                <p className="text-xl md:text-2xl text-orange-100 mb-8">
                  Experience the rich flavors of India in the heart of Coorg
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/menu"
                    className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors"
                  >
                    View Menu
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                  <a
                    href="/reservations"
                    className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors"
                  >
                    Book a Table
                  </a>
                </div>
              </>
            ) : (
              fallbackContent
            )}
          </div>

          <div className="block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl transform rotate-6"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-4">
                {heroImages.length > 0 && heroImages[currentSlide] ? (
                  <img
                    src={heroImages[currentSlide].public_url}
                    alt={heroImages[currentSlide].file_name}
                    className="w-full h-64 sm:h-80 lg:h-[500px] object-cover rounded-2xl"
                  />
                ) : (
                  <div className="text-9xl text-center">🍽️</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Arrow Navigation */}
      {heroImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </>
      )}
    </div>
  )
}