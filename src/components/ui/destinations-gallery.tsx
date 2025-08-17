import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import jacksonHoleImage from '@/assets/jackson-hole.jpg';
import aspenImage from '@/assets/aspen.jpg';
import utahImage from '@/assets/utah.jpg';
import californiaImage from '@/assets/california.jpg';
import nevadaImage from '@/assets/nevada.jpg';
import montanaImage from '@/assets/montana.jpg';
import vermontImage from '@/assets/vermont.jpg';
import idahoImage from '@/assets/idaho.jpg';
import oregonImage from '@/assets/oregon.jpg';
import whistlerImage from '@/assets/whistler.jpg';
import banffImage from '@/assets/banff.jpg';
import louiseImage from '@/assets/louise.jpg';
import tremblantImage from '@/assets/tremblant.jpg';
import chamonixImage from '@/assets/chamonix.jpg';
import italyImage from '@/assets/italy.jpg';
import swissImage from '@/assets/swiss.jpg';
import inssbruckImage from '@/assets/inssbruck.jpg';
import germanyImage from '@/assets/germany.jpg';
import andorraImage from '@/assets/andorra.jpg';
import bulgariaImage from '@/assets/bulgaria.jpg';
import spainImage from '@/assets/spain.jpg';

const DestinationsGallery = () => {
  const [activeRegion, setActiveRegion] = useState('usa');

  const regions = [
    { id: 'usa', name: 'United States', count: 25 },
    { id: 'canada', name: 'Canada', count: 4 },
    { id: 'europe', name: 'Europe', count: 8 }
  ];

  const destinations = {
    usa: [
      {
        name: 'Colorado',
        image: aspenImage,
        description: 'Aspen, Beaver Creek, Breckenridge, Copper Mountain, Crested Butte, Keystone, Snowmass, Steamboat, Telluride, Vail, Winter Park',
        difficulty: 'All Levels',
        temperature: '-15°C to 8°C',
        rating: 4.8,
        features: ['High altitude', 'Champagne powder']
      },
      {
        name: 'Utah',
        image: utahImage,
        description: 'Park City, Sundance, Deer Valley Resort, Silver Lake Village',
        difficulty: 'All Levels',
        temperature: '-8°C to 5°C',
        rating: 4.7,
        features: ['Perfect snow', 'Olympic venues']
      },
      {
        name: 'California',
        image: californiaImage,
        description: 'Northstar, Squaw Valley (Palisades Tahoe), Heavenly',
        difficulty: 'All Levels',
        temperature: '-5°C to 8°C',
        rating: 4.6,
        features: ['Lake Tahoe', 'Year-round skiing']
      },
      {
        name: 'Nevada',
        image: nevadaImage,
        description: 'Reno (Lake Tahoe area resorts)',
        difficulty: 'All Levels',
        temperature: '-2°C to 10°C',
        rating: 4.4,
        features: ['Gaming', 'Entertainment', 'Tahoe access']
      },
      {
        name: 'Wyoming',
        image: jacksonHoleImage,
        description: 'Jackson Hole',
        difficulty: 'Advanced',
        temperature: '-5°C to 2°C',
        rating: 4.9,
        features: ['Steep terrain', 'Powder paradise', 'Luxury resorts']
      },
      {
        name: 'Montana',
        image: montanaImage,
        description: 'Big Sky, Whitefish',
        difficulty: 'All Levels',
        temperature: '-15°C to 1°C',
        rating: 4.7,
        features: ['Huge terrain', 'No crowds']
      },
      {
        name: 'Vermont',
        image: vermontImage,
        description: 'Stowe, Jay Peak, Sugarbush, Killington',
        difficulty: 'All Levels',
        temperature: '-18°C to 3°C',
        rating: 4.6,
        features: ['New England charm', 'Legendary powder']
      },
      {
        name: 'Idaho',
        image: idahoImage,
        description: 'Sun Valley',
        difficulty: 'All Levels',
        temperature: '-12°C to 2°C',
        rating: 4.6,
        features: ['Historic charm', 'Perfect grooming', 'Sunny days']
      },
      {
        name: 'Oregon',
        image: oregonImage,
        description: 'Sunriver',
        difficulty: 'All Levels',
        temperature: '-8°C to 5°C',
        rating: 4.4,
        features: ['Pacific Northwest', 'Cross-country', 'Alpine skiing']
      }
    ],
    canada: [
      {
        name: 'Whistler',
        image: whistlerImage,
        description: 'Two massive mountains, world-class village, and legendary après-ski scene.',
        difficulty: 'All Levels',
        temperature: '-5°C to 5°C',
        rating: 4.9,
        features: ['2 mountains', 'Olympic venue', 'Epic village']
      },
      {
        name: 'Banff',
        image: banffImage,
        description: 'Stunning Rocky Mountain scenery with pristine powder and luxury lodges.',
        difficulty: 'All Levels',
        temperature: '-20°C to -5°C',
        rating: 4.8,
        features: ['Scenic beauty', 'Castle resort', 'Rocky Mountains']
      },
      {
        name: 'Lake Louise',
        image: louiseImage,
        description: 'Iconic Canadian resort with stunning lake views and excellent terrain.',
        difficulty: 'All Levels',
        temperature: '-20°C to -5°C',
        rating: 4.8,
        features: ['Iconic views', 'Excellent terrain', 'Rocky Mountains']
      },
      {
        name: 'Mont Tremblant',
        image: tremblantImage,
        description: 'European-style village with excellent terrain and vibrant nightlife.',
        difficulty: 'All Levels',
        temperature: '-15°C to -2°C',
        rating: 4.5,
        features: ['European charm', 'Night skiing', 'Great snow']
      }
    ],
    europe: [
      {
        name: 'France',
        image: chamonixImage,
        description: 'Alpe d\'Huez, Avoriaz 1800, Chamonix, Courchevel, La Plagne, La Rosière, Les Deux Alpes, Les Arcs, Les Gets, Megève, Méribel, Morzine, Tignes, Val d\'Isère, Val Thorens',
        difficulty: 'All Levels',
        temperature: '-8°C to 3°C',
        rating: 4.9,
        features: ['Alpine history', 'World-class off-piste']
      },
      {
        name: 'Italy',
        image: italyImage,
        description: 'Cortina d\'Ampezzo, Bormio, Madonna-di-Campiglio, Courmayeur, Cervinia, Livigno, Sestriere, Val Gardena',
        difficulty: 'All Levels',
        temperature: '-5°C to 8°C',
        rating: 4.7,
        features: ['UNESCO scenery', 'Italian cuisine']
      },
      {
        name: 'Switzerland',
        image: swissImage,
        description: 'Zermatt',
        difficulty: 'All Levels',
        temperature: '-5°C to 5°C',
        rating: 4.8,
        features: ['Swiss precision', 'Luxury resorts', 'Matterhorn views']
      },
      {
        name: 'Austria',
        image: inssbruckImage,
        description: 'Sölden, St. Anton, Innsbruck area (Igls, Patscherkofel, Axamer Lizum, Stubai Glacier), Seefeld, Schladming, Kitzbühel, Zürs',
        difficulty: 'All Levels',
        temperature: '-10°C to 2°C',
        rating: 4.8,
        features: ['Alpine tradition', 'Epic après-ski']
      },
      {
        name: 'Germany',
        image: germanyImage,
        description: 'Garmisch-Partenkirchen, Brauneck-Wegscheid, Spitzingsee-Tegernsee, Sudelfeld-Bayrischzell',
        difficulty: 'All Levels',
        temperature: '-8°C to 5°C',
        rating: 4.6,
        features: ['German efficiency', 'Excellent infrastructure']
      },
      {
        name: 'Andorra',
        image: andorraImage,
        description: 'Small country with excellent skiing, duty-free shopping, and great value.',
        difficulty: 'All Levels',
        temperature: '-5°C to 8°C',
        rating: 4.5,
        features: ['Duty-free shopping', 'Great value', 'Excellent skiing']
      },
      {
        name: 'Bulgaria',
        image: bulgariaImage,
        description: 'Eastern European skiing with excellent value and authentic mountain culture.',
        difficulty: 'All Levels',
        temperature: '-8°C to 3°C',
        rating: 4.3,
        features: ['Great value', 'Authentic culture', 'Eastern European charm']
      },
      {
        name: 'Spain',
        image: spainImage,
        description: 'Pyrenees skiing with Spanish culture and excellent après-ski scene.',
        difficulty: 'All Levels',
        temperature: '-5°C to 8°C',
        rating: 4.4,
        features: ['Pyrenees', 'Spanish culture', 'Great après-ski']
      }
    ]
  };

  const getResortCount = (destination: any) => {
    const description = destination.description;
    if (description.includes('resorts')) {
      const match = description.match(/(\d+)\s*resorts?/);
      return match ? match[1] : '1';
    }
    // Count commas + 1 for individual resort names
    const commaCount = (description.match(/,/g) || []).length;
    return commaCount > 0 ? (commaCount + 1).toString() : '1';
  };

  return (
    <section className="py-16 bg-background" id="destinations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            World-Class Ski Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From the legendary slopes of the Alps to the powder paradise of the Rockies, 
            discover the world's most incredible ski destinations.
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={activeRegion === region.id ? "default" : "outline"}
              onClick={() => setActiveRegion(region.id)}
              className="px-4 py-2 text-sm"
            >
              {region.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {region.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations[activeRegion as keyof typeof destinations].map((destination, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:scale-105 transition-all duration-300 card-shadow hover:alpine-shadow h-full flex flex-col"
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-base font-bold">{destination.name}</h3>
                </div>
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  {getResortCount(destination)}
                </div>
              </div>
              
              <CardContent className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-4">
                    {destination.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {destination.features.map((feature, featureIndex) => (
                      <Badge key={featureIndex} variant="secondary" className="text-xs px-2 py-1">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200 mt-auto">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="mountain-gradient rounded-lg p-6 border">
            <h3 className="text-xl font-bold text-primary mb-3">
              Don't See Your Dream Destination?
            </h3>
            <p className="text-muted-foreground mb-4 max-w-xl mx-auto text-sm">
              We specialize in custom ski adventures worldwide. Tell us where you want to go, 
              and we'll create the perfect itinerary for your group.
            </p>
            <Button variant="default" size="lg" className="alpine-shadow">
              Request Custom Destination
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationsGallery;