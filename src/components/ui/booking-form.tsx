import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { X, Calendar, Users, MapPin, DollarSign, Heart } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Client Details
    clientName: '',
    email: '',
    phone: '',
    numberOfPeople: '',
    numberOfRooms: '',
    hasMinors: false,
    minorAges: '',
    
    // Travel Details
    startDate: '',
    endDate: '',
    selectedResorts: [] as string[],
    specificLocations: '',
    
    // Budget
    budgetRange: '',
    budgetDetails: '',
    
    // Interests & Preferences
    interests: [] as string[],
    pastExperiences: '',
    preferredHotels: '',
    specialRequirements: ''
  });

  const regionsData = {
    'USA': {
      'Colorado': ['Aspen', 'Beaver Creek', 'Breckenridge', 'Copper Mountain', 'Crested Butte', 'Keystone', 'Snowmass', 'Steamboat', 'Telluride', 'Vail', 'Winter Park'],
      'Utah': ['Park City', 'Sundance', 'Deer Valley Resort', 'Silver Lake Village'],
      'California': ['Northstar', 'Squaw Valley (Palisades Tahoe)', 'Heavenly'],
      'Nevada': ['Reno (Lake Tahoe area resorts)'],
      'Wyoming': ['Jackson Hole'],
      'Montana': ['Big Sky', 'Whitefish'],
      'Vermont': ['Stowe', 'Jay Peak', 'Sugarbush', 'Killington'],
      'Idaho': ['Sun Valley'],
      'Oregon': ['Sunriver']
    },
    'Canada': {
      'Whistler': ['Whistler Blackcomb'],
      'Banff': ['Banff', 'Lake Louise'],
      'Mont Tremblant': ['Mont Tremblant'],
      'Club Med Québec Charlevoix': ['Club Med Québec Charlevoix']
    },
    'Europe': {
      'France': ['Alpe d\'Huez', 'Avoriaz 1800', 'Chamonix', 'Courchevel', 'La Plagne', 'La Rosière', 'Les Deux Alpes', 'Les Arcs', 'Les Gets', 'Megève', 'Méribel', 'Morzine', 'Tignes', 'Val d\'Isère', 'Val Thorens'],
      'Italy': ['Cortina d\'Ampezzo', 'Bormio', 'Madonna-di-Campiglio', 'Courmayeur', 'Cervinia', 'Livigno', 'Sestriere', 'Val Gardena'],
      'Switzerland': ['Zermatt'],
      'Austria': ['Sölden', 'St. Anton', 'Innsbruck area (Igls, Patscherkofel, Axamer Lizum, Stubai Glacier)', 'Seefeld', 'Schladming', 'Kitzbühel', 'Zürs'],
      'Germany': ['Garmisch-Partenkirchen', 'Brauneck-Wegscheid', 'Spitzingsee-Tegernsee', 'Sudelfeld-Bayrischzell'],
      'Andorra': ['Andorra resorts'],
      'Bulgaria': ['Bulgarian resorts'],
      'Spain': ['Spanish resorts']
    }
  };

  const interestOptions = [
    'Skiing/Snowboarding', 'Après-ski activities', 'Fine dining', 'Spa & wellness',
    'Historical tours', 'Cultural experiences', 'Adventure activities', 'Shopping',
    'Photography', 'Wine tasting', 'Cooking classes', 'Hiking', 'Sightseeing',
    'Family activities', 'Luxury experiences', 'Budget-friendly options'
  ];

  const budgetRanges = [
    'Under $5,000 per person',
    '$5,000 - $10,000 per person',
    '$10,000 - $15,000 per person',
    '$15,000 - $25,000 per person',
    '$25,000+ per person',
    'Custom budget'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field as keyof typeof prev].includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you! We\'ll be in touch within 24 hours to start planning your perfect ski adventure.');
    onClose();
    setStep(1);
    setFormData({
      clientName: '', email: '', phone: '', numberOfPeople: '', numberOfRooms: '',
      hasMinors: false, minorAges: '', startDate: '', endDate: '', selectedResorts: [],
      specificLocations: '', budgetRange: '', budgetDetails: '', interests: [],
      pastExperiences: '', preferredHotels: '', specialRequirements: ''
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Plan Your Ski Adventure
          </DialogTitle>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <button
                type="button"
                onClick={() => setStep(stepNumber)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  step >= stepNumber ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                } ${step > stepNumber ? 'hover:bg-primary/80' : ''}`}
                disabled={step < stepNumber}
              >
                {stepNumber}
              </button>
              {stepNumber < 4 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNumber ? 'bg-primary' : 'bg-muted'
                }`} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Client Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Client Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">Full Name *</Label>
                  <Input
                    id="clientName"
                    value={formData.clientName}
                    onChange={(e) => updateFormData('clientName', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberOfPeople">Number of People *</Label>
                  <Input
                    id="numberOfPeople"
                    type="number"
                    min="1"
                    value={formData.numberOfPeople}
                    onChange={(e) => updateFormData('numberOfPeople', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="numberOfRooms">Number of Rooms Needed</Label>
                  <Input
                    id="numberOfRooms"
                    type="number"
                    min="1"
                    value={formData.numberOfRooms}
                    onChange={(e) => updateFormData('numberOfRooms', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasMinors"
                  checked={formData.hasMinors}
                  onCheckedChange={(checked) => updateFormData('hasMinors', checked)}
                />
                <Label htmlFor="hasMinors">Traveling with minors (under 18)</Label>
              </div>

              {formData.hasMinors && (
                <div>
                  <Label htmlFor="minorAges">Ages of minors</Label>
                  <Input
                    id="minorAges"
                    placeholder="e.g., 8, 12, 15"
                    value={formData.minorAges}
                    onChange={(e) => updateFormData('minorAges', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: Travel Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Travel Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => updateFormData('startDate', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => updateFormData('endDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label>Select Resorts *</Label>
                <div className="space-y-4 mt-2">
                  {Object.entries(regionsData).map(([continent, countries]) => (
                    <div key={continent} className="border rounded-lg p-4">
                      <h4 className="font-semibold text-primary mb-3">{continent}</h4>
                      <div className="space-y-3">
                        {Object.entries(countries).map(([country, resorts]) => (
                          <div key={country} className="ml-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <Checkbox
                                id={`${continent}-${country}`}
                                checked={resorts.every(resort => formData.selectedResorts.includes(resort))}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    resorts.forEach(resort => {
                                      if (!formData.selectedResorts.includes(resort)) {
                                        toggleArrayField('selectedResorts', resort);
                                      }
                                    });
                                  } else {
                                    resorts.forEach(resort => {
                                      if (formData.selectedResorts.includes(resort)) {
                                        toggleArrayField('selectedResorts', resort);
                                      }
                                    });
                                  }
                                }}
                              />
                              <Label htmlFor={`${continent}-${country}`} className="font-medium text-sm">
                                {country} ({resorts.length} resort{resorts.length !== 1 ? 's' : ''})
                              </Label>
                            </div>
                            <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-1">
                              {resorts.map((resort) => (
                                <div key={resort} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={resort}
                                    checked={formData.selectedResorts.includes(resort)}
                                    onCheckedChange={() => toggleArrayField('selectedResorts', resort)}
                                  />
                                  <Label htmlFor={resort} className="text-xs">{resort}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {formData.selectedResorts.length > 0 && (
                  <div className="mt-3">
                    <Label className="text-sm text-muted-foreground">Selected Resorts ({formData.selectedResorts.length})</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.selectedResorts.map((resort) => (
                        <Badge key={resort} variant="secondary" className="text-xs">
                          {resort}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="specificLocations">Specific Locations or Resorts</Label>
                <Textarea
                  id="specificLocations"
                  placeholder="e.g., Aspen, Vail, Whistler, Chamonix..."
                  value={formData.specificLocations}
                  onChange={(e) => updateFormData('specificLocations', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Budget Information
              </h3>
              
              <div>
                <Label htmlFor="budgetRange">Budget Range per Person *</Label>
                <Select value={formData.budgetRange} onValueChange={(value) => updateFormData('budgetRange', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budgetDetails">Additional Budget Details</Label>
                <Textarea
                  id="budgetDetails"
                  placeholder="Any specific budget considerations, preferences for luxury vs. value, or special requirements..."
                  value={formData.budgetDetails}
                  onChange={(e) => updateFormData('budgetDetails', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Interests & Preferences */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Interests & Preferences
              </h3>
              
              <div>
                <Label>Interests & Activities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {interestOptions.map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => toggleArrayField('interests', interest)}
                      />
                      <Label htmlFor={interest} className="text-sm">{interest}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="pastExperiences">Past Successful Experiences</Label>
                <Textarea
                  id="pastExperiences"
                  placeholder="What activities, experiences, or destinations have been successful for your group in the past?"
                  value={formData.pastExperiences}
                  onChange={(e) => updateFormData('pastExperiences', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="preferredHotels">Preferred Hotels or Accommodation Style</Label>
                <Textarea
                  id="preferredHotels"
                  placeholder="Any specific hotels you've enjoyed, accommodation preferences (luxury, boutique, family-friendly, etc.)"
                  value={formData.preferredHotels}
                  onChange={(e) => updateFormData('preferredHotels', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="specialRequirements">Special Requirements or Requests</Label>
                <Textarea
                  id="specialRequirements"
                  placeholder="Any special dietary needs, accessibility requirements, or other specific requests..."
                  value={formData.specialRequirements}
                  onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={step === 1}
            >
              Previous
            </Button>
            
            {step < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (step === 1 && (!formData.clientName || !formData.email || !formData.numberOfPeople)) ||
                  (step === 2 && (!formData.startDate || !formData.endDate || formData.selectedResorts.length === 0)) ||
                  (step === 3 && !formData.budgetRange)
                }
              >
                Next
              </Button>
            ) : (
              <Button type="submit">
                Submit Request
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
