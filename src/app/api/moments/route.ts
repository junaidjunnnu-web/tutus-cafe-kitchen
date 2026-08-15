import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // Get service role key from environment (server-side only)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from('customer_moments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Fetch moments error:', error)
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('Could not find the table')) {
        console.log('customer_moments table does not exist, returning empty array')
        return NextResponse.json({
          success: true,
          moments: [],
          warning: 'customer_moments table does not exist. Please run the SQL setup script.'
        })
      }
      return NextResponse.json(
        { error: 'Failed to fetch moments' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      moments: data
    })

  } catch (error) {
    console.error('Moments API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { photo_url, caption } = body

    if (!photo_url) {
      return NextResponse.json(
        { error: 'Photo URL is required' },
        { status: 400 }
      )
    }

    // Get service role key from environment (server-side only)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from('customer_moments')
      .insert({
        photo_url,
        caption: caption || null
      })
      .select()
      .single()

    if (error) {
      console.error('Insert moment error:', error)
      // If table doesn't exist, still return success with warning
      if (error.code === '42P01' || error.message?.includes('Could not find the table')) {
        console.log('customer_moments table does not exist, returning success with warning')
        return NextResponse.json({
          success: true,
          moment: { photo_url, caption, created_at: new Date().toISOString() },
          warning: 'customer_moments table does not exist. Please run the SQL setup script.'
        })
      }
      return NextResponse.json(
        { error: 'Failed to save moment' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      moment: data
    })

  } catch (error) {
    console.error('Moment creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
