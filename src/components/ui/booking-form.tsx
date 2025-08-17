import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, MapPin, DollarSign, Heart, CheckCircle, Mail, Phone } from 'lucide-react';
import { sendBookingConfirmationEmail } from '@/lib/email-service';

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
    numberOfSkiDays: '',
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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  const regionsData = {
    'United States': {
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
      'Banff': ['Banff'],
      'Lake Louise': ['Lake Louise'],
      'Mont Tremblant': ['Mont Tremblant']
    },
    'Europe': {
      'France': ['Alpe d\'Huez', 'Avoriaz 1800', 'Chamonix', 'Courchevel', 'La Plagne', 'La Rosière', 'Les Deux Alpes', 'Les Arcs', 'Les Gets', 'Megève', 'Méribel', 'Morzine', 'Tignes', 'Val d\'Isère', 'Val Thorens'],
      'Italy': ['Cortina d\'Ampezzo', 'Bormio', 'Madonna-di-Campiglio', 'Courmayeur', 'Cervinia', 'Livigno', 'Sestriere', 'Val Gardena'],
      'Switzerland': ['Zermatt'],
      'Austria': ['Sölden', 'St. Anton', 'Innsbruck area (Igls, Patscherkofel, Axamer Lizum, Stubai Glacier)', 'Seefeld', 'Schladming', 'Kitzbühel', 'Zürs'],
      'Germany': ['Garmisch-Partenkirchen', 'Brauneck-Wegscheid', 'Spitzingsee-Tegernsee', 'Sudelfeld-Bayrischzell'],
      'Andorra': ['Andorra'],
      'Bulgaria': ['Bulgaria'],
      'Spain': ['Spain']
    }
  };

  const interestOptions = [
    'Skiing', 'Snowboarding', 'Après-ski Activities', 'Hiking', 'Cooking Classes', 
    'Historical Tours', 'Spa & Wellness', 'Wine Tasting', 'Photography', 
    'Adventure Sports', 'Cultural Experiences', 'Fine Dining', 'Shopping', 
    'Nightlife', 'Family Activities', 'Luxury Experiences', 'Budget-friendly Options'
  ];

  const budgetRanges = [
    '$2,000 - $5,000 per person',
    '$5,000 - $10,000 per person', 
    '$10,000 - $20,000 per person',
    '$20,000+ per person',
    'Custom budget'
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.clientName || !formData.email || !formData.numberOfPeople || !formData.numberOfSkiDays || 
        !formData.startDate || !formData.endDate || formData.selectedResorts.length === 0 || !formData.budgetRange) {
      alert('Please fill in all required fields.');
      return;
    }

    // Create structured booking data
    const bookingData = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      client: {
        name: formData.clientName,
        email: formData.email,
        phone: formData.phone || ''
      },
      group: {
        numberOfPeople: parseInt(formData.numberOfPeople),
        numberOfRooms: formData.numberOfRooms ? parseInt(formData.numberOfRooms) : null,
        numberOfSkiDays: parseInt(formData.numberOfSkiDays),
        hasMinors: formData.hasMinors,
        minorAges: formData.minorAges
      },
      travel: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        selectedResorts: formData.selectedResorts,
        specificLocations: formData.specificLocations || ''
      },
      budget: {
        range: formData.budgetRange,
        details: formData.budgetDetails || ''
      },
      preferences: {
        interests: formData.interests,
        pastExperiences: formData.pastExperiences || '',
        preferredHotels: formData.preferredHotels || '',
        specialRequirements: formData.specialRequirements || ''
      }
    };
    
    // Log the structured JSON
    console.log('Booking Data JSON:', JSON.stringify(bookingData, null, 2));
    
    // Send confirmation email to the guest
    try {
      const emailResult = await sendBookingConfirmationEmail(bookingData);
      console.log('✅ Confirmation email sent successfully:', emailResult);
      setSubmittedData(bookingData);
      setShowConfirmation(true);
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
      // Still show confirmation even if email fails
      setSubmittedData(bookingData);
      setShowConfirmation(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl max-h-[95vh] overflow-y-auto">
          <DialogHeader className="pb-4">
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <Calendar className="h-6 w-6 text-primary" />
              Plan Your Ski Adventure
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              Tell us about your dream ski trip and we'll create a personalized experience for you.
            </p>
          </DialogHeader>

          {/* Progress Tracker */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center flex-1">
                <button
                  type="button"
                  onClick={() => setStep(stepNumber)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    step >= stepNumber ? 'bg-primary text-primary-foreground shadow-lg' : 'bg-muted text-muted-foreground'
                  } ${step > stepNumber ? 'hover:bg-primary/80 hover:scale-105' : ''}`}
                  disabled={step < stepNumber}
                >
                  {stepNumber}
                </button>
                {stepNumber < 4 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full transition-colors duration-300 ${
                    step > stepNumber ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {/* Step 1: Client Details */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Users className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">Client Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => updateFormData('clientName', e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="numberOfPeople">Number of People *</Label>
                    <Input
                      id="numberOfPeople"
                      type="number"
                      min="1"
                      value={formData.numberOfPeople}
                      onChange={(e) => updateFormData('numberOfPeople', e.target.value)}
                      placeholder="How many people in your group?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="numberOfRooms">Number of Rooms</Label>
                    <Input
                      id="numberOfRooms"
                      type="number"
                      min="1"
                      value={formData.numberOfRooms}
                      onChange={(e) => updateFormData('numberOfRooms', e.target.value)}
                      placeholder="How many rooms do you need?"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="numberOfSkiDays">Number of Ski Days *</Label>
                    <Input
                      id="numberOfSkiDays"
                      type="number"
                      min="1"
                      max="30"
                      value={formData.numberOfSkiDays}
                      onChange={(e) => updateFormData('numberOfSkiDays', e.target.value)}
                      placeholder="How many days do you want to ski?"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasMinors"
                      checked={formData.hasMinors}
                      onCheckedChange={(checked) => updateFormData('hasMinors', checked)}
                    />
                    <Label htmlFor="hasMinors">Traveling with minors (under 18)</Label>
                  </div>
                </div>

                {formData.hasMinors && (
                  <div>
                    <Label htmlFor="minorAges">Ages of Minors</Label>
                    <Input
                      id="minorAges"
                      value={formData.minorAges}
                      onChange={(e) => updateFormData('minorAges', e.target.value)}
                      placeholder="e.g., 8, 12, 15"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Travel Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <MapPin className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">Travel Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => updateFormData('startDate', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => updateFormData('endDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Select Resorts *</Label>
                  <div className="space-y-4 mt-3">
                    {Object.entries(regionsData).map(([continent, countries]) => (
                      <div key={continent} className="border border-border rounded-lg p-4 bg-card/50">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-primary text-lg">{continent}</h4>
                          <Badge variant="outline" className="text-xs">
                            {Object.values(countries).flat().length} resorts
                          </Badge>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(countries).map(([country, resorts]) => (
                            <div key={country} className="border-l-2 border-muted pl-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <Checkbox
                                  id={`${continent}-${country}`}
                                  checked={resorts.every(resort => formData.selectedResorts.includes(resort))}
                                  onCheckedChange={() => {
                                    const allSelected = resorts.every(resort => formData.selectedResorts.includes(resort));
                                    if (allSelected) {
                                      resorts.forEach(resort => {
                                        if (formData.selectedResorts.includes(resort)) {
                                          toggleArrayField('selectedResorts', resort);
                                        }
                                      });
                                    } else {
                                      resorts.forEach(resort => {
                                        if (!formData.selectedResorts.includes(resort)) {
                                          toggleArrayField('selectedResorts', resort);
                                        }
                                      });
                                    }
                                  }}
                                />
                                <Label htmlFor={`${continent}-${country}`} className="font-medium text-sm cursor-pointer">
                                  {country} ({resorts.length} resort{resorts.length !== 1 ? 's' : ''})
                                </Label>
                              </div>
                              <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                                {resorts.map((resort) => (
                                  <div key={resort} className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <Checkbox
                                      id={resort}
                                      checked={formData.selectedResorts.includes(resort)}
                                      onCheckedChange={() => toggleArrayField('selectedResorts', resort)}
                                    />
                                    <Label htmlFor={resort} className="text-sm cursor-pointer flex-1">{resort}</Label>
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
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg border">
                      <Label className="text-sm font-medium text-primary">Selected Resorts ({formData.selectedResorts.length})</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.selectedResorts.map((resort) => (
                          <Badge
                            key={resort}
                            variant="secondary"
                            className="text-xs cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                            onClick={() => toggleArrayField('selectedResorts', resort)}
                          >
                            {resort} ×
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="specificLocations">Additional Locations or Regions</Label>
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
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">Budget Information</h3>
                </div>
                
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
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <Heart className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold text-primary">Interests & Preferences</h3>
                </div>
                
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
            <div className="flex justify-between pt-8 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6"
              >
                ← Previous
              </Button>
              
              {step < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!formData.clientName || !formData.email || !formData.numberOfPeople || !formData.numberOfSkiDays)) ||
                    (step === 2 && (!formData.startDate || !formData.endDate || formData.selectedResorts.length === 0)) ||
                    (step === 3 && !formData.budgetRange)
                  }
                  className="px-6"
                >
                  Next →
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={handleSubmit}
                  className="px-8 bg-primary hover:bg-primary/90"
                >
                  Submit Request
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Thank You for Your Submission!
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Success Message */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                We've received your ski adventure request and will be in touch within 24 hours to start planning your perfect trip!
              </p>
            </div>

            {/* Booking Summary */}
            {submittedData && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">Booking Summary</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Client Info */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Client Information</h4>
                    <div className="space-y-1">
                      <p className="font-medium">{submittedData.client.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {submittedData.client.email}
                      </div>
                      {submittedData.client.phone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-3 w-3" />
                          {submittedData.client.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Trip Details */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Trip Details</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{submittedData.group.numberOfPeople}</span> people
                        {submittedData.group.numberOfRooms && (
                          <span className="text-muted-foreground"> • {submittedData.group.numberOfRooms} rooms</span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(submittedData.travel.startDate).toLocaleDateString()} - {new Date(submittedData.travel.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submittedData.group.numberOfSkiDays} ski days
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {submittedData.budget.range}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selected Resorts */}
                {submittedData.travel.selectedResorts.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Selected Destinations</h4>
                    <div className="flex flex-wrap gap-2">
                      {submittedData.travel.selectedResorts.slice(0, 6).map((resort: string) => (
                        <Badge key={resort} variant="secondary" className="text-xs">
                          {resort}
                        </Badge>
                      ))}
                      {submittedData.travel.selectedResorts.length > 6 && (
                        <Badge variant="outline" className="text-xs">
                          +{submittedData.travel.selectedResorts.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Selected Interests */}
                {submittedData.preferences.interests.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Selected Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {submittedData.preferences.interests.map((interest: string) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our expert team will review your preferences</li>
                    <li>• We'll create a personalized itinerary for your group</li>
                    <li>• You'll receive a detailed quote within 24 hours</li>
                    <li>• We'll coordinate all logistics and bookings</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirmation(false);
                  onClose();
                  setStep(1);
                  setFormData({
                    clientName: '', email: '', phone: '', numberOfPeople: '', numberOfRooms: '', numberOfSkiDays: '',
                    hasMinors: false, minorAges: '', startDate: '', endDate: '', selectedResorts: [],
                    specificLocations: '', budgetRange: '', budgetDetails: '', interests: [],
                    pastExperiences: '', preferredHotels: '', specialRequirements: ''
                  });
                }}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false);
                  onClose();
                  setStep(1);
                  setFormData({
                    clientName: '', email: '', phone: '', numberOfPeople: '', numberOfRooms: '', numberOfSkiDays: '',
                    hasMinors: false, minorAges: '', startDate: '', endDate: '', selectedResorts: [],
                    specificLocations: '', budgetRange: '', budgetDetails: '', interests: [],
                    pastExperiences: '', preferredHotels: '', specialRequirements: ''
                  });
                }}
              >
                Start New Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingForm;
