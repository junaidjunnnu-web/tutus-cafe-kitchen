'use client'

import { useState, useEffect } from 'react'
import { Star, Quote, ExternalLink, Lock } from 'lucide-react'

export default function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        if (data.success) {
          setReviews(data.reviews.slice(0, 3))
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
          <p className="text-gray-600">Real reviews from our satisfied customers</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18181B] mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 text-sm mt-2">Be the first to share your experience!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl shadow-sm border border-gray-100 p-6 relative" style={{ backgroundColor: '#F4F4F5' }}>
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-[#52525B]" />
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(review.submitted_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/reviews"
                className="inline-flex items-center space-x-2 text-[#18181B] hover:text-[#52525B] font-semibold"
              >
                <span>Read All Reviews</span>
              </a>
              <a
                href="https://maps.app.goo.gl/Yrurwx8AecZ3RJSf9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[#18181B] hover:text-[#52525B] font-semibold"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read our Google Reviews</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  )
}