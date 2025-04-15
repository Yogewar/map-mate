
import React from 'react';
import { MapIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container flex justify-between items-center py-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <div className="bg-campus-primary p-2 rounded-md">
            <MapIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-campus-primary">SRM Navigator</h1>
            <p className="text-xs text-gray-500">Kattankulathur Campus</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-campus-primary">Map</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-campus-primary">Buildings</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-campus-primary">Events</a>
          <a href="#" className="text-sm font-medium text-gray-600 hover:text-campus-primary">About</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
