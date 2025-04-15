
import React from 'react';
import { Route } from '../data/campusData';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { ArrowRightIcon, Clock, MapPin, Route as RouteIcon } from 'lucide-react';

interface DirectionsPanelProps {
  route: Route | null;
  error: string | null;
}

const DirectionsPanel: React.FC<DirectionsPanelProps> = ({ route, error }) => {
  if (error) {
    return (
      <Card className="border-red-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-red-600">Route Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (!route) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Directions</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p>Select starting point and destination to see directions</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span>Directions</span>
          <span className="text-sm font-normal flex items-center gap-1 text-campus-primary">
            <Clock size={16} />
            {route.walkingTime} min
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white">
              <MapPin size={14} />
            </div>
            <div className="h-12 w-0.5 bg-gray-300 my-1"></div>
            <div className="h-6 w-6 rounded-full bg-red-500 flex items-center justify-center text-white">
              <MapPin size={14} />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="text-sm font-medium">{route.from.name}</div>
            <div className="text-xs text-gray-500 mb-2">{route.from.description}</div>
            <div className="text-sm font-medium">{route.to.name}</div>
            <div className="text-xs text-gray-500">{route.to.description}</div>
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-medium flex items-center gap-2 mb-2">
            <RouteIcon size={16} className="text-campus-primary" />
            Step by Step Directions
          </h4>
          <ul className="space-y-3">
            {route.directions.map((direction, index) => (
              <li key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-5 w-5 rounded-full bg-campus-tertiary text-white flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  {index < route.directions.length - 1 && (
                    <div className="h-full w-0.5 bg-gray-300 my-1"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm">{direction.instruction}</p>
                  {direction.distance > 0 && (
                    <p className="text-xs text-gray-500">
                      {Math.round(direction.distance)} meters • {direction.time} min
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DirectionsPanel;
