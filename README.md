# Tutu's Cafe and Kitchen - Restaurant Website

A premium, image-forward marketing website for Tutu's Cafe and Kitchen, a North Indian restaurant in Somwarpet, Karnataka.

## 🚀 Tech Stack

- **Next.js 16** (App Router) - React framework with SSG/ISR
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Supabase** - Image storage and future database features
- **Lucide React** - Icon library
- **Framer Motion** - Animations

## 📋 Features

- **Home Page**: Hero section, USP strip, opening hours widget, featured dishes, testimonials
- **Menu Page**: Categorized menu with veg/non-veg tags, filters, PDF download, PetPuja integration
- **About Page**: Restaurant story, chef spotlight, ambience photos
- **Gallery Page**: Categorized images (Food/Interior/Events) with lightbox
- **Reviews Page**: Customer testimonials carousel with admin management
- **Contact Page**: Google Maps embed, directions, click-to-call, WhatsApp integration
- **Reservations**: Table booking form with WhatsApp notification
- **Admin Panel**: Password-protected content management for images and reviews

## 🛠️ Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Admin Panel Password
ADMIN_PASSWORD=tutus2024

# Restaurant Contact Info
RESTAURANT_PHONE=919448712901
RESTAURANT_EMAIL=info@tutuscafe.com

# Google Maps Embed API Key (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```

### 2. Supabase Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Create Storage Bucket**
   - Go to Storage → Create a new bucket
   - Name it: `restaurant-images`
   - Make it public for image serving
   - Set up appropriate RLS policies

3. **Upload Images**
   - Upload images to the bucket with the following folder structure:
     - `hero/` - Hero banner images
     - `menu/` - Menu item images
     - `gallery-food/` - Food gallery images
     - `gallery-interior/` - Interior gallery images
     - `gallery-events/` - Events gallery images
     - `chef/` - Chef/team photos
     - `about/` - About section images

### 3. Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Content Management

### Admin Panel

Access the admin panel at `/admin` with the password set in `ADMIN_PASSWORD`.

**Features:**
- **Image Upload**: Upload new photos with category tags
- **Review Management**: Add new customer reviews manually

### Manual Content Updates

For quick updates without the admin panel:

**Menu Items**: Edit `src/lib/data.ts` - modify `SAMPLE_MENU_ITEMS` array
**Reviews**: Edit `src/lib/data.ts` - modify `SAMPLE_REVIEWS` array
**Restaurant Info**: Edit `src/lib/data.ts` - modify `RESTAURANT_INFO` object
**USP Items**: Edit `src/lib/data.ts` - modify `USP_ITEMS` array

## 🌐 Deployment

### Vercel Deployment

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set Environment Variables**
   - Go to Vercel project settings
   - Add all variables from `.env.local`

4. **Custom Domain**
   - Add your custom domain in Vercel settings
   - Update `src/app/schema.ts` with your actual domain

## 📱 Contact Integration

### WhatsApp
- Phone: `919448712901`
- Deep link format: `https://wa.me/919448712901?text=message`
- Pre-filled messages for reservations and inquiries

### Google Maps
- Address: Madikeri Road, Somwarpet, Karnataka 571236
- Embed iframe in Contact page
- Directions button links to Google Maps

### Click-to-Call
- Direct phone link: `tel:+919448712901`

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary: Orange (`#f97316`)
- Secondary: Red (`#dc2626`)
- Backgrounds: Gray scale

### Typography
- Font: Inter (Google Fonts)
- Can be changed in `src/app/layout.tsx`

### Images
Replace placeholder emojis with actual images from Supabase:
- Update image URLs in components
- Use Next.js `<Image>` component for optimization

## 📊 SEO Features

- Meta tags for social sharing
- Open Graph tags
- Schema.org Restaurant structured data
- XML sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)

## 🔐 Security

- Admin panel password protection
- No database credentials exposed
- Environment variables for sensitive data
- Supabase RLS policies for data access

## 🚀 Performance

- Static page generation where possible
- Image optimization with Next.js Image component
- Loading skeletons for better UX
- Code splitting and lazy loading

## 📈 Future Enhancements

- [ ] Full Supabase database integration
- [ ] WhatsApp Business API integration
- [ ] Email notifications for reservations
- [ ] Multi-language support (English + Kannada)
- [ ] Dark/light theme toggle
- [ ] Instagram feed embed
- [ ] Special offers/events system

## 📞 Support

For issues or questions:
- Email: info@tutuscafe.com
- Phone: 919448712901
- WhatsApp: https://wa.me/919448712901

## 📄 License

This project is proprietary software for Tutu's Cafe and Kitchen.

---

**Built with ❤️ for Tutu's Cafe and Kitchen**