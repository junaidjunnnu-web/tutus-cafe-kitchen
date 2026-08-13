'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react'
import { SAMPLE_REVIEWS } from '@/lib/data'
import { getApprovedReviews } from '@/lib/supabaseReviews'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ReviewSubmissionForm from '@/components/ReviewSubmissionForm'

export default function ReviewsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReviews() {
      const approvedReviews = await getApprovedReviews()
      if (approvedReviews.length > 0) {
        setReviews(approvedReviews)
      }
      setLoading(false)
    }
    fetchReviews()
  }, [])

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guest Reviews</h1>
            <p className="text-xl text-gray-200">
              See what our diners have to say about their experience
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-4xl font-bold text-[#18181B] mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Average Rating</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-4xl font-bold text-[#18181B] mb-2">{reviews.length}</div>
              <p className="text-gray-600">Total Reviews</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="text-4xl font-bold text-[#18181B] mb-2">100%</div>
              <p className="text-gray-600">Verified Diners</p>
            </div>
          </div>

          {/* Featured Review Carousel */}
          <div className="max-w-3xl mx-auto mb-12">
            {loading ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B] mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading reviews...</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative">
                <Quote className="absolute top-4 left-4 w-12 h-12 text-gray-200" />
                
                <div className="relative z-10">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < reviews[currentIndex].rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-lg text-gray-700 mb-6 italic">
                    "{reviews[currentIndex].text}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {reviews[currentIndex].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(reviews[currentIndex].date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>

                    {reviews[currentIndex].verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={prevReview}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Previous review"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-600" />
                  </button>
                  <div className="flex space-x-2 items-center">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex ? 'bg-[#18181B]' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextReview}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Next review"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* All Reviews Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Reviews</h2>
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B] mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading reviews...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl shadow-sm border border-gray-100 p-6"
                    style={{ backgroundColor: '#F4F4F5' }}
                  >
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

                    {(review.photo_url || review.image_url) && (
                      <img
                        src={review.photo_url || review.image_url}
                        alt={`Review by ${review.name}`}
                        className="w-full max-h-48 object-contain rounded-lg mb-4 bg-gray-100"
                        loading="lazy"
                      />
                    )}
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      "{review.text}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>

                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Submission Form */}
          <div className="mt-12">
            <ReviewSubmissionForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}