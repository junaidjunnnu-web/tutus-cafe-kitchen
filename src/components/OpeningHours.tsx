'use client'

import { Clock, CheckCircle, XCircle } from 'lucide-react'
import { RESTAURANT_INFO } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function OpeningHours() {
  const now = new Date()
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
  const currentHour = now.getHours()
  
  const openHour = 11
  const closeHour = 23
  const isCurrentlyOpen = currentHour >= openHour && currentHour < closeHour

  return (
    <div className='rounded-xl shadow-sm border border-gray-700 p-6' style={{ backgroundColor: '#1F2937' }}>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-lg font-semibold text-white'>Opening Hours</h3>
        <div className={cn(
          'flex items-center space-x-2 px-3 py-1 rounded-full text-sm',
          isCurrentlyOpen ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        )}>
          {isCurrentlyOpen ? (
            <>
              <CheckCircle className='w-4 h-4' />
              <span>Open Now</span>
            </>
          ) : (
            <>
              <XCircle className='w-4 h-4' />
              <span>Closed</span>
            </>
          )}
        </div>
      </div>

      <div className='space-y-2'>
        {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
          <div
            key={day}
            className={cn(
              'flex justify-between py-2 px-3 rounded-lg',
              day === currentDay ? 'bg-orange-50 border border-orange-200' : ''
            )}
          >
            <span className={cn(
              'capitalize',
              day === currentDay ? 'font-semibold text-orange-700' : 'text-gray-200'
            )}>
              {day}
            </span>
            <span className={cn(
              day === currentDay ? 'font-semibold text-orange-700' : 'text-gray-200'
            )}>
              {hours}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}