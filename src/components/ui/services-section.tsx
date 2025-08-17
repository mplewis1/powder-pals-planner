import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MapPin, 
  Mountain, 
  Calendar, 
  Users, 
  Compass,
  Snowflake 
} from 'lucide-react';
import BookingForm from './booking-form';

const ServicesSection = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const services = [
    {
      icon: Calendar,
      title: 'Custom Itineraries',
      description: 'Personalized ski experiences tailored to your group\'s skill level and preferences.',
      features: ['Skill-based planning', 'Custom scheduling', 'Activity coordination']
    },
    {
      icon: Mountain,
      title: 'World-Class Resorts',
      description: 'Access to premium ski destinations and mountain lodges across the globe.',
      features: ['Premium locations', 'Luxury accommodations', 'Exclusive access']
    },
    {
      icon: Snowflake,
      title: 'Full-Service Planning',
      description: 'Lift tickets, accommodation, equipment rentals, and après-ski activities.',
      features: ['All-inclusive packages', 'Equipment rentals', 'Activity booking']
    },
    {
      icon: Users,
      title: 'Group Coordination',
      description: 'Perfect for family trips, large groups, and corporate retreats.',
      features: ['Group discounts', 'Event coordination', 'Team building']
    },
    {
      icon: Compass,
      title: 'Local Expertise',
      description: 'Insider knowledge of the best snow conditions and hidden gems.',
      features: ['Local guides', 'Insider tips', 'Hidden spots']
    },
    {
      icon: MapPin,
      title: 'Global Destinations',
      description: 'From Alps to Rockies, we cover the world\'s best ski destinations.',
      features: ['Worldwide coverage', 'Multi-resort trips', 'Regional packages']
    }
  ];

  return (
    <section className="py-20 bg-secondary/30" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Your Complete Ski Adventure Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From planning to powder days, we handle every detail so you can focus on 
            making memories on the mountain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 card-shadow hover:alpine-shadow"
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                    <service.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                </div>
                
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-accent-gradient rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Hit the Slopes?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Let our expert team create the perfect ski adventure for your group. 
              From beginners to black diamond experts, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-accent px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors duration-200" onClick={() => setIsBookingFormOpen(true)}>
                Get Custom Quote
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors duration-200">
                <a href='#destinations'>Browse Destinations</a>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Modal */}
      <BookingForm 
        isOpen={isBookingFormOpen} 
        onClose={() => setIsBookingFormOpen(false)} 
      />
    </section>
  );
};

export default ServicesSection;