import { Resend } from 'resend';
import { generateEmailHtml } from '@/lib/email-service';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, bookingData } = await request.json();

    // Generate the HTML email content
    const emailHtml = generateEmailHtml(bookingData);

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: 'White Peak Travel <noreply@whitepeakskitrips.com>',
      to: [to],
      subject: 'White Peak Travel - Booking Confirmation',
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return Response.json({ error: 'Failed to send email' }, { status: 500 });
    }

    console.log('✅ Email sent successfully:', data);
    return Response.json({ success: true, data });

  } catch (error) {
    console.error('API error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
