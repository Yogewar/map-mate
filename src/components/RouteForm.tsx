
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Location } from '../data/campusData';
import { MapPinIcon, LocateIcon, ArrowRightIcon, Navigation } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface RouteFormProps {
  locations: Location[];
  onCalculateRoute: (fromId: string, toId: string) => void;
  isLoading: boolean;
}

const RouteForm: React.FC<RouteFormProps> = ({ locations, onCalculateRoute, isLoading }) => {
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const { toast } = useToast();
  
  const handleCalculateRoute = () => {
    if (fromLocation && toLocation) {
      onCalculateRoute(fromLocation, toLocation);
    }
  };

  const handleSwapLocations = () => {
    setFromLocation(toLocation);
    setToLocation(fromLocation);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Getting your location",
        description: "Please wait while we determine your position...",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // For demo purposes, just select a random location as "current"
          const randomIndex = Math.floor(Math.random() * locations.length);
          const randomLocation = locations[randomIndex];
          
          setFromLocation(randomLocation.id);
          
          toast({
            title: "Location found!",
            description: `Using ${randomLocation.name} as your current location.`,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Could not determine your location. Please select manually.",
          });
        }
      );
    } else {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please select a location manually.",
      });
    }
  };
  
  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Find Your Way</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-campus-secondary" />
              <label htmlFor="from-location" className="text-sm font-medium">
                Starting Point
              </label>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center text-xs text-campus-primary"
              onClick={handleUseCurrentLocation}
            >
              <Navigation className="h-3 w-3 mr-1" />
              Use my location
            </Button>
          </div>
          <Select value={fromLocation} onValueChange={setFromLocation}>
            <SelectTrigger id="from-location" className="w-full">
              <SelectValue placeholder="Choose starting point" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {locations.map(location => (
                  <SelectItem
                    key={`from-${location.id}`}
                    value={location.id}
                    disabled={location.id === toLocation}
                  >
                    {location.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="relative flex justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative bg-white hover:bg-gray-100 border border-gray-200 rounded-full"
            onClick={handleSwapLocations}
            disabled={!fromLocation || !toLocation}
          >
            <ArrowRightIcon className="h-4 w-4 rotate-90" />
            <span className="sr-only">Swap locations</span>
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LocateIcon className="h-4 w-4 text-campus-primary" />
            <label htmlFor="to-location" className="text-sm font-medium">
              Destination
            </label>
          </div>
          <Select value={toLocation} onValueChange={setToLocation}>
            <SelectTrigger id="to-location" className="w-full">
              <SelectValue placeholder="Choose destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Locations</SelectLabel>
                {locations.map(location => (
                  <SelectItem
                    key={`to-${location.id}`}
                    value={location.id}
                    disabled={location.id === fromLocation}
                  >
                    {location.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button
          className="w-full bg-campus-primary hover:bg-campus-secondary"
          onClick={handleCalculateRoute}
          disabled={!fromLocation || !toLocation || isLoading}
        >
          {isLoading ? "Calculating..." : "Find Route"}
        </Button>
      </div>
    </Card>
  );
};

export default RouteForm;
