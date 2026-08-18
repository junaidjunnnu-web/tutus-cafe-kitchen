'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
            <Image
              src="/tutus-logo.png"
              alt="Tutu's Cafe and Kitchen"
              width={66}
              height={45}
              className="object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#52525B] transition-colors">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-[#52525B] transition-colors">Menu</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#52525B] transition-colors">About</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-[#52525B] transition-colors">Gallery</Link>
            <Link href="/moments" className="text-gray-700 hover:text-[#52525B] transition-colors">Moments</Link>
            <Link href="/reviews" className="text-gray-700 hover:text-[#52525B] transition-colors">Reviews</Link>
            <Link href="/contact" className="text-gray-700 hover:text-[#52525B] transition-colors">Contact</Link>
            <Link href="/reservations" className="bg-[#18181B] text-white px-4 py-2 rounded-lg hover:bg-[#52525B] transition-colors">
              Reserve
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-800" /> : <Menu className="w-6 h-6 text-gray-800" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Home</Link>
            <Link href="/menu" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Menu</Link>
            <Link href="/about" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">About</Link>
            <Link href="/gallery" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Gallery</Link>
            <Link href="/moments" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Moments</Link>
            <Link href="/reviews" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Reviews</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-[#52525B] transition-colors py-2">Contact</Link>
            <Link href="/reservations" className="block bg-[#18181B] text-white px-4 py-2 rounded-lg hover:bg-[#52525B] transition-colors text-center">
              Reserve
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}