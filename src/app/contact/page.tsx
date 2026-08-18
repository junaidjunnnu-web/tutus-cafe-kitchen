import { Phone, MapPin, Mail, Clock, Navigation as NavigationIcon, MessageCircle } from 'lucide-react'
import { RESTAURANT_INFO } from '../../lib/data'
import { getWhatsAppLink, getDirectionsLink } from '../../lib/utils'
import Navigation from '../../components/Navigation'
import Footer from '../../components/Footer'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#18181B] to-[#52525B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-200">
              Get in touch or visit us at our location
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="rounded-xl shadow-sm border border-gray-100 p-6" style={{ backgroundColor: '#F4F4F5' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#18181B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                      <p className="text-gray-600">Madikeri Road, Somwarpet, Karnataka 571236</p>
                      <a
                        href="https://maps.app.goo.gl/Mu3f1SSBRAh54YQf6"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 mt-2 text-[#18181B] hover:text-[#52525B] transition-colors"
                      >
                        <NavigationIcon className="w-4 h-4" />
                        <span className="text-sm">Get Directions</span>
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#18181B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <div className="space-y-1">
                        <a
                          href={`tel:+91${RESTAURANT_INFO.phone}`}
                          className="text-gray-600 hover:text-[#52525B] transition-colors block"
                        >
                          {RESTAURANT_INFO.phone}
                        </a>
                      </div>
                      <div className="flex space-x-2 mt-2">
                        <a
                          href={`tel:+91${RESTAURANT_INFO.phone}`}
                          className="inline-flex items-center space-x-2 bg-[#18181B] text-white px-3 py-1 rounded-lg hover:bg-[#52525B] transition-colors text-sm"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Call Now</span>
                        </a>
                        <a
                          href={getWhatsAppLink(RESTAURANT_INFO.phone, "Hi, I'd like to know more about Tutu's Cafe and Kitchen")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#18181B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <a
                        href={`mailto:${RESTAURANT_INFO.email}`}
                        className="text-gray-600 hover:text-[#52525B] transition-colors"
                      >
                        {RESTAURANT_INFO.email}
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#F4F4F5] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#18181B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Opening Hours</h3>
                      <div className="space-y-1">
                        {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between text-sm text-gray-600">
                            <span className="capitalize w-24">{day}</span>
                            <span>{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Options */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Service Options</h3>
                <div className="flex flex-wrap gap-2">
                  {RESTAURANT_INFO.service_options.map((option) => (
                    <span
                      key={option}
                      className="bg-[#F4F4F5] text-[#18181B] px-3 py-1 rounded-full text-sm"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Our Location</h2>
              </div>
              <div className="aspect-w-16 aspect-h-12 bg-gray-200 min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.7442911249527!2d75.84527157483468!3d12.599097087683104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5051ca2e138e9%3A0x3bd31686b5436f80!2sTutu's%20Cafe%20and%20Kitchen!5e0!3m2!1sen!2sin!4v1786553238270!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Tutu's Cafe and Kitchen Location"
                />
              </div>
              <div className="p-4">
                <a
                  href="https://maps.app.goo.gl/Mu3f1SSBRAh54YQf6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center space-x-2 bg-[#18181B] text-white px-6 py-3 rounded-lg hover:bg-[#52525B] transition-colors"
                >
                  <NavigationIcon className="w-5 h-5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}