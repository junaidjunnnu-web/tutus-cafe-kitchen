'use client'

import { useState, useEffect } from 'react'
import { Upload, Lock, LogOut, Image as ImageIcon, Star, Trash2, Calendar } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<'images' | 'reviews' | 'reservations'>('images')
  const [error, setError] = useState('')

  // Image upload state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageCategory, setImageCategory] = useState('hero')
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<any[]>([])
  const [loadingImages, setLoadingImages] = useState(false)

  // All reviews state
  const [allReviews, setAllReviews] = useState<any[]>([])
  const [loadingReviews, setLoadingReviews] = useState(false)

  // Reservations state
  const [reservations, setReservations] = useState<any[]>([])
  const [loadingReservations, setLoadingReservations] = useState(false)

  // Fetch all reviews
  const fetchAllReviews = async () => {
    setLoadingReviews(true)
    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/reviews?status=all', {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setAllReviews(data.reviews)
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error)
    } finally {
      setLoadingReviews(false)
    }
  }

  // Fetch reservations
  const fetchReservations = async () => {
    setLoadingReservations(true)
    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/reservations', {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setReservations(data.reservations)
      }
    } catch (error) {
      console.error('Failed to fetch reservations:', error)
    } finally {
      setLoadingReservations(false)
    }
  }

  // Update reservation status
  const updateReservationStatus = async (reservationId: string, status: string) => {
    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/reservations', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({ reservationId, status })
      })
      const data = await response.json()
      if (data.success) {
        fetchReservations()
      }
    } catch (error) {
      console.error('Failed to update reservation:', error)
    }
  }

  // Delete review
  const deleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) {
      return
    }

    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/reviews', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({ reviewId })
      })
      const data = await response.json()
      if (data.success) {
        fetchAllReviews()
      }
    } catch (error) {
      console.error('Failed to delete review:', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated && activeTab === 'reviews') {
      fetchAllReviews()
    }
    if (isAuthenticated && activeTab === 'images') {
      fetchUploadedImages()
    }
    if (isAuthenticated && activeTab === 'reservations') {
      fetchReservations()
    }
  }, [isAuthenticated, activeTab])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const handleImageUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) return

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', imageFile)
      uploadFormData.append('category', imageCategory)

      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: uploadFormData
      })

      const data = await response.json()

      if (data.success) {
        let message = 'Image uploaded successfully!'
        if (data.warning) {
          message += `\n\nNote: ${data.warning}`
        }
        alert(message)
        setImageFile(null)
        fetchUploadedImages()
      } else {
        alert(`Upload failed: ${data.error}`)
      }
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const fetchUploadedImages = async () => {
    setLoadingImages(true)
    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/images', {
        headers: {
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        }
      })
      const data = await response.json()
      if (data.success) {
        setUploadedImages(data.images)
        if (data.warning) {
          console.warn('Warning:', data.warning)
        }
      }
    } catch (error) {
      console.error('Failed to fetch images:', error)
    } finally {
      setLoadingImages(false)
    }
  }

  const deleteImage = async (imageId: string, filePath: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return
    }

    try {
      const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
      const response = await fetch('/api/admin/images', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ADMIN_PASSWORD}`
        },
        body: JSON.stringify({ imageId, filePath })
      })
      const data = await response.json()
      if (data.success) {
        fetchUploadedImages()
      } else {
        alert(`Delete failed: ${data.error}`)
      }
    } catch (error) {
      alert('Delete failed. Please try again.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-[#18181B]" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Panel</h1>
              <p className="text-gray-600 text-center mb-6">Enter password to access content management</p>
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                  />
                </div>
                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors"
                >
                  Access Panel
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('images')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'images'
                ? 'bg-[#18181B] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Manage Images</span>
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reviews'
                ? 'bg-[#18181B] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Manage Reviews</span>
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'reservations'
                ? 'bg-[#18181B] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Reservations</span>
          </button>
        </div>

        {/* Image Management */}
        {activeTab === 'images' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Upload New Image</h2>
            
            <form onSubmit={handleImageUpload} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">
                      {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={imageCategory}
                  onChange={(e) => setImageCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                >
                  <option value="hero">Hero Banner</option>
                  <option value="menu">Menu Item</option>
                  <option value="gallery-food">Gallery - Food</option>
                  <option value="gallery-interior">Gallery - Interior</option>
                  <option value="gallery-events">Gallery - Events</option>
                  <option value="chef">Chef/Team Photo</option>
                  <option value="about">About Section</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={!imageFile || uploading}
                className="w-full bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Image'}
              </button>
            </form>

            {/* Existing Images */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing Images</h3>
              
              {loadingImages ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B] mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading images...</p>
                </div>
              ) : uploadedImages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No images uploaded yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.public_url}
                        alt={image.file_name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button
                          onClick={() => deleteImage(image.id, image.file_path)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium text-gray-900 truncate">{image.file_name}</p>
                        <p className="text-xs text-gray-500 capitalize">{image.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Review Management */}
        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Reviews</h2>
            
            {loadingReviews ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B] mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading reviews...</p>
              </div>
            ) : allReviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reviews yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {allReviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <div className="flex items-center space-x-1">
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
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{review.text}</p>
                        {review.photo_url && (
                          <img
                            src={review.photo_url}
                            alt="Review photo"
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(review.approved_at || review.submitted_at).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reservation Management */}
        {activeTab === 'reservations' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Manage Reservations</h2>
            
            {loadingReservations ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B] mx-auto"></div>
                <p className="text-gray-600 mt-2">Loading reservations...</p>
              </div>
            ) : reservations.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No reservations yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{reservation.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                            reservation.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {reservation.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                          <div>
                            <span className="font-medium">Phone:</span> {reservation.phone}
                          </div>
                          <div>
                            <span className="font-medium">Party Size:</span> {reservation.party_size}
                          </div>
                          <div>
                            <span className="font-medium">Date:</span> {reservation.date}
                          </div>
                          <div>
                            <span className="font-medium">Time:</span> {reservation.time}
                          </div>
                        </div>
                        {reservation.special_requests && (
                          <p className="text-sm text-gray-600 mb-2">
                            <span className="font-medium">Special Requests:</span> {reservation.special_requests}
                          </p>
                        )}
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(reservation.submitted_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        {reservation.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      </main>
      <Footer />
    </div>
  )
}