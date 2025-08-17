import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mountain, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Twitter,
  Award,
  Shield
} from 'lucide-react';

const Footer = () => {
  const quickDestinations = {
    usa: ['Jackson Hole, WY', 'Park City, UT', 'Aspen, CO', 'Big Sky, MT'],
    canada: ['Whistler, BC', 'Banff, AB', 'Mont-Tremblant, QC', 'Fernie, BC'],
    europe: ['Chamonix, France', 'St. Anton, Austria', 'Verbier, Switzerland', 'Zermatt, Switzerland']
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8" id="contact">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-accent" />
              <div>
                <h3 className="text-xl font-bold">Best Buddies</h3>
                <p className="text-sm opacity-80">Ski Trips</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 leading-relaxed">
              Creating unforgettable ski adventures for groups since 2008. From powder days 
              to après-ski memories, we turn mountain dreams into reality.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent" />
                <span>1-800-SKI-TRIP</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent" />
                <span>hello@bestbuddiesskitrips.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span>Denver, CO & Whistler, BC</span>
              </div>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Popular Destinations</h4>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-accent font-medium mb-2">USA</h5>
                <ul className="space-y-1">
                  {quickDestinations.usa.map((dest, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {dest}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-accent font-medium mb-2">Canada</h5>
                <ul className="space-y-1">
                  {quickDestinations.canada.slice(0, 2).map((dest, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="text-primary-foreground/80 hover:text-accent transition-colors duration-200 text-sm"
                      >
                        {dest}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Services & About */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Custom Itineraries</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Group Coordination</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Equipment Rentals</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Lift Tickets</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Après-Ski Activities</a></li>
            </ul>

            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">FAQ</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Terms & Conditions</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Ski Trip Deals & Snow Reports</h4>
            <p className="text-primary-foreground/80 text-sm">
              Get exclusive deals, fresh powder alerts, and insider mountain tips delivered to your inbox.
            </p>
            
            <div className="space-y-3">
              <Input 
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="secondary" className="w-full">
                Subscribe to Powder Alerts
              </Button>
            </div>

            <div>
              <h5 className="font-medium mb-3">Follow Our Adventures</h5>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 bg-primary-foreground/10 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="flex items-center space-x-2 text-sm">
              <Award className="h-5 w-5 text-accent" />
              <span>Better Business Bureau A+ Rating</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="h-5 w-5 text-accent" />
              <span>Travel Industry Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mountain className="h-5 w-5 text-accent" />
              <span>Ski Industry Partner</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Best Buddies Ski Trips. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-accent text-sm transition-colors duration-200">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;