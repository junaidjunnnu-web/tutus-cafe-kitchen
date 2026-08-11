import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getApprovedReviews() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('approved_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      return []
    }

    return data.map(review => ({
      id: review.id,
      name: review.name,
      rating: review.rating,
      text: review.text,
      date: review.approved_at || review.submitted_at,
      image_url: review.photo_url,
      verified: true
    }))
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
}