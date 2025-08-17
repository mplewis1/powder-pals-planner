import React from 'react';

interface EmailTemplateProps {
  bookingData: any;
}

const EmailTemplate = ({ bookingData }: EmailTemplateProps) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>White Peak Ski Trips - Booking Confirmation</title>
        <style>
          {`
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: #f8fafc;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              font-size: 28px;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .tagline {
              font-size: 16px;
              opacity: 0.9;
              margin-bottom: 20px;
            }
            .content {
              padding: 40px 30px;
            }
            .section {
              margin-bottom: 30px;
              padding: 20px;
              background-color: #f8fafc;
              border-radius: 8px;
              border-left: 4px solid #3b82f6;
            }
            .section-title {
              font-size: 18px;
              font-weight: bold;
              color: #1e40af;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-bottom: 15px;
            }
            .info-item {
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .info-label {
              font-weight: 600;
              color: #4b5563;
              min-width: 80px;
            }
            .info-value {
              color: #1f2937;
            }
            .badge {
              display: inline-block;
              background-color: #e5e7eb;
              color: #374151;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              margin: 2px;
            }
            .next-steps {
              background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
              border: 1px solid #3b82f6;
              border-radius: 8px;
              padding: 20px;
              margin-top: 30px;
            }
            .next-steps h3 {
              color: #1e40af;
              margin-bottom: 15px;
              font-size: 16px;
            }
            .next-steps ul {
              margin: 0;
              padding-left: 20px;
            }
            .next-steps li {
              margin-bottom: 8px;
              color: #1f2937;
            }
            .footer {
              background-color: #1f2937;
              color: white;
              padding: 30px;
              text-align: center;
            }
            .footer-content {
              max-width: 400px;
              margin: 0 auto;
            }
            .contact-info {
              margin-top: 20px;
              font-size: 14px;
              opacity: 0.8;
            }
            @media (max-width: 600px) {
              .info-grid {
                grid-template-columns: 1fr;
              }
              .content {
                padding: 20px 15px;
              }
              .header {
                padding: 30px 20px;
              }
            }
          `}
        </style>
      </head>
      <body>
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="logo">White Peak Ski Trips</div>
            <div className="tagline">Your Alpine Adventure Awaits</div>
          </div>

          {/* Content */}
          <div className="content">
            <h1 style={{ color: '#1e40af', marginBottom: '20px' }}>
              Thank You for Your Ski Adventure Request!
            </h1>
            
            <p style={{ fontSize: '16px', marginBottom: '30px', color: '#4b5563' }}>
              We've received your booking request and are excited to create the perfect ski experience for your group. 
              Our expert team will review your preferences and get back to you within 24 hours with a personalized itinerary.
            </p>

            {/* Client Information */}
            <div className="section">
              <div className="section-title">Client Information</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{bookingData.client.name}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{bookingData.client.email}</span>
                </div>
                {bookingData.client.phone && (
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{bookingData.client.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trip Details */}
            <div className="section">
              <div className="section-title">Trip Details</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Group Size:</span>
                  <span className="info-value">{bookingData.group.numberOfPeople} people</span>
                </div>
                {bookingData.group.numberOfRooms && (
                  <div className="info-item">
                    <span className="info-label">Rooms:</span>
                    <span className="info-value">{bookingData.group.numberOfRooms} rooms</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">Ski Days:</span>
                  <span className="info-value">{bookingData.group.numberOfSkiDays} days</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Travel Dates:</span>
                  <span className="info-value">
                    {new Date(bookingData.travel.startDate).toLocaleDateString()} - {new Date(bookingData.travel.endDate).toLocaleDateString()}
                  </span>
                </div>
                {bookingData.group.hasMinors && bookingData.group.minorAges.length > 0 && (
                  <div className="info-item">
                    <span className="info-label">Minors:</span>
                    <span className="info-value">Ages: {bookingData.group.minorAges.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Selected Destinations */}
            {bookingData.travel.selectedResorts.length > 0 && (
              <div className="section">
                <div className="section-title">Selected Destinations</div>
                <div style={{ marginBottom: '10px' }}>
                  {bookingData.travel.selectedResorts.map((resort: string) => (
                    <span key={resort} className="badge">{resort}</span>
                  ))}
                </div>
                {bookingData.travel.specificLocations && (
                  <div style={{ marginTop: '10px' }}>
                    <strong>Additional Locations:</strong> {bookingData.travel.specificLocations}
                  </div>
                )}
              </div>
            )}

            {/* Budget Information */}
            <div className="section">
              <div className="section-title">Budget Information</div>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Budget Range:</span>
                  <span className="info-value">{bookingData.budget.range}</span>
                </div>
              </div>
              {bookingData.budget.details && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Additional Details:</strong> {bookingData.budget.details}
                </div>
              )}
            </div>

            {/* Interests & Preferences */}
            <div className="section">
              <div className="section-title">Interests & Preferences</div>
              {bookingData.preferences.interests.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>Selected Activities:</strong>
                  <div style={{ marginTop: '8px' }}>
                    {bookingData.preferences.interests.map((interest: string) => (
                      <span key={interest} className="badge">{interest}</span>
                    ))}
                  </div>
                </div>
              )}
              {bookingData.preferences.pastExperiences && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Past Experiences:</strong> {bookingData.preferences.pastExperiences}
                </div>
              )}
              {bookingData.preferences.preferredHotels && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Preferred Hotels:</strong> {bookingData.preferences.preferredHotels}
                </div>
              )}
              {bookingData.preferences.specialRequirements && (
                <div style={{ marginBottom: '10px' }}>
                  <strong>Special Requirements:</strong> {bookingData.preferences.specialRequirements}
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="next-steps">
              <h3>What Happens Next?</h3>
              <ul>
                <li>Our expert team will review your preferences and create a personalized itinerary</li>
                <li>You'll receive a detailed quote within 24 hours</li>
                <li>We'll coordinate all logistics including accommodations, lift tickets, and activities</li>
                <li>Your dedicated travel specialist will be available throughout the planning process</li>
              </ul>
            </div>

            <p style={{ marginTop: '30px', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
              <strong>Booking Reference:</strong> {bookingData.id}
            </p>
          </div>

          {/* Footer */}
          <div className="footer">
            <div className="footer-content">
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
                White Peak Ski Trips
              </div>
              <div style={{ fontSize: '14px', opacity: '0.8', marginBottom: '20px' }}>
                Creating unforgettable alpine adventures since 2010
              </div>
              <div className="contact-info">
                <div>📧 info@whitepeakskitrips.com</div>
                <div>📞 +1 (555) 123-4567</div>
                <div>🌐 www.whitepeakskitrips.com</div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default EmailTemplate;
