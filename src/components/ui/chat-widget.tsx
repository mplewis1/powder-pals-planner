import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  X, 
  Send, 
  Snowflake, 
  MapPin, 
  Users,
  DollarSign 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hi! I\'m here to help plan your perfect ski trip. Tell me about your dream adventure! 🎿',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    { icon: MapPin, text: 'Best destinations for beginners?', type: 'destination' },
    { icon: Users, text: 'Group of 8 people, what options?', type: 'group' },
    { icon: Snowflake, text: 'Best snow conditions in March?', type: 'conditions' },
    { icon: DollarSign, text: 'Budget-friendly packages?', type: 'budget' },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        content: getBotResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('beginner') || input.includes('first time')) {
      return 'Great! For beginners, I recommend destinations like Park City, Utah or Mont-Tremblant, Quebec. They have excellent ski schools and gentle slopes. How many people are in your group?';
    }
    
    if (input.includes('advanced') || input.includes('expert')) {
      return 'For advanced skiers, you\'ll love Jackson Hole, Chamonix, or St. Anton! These offer challenging terrain and deep powder. What\'s your preferred travel dates?';
    }
    
    if (input.includes('budget') || input.includes('cheap') || input.includes('affordable')) {
      return 'I can definitely help you find budget-friendly options! Eastern resorts or early season deals can save you money. What\'s your target budget per person?';
    }
    
    if (input.includes('group') || input.includes('friends') || input.includes('people')) {
      return 'Perfect! Group trips are our specialty. For larger groups, I recommend destinations with group discounts and varied terrain. How many people and what are their skill levels?';
    }
    
    if (input.includes('march') || input.includes('april') || input.includes('spring')) {
      return 'Spring skiing is amazing! March typically has great conditions in the Alps and western North America. Are you looking for guaranteed snow or don\'t mind some variability?';
    }
    
    return 'That sounds interesting! To give you the best recommendations, could you tell me: 1) Your group size 2) Skill levels 3) Preferred dates 4) Budget range? I\'ll create a perfect itinerary for you!';
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full alpine-shadow glow-animation",
          "bg-accent hover:bg-accent/90 text-accent-foreground",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] flex flex-col alpine-shadow">
          <CardHeader className="bg-accent text-accent-foreground p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Snowflake className="h-5 w-5" />
                <div>
                  <h3 className="font-semibold">Ski Trip Planner</h3>
                  <p className="text-xs opacity-90">Tell us about your dream ski trip!</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-accent-foreground hover:bg-accent-foreground/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] p-3 rounded-lg text-sm",
                      message.type === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="p-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickQuestion(question.text)}
                      className="justify-start text-xs h-8"
                    >
                      <question.icon className="h-3 w-3 mr-2" />
                      {question.text}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Where do you want to ski? Beginner or advanced? How many people?"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-accent hover:bg-accent/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;