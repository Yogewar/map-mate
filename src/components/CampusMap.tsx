
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline, InfoWindow } from '@react-google-maps/api';
import { Location, Route } from '../data/campusData';

interface CampusMapProps {
  locations: Location[];
  selectedRoute: Route | null;
  selectedLocation: string | null;
  onLocationClick: (locationId: string) => void;
}

// Map container style
const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem'
};

// SRM Kattankulathur campus approximate center
const center = {
  lat: 12.8230, 
  lng: 80.0444
};

const CampusMap: React.FC<CampusMapProps> = ({
  locations,
  selectedRoute,
  selectedLocation,
  onLocationClick
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [infoWindowId, setInfoWindowId] = useState<string | null>(null);
  
  // Define colors based on location category
  const getCategoryColor = (category: Location['category']): string => {
    switch(category) {
      case 'academic': return '#4f46e5'; // Primary blue
      case 'residential': return '#10b981'; // Green
      case 'dining': return '#f59e0b'; // Yellow
      case 'athletic': return '#ef4444'; // Red
      case 'administrative': return '#8b5cf6'; // Purple
      case 'parking': return '#6b7280'; // Gray
      default: return '#4f46e5';
    }
  };

  // Convert SVG coordinates to Lat/Lng for Google Maps
  // This is a simplistic conversion - you might need to adjust based on your data
  const mapCoordinateToLatLng = (x: number, y: number) => {
    // Convert the SVG coordinates to latitude and longitude
    // This is an approximation - you'll need to adjust these values based on your campus layout
    const latOffset = (y - 250) * 0.0001;
    const lngOffset = (x - 300) * 0.0001;
    
    return {
      lat: center.lat + latOffset,
      lng: center.lng + lngOffset
    };
  };
  
  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden border rounded-lg shadow-lg">
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-md z-10">
        <h3 className="text-sm font-semibold mb-1">Legend</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('academic')}}></div>
            <span>Academic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('residential')}}></div>
            <span>Residential</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('dining')}}></div>
            <span>Dining</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('athletic')}}></div>
            <span>Athletic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('administrative')}}></div>
            <span>Admin</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: getCategoryColor('parking')}}></div>
            <span>Parking</span>
          </div>
        </div>
      </div>
      
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY_HERE">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapTypeId: 'satellite',
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {/* Markers for all locations */}
          {locations.map(location => {
            const position = mapCoordinateToLatLng(location.coordinates.x, location.coordinates.y);
            return (
              <Marker
                key={location.id}
                position={position}
                onClick={() => {
                  onLocationClick(location.id);
                  setInfoWindowId(location.id);
                }}
                icon={{
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: selectedLocation === location.id ? 10 : 8,
                  fillColor: getCategoryColor(location.category),
                  fillOpacity: 0.8,
                  strokeColor: selectedLocation === location.id ? 'white' : getCategoryColor(location.category),
                  strokeWeight: 2,
                }}
              >
                {infoWindowId === location.id && (
                  <InfoWindow
                    position={position}
                    onCloseClick={() => setInfoWindowId(null)}
                  >
                    <div className="p-1">
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-xs">{location.description}</p>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}

          {/* Draw route if selected */}
          {selectedRoute && (
            <Polyline
              path={selectedRoute.path.map(point => 
                mapCoordinateToLatLng(point.x, point.y)
              )}
              options={{
                strokeColor: '#4f46e5',
                strokeOpacity: 0.8,
                strokeWeight: 4,
                geodesic: true,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CampusMap;
