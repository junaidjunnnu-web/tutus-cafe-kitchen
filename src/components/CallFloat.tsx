'use client'

import { Phone } from 'lucide-react'

export default function CallFloat() {
  return (
    <a
      href="tel:+919019912901"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full transition-transform duration-200 hover:scale-110 shadow-lg md:bottom-8 md:right-8"
      style={{
        backgroundColor: '#18181B',
        animationName: 'pulse-scale',
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: '3',
      }}
      aria-label="Call Now"
    >
      <Phone className="w-6 h-6 text-white" />
      <style>{`
        @keyframes pulse-scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.15);
          }
        }
      `}</style>
    </a>
  )
}
