import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import jacksonHoleImage from '@/assets/jackson-hole.jpg';

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const blogPosts = [
    {
      id: 1,
      title: 'Ultimate Guide to Planning Your First Ski Trip',
      excerpt: 'Everything you need to know about planning the perfect ski vacation, from choosing the right destination to packing essentials.',
      image: jacksonHoleImage,
      category: 'Planning',
      readTime: '5 min read',
      date: 'Dec 15, 2024',
      author: 'White Peak Team'
    },
    {
      id: 2,
      title: 'Top 10 Après-Ski Activities for Your Group',
      excerpt: 'Discover the best ways to unwind and celebrate after a day on the slopes with your ski buddies.',
      image: jacksonHoleImage,
      category: 'Lifestyle',
      readTime: '4 min read',
      date: 'Dec 12, 2024',
      author: 'White Peak Team'
    },
    {
      id: 3,
      title: 'Ski Trip Packing List: Don\'t Forget These Essentials',
      excerpt: 'A comprehensive packing guide to ensure you have everything you need for a comfortable and enjoyable ski vacation.',
      image: jacksonHoleImage,
      category: 'Tips',
      readTime: '6 min read',
      date: 'Dec 10, 2024',
      author: 'White Peak Team'
    },
    {
      id: 4,
      title: 'Best Ski Destinations for Beginners in 2025',
      excerpt: 'Our top picks for first-time skiers looking to learn and have fun on gentle slopes with excellent ski schools.',
      image: jacksonHoleImage,
      category: 'Destinations',
      readTime: '7 min read',
      date: 'Dec 8, 2024',
      author: 'White Peak Team'
    },
    {
      id: 5,
      title: 'Group Ski Trip Budget Planning Made Easy',
      excerpt: 'Learn how to plan and budget for your group ski vacation without breaking the bank.',
      image: jacksonHoleImage,
      category: 'Planning',
      readTime: '5 min read',
      date: 'Dec 5, 2024',
      author: 'White Peak Team'
    },
    {
      id: 6,
      title: 'Ski Safety Tips for Every Skill Level',
      excerpt: 'Essential safety guidelines to keep you and your group safe on the mountain this season.',
      image: jacksonHoleImage,
      category: 'Safety',
      readTime: '4 min read',
      date: 'Dec 3, 2024',
      author: 'White Peak Team'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === blogPosts.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogPosts.length - 3 : prevIndex - 1
    );
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + 3);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get insider tips, destination guides, and expert advice to make your ski adventures unforgettable.
          </p>
        </div>

        {/* Blog Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/80 backdrop-blur-sm border-2 hover:bg-background"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visiblePosts.map((post) => (
              <Card 
                key={post.id} 
                className="group overflow-hidden hover:scale-105 transition-all duration-300 card-shadow hover:alpine-shadow"
              >
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 text-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center text-xs text-muted-foreground mb-3 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-200">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      By {post.author}
                    </span>
                    <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-200">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(blogPosts.length / 3) }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * 3)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentIndex === i * 3 ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* View All Posts CTA */}
        <div className="text-center mt-12">
          <Button variant="default" size="lg" className="alpine-shadow">
            View All Blog Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
