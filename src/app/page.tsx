import Hero from '@/components/Hero'
import USPStrip from '@/components/USPStrip'
import FeaturedDishes from '@/components/FeaturedDishes'
import Testimonials from '@/components/Testimonials'
import Moments from '@/components/Moments'
import PlanYourVisit from '@/components/PlanYourVisit'
import OpeningHours from '@/components/OpeningHours'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Lock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Welcome to Tutu's Cafe and Kitchen | North Indian Restaurant in Somwarpet, Kodagu",
  description: "Welcome to Tutu's Cafe and Kitchen in Somwarpet, Kodagu, Karnataka. Family-run kitchen with decades of experience serving authentic North Indian home-style cooking made fresh to order.",
  openGraph: {
    title: "Welcome to Tutu's Cafe and Kitchen | North Indian Restaurant in Somwarpet, Kodagu",
    description: "Family-run kitchen with decades of experience serving authentic North Indian home-style cooking made fresh to order.",
  },
}

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
      <Hero />
      <USPStrip />
      
      {/* Info Section */}
      <section className="py-16" style={{ backgroundColor: '#18181B' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 rounded-xl shadow-sm border border-gray-700 p-6" style={{ backgroundColor: '#141414' }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#D4D4D8' }}>
                Welcome to Tutu's Cafe and Kitchen
              </h2>
              <p className="mb-6" style={{ color: '#E7E5E4' }}>
                Tutu's Cafe and Kitchen has been serving Somwarpet, in Kodagu district, Karnataka, for years as a family-run kitchen led by an experienced owner with decades in the restaurant business. Guests visiting Coorg and locals alike come here for genuinely North Indian home-style cooking, made fresh to order rather than pre-prepared.
              </p>
              <p className="mb-6" style={{ color: '#E7E5E4' }}>
                Our tandoori specialties, BBQ platters, and biryanis are among the most loved on the menu, alongside comforting classics like butter chicken, kebabs, and freshly baked naan. Each dish is cooked after you order, so flavors stay fresh — and spice levels are always made to your preference, from mild to extra hot.
              </p>
              <p style={{ color: '#E7E5E4' }}>
                Whether you're stopping by for a quiet family dinner, a celebration with friends, or a quick takeaway on your way through Somwarpet, we aim to make every visit feel warm and welcoming — the same hospitality that's kept guests coming back for years.
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
      <Moments />
      <PlanYourVisit />

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