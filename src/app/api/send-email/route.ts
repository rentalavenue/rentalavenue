import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const enquiry = await request.json()

    // TODO: Integrate Resend when you have the API key
    // For now, just log the email that would be sent
    console.log('Email would be sent to: sales@alltimeprinters.in')
    console.log('Enquiry Details:', {
      name: enquiry.name,
      mobile: enquiry.mobile,
      email: enquiry.email,
      requirement: enquiry.requirement,
      product: enquiry.product_name || 'General Enquiry',
      category: enquiry.category_name || 'N/A',
      timestamp: enquiry.created_at,
    })

    /* 
    // Uncomment this when you have Resend API key:
    
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'RENTAL AVENUE <noreply@rentalavenue.in>',
      to: 'sales@alltimeprinters.in',
      subject: `New Enquiry from ${enquiry.name}`,
      html: `
        <h2>New Enquiry Received</h2>
        <p><strong>Name:</strong> ${enquiry.name}</p>
        <p><strong>Mobile:</strong> ${enquiry.mobile}</p>
        <p><strong>Email:</strong> ${enquiry.email}</p>
        <p><strong>Product:</strong> ${enquiry.product_name || 'General Enquiry'}</p>
        <p><strong>Category:</strong> ${enquiry.category_name || 'N/A'}</p>
        <p><strong>Requirement:</strong></p>
        <p>${enquiry.requirement}</p>
        <p><strong>Date:</strong> ${new Date(enquiry.created_at).toLocaleString()}</p>
      `,
    })
    */

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}