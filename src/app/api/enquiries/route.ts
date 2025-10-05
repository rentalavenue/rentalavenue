import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { enquirySchema } from '@/lib/validations'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = enquirySchema.parse(body)

    // Insert enquiry into database
    const { data, error } = await supabaseAdmin
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

    if (error) throw error

    // Send email notification (we'll add Resend integration later)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error('Enquiry submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit enquiry' },
      { status: 500 }
    )
  }
}