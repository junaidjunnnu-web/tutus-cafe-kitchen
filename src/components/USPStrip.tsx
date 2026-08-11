import { CheckCircle } from 'lucide-react'

export default function USPStrip() {
  const uspItems = [
    { icon: "🌿", text: "100% Vegetarian-Friendly Options" },
    { icon: "🏆", text: "Award-Winning Chef" },
    { icon: "⚡", text: "Fast Delivery Service" },
    { icon: "💯", text: "Fresh Local Ingredients" }
  ]

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {uspItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}