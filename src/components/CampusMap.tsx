
import React, { useState, useEffect } from 'react';
import { Location, Route } from '../data/campusData';

interface CampusMapProps {
  locations: Location[];
  selectedRoute: Route | null;
  selectedLocation: string | null;
  onLocationClick: (locationId: string) => void;
}

const CampusMap: React.FC<CampusMapProps> = ({
  locations,
  selectedRoute,
  selectedLocation,
  onLocationClick
}) => {
  // Map dimensions
  const mapWidth = 600;
  const mapHeight = 450;
  
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
  
  return (
    <div className="relative w-full overflow-hidden border rounded-lg shadow-lg">
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
      
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${mapWidth} ${mapHeight}`}
        className="bg-campus-background"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Campus background elements */}
        <rect x="50" y="50" width="500" height="350" fill="#e5e7eb" rx="20" />
        
        {/* Paths/roads */}
        <path d="M100,150 L500,150" stroke="#d1d5db" strokeWidth="10" strokeLinecap="round" />
        <path d="M100,300 L500,300" stroke="#d1d5db" strokeWidth="10" strokeLinecap="round" />
        <path d="M200,50 L200,400" stroke="#d1d5db" strokeWidth="10" strokeLinecap="round" />
        <path d="M400,50 L400,400" stroke="#d1d5db" strokeWidth="10" strokeLinecap="round" />
        
        {/* Draw route if selected */}
        {selectedRoute && (
          <>
            <path
              d={`M${selectedRoute.path.map(p => `${p.x},${p.y}`).join(' L')}`}
              stroke="#4f46e5"
              strokeWidth="4"
              strokeDasharray="5,5"
              fill="none"
            />
            <circle 
              cx={selectedRoute.from.coordinates.x} 
              cy={selectedRoute.from.coordinates.y} 
              r="8" 
              fill="#10b981" 
            />
            <circle 
              cx={selectedRoute.to.coordinates.x} 
              cy={selectedRoute.to.coordinates.y} 
              r="8" 
              fill="#ef4444" 
            />
          </>
        )}
        
        {/* Draw location markers */}
        {locations.map((location) => (
          <g 
            key={location.id} 
            onClick={() => onLocationClick(location.id)}
            style={{ cursor: 'pointer' }}
          >
            <circle 
              cx={location.coordinates.x} 
              cy={location.coordinates.y} 
              r={selectedLocation === location.id ? "10" : "6"} 
              fill={getCategoryColor(location.category)}
              className="transition-all duration-200"
              stroke={selectedLocation === location.id ? "white" : "none"}
              strokeWidth="2"
            />
            <text 
              x={location.coordinates.x} 
              y={location.coordinates.y + 20} 
              textAnchor="middle" 
              fontSize="10" 
              fill="#1f2937"
              fontWeight={selectedLocation === location.id ? "bold" : "normal"}
              className="select-none"
            >
              {location.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default CampusMap;
