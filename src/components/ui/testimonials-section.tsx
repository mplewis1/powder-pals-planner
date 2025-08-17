import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import skiBuddiesImage from '@/assets/ski-buddies-group.jpg';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Mike & The Powder Squad',
      location: 'Jackson Hole, Wyoming',
      rating: 5,
      text: 'Best Buddies planned our bachelor party ski trip to Jackson Hole and it was absolutely epic! They handled everything from lift tickets to the perfect mountain lodge. The powder was deep and the memories even deeper!',
      image: skiBuddiesImage,
      groupSize: '8 friends'
    },
    {
      name: 'Sarah\'s Corporate Retreat',
      location: 'Whistler, BC',
      rating: 5,
      text: 'Our company retreat to Whistler was flawless thanks to Best Buddies. They coordinated lessons for our mixed-ability team and the après-ski activities were perfect for team building. Already booking next year!',
      image: skiBuddiesImage,
      groupSize: '15 colleagues'
    },
    {
      name: 'The College Crew',
      location: 'Chamonix, France',
      rating: 5,
      text: 'We wanted to ski the legendary Vallée Blanche and Best Buddies made it happen! The local guides they arranged were incredible and the off-piste skiing was life-changing. Worth every penny!',
      image: skiBuddiesImage,
      groupSize: '6 friends'
    },
    {
      name: 'Johnson Family Adventure',
      location: 'Park City, Utah',
      rating: 5,
      text: 'Mixed skill levels in our family group but Best Buddies found the perfect resort. Kids loved the beginner slopes while dad tackled the double blacks. Everyone had their perfect ski day!',
      image: skiBuddiesImage,
      groupSize: 'Family of 6'
    }
  ];

  const stats = [
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '500+', label: 'Successful Trips' },
    { number: '4.9/5', label: 'Average Rating' },
    { number: '15+', label: 'Years Experience' }
  ];

  return (
    <section className="py-20 bg-muted/30" id="testimonials">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Fresh Tracks Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real adventures from real ski buddies. See why groups choose us for their 
            mountain adventures and powder day dreams.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:scale-105 transition-all duration-300 card-shadow hover:alpine-shadow"
            >
              <CardContent className="p-8">
                <div className="flex items-start mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {testimonial.location} • {testimonial.groupSize}
                    </p>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-accent/20" />
                  <p className="text-muted-foreground italic pl-6">
                    {testimonial.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="bg-accent-gradient rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Hundreds of Happy Ski Groups</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              From first-time skiers to powder hounds, we create unforgettable mountain experiences 
              that bring friends closer together on the world's best slopes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-300 fill-current" />
                <span className="font-semibold">4.9/5 on Google Reviews</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-white/30"></div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">100% Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Trip Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-primary text-center mb-8">
            Just Returned: Fresh Powder Reports
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card p-6 rounded-lg border text-center">
              <div className="text-accent font-bold text-lg mb-2">Jackson Hole</div>
              <div className="text-2xl font-bold text-primary mb-1">18"</div>
              <div className="text-sm text-muted-foreground">Fresh snow this week</div>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <div className="text-accent font-bold text-lg mb-2">Whistler</div>
              <div className="text-2xl font-bold text-primary mb-1">Perfect</div>
              <div className="text-sm text-muted-foreground">Bluebird conditions</div>
            </div>
            <div className="bg-card p-6 rounded-lg border text-center">
              <div className="text-accent font-bold text-lg mb-2">Chamonix</div>
              <div className="text-2xl font-bold text-primary mb-1">Epic</div>
              <div className="text-sm text-muted-foreground">Off-piste paradise</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;