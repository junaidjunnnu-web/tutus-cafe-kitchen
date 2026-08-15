'use client'

import { MapPin, Navigation } from 'lucide-react'

interface Attraction {
  name: string
  description: string
  distance: string
}

const attractions: Attraction[] = [
  { name: "Mallalli Falls", description: "Scenic waterfall on the Kumaradhara River", distance: "~26 km" },
  { name: "Kote Betta", description: "Popular trekking peak with panoramic views", distance: "nearby" },
  { name: "Pushpagiri Wildlife Sanctuary", description: "Nature reserve, birdwatching & treks", distance: "nearby" },
  { name: "Honnamana Kere", description: "Peaceful lake near Somwarpet", distance: "nearby" },
  { name: "Bisle Ghat Viewpoint", description: "Scenic Western Ghats viewpoint", distance: "nearby" },
  { name: "Makkala Gudi Betta", description: "Paddy field views, known as 'Kodaikanal of Kodagu'", distance: "~20 km" },
  { name: "Abbey Falls", description: "Popular waterfall amid coffee & spice estates", distance: "~42 km" },
  { name: "Raja's Seat", description: "Famous sunset viewpoint in Madikeri", distance: "~42 km" },
  { name: "Madikeri Fort", description: "Historic fort and popular sightseeing stop", distance: "~42 km" },
  { name: "Namdroling Monastery (Golden Temple)", description: "Large Buddhist monastery in Bylakuppe", distance: "~30-35 km" },
  { name: "Talacauvery", description: "Sacred origin of the Kaveri River", distance: "~82 km" },
  { name: "Dubare Elephant Camp", description: "Elephant interaction & river rafting spot", distance: "~50 km" },
  { name: "Nisargadhama", description: "River-island nature park near Kushalnagar", distance: "~45 km" }
]

export default function PlanYourVisit() {
  const getDirectionsFromAttraction = (attractionName: string) => {
    const origin = encodeURIComponent(attractionName)
    const destination = encodeURIComponent("Tutu's Cafe and Kitchen Somwarpet Karnataka")
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`, '_blank')
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Plan Your Visit</h2>
          <p className="text-gray-600">Explore Coorg before or after your meal at Tutu's</p>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col"
              style={{ backgroundColor: '#F4F4F5' }}
            >
              <div className="flex items-start space-x-3 mb-3">
                <MapPin className="w-5 h-5 text-[#18181B] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-base mb-1">{attraction.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{attraction.description}</p>
                  <p className="text-xs text-gray-500">{attraction.distance}</p>
                </div>
              </div>
              <button
                onClick={() => getDirectionsFromAttraction(attraction.name)}
                className="mt-auto inline-flex items-center justify-center space-x-2 bg-[#18181B] text-white px-4 py-2 rounded-lg hover:bg-[#52525B] transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions from here</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
