import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { enquirySchema } from '@/lib/validations'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = enquirySchema.parse(body)

    // Use anon key instead of service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data, error } = await supabase
      .from('enquiries')
      .insert({
        name: validatedData.name,
        mobile: validatedData.mobile,
        email: validatedData.email,
        requirement: validatedData.requirement,
        product_id: validatedData.product_id || null,
        product_name: validatedData.product_name || null,
        category_name: validatedData.category_name || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    // Try to send email
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin
      await fetch(`${siteUrl}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}