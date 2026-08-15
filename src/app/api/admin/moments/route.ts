import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Simple admin password check
function checkAdminPassword(password: string): boolean {
  const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
  return password === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const password = authHeader.substring(7)
    if (!checkAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
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
    console.error('Admin moments error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check admin authorization
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const password = authHeader.substring(7)
    if (!checkAdminPassword(password)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { momentId, photoUrl } = body

    if (!momentId) {
      return NextResponse.json(
        { error: 'Missing moment ID' },
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

    // Delete from database
    const { error: dbError } = await supabase
      .from('customer_moments')
      .delete()
      .eq('id', momentId)

    if (dbError) {
      console.error('Delete moment error:', dbError)
      return NextResponse.json(
        { error: 'Failed to delete moment from database' },
        { status: 500 }
      )
    }

    // Delete from storage if photo URL provided
    if (photoUrl) {
      try {
        // Extract file path from URL
        const url = new URL(photoUrl)
        const pathParts = url.pathname.split('/')
        const fileName = pathParts[pathParts.length - 1]
        const filePath = `restaurant-images/moments/${fileName}`

        const { error: storageError } = await supabase
          .storage
          .from('restaurant-images')
          .remove([filePath])

        if (storageError) {
          console.error('Failed to delete from storage:', storageError)
          // Don't fail the operation if storage deletion fails
          // Just log the error
        }
      } catch (error) {
        console.error('Error parsing photo URL for deletion:', error)
        // Don't fail the operation if URL parsing fails
      }
    }

    return NextResponse.json({
      success: true
    })

  } catch (error) {
    console.error('Admin moment delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
