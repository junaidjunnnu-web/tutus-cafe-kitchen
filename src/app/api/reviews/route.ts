import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_SUBMISSIONS = 20

// Simple captcha validation
function validateCaptcha(userAnswer: string, correctAnswer: number): boolean {
  const num = parseInt(userAnswer)
  return !isNaN(num) && num === correctAnswer
}

// Check rate limit
function checkRateLimit(ipAddress: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ipAddress)

  if (!record) {
    rateLimitMap.set(ipAddress, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (now > record.resetTime) {
    // Reset the window
    rateLimitMap.set(ipAddress, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= MAX_SUBMISSIONS) {
    return false
  }

  record.count++
  return true
}

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('approved_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Fetch reviews error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      reviews: data || []
    })

  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, rating, text, photo_url, captcha_answer, captcha_correct } = body

    // Validate required fields
    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Validate text length
    if (text.length < 10) {
      return NextResponse.json(
        { error: 'Review text must be at least 10 characters' },
        { status: 400 }
      )
    }

    // Validate name length
    if (name.length < 2) {
      return NextResponse.json(
        { error: 'Name must be at least 2 characters' },
        { status: 400 }
      )
    }

    // Validate captcha
    if (!validateCaptcha(captcha_answer, captcha_correct)) {
      return NextResponse.json(
        { error: 'Incorrect captcha answer' },
        { status: 400 }
      )
    }

    // Get IP address for rate limiting
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown'

    // Check rate limit
    if (!checkRateLimit(ipAddress)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    // Insert review into Supabase - use service role to bypass RLS for testing
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        name: name.trim(),
        rating,
        text: text.trim(),
        photo_url: photo_url || null,
        status: 'approved',
        ip_address: ipAddress,
        user_agent: request.headers.get('user-agent') || null,
        approved_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Review submission error:', error)
      console.error('Error details:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { 
          error: `Failed to submit review: ${error.message || 'Unknown error'}`,
          details: {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
          }
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully and is now live!',
      review: data
    })

  } catch (error) {
    console.error('Review submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}