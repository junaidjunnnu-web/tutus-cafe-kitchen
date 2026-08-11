import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isOpen(): boolean {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  
  // Restaurant hours: 11 AM - 11 PM daily
  const openHour = 11
  const closeHour = 23
  
  return hour >= openHour && hour < closeHour
}

export function formatPhoneNumber(phone: string): string {
  // Format phone number for display
  if (phone.length === 10) {
    return `(${phone.slice(0,3)}) ${phone.slice(3,6)}-${phone.slice(6)}`
  }
  return phone
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const formattedPhone = phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${formattedPhone}`
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }
  return baseUrl
}

export function getDirectionsLink(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}