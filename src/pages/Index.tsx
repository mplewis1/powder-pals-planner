import React from 'react';
import Navigation from '@/components/ui/navigation';
import HeroSection from '@/components/ui/hero-section';
import ServicesSection from '@/components/ui/services-section';
import DestinationsGallery from '@/components/ui/destinations-gallery';
import ChatWidget from '@/components/ui/chat-widget';
import TestimonialsSection from '@/components/ui/testimonials-section';
import Footer from '@/components/ui/footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <DestinationsGallery />
      <TestimonialsSection />
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
