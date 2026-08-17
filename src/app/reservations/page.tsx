'use client'

import { useState } from 'react'
import { Calendar, Clock, Users, MessageSquare, CheckCircle } from 'lucide-react'
import { RESTAURANT_INFO } from '../../lib/data'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ReservationsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    party_size: 2,
    special_requests: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setWhatsappLink(data.whatsappLink)
        setSubmitSuccess(true)
        setFormData({
          name: '',
          phone: '',
          date: '',
          time: '',
          party_size: 2,
          special_requests: ''
        })
      } else {
        const errorData = await response.json()
        alert(`Failed to submit reservation: ${errorData.error || 'Unknown error'}`)
      }
    } catch (error) {
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (submitSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Received!</h2>
              <p className="text-gray-600 mb-4">
                Thank you for your reservation request. We'll confirm your booking shortly.
              </p>
              <p className="text-gray-600 mb-6 text-sm">
                Tap the button below to send a WhatsApp message to the restaurant for faster confirmation.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mb-4 w-full"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Confirm via WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors w-full"
              >
                Make Another Reservation
              </button>
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
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Reserve a Table</h1>
            <p className="text-xl text-gray-200">
              Book your table in advance for a seamless dining experience
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Reservation Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Reservation Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    >
                      <option value="">Select time</option>
                      {[
                        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
                        '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
                        '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
                        '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
                        '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
                        '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM'
                      ].map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Party Size */}
                <div>
                  <label htmlFor="party_size" className="block text-sm font-medium text-gray-700 mb-2">
                    Party Size *
                  </label>
                  <select
                    id="party_size"
                    name="party_size"
                    required
                    value={formData.party_size}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                      <option key={size} value={size}>{size} Guest{size > 1 ? 's' : ''}</option>
                    ))}
                    <option value="15">10+ Guests</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="special_requests" className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    id="special_requests"
                    name="special_requests"
                    value={formData.special_requests}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#18181B] focus:border-[#18181B]"
                    placeholder="Any dietary requirements, celebrations, or special requests?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Reservation'}
                </button>
              </form>
            </div>

            {/* Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Reservation Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-[#18181B] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      Reservations are accepted between 11:00 AM and 10:30 PM
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-[#18181B] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      For parties larger than 10, please call us directly
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 text-[#18181B] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">
                      We'll confirm your reservation via phone or WhatsApp
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Opening Hours</h3>
                <div className="space-y-2">
                  {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between text-sm text-gray-600">
                      <span className="capitalize">{day}</span>
                      <span>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#F4F4F5] rounded-xl border border-[#E4E4E7] p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h3>
                <p className="text-gray-600 mb-4">
                  For same-day reservations or urgent inquiries, feel free to call us directly.
                </p>
                <a
                  href={`tel:+91${RESTAURANT_INFO.phone}`}
                  className="inline-flex items-center space-x-2 bg-[#18181B] text-white px-4 py-2 rounded-lg hover:bg-[#52525B] transition-colors"
                >
                  <span>Call {RESTAURANT_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}