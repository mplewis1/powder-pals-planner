import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Thermometer } from 'lucide-react';
import jacksonHoleImage from '@/assets/jackson-hole.jpg';
import whistlerImage from '@/assets/whistler.jpg';
import chamonixImage from '@/assets/chamonix.jpg';

const DestinationsGallery = () => {
  const [activeRegion, setActiveRegion] = useState('usa');

  const regions = [
    { id: 'usa', name: 'Mountain West USA', count: 5 },
    { id: 'canada', name: 'Canada', count: 5 },
    { id: 'europe', name: 'Europe', count: 6 }
  ];

  const destinations = {
    usa: [
      {
        name: 'Jackson Hole, Wyoming',
        image: jacksonHoleImage,
        description: 'Legendary steep terrain and deep powder in the heart of the Tetons.',
        difficulty: 'Advanced',
        temperature: '-5°C to 2°C',
        rating: 4.9,
        features: ['Steep terrain', 'Powder paradise', 'Luxury resorts']
      },
      {
        name: 'Park City, Utah',
        image: jacksonHoleImage,
        description: 'Two world-class resorts with incredible snow quality and vibrant après-ski.',
        difficulty: 'All Levels',
        temperature: '-8°C to 5°C',
        rating: 4.8,
        features: ['Perfect snow', 'Historic town', 'Olympic venue']
      },
      {
        name: 'Aspen/Snowmass, Colorado',
        image: jacksonHoleImage,
        description: 'Four mountains, endless terrain, and the ultimate luxury ski experience.',
        difficulty: 'All Levels',
        temperature: '-10°C to 3°C',
        rating: 4.9,
        features: ['Luxury amenities', '4 mountains', 'Celebrity spotting']
      },
      {
        name: 'Big Sky, Montana',
        image: jacksonHoleImage,
        description: 'The biggest skiing in America with massive vertical and wide-open runs.',
        difficulty: 'Intermediate+',
        temperature: '-15°C to 0°C',
        rating: 4.7,
        features: ['Huge terrain', 'No crowds', 'Big vertical']
      },
      {
        name: 'Sun Valley, Idaho',
        image: jacksonHoleImage,
        description: 'America\'s first ski resort with perfectly groomed runs and charming village.',
        difficulty: 'All Levels',
        temperature: '-12°C to 2°C',
        rating: 4.6,
        features: ['Historic charm', 'Perfect grooming', 'Sunny days']
      }
    ],
    canada: [
      {
        name: 'Whistler Blackcomb, BC',
        image: whistlerImage,
        description: 'Two massive mountains, world-class village, and legendary après-ski scene.',
        difficulty: 'All Levels',
        temperature: '-5°C to 5°C',
        rating: 4.9,
        features: ['2 mountains', 'Olympic venue', 'Epic village']
      },
      {
        name: 'Banff (Lake Louise), Alberta',
        image: whistlerImage,
        description: 'Stunning Rocky Mountain scenery with pristine powder and luxury lodges.',
        difficulty: 'All Levels',
        temperature: '-20°C to -5°C',
        rating: 4.8,
        features: ['Scenic beauty', 'Castle resort', 'Rocky Mountains']
      },
      {
        name: 'Mont-Tremblant, Quebec',
        image: whistlerImage,
        description: 'European-style village with excellent terrain and vibrant nightlife.',
        difficulty: 'All Levels',
        temperature: '-15°C to -2°C',
        rating: 4.5,
        features: ['European charm', 'Night skiing', 'Great snow']
      },
      {
        name: 'Fernie, BC',
        image: whistlerImage,
        description: 'Deep powder capital with legendary snow quality and friendly locals.',
        difficulty: 'Intermediate+',
        temperature: '-10°C to 0°C',
        rating: 4.7,
        features: ['Powder heaven', 'Tree skiing', 'Local vibe']
      },
      {
        name: 'Blue Mountain, Ontario',
        image: whistlerImage,
        description: 'Eastern Canada\'s premier resort with family-friendly terrain and amenities.',
        difficulty: 'Beginner/Int',
        temperature: '-10°C to 2°C',
        rating: 4.3,
        features: ['Family friendly', 'Village base', 'Great beginner terrain']
      }
    ],
    europe: [
      {
        name: 'Chamonix, France',
        image: chamonixImage,
        description: 'The birthplace of extreme skiing with legendary off-piste and alpine culture.',
        difficulty: 'Advanced',
        temperature: '-8°C to 3°C',
        rating: 4.9,
        features: ['Extreme terrain', 'Alpine history', 'World-class off-piste']
      },
      {
        name: 'St. Anton, Austria',
        image: chamonixImage,
        description: 'Challenging terrain, deep traditions, and the legendary Hahnenkamm downhill.',
        difficulty: 'Advanced',
        temperature: '-10°C to 2°C',
        rating: 4.8,
        features: ['Challenging runs', 'Skiing tradition', 'Epic après-ski']
      },
      {
        name: 'Verbier, Switzerland',
        image: chamonixImage,
        description: 'Vast off-piste terrain, luxury chalets, and sophisticated alpine atmosphere.',
        difficulty: 'Intermediate+',
        temperature: '-5°C to 5°C',
        rating: 4.8,
        features: ['Off-piste paradise', 'Luxury resorts', 'Swiss precision']
      },
      {
        name: 'Val d\'Isère, France',
        image: chamonixImage,
        description: 'High-altitude glacier skiing with reliable snow and extensive terrain.',
        difficulty: 'All Levels',
        temperature: '-12°C to 0°C',
        rating: 4.7,
        features: ['High altitude', 'Reliable snow', 'Extensive terrain']
      },
      {
        name: 'Zermatt, Switzerland',
        image: chamonixImage,
        description: 'Iconic Matterhorn views with year-round glacier skiing and luxury amenities.',
        difficulty: 'All Levels',
        temperature: '-8°C to 2°C',
        rating: 4.9,
        features: ['Matterhorn views', 'Glacier skiing', 'Year-round skiing']
      },
      {
        name: 'Dolomites, Italy',
        image: chamonixImage,
        description: 'UNESCO World Heritage mountain scenery with excellent cuisine and culture.',
        difficulty: 'All Levels',
        temperature: '-5°C to 8°C',
        rating: 4.6,
        features: ['UNESCO scenery', 'Italian cuisine', 'Unique culture']
      }
    ]
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner/Int': return 'bg-green-500';
      case 'All Levels': return 'bg-blue-500';
      case 'Intermediate+': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-background" id="destinations">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            World-Class Ski Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From the legendary slopes of the Alps to the powder paradise of the Rockies, 
            discover the world's most incredible ski destinations.
          </p>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {regions.map((region) => (
            <Button
              key={region.id}
              variant={activeRegion === region.id ? "default" : "outline"}
              onClick={() => setActiveRegion(region.id)}
              className="px-6 py-3"
            >
              {region.name}
              <Badge variant="secondary" className="ml-2">
                {region.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations[activeRegion as keyof typeof destinations].map((destination, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:scale-105 transition-all duration-300 card-shadow hover:alpine-shadow"
            >
              <div className="relative">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">{destination.name}</h3>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm">{destination.rating}</span>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 ${getDifficultyColor(destination.difficulty)} text-white text-xs px-2 py-1 rounded`}>
                  {destination.difficulty}
                </div>
              </div>
              
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {destination.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Thermometer className="h-4 w-4 mr-2" />
                    {destination.temperature}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.features.map((feature, featureIndex) => (
                    <Badge key={featureIndex} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline" className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="mountain-gradient rounded-lg p-8 border">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Don't See Your Dream Destination?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
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