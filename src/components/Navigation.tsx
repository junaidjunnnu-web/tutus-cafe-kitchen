'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isOpen as checkIsOpen } from '@/lib/utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const restaurantOpen = checkIsOpen()

  return (
    <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">Tutu's</span>
            <span className="text-2xl font-light text-gray-800">Cafe and Kitchen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-orange-600 transition-colors">Menu</Link>
            <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">About</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-orange-600 transition-colors">Gallery</Link>
            <Link href="/reviews" className="text-gray-700 hover:text-orange-600 transition-colors">Reviews</Link>
            <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</Link>
            <Link href="/reservations" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              Reserve
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Home</Link>
            <Link href="/menu" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Menu</Link>
            <Link href="/about" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">About</Link>
            <Link href="/gallery" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Gallery</Link>
            <Link href="/reviews" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Reviews</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-orange-600 transition-colors py-2">Contact</Link>
            <Link href="/reservations" className="block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors text-center">
              Reserve
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}