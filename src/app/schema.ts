import { RESTAURANT_INFO } from '../lib/data'

export const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": RESTAURANT_INFO.name,
  "image": [
    "https://tutuscafe.com/images/hero-1.jpg",
    "https://tutuscafe.com/images/hero-2.jpg",
    "https://tutuscafe.com/images/interior-1.jpg"
  ],
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
    "latitude": 12.123456789,
    "longitude": 75.123456789
  },
  "url": "https://tutuscafe.com",
  "telephone": `+${RESTAURANT_INFO.phone}`,
  "email": RESTAURANT_INFO.email,
  "servesCuisine": "North Indian",
  "priceRange": RESTAURANT_INFO.price_range,
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": RESTAURANT_INFO.rating.toString(),
    "reviewCount": RESTAURANT_INFO.review_count.toString()
  },
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
  "menu": "https://tutuscafe.com/menu"
}