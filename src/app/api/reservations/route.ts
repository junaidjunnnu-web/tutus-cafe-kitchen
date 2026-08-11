import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, date, time, party_size, special_requests } = body

    // Validate required fields
    if (!name || !phone || !date || !time || !party_size) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Convert party_size to integer and validate
    const partySizeInt = parseInt(party_size.toString())
    if (isNaN(partySizeInt) || partySizeInt < 1 || partySizeInt > 20) {
      return NextResponse.json(
        { error: 'Invalid party size. Must be between 1 and 20.' },
        { status: 400 }
      )
    }

    // Create WhatsApp message
    const message = `
🍽️ *New Table Reservation*

*Name:* ${name}
*Phone:* ${phone}
*Date:* ${date}
*Time:* ${time}
*Party Size:* ${party_size}
*Special Requests:* ${special_requests || 'None'}

Please confirm this reservation.
    `.trim()

    // Create WhatsApp deep link
    const whatsappLink = `https://wa.me/9379978866?text=${encodeURIComponent(message)}`

    // Get service role key from environment (server-side only)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

    if (!serviceRoleKey || !supabaseUrl) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Create Supabase client with service role key for server-side operations
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Save reservation to database
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        name,
        phone,
        date,
        time,
        party_size: partySizeInt,
        special_requests,
        status: 'pending'
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      // If table doesn't exist, still return success with WhatsApp link
      if (error.code === '42P01' || error.message?.includes('Could not find the table')) {
        console.log('reservations table does not exist, returning success with WhatsApp link only')
        return NextResponse.json({
          success: true,
          message: 'Reservation received successfully',
          whatsappLink: whatsappLink,
          warning: 'Database table not created yet. Please run the SQL setup script.',
          reservation: {
            name,
            phone,
            date,
            time,
            party_size: partySizeInt,
            special_requests,
            status: 'pending'
          }
        })
      }
      return NextResponse.json(
        { error: 'Failed to save reservation' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Reservation received successfully',
      whatsappLink: whatsappLink,
      reservation: data
    })

  } catch (error) {
    console.error('Reservation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}