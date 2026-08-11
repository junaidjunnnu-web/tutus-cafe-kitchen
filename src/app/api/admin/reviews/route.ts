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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'all'

    // Connect to Supabase with service role for admin operations
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    let query = supabase
      .from('reviews')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Fetch reviews error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      reviews: data
    })

  } catch (error) {
    console.error('Admin reviews error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
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
    const { reviewId, action, rejectionReason } = body

    if (!reviewId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      )
    }

    // Connect to Supabase with service role
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const updateData: any = {
      status: action === 'approve' ? 'approved' : 'rejected'
    }

    if (action === 'approve') {
      updateData.approved_at = new Date().toISOString()
    } else {
      updateData.rejected_at = new Date().toISOString()
      updateData.rejection_reason = rejectionReason || null
    }

    const { data, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', reviewId)
      .select()
      .single()

    if (error) {
      console.error('Update review error:', error)
      return NextResponse.json(
        { error: 'Failed to update review' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Review ${action}d successfully`,
      review: data
    })

  } catch (error) {
    console.error('Admin review update error:', error)
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
    const { reviewId } = body

    if (!reviewId) {
      return NextResponse.json(
        { error: 'Missing review ID' },
        { status: 400 }
      )
    }

    // Connect to Supabase with service role
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId)

    if (error) {
      console.error('Delete review error:', error)
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    })

  } catch (error) {
    console.error('Admin review delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}