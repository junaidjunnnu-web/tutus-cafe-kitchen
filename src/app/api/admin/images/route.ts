import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// File size limit: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024
// Allowed file types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// Simple admin password check
function checkAdminPassword(password: string): boolean {
  const ADMIN_PASSWORD = 'tutus2024' // Hardcoded admin password
  return password === ADMIN_PASSWORD
}

export async function POST(request: NextRequest) {
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

    // Create Supabase client with service role key for server-side operations
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'hero'

    // Validate file exists
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 5MB limit' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and WebP are allowed' },
        { status: 400 }
      )
    }

    // Validate category
    const validCategories = ['hero', 'menu', 'gallery-food', 'gallery-interior', 'gallery-events', 'chef', 'about']
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 8)
    const fileExtension = file.name.split('.').pop()
    const fileName = `${category}/${timestamp}-${randomString}.${fileExtension}`

    // Convert file to array buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('restaurant-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file to storage' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('restaurant-images')
      .getPublicUrl(fileName)

    // Save to site_images table
    const { data: imageData, error: dbError } = await supabase
      .from('site_images')
      .insert({
        file_path: uploadData.path,
        public_url: publicUrl,
        category: category,
        file_name: file.name,
        file_size: file.size,
        content_type: file.type,
        is_active: true
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // If table doesn't exist, return success anyway with a warning
      if (dbError.code === '42P01' || dbError.message?.includes('Could not find the table')) { // relation does not exist
        console.log('site_images table does not exist, returning upload success without database record')
        return NextResponse.json({
          success: true,
          url: publicUrl,
          path: uploadData.path,
          warning: 'site_images table does not exist. Image uploaded to storage but not tracked in database. Please run the SQL setup script.'
        })
      }
      // If database insert fails for other reasons, try to delete the uploaded file
      await supabase.storage.from('restaurant-images').remove([uploadData.path])
      return NextResponse.json(
        { error: `Failed to save image metadata: ${dbError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: uploadData.path,
      image: imageData
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
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

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let query = supabase
      .from('site_images')
      .select('*')
      .order('uploaded_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Fetch images error:', error)
      // If table doesn't exist, return empty array
      if (error.code === '42P01' || error.message?.includes('Could not find the table')) { // relation does not exist
        console.log('site_images table does not exist, returning empty array')
        return NextResponse.json({
          success: true,
          images: [],
          warning: 'site_images table does not exist. Please run the SQL setup script.'
        })
      }
      return NextResponse.json(
        { error: 'Failed to fetch images' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      images: data
    })

  } catch (error) {
    console.error('Admin images error:', error)
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
    const { imageId, filePath } = body

    if (!imageId || !filePath) {
      return NextResponse.json(
        { error: 'Missing image ID or file path' },
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

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('restaurant-images')
      .remove([filePath])

    if (storageError) {
      console.error('Storage delete error:', storageError)
      return NextResponse.json(
        { error: 'Failed to delete file from storage' },
        { status: 500 }
      )
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('site_images')
      .delete()
      .eq('id', imageId)

    if (dbError) {
      console.error('Database delete error:', dbError)
      // If table doesn't exist, return success anyway
      if (dbError.code === '42P01' || dbError.message?.includes('Could not find the table')) { // relation does not exist
        console.log('site_images table does not exist, returning delete success')
        return NextResponse.json({
          success: true,
          message: 'Image deleted from storage (database table does not exist)',
          warning: 'site_images table does not exist. Please run the SQL setup script.'
        })
      }
      return NextResponse.json(
        { error: `Failed to delete image metadata: ${dbError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    })

  } catch (error) {
    console.error('Admin image delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}