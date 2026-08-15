'use client'

import { useState } from 'react'
import { MapPin, Navigation, Loader2 } from 'lucide-react'

export default function LocationDirections() {
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState('')

  const handleGetDirectionsFromLocation = () => {
    setLoadingLocation(true)
    setLocationError('')

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      setLoadingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const destination = encodeURIComponent("Tutu's Cafe and Kitchen Somwarpet Karnataka")
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}`, '_blank')
        setLoadingLocation(false)
      },
      (error) => {
        setLocationError('Location access denied - you can still get directions using the button below')
        setLoadingLocation(false)
      }
    )
  }

  const openGoogleMapsFallback = () => {
    window.open('https://maps.app.goo.gl/Mu3f1SSBRAh54YQf6', '_blank')
  }

  return (
    <section className="pt-4 pb-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl shadow-sm border border-gray-100 p-8 text-center" style={{ backgroundColor: '#F4F4F5' }}>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Coming from somewhere else?</h3>
          <p className="text-gray-600 mb-4">Get directions straight to Tutu's Cafe and Kitchen from your current location.</p>
          
          {locationError ? (
            <div>
              <p className="text-gray-600 mb-4">{locationError}</p>
              <button
                onClick={openGoogleMapsFallback}
                className="inline-flex items-center space-x-2 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span>Open in Google Maps</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleGetDirectionsFromLocation}
              disabled={loadingLocation}
              className="inline-flex items-center space-x-2 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loadingLocation ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Getting your location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  <span>Get Directions from My Location</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
