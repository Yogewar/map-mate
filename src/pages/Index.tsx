
import React, { useState } from 'react';
import Header from '../components/Header';
import CampusMap from '../components/CampusMap';
import RouteForm from '../components/RouteForm';
import DirectionsPanel from '../components/DirectionsPanel';
import { campusLocations } from '../data/campusData';
import useRoutes from '../hooks/useRoutes';

const Index = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { route, loading, error, calculateRoute } = useRoutes();

  const handleLocationClick = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  const handleCalculateRoute = (fromId: string, toId: string) => {
    calculateRoute(fromId, toId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-campus-primary mb-2">SRM University Navigator</h1>
        <p className="text-gray-600 mb-8">Find the best route between locations on Kattankulathur campus</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4">
              <CampusMap
                locations={campusLocations}
                selectedRoute={route}
                selectedLocation={selectedLocation}
                onLocationClick={handleLocationClick}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <RouteForm
              locations={campusLocations}
              onCalculateRoute={handleCalculateRoute}
              isLoading={loading}
            />
            
            <DirectionsPanel route={route} error={error} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 SRM University Navigator. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-600 hover:text-campus-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-campus-primary">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-campus-primary">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
