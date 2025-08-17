import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Award, Users } from 'lucide-react';
import heroImage from '@/assets/hero-ski-mountain.jpg';

const HeroSection = () => {
  const trustIndicators = [
    { icon: Star, text: '500+ Successful Trips' },
    { icon: Award, text: 'Expert Snow Travel Planners' },
    { icon: Users, text: '100% Satisfaction Guarantee' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        {/* Overlay gradient */}
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headlines */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Epic Ski Adventures with Your{' '}
              <span className="text-accent glow-animation">Best Buddies</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Custom-designed ski and snowboard trips to the world's most incredible mountains
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 alpine-shadow glow-animation"
            >
              Start Planning Your Trip
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              View Destinations
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 pt-8">
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center space-x-2 text-white/90">
                <indicator.icon className="h-5 w-5 text-accent" />
                <span className="font-medium">{indicator.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
                <div className="text-white/80">Happy Groups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
                <div className="text-white/80">Premium Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">15</div>
                <div className="text-white/80">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating snow effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60 animate-snowfall"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;