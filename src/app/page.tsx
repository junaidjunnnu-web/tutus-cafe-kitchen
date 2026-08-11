import Hero from '@/components/Hero'
import USPStrip from '@/components/USPStrip'
import FeaturedDishes from '@/components/FeaturedDishes'
import Testimonials from '@/components/Testimonials'
import OpeningHours from '@/components/OpeningHours'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Lock } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
      <Hero />
      <USPStrip />
      
      {/* Info Section */}
      <section className="py-16" style={{ backgroundColor: '#1F2937' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-xl shadow-sm border border-gray-700 p-6" style={{ backgroundColor: '#1F2937' }}>
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to Tutu's Cafe and Kitchen
              </h2>
              <p className="text-gray-200 mb-6">
                Experience the authentic flavors of North Indian cuisine in the heart of Somwarpet, Coorg.
                Our family-owned restaurant brings you traditional recipes passed down through generations,
                prepared with fresh local ingredients and served with warm hospitality.
              </p>
              <p className="text-gray-200 mb-6">
                From our signature butter chicken and tandoori specialties to aromatic biryanis and fresh-baked naan,
                every dish is crafted with love and expertise. Whether you're dining in with family, grabbing a quick
                takeaway, or ordering no-contact delivery, we promise a memorable culinary experience.
              </p>
              <p className="text-gray-200">
                From cozy family dinners to celebrations with friends, Tutu's is the place Somwarpet comes to for a taste of home-style North Indian cooking. Dine in and relax in our comfortable seating, or order ahead for a quick takeaway — whatever you choose, every plate is prepared fresh with care.
              </p>
            </div>
            <div>
              <OpeningHours />
            </div>
          </div>
        </div>
      </section>

      <FeaturedDishes />
      <Testimonials />

      {/* Admin Panel Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/admin"
            className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Lock className="w-5 h-5" />
            <span>Admin Panel</span>
          </a>
        </div>
      </section>
    </main>
    <Footer />
    </>
  )
}