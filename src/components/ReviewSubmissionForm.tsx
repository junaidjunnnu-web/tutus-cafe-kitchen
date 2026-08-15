'use client'

import { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'
import Captcha from './Captcha'

export default function ReviewSubmissionForm() {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    text: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [captchaValid, setCaptchaValid] = useState(false)
  const [captchaCorrectAnswer, setCaptchaCorrectAnswer] = useState(0)
  const [captchaUserAnswer, setCaptchaUserAnswer] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!captchaValid) {
      setSubmitError('Please complete the security check correctly')
      return
    }

    if (!formData.name || !formData.text) {
      setSubmitError('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          rating: formData.rating,
          text: formData.text,
          captcha_answer: captchaUserAnswer,
          captcha_correct: captchaCorrectAnswer
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubmitSuccess(true)
        setFormData({
          name: '',
          rating: 5,
          text: ''
        })
      } else {
        setSubmitError(data.error || 'Failed to submit review')
        console.error('Review submission failed:', data)
      }
    } catch (error) {
      setSubmitError('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-900 mb-2">Review Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your review! It is now live on our site.
        </p>
        <button
          onClick={() => setSubmitSuccess(false)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          Submit Another Review
        </button>
      </div>
    )
  }

  return (
    <div className="rounded-xl shadow-sm border border-gray-100 p-8" style={{ backgroundColor: '#F4F4F5' }}>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className="p-2 transition-colors"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= formData.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={formData.text}
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
            placeholder="Share your experience with us..."
            minLength={10}
          />
          <p className="text-sm text-gray-500 mt-1">Minimum 10 characters</p>
        </div>

        <Captcha onValidate={(isValid, correctAnswer, userAnswer) => {
          setCaptchaValid(isValid)
          setCaptchaCorrectAnswer(correctAnswer)
          setCaptchaUserAnswer(userAnswer)
        }} />

        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm">{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !captchaValid}
          className="w-full bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>

        <p className="text-sm text-gray-500 text-center">
          Your review will appear immediately on our site.
        </p>
      </form>
    </div>
  )
}