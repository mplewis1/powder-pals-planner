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
      <title>White Peak Travel - Booking Confirmation</title>
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
          <div class="logo" style="font-size: 32px; font-weight: 700; margin-bottom: 10px; letter-spacing: -0.5px;">White Peak Travel</div>
          <div class="tagline">Premium Ski and Snowboard Adventures</div>
        </div>
        
        <div class="content">
          <h1 style="color: #1e40af; margin-bottom: 20px;">Thank You for Your Ski Adventure Request!</h1>
          
          <p style="font-size: 16px; margin-bottom: 30px; color: #4b5563;">
            We've received your booking request and are excited to create the perfect ski experience for your group. 
            Our expert team will review your preferences and get back to you within 24 hours with a personalized itinerary.
          </p>

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
            <div style="font-size: 18px; font-weight: bold; margin-bottom: 10px;">White Peak Travel</div>
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

// DMC Inquiry Email Generation Function
const generateDmcInquiryEmail = (bookingData) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
      <title>Ski Trip Inquiry</title>
             <style>
         body { 
           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
           line-height: 1.6; 
           color: #2d3748; 
           margin: 0; 
           padding: 0; 
           background: #ffffff;
         }
         .container { 
           max-width: 700px; 
           margin: 20px auto; 
           background-color: #ffffff; 
           border: 1px solid #e2e8f0;
           border-radius: 4px;
         }
         .header { 
           background: #1e40af; 
           color: #ffffff; 
           padding: 25px 30px; 
           text-align: center; 
           border-bottom: 1px solid #e2e8f0;
         }
         .content { 
           padding: 30px; 
         }
         .intro {
           background: #f7fafc;
           border: 1px solid #e2e8f0;
           border-radius: 4px;
           padding: 20px;
           margin-bottom: 25px;
           border-left: 4px solid #38a169;
         }
         .section { 
           margin-bottom: 25px; 
           background-color: #f7fafc; 
           border: 1px solid #e2e8f0;
           border-radius: 4px; 
           padding: 20px;
         }
         .section-title { 
           font-size: 16px; 
           font-weight: 600; 
           color: #1e40af; 
           margin-bottom: 15px; 
           text-transform: uppercase;
           letter-spacing: 0.5px;
           border-bottom: 2px solid #1e40af;
           padding-bottom: 5px;
         }
         .info-grid { 
           display: grid; 
           grid-template-columns: 1fr 1fr; 
           gap: 15px; 
           margin-bottom: 15px; 
         }
         .info-item { 
           display: flex; 
           justify-content: space-between;
           align-items: center;
           padding: 8px 0;
           border-bottom: 1px solid #e2e8f0;
         }
         .info-item:last-child {
           border-bottom: none;
         }
         .info-label { 
           font-weight: 600; 
           color: #4a5568; 
           min-width: 120px;
         }
         .info-value { 
           color: #2d3748; 
           text-align: right;
           font-weight: 500;
         }
         .footer { 
           background-color: #1e40af; 
           color: #ffffff; 
           padding: 20px; 
           text-align: center; 
           font-size: 14px;
           border-top: 1px solid #e2e8f0;
         }
         .tag {
           display: inline-block;
           background: #38a169;
           color: #ffffff;
           padding: 4px 8px;
           border-radius: 3px;
           font-size: 12px;
           font-weight: 500;
           margin: 2px;
         }
         .next-steps {
           background: #f0fff4;
           border: 1px solid #9ae6b4;
           border-radius: 4px;
           padding: 20px;
           margin-top: 25px;
         }
         .reference-box {
           background: #edf2f7;
           border: 1px solid #cbd5e0;
           border-radius: 4px;
           padding: 15px;
           margin-top: 25px;
           text-align: center;
         }
         @media (max-width: 600px) { 
           .info-grid { 
             grid-template-columns: 1fr; 
           } 
           .content { 
             padding: 20px; 
           } 
           .header { 
             padding: 20px; 
           }
           .info-item {
             flex-direction: column;
             align-items: flex-start;
             text-align: left;
           }
           .info-value {
             text-align: left;
             margin-top: 4px;
           }
         }
       </style>
    </head>
    <body>
             <div class="container">
         <div class="header">
           <h1 style="margin: 0; font-size: 24px; font-weight: 700;">Alpine Adventures Ski Trip Inquiry</h1>
           <p style="margin: 10px 0 0 0; opacity: 0.9;">White Peak Travel - Fora Advisor Request</p>
         </div>
         
         <div class="content">
           <div class="intro">
             <p style="margin: 0; color: #2d3748; font-size: 16px; line-height: 1.6;">
               <strong>Dear Alpine Adventures Team,</strong><br><br>
               My name is Matthew Lewis, and I am a Fora advisor (IATA: 33520476). I am reaching out on behalf of my client for a ski trip inquiry. Please see the details below:
             </p>
           </div>

           

                     <div class="section">
             <div class="section-title">GROUP DETAILS</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Group Size:</span>
                <span class="info-value">${bookingData.group.numberOfPeople} people</span>
              </div>
              ${bookingData.group.numberOfRooms ? `
              <div class="info-item">
                <span class="info-label">Rooms Needed:</span>
                <span class="info-value">${bookingData.group.numberOfRooms} rooms</span>
              </div>
              ` : ''}
              <div class="info-item">
                <span class="info-label">Ski Days:</span>
                <span class="info-value">${bookingData.group.numberOfSkiDays} days</span>
              </div>
              ${bookingData.group.hasMinors && bookingData.group.minorAges.length > 0 ? `
              <div class="info-item">
                <span class="info-label">Minors:</span>
                <span class="info-value">Ages: ${bookingData.group.minorAges.join(', ')}</span>
              </div>
              ` : ''}
            </div>
          </div>

                     <div class="section">
             <div class="section-title">TRAVEL DATES & DESTINATIONS</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Arrival:</span>
                <span class="info-value">${formatDate(bookingData.travel.startDate)}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Departure:</span>
                <span class="info-value">${formatDate(bookingData.travel.endDate)}</span>
              </div>
            </div>
            ${bookingData.travel.selectedResorts.length > 0 ? `
            <div style="margin-top: 15px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 8px;">Requested Resorts:</div>
              <div style="margin-bottom: 8px;">
                ${generateBadges(bookingData.travel.selectedResorts, 'resort')}
              </div>
            </div>
            ` : ''}
            ${bookingData.travel.specificLocations ? `
            <div style="margin-top: 10px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 5px;">Additional Locations:</div>
              <div style="color: hsl(210 40% 8%);">${bookingData.travel.specificLocations}</div>
            </div>
            ` : ''}
          </div>

                     <div class="section">
             <div class="section-title">BUDGET INFORMATION</div>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Budget Range:</span>
                <span class="info-value"><strong>${bookingData.budget.range}</strong></span>
              </div>
            </div>
            ${bookingData.budget.details ? `
            <div style="margin-top: 10px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 5px;">Additional Details:</div>
              <div style="color: hsl(210 40% 8%);">${bookingData.budget.details}</div>
            </div>
            ` : ''}
          </div>

                     <div class="section">
             <div class="section-title">INTERESTS & PREFERENCES</div>
            ${bookingData.preferences.interests.length > 0 ? `
            <div style="margin-bottom: 15px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 8px;">Requested Activities:</div>
              <div>
                ${generateBadges(bookingData.preferences.interests, 'interest')}
              </div>
            </div>
            ` : ''}
            ${bookingData.preferences.pastExperiences ? `
            <div style="margin-bottom: 10px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 5px;">Past Experiences:</div>
              <div style="color: hsl(210 40% 8%);">${bookingData.preferences.pastExperiences}</div>
            </div>
            ` : ''}
            ${bookingData.preferences.preferredHotels ? `
            <div style="margin-bottom: 10px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 5px;">Preferred Hotels:</div>
              <div style="color: hsl(210 40% 8%);">${bookingData.preferences.preferredHotels}</div>
            </div>
            ` : ''}
            ${bookingData.preferences.specialRequirements ? `
            <div style="margin-bottom: 10px;">
              <div style="font-weight: 600; color: hsl(215 16% 47%); margin-bottom: 5px;">Special Requirements:</div>
              <div style="color: hsl(210 40% 8%);">${bookingData.preferences.specialRequirements}</div>
            </div>
            ` : ''}
          </div>

          <div class="next-steps">
            <p style="margin: 0; color: #2d3748; font-size: 16px; line-height: 1.6;">
              <strong>Next Steps Requested:</strong><br>
              Please provide a detailed quote including accommodations, lift tickets, transfers, and any additional services that would enhance this ski experience. I look forward to working with you on behalf of my client.
            </p>
          </div>

          <div class="reference-box">
            <p style="margin: 0; color: #4a5568; font-size: 14px;">
              <strong>Booking Reference:</strong> ${bookingData.id}<br>
              <strong>Inquiry Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;">
            <strong>Matthew Lewis</strong> | Fora Advisor (IATA: 33520476)<br>
            Email: matthew.lewis@fora.travel<br>
            White Peak Travel
          </p>
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
      // Generate the DMC inquiry email
      const dmcEmailHtml = generateDmcInquiryEmail(bookingData);
      
      // Send confirmation email to client
      const { data: clientData, error: clientError } = await resend.emails.send({
        from: 'White Peak Travel <noreply@whitepeaktravel.com>',
        to: [to],
        subject: 'White Peak Travel - Booking Confirmation',
        html: emailHtml,
      });

      if (clientError) {
        console.error('Resend error (client email):', clientError);
        return res.status(500).json({ error: 'Failed to send client email' });
      }

      // Send DMC inquiry email to Matthew
      const { data: dmcData, error: dmcError } = await resend.emails.send({
        from: 'White Peak Travel <noreply@whitepeaktravel.com>',
        to: ['matthew.lewis@fora.travel'],
        subject: `Ski Trip Inquiry - ${bookingData.client.name} - ${bookingData.group.numberOfPeople} people - ${bookingData.travel.startDate} to ${bookingData.travel.endDate}`,
        html: dmcEmailHtml,
      });

      if (dmcError) {
        console.error('Resend error (DMC email):', dmcError);
        // Don't fail the request if DMC email fails, just log it
        console.log('⚠️ DMC email failed but client email sent successfully');
      }

      console.log('✅ Client email sent successfully:', clientData);
      if (dmcData) {
        console.log('✅ DMC inquiry email sent successfully:', dmcData);
      }
      
      res.json({ success: true, clientData, dmcData });
    } else {
      // Log the email content for testing
      console.log('📧 CLIENT EMAIL WOULD BE SENT:');
      console.log('To:', to);
      console.log('Subject: White Peak Travel - Booking Confirmation');
      console.log('HTML Content Length:', emailHtml.length, 'characters');
      console.log('📧 END CLIENT EMAIL LOG');

      const dmcEmailHtml = generateDmcInquiryEmail(bookingData);
      console.log('📧 DMC INQUIRY EMAIL WOULD BE SENT:');
      console.log('To: matthew.lewis@fora.travel');
      console.log('Subject: Ski Trip Inquiry - ' + bookingData.client.name + ' - ' + bookingData.group.numberOfPeople + ' people - ' + bookingData.travel.startDate + ' to ' + bookingData.travel.endDate);
      console.log('HTML Content Length:', dmcEmailHtml.length, 'characters');
      console.log('📧 END DMC EMAIL LOG');

      res.json({ success: true, message: 'Emails logged (Resend not configured)' });
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
