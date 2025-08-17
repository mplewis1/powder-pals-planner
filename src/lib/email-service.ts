import React from 'react';
import { renderToString } from 'react-dom/server';
import EmailTemplate from '@/components/ui/email-template';

interface EmailData {
  to: string;
  bookingData: any;
}

// Email service for sending booking confirmation emails
export const sendBookingConfirmationEmail = async (bookingData: any) => {
  try {
    // Use deployed backend URL in production, localhost in development
    const apiUrl = process.env.NODE_ENV === 'production' 
      ? 'https://white-peak-email-api.onrender.com/api/send-email'
      : 'http://localhost:3001/api/send-email';

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: bookingData.client.email,
        bookingData: bookingData,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
};

// Helper function to generate email HTML content
export const generateEmailHtml = (bookingData: any): string => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const generateBadges = (items: string[]) => {
    return items.map(item => `<span style="display: inline-block; background-color: #e5e7eb; color: #374151; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin: 2px;">${item}</span>`).join('');
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>White Peak Travel - Inquiry Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8fafc; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 40px 30px; text-align: center; }
        .logo { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
        .tagline { font-size: 16px; opacity: 0.9; margin-bottom: 20px; }
        .content { padding: 40px 30px; }
        .section { margin-bottom: 30px; padding: 20px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #3b82f6; }
        .section-title { font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
        .info-item { display: flex; align-items: center; gap: 8px; }
        .info-label { font-weight: 600; color: #4b5563; min-width: 80px; }
        .info-value { color: #1f2937; }
        .next-steps { background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin-top: 30px; }
        .next-steps h3 { color: #1e40af; margin-bottom: 15px; font-size: 16px; }
        .next-steps ul { margin: 0; padding-left: 20px; }
        .next-steps li { margin-bottom: 8px; color: #1f2937; }
        .footer { background-color: #1f2937; color: white; padding: 30px; text-align: center; }
        .footer-content { max-width: 400px; margin: 0 auto; }
        .contact-info { margin-top: 20px; font-size: 14px; opacity: 0.8; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } .content { padding: 20px 15px; } .header { padding: 30px 20px; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">White Peak Travel</div>
          <div class="tagline">Your Alpine Adventure Awaits</div>
        </div>
        
        <div class="content">
          <h1 style="color: #1e40af; margin-bottom: 20px;">Thank You for Your Ski Adventure Request!</h1>
          
          <p style="font-size: 16px; margin-bottom: 30px; color: #4b5563;">
            We've received your booking request and are excited to create the perfect ski experience for your group. 
            Our expert team will review your preferences and get back to you within 24 hours with a personalized itinerary.
          </p>

          <div class="section">
            <div class="section-title">Client Information</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Name:</span>
                <span class="info-value">${bookingData.client.name}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${bookingData.client.email}</span>
              </div>
              ${bookingData.client.phone ? `
              <div class="info-item">
                <span class="info-label">Phone:</span>
                <span class="info-value">${bookingData.client.phone}</span>
              </div>
              ` : ''}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Trip Details</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Group Size:</span>
                <span class="info-value">${bookingData.group.numberOfPeople} people</span>
              </div>
              ${bookingData.group.numberOfRooms ? `
              <div class="info-item">
                <span class="info-label">Rooms:</span>
                <span class="info-value">${bookingData.group.numberOfRooms} rooms</span>
              </div>
              ` : ''}
              <div class="info-item">
                <span class="info-label">Ski Days:</span>
                <span class="info-value">${bookingData.group.numberOfSkiDays} days</span>
              </div>
              <div class="info-item">
                <span class="info-label">Travel Dates:</span>
                <span class="info-value">${formatDate(bookingData.travel.startDate)} - ${formatDate(bookingData.travel.endDate)}</span>
              </div>
              ${bookingData.group.hasMinors && bookingData.group.minorAges.length > 0 ? `
              <div class="info-item">
                <span class="info-label">Minors:</span>
                <span class="info-value">Ages: ${bookingData.group.minorAges.join(', ')}</span>
              </div>
              ` : ''}
            </div>
          </div>

          ${bookingData.travel.selectedResorts.length > 0 ? `
          <div class="section">
            <div class="section-title">Selected Destinations</div>
            <div style="margin-bottom: 10px;">
              ${generateBadges(bookingData.travel.selectedResorts)}
            </div>
            ${bookingData.travel.specificLocations ? `
            <div style="margin-top: 10px;">
              <strong>Additional Locations:</strong> ${bookingData.travel.specificLocations}
            </div>
            ` : ''}
          </div>
          ` : ''}

          <div class="section">
            <div class="section-title">Budget Information</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Budget Range:</span>
                <span class="info-value">${bookingData.budget.range}</span>
              </div>
            </div>
            ${bookingData.budget.details ? `
            <div style="margin-top: 10px;">
              <strong>Additional Details:</strong> ${bookingData.budget.details}
            </div>
            ` : ''}
          </div>

          <div class="section">
            <div class="section-title">Interests & Preferences</div>
            ${bookingData.preferences.interests.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <strong>Selected Activities:</strong>
              <div style="margin-top: 8px;">
                ${generateBadges(bookingData.preferences.interests)}
              </div>
            </div>
            ` : ''}
            ${bookingData.preferences.pastExperiences ? `
            <div style="margin-bottom: 10px;">
              <strong>Past Experiences:</strong> ${bookingData.preferences.pastExperiences}
            </div>
            ` : ''}
            ${bookingData.preferences.preferredHotels ? `
            <div style="margin-bottom: 10px;">
              <strong>Preferred Hotels:</strong> ${bookingData.preferences.preferredHotels}
            </div>
            ` : ''}
            ${bookingData.preferences.specialRequirements ? `
            <div style="margin-bottom: 10px;">
              <strong>Special Requirements:</strong> ${bookingData.preferences.specialRequirements}
            </div>
            ` : ''}
          </div>

          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ul>
              <li>Our expert team will review your preferences and create a personalized itinerary</li>
              <li>You'll receive a detailed quote within 24 hours</li>
              <li>We'll coordinate all logistics including accommodations, lift tickets, and activities</li>
              <li>Your dedicated travel specialist will be available throughout the planning process</li>
            </ul>
          </div>

          <p style="margin-top: 30px; font-size: 14px; color: #6b7280; text-align: center;">
            <strong>Booking Reference:</strong> ${bookingData.id}
          </p>
        </div>

        <div class="footer">
          <div class="footer-content">
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">White Peak Travel</div>
            <div style="font-size: 14px; opacity: 0.8; margin-bottom: 20px;">Creating unforgettable alpine adventures since 2010</div>
            <div class="contact-info">
              <div>📧 info@whitepeakskitrips.com</div>
              <div>📞 +1 (555) 123-4567</div>
              <div>🌐 www.whitepeakskitrips.com</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to format email for different email services
export const formatEmailForService = (emailData: EmailData, service: 'sendgrid' | 'ses' | 'resend') => {
  const emailHtml = generateEmailHtml(emailData.bookingData);

  switch (service) {
    case 'sendgrid':
      return {
        personalizations: [
          {
            to: [{ email: emailData.to }],
          },
        ],
        from: { email: 'noreply@whitepeakskitrips.com', name: 'White Peak Travel' },
        subject: 'White Peak Travel - Inquiry Confirmation',
        content: [
          {
            type: 'text/html',
            value: emailHtml,
          },
        ],
      };

    case 'ses':
      return {
        Source: 'White Peak Travel <noreply@whitepeakskitrips.com>',
        Destination: {
          ToAddresses: [emailData.to],
        },
        Message: {
          Subject: {
            Data: 'White Peak Travel - Inquiry Confirmation',
            Charset: 'UTF-8',
          },
          Body: {
            Html: {
              Data: emailHtml,
              Charset: 'UTF-8',
            },
          },
        },
      };

    case 'resend':
      return {
        from: 'White Peak Travel <noreply@whitepeakskitrips.com>',
        to: [emailData.to],
        subject: 'White Peak Travel - Inquiry Confirmation',
        html: emailHtml,
      };

    default:
      return {
        to: emailData.to,
        subject: 'White Peak Travel - Inquiry Confirmation',
        html: emailHtml,
      };
  }
};
