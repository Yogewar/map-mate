
import { useState } from 'react';
import { findRoute, Route } from '../data/campusData';
import { toast } from "@/hooks/use-toast";

export const useRoutes = () => {
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateRoute = (fromId: string, toId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!fromId || !toId) {
        setError("Please select both starting point and destination.");
        setLoading(false);
        return;
      }
      
      // Add a small delay to simulate API call
      setTimeout(() => {
        const calculatedRoute = findRoute(fromId, toId);
        
        if (!calculatedRoute) {
          setError("Could not find a route between the selected locations.");
          toast({
            variant: "destructive",
            title: "Route not found",
            description: "We couldn't find a path between these locations. Please try different locations.",
          });
          setRoute(null);
        } else {
          setRoute(calculatedRoute);
          toast({
            title: "Route found!",
            description: `Route calculated with ${calculatedRoute.path.length} waypoints.`,
          });
        }
        
        setLoading(false);
      }, 500);
    } catch (err) {
      const errorMessage = "An error occurred while calculating the route.";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Calculation error",
        description: errorMessage,
      });
      setLoading(false);
      setRoute(null);
    }
  };

  return { route, loading, error, calculateRoute };
};

export default useRoutes;
