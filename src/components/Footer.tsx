'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { RESTAURANT_INFO } from '@/lib/data'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="text-white" style={{ backgroundColor: '#18181B' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Tutu's Cafe and Kitchen</h3>
            <p className="text-gray-400 mb-4">
              Authentic North Indian cuisine in the heart of Coorg
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-white transition-colors">Menu</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link href="/moments" className="text-gray-400 hover:text-white transition-colors">Moments</Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-white transition-colors">Reviews</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#52525B] mt-1" />
                <span className="text-gray-400">Madikeri Road, Somwarpet, Karnataka 571236</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#52525B]" />
                <a href={`tel:+91${RESTAURANT_INFO.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </li>
              {RESTAURANT_INFO.additional_phones?.map((phone) => (
                <li key={phone} className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#52525B]" />
                  <a href={`tel:+91${phone.replace(/^0/, '')}`} className="text-gray-400 hover:text-white transition-colors">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#52525B]" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-[#52525B]" />
                <span className="text-gray-400">11:00 AM - 11:00 PM</span>
              </li>
              <li className="text-gray-400">Open all days</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Tutu's Cafe and Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}