import { Award, Users, Heart, ChefHat } from 'lucide-react'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
            <p className="text-xl text-gray-200">
              A family tradition of authentic flavors and warm hospitality
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Restaurant Story */}
          <div className="rounded-xl shadow-sm border border-gray-100 p-8 mb-12" style={{ backgroundColor: '#F5E6D3' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">From Passion to Plate</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Tutu's Cafe and Kitchen was born from a deep love for authentic North Indian cuisine 
                    and a desire to bring the rich culinary traditions of our heritage to the beautiful 
                    hills of Coorg. What started as a small family kitchen has grown into a beloved 
                    dining destination, but our commitment to quality and authenticity remains unchanged.
                  </p>
                  <p>
                    Every dish we serve tells a story – of recipes passed down through generations, of 
                    fresh ingredients sourced from local farms, and of the care and attention that goes 
                    into every preparation. Our tandoor, the heart of our kitchen, has been crafting 
                    perfect breads and tandoori specialties for years, becoming a legend in its own right.
                  </p>
                  <p>
                    We believe that great food is about more than just taste – it's about the experience, 
                    the memories created around the table, and the joy of sharing a meal with loved ones. 
                    At Tutu's, you're not just a customer; you're part of our extended family.
                  </p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-lg flex items-center justify-center">
                <div className="text-8xl">👨‍🍳</div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">Our Kitchen Team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#18181B]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-sm text-gray-600">
                Premium ingredients, authentic recipes, and uncompromising standards
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#18181B]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Family Spirit</h3>
              <p className="text-sm text-gray-600">
                Warm hospitality where every guest is treated like family
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#18181B]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Made with Love</h3>
              <p className="text-sm text-gray-600">
                Every dish prepared with passion and attention to detail
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
              <div className="w-16 h-16 bg-[#F4F4F5] rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-[#18181B]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Chefs</h3>
              <p className="text-sm text-gray-600">
                Skilled artisans trained in traditional North Indian cooking
              </p>
            </div>
          </div>

          {/* Chef Spotlight */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meet Our Chef</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="relative h-96 bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-lg flex items-center justify-center">
                <div className="text-9xl">👨‍🍳</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Head Chef</h3>
                <p className="text-[#18181B] font-medium mb-4">Master of Tandoor & North Indian Cuisine</p>
                <div className="space-y-4 text-gray-600">
                  <p>
                    With over 20 years of experience in North Indian cuisine, our head chef brings 
                    unparalleled expertise to Tutu's Kitchen. Trained in the traditional culinary 
                    schools of Lucknow and having worked in premier restaurants across India, our 
                    chef specializes in tandoori cooking and authentic biryani preparation.
                  </p>
                  <p>
                    "Cooking is not just about following recipes – it's about understanding the soul 
                    of each ingredient and letting it shine. At Tutu's, we honor tradition while 
                    embracing innovation, creating dishes that comfort and surprise in equal measure."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Ambience */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Ambience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative h-64 bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-lg flex items-center justify-center">
                <div className="text-6xl">🍽️</div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">Dining Hall</p>
                </div>
              </div>
              <div className="relative h-64 bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-lg flex items-center justify-center">
                <div className="text-6xl">🔥</div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">Tandoor Station</p>
                </div>
              </div>
              <div className="relative h-64 bg-gradient-to-br from-[#F4F4F5] to-[#52525B] rounded-lg flex items-center justify-center">
                <div className="text-6xl">👨‍👩‍👧‍👦</div>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-gray-800">Family Seating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}