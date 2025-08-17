import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure dotenv to load .env.local
dotenv.config({ path: '.env.local' });

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend (only if API key is provided)
let resend = null;
if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'your_resend_api_key_here') {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('✅ Resend API configured');
} else {
  console.log('⚠️  Resend API key not configured - emails will be logged only');
}

// Email generation function (copied from email-service.ts)
const generateEmailHtml = (bookingData) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const generateBadges = (items, type = 'default') => {
    const colors = {
      resort: { bg: 'hsl(217 91% 20%)', color: 'hsl(0 0% 98%)', border: 'hsl(217 91% 35%)' },
      interest: { bg: 'hsl(150 60% 45%)', color: 'hsl(0 0% 98%)', border: 'hsl(150 60% 45%)' },
      default: { bg: 'hsl(210 40% 96%)', color: 'hsl(210 40% 8%)', border: 'hsl(210 40% 90%)' }
    };
    const color = colors[type];
    return items.map(item => 
      `<span style="display: inline-block; background-color: ${color.bg}; color: ${color.color}; padding: 6px 12px; border-radius: 8px; font-size: 13px; margin: 3px; border: 1px solid ${color.border}; font-weight: 500;">${item}</span>`
    ).join('');
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>White Peak Ski Trips - Booking Confirmation</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: hsl(210 40% 8%); margin: 0; padding: 0; background: hsl(0 0% 100%); }
        .container { max-width: 650px; margin: 20px auto; background-color: hsl(0 0% 100%); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 40px -10px hsl(217 91% 20% / 0.3); }
        .header { background: linear-gradient(135deg, hsl(217 91% 20%) 0%, hsl(270 50% 30%) 50%, hsl(15 86% 55%) 100%); color: hsl(0 0% 98%); padding: 40px 30px; text-align: center; position: relative; }
        .logo { font-size: 32px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.5px; }
        .tagline { font-size: 18px; opacity: 0.9; margin-bottom: 20px; font-weight: 300; }
        .content { padding: 40px 30px; }
        .section { margin-bottom: 35px; padding: 25px; background-color: hsl(210 40% 98%); border-radius: 8px; border-left: 4px solid hsl(217 91% 20%); box-shadow: 0 4px 20px hsl(217 91% 20% / 0.1); }
        .section-title { font-size: 20px; font-weight: 600; color: hsl(217 91% 20%); margin-bottom: 20px; display: flex; align-items: center; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 15px; }
        .info-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid hsl(210 40% 90%); }
        .info-item:last-child { border-bottom: none; }
        .info-label { font-weight: 600; color: hsl(215 16% 47%); min-width: 120px; }
        .info-value { color: hsl(210 40% 8%); text-align: right; font-weight: 500; }
        .next-steps { background: hsl(210 40% 98%); border: 1px solid hsl(210 40% 90%); border-radius: 8px; padding: 25px; margin-top: 35px; border-left: 4px solid hsl(150 60% 45%); }
        .next-steps h3 { color: hsl(217 91% 20%); margin-bottom: 20px; font-size: 20px; font-weight: 600; }
        .next-steps ol { margin: 0; padding-left: 20px; color: hsl(210 40% 8%); }
        .next-steps li { margin-bottom: 12px; font-weight: 500; line-height: 1.5; }
        .footer { background-color: hsl(217 91% 20%); color: hsl(0 0% 98%); padding: 30px; text-align: center; }
        .footer-content { max-width: 400px; margin: 0 auto; }
        .contact-info { margin-top: 20px; font-size: 14px; opacity: 0.8; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } .content { padding: 20px 15px; } .header { padding: 30px 20px; } }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">White Peak Ski Trips</div>
          <div class="tagline">Premium Ski and Snowboard Adventures</div>
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
              ${generateBadges(bookingData.travel.selectedResorts, 'resort')}
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
                ${generateBadges(bookingData.preferences.interests, 'interest')}
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
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">White Peak Ski Trips</div>
            <div class="contact-info">
              <div>📧 info@whitepeaktravel.com</div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// API Routes
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, bookingData } = req.body;

    if (!to || !bookingData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate the HTML email content
    const emailHtml = generateEmailHtml(bookingData);

    if (resend) {
      // Send the email using Resend
      const { data, error } = await resend.emails.send({
        from: 'White Peak Ski Trips <noreply@whitepeaktravel.com>',
        to: [to],
        subject: 'White Peak Ski Trips - Booking Confirmation',
        html: emailHtml,
      });

      if (error) {
        console.error('Resend error:', error);
        return res.status(500).json({ error: 'Failed to send email' });
      }

      console.log('✅ Email sent successfully:', data);
      res.json({ success: true, data });
    } else {
      // Log the email content for testing
      console.log('📧 EMAIL WOULD BE SENT:');
      console.log('To:', to);
      console.log('Subject: White Peak Ski Trips - Booking Confirmation');
      console.log('HTML Content Length:', emailHtml.length, 'characters');
      console.log('📧 END EMAIL LOG');
      
      res.json({ success: true, message: 'Email logged (Resend not configured)' });
    }

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email API available at http://localhost:${PORT}/api/send-email`);
});
