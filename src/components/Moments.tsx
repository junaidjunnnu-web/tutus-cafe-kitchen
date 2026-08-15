'use client'

import { useState, useEffect } from 'react'
import { Camera, Upload, XCircle, Heart } from 'lucide-react'

export default function Moments() {
  const [moments, setMoments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState('')
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [formData, setFormData] = useState({
    photo: null as File | null,
    caption: ''
  })
  const [uploadError, setUploadError] = useState('')

  useEffect(() => {
    fetchMoments()
  }, [])

  const fetchMoments = async () => {
    try {
      const response = await fetch('/api/moments')
      const data = await response.json()
      if (data.success) {
        setMoments(data.moments)
      }
    } catch (error) {
      console.error('Failed to fetch moments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Only JPG, PNG, and WebP files are allowed')
      return
    }

    setFormData({ ...formData, photo: file })
    setUploadError('')

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', file)
      uploadFormData.append('category', 'moments')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData
      })

      const data = await response.json()

      if (data.success) {
        setUploadedPhotoUrl(data.url)
      } else {
        setUploadError('Failed to upload image')
      }
    } catch (error) {
      setUploadError('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!uploadedPhotoUrl) {
      setUploadError('Please upload a photo')
      return
    }

    setUploading(true)
    setUploadError('')

    try {
      const response = await fetch('/api/moments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          photo_url: uploadedPhotoUrl,
          caption: formData.caption || null
        })
      })

      const data = await response.json()

      if (data.success) {
        setShowUploadForm(false)
        setFormData({ photo: null, caption: '' })
        setUploadedPhotoUrl('')
        fetchMoments() // Refresh the grid
      } else {
        setUploadError(data.error || 'Failed to share moment')
      }
    } catch (error) {
      setUploadError('Failed to share moment. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Moments at Tutu's</h2>
          <p className="text-gray-600">Shared by our guests</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#18181B] mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading moments...</p>
          </div>
        ) : moments.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Share your moments with us!</p>
            <button
              onClick={() => setShowUploadForm(true)}
              className="mt-4 inline-flex items-center space-x-2 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Add Your Photo</span>
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {moments.map((moment) => (
                <div key={moment.id} className="rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ backgroundColor: '#F4F4F5' }}>
                  <img
                    src={moment.photo_url}
                    alt="Guest moment"
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  {moment.caption && (
                    <div className="p-4">
                      <p className="text-gray-700 text-sm line-clamp-2">"{moment.caption}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowUploadForm(true)}
                className="inline-flex items-center space-x-2 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>Add Your Photo</span>
              </button>
            </div>
          </>
        )}

        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Share Your Moment</h3>
                <button
                  onClick={() => {
                    setShowUploadForm(false)
                    setFormData({ photo: null, caption: '' })
                    setUploadedPhotoUrl('')
                    setUploadError('')
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {uploadedPhotoUrl ? (
                      <div className="relative">
                        <img
                          src={uploadedPhotoUrl}
                          alt="Uploaded"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedPhotoUrl('')
                            setFormData({ ...formData, photo: null })
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleFileChange}
                          className="hidden"
                          id="moment-photo"
                        />
                        <label
                          htmlFor="moment-photo"
                          className="cursor-pointer"
                        >
                          {uploading ? (
                            <div className="flex flex-col items-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#18181B]"></div>
                              <p className="text-gray-600 mt-2">Uploading...</p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Camera className="w-12 h-12 text-gray-400 mb-2" />
                              <p className="text-gray-600">
                                {formData.photo ? formData.photo.name : 'Click to upload or drag and drop'}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">
                                JPG, PNG, WebP (max 5MB)
                              </p>
                            </div>
                          )}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Caption (Optional)
                  </label>
                  <textarea
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    rows={2}
                    maxLength={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    placeholder="Add a short caption (max 100 characters)"
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.caption.length}/100 characters</p>
                </div>

                {uploadError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{uploadError}</p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowUploadForm(false)
                      setFormData({ photo: null, caption: '' })
                      setUploadedPhotoUrl('')
                      setUploadError('')
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !uploadedPhotoUrl}
                    className="flex-1 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {uploading ? 'Sharing...' : 'Share Moment'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
