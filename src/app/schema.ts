import { RESTAURANT_INFO } from '../lib/data'

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Tutu's Cafe and Kitchen",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Madikeri Road",
    "addressLocality": "Somwarpet",
    "addressRegion": "Karnataka",
    "postalCode": "571236",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.599097,
    "longitude": 75.845271
  },
  "url": "https://tutuscafeandkitchen.com",
  "telephone": "+919019912901",
  "servesCuisine": ["Indian", "North Indian"],
  "priceRange": "₹200-400",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "11:00",
      "closes": "23:00"
    }
  ],
  "sameAs": [
    "https://maps.app.goo.gl/Mu3f1SSBRAh54YQf6"
  ]
}