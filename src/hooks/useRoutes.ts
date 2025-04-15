
import { useState } from 'react';
import { findRoute, Route, Location } from '../data/campusData';

export const useRoutes = () => {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = (fromId: string, toId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Add a small delay to simulate API call
      setTimeout(() => {
        const calculatedRoute = findRoute(fromId, toId);
        
        if (!calculatedRoute) {
          setError("Could not find a route between the selected locations.");
          setRoute(null);
        } else {
          setRoute(calculatedRoute);
        }
        
        setLoading(false);
      }, 500);
    } catch (err) {
      setError("An error occurred while calculating the route.");
      setLoading(false);
      setRoute(null);
    }
  };

  return { route, loading, error, calculateRoute };
};

export default useRoutes;
