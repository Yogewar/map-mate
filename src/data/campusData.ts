
// Define types
export interface Location {
  id: string;
  name: string;
  coordinates: {
    x: number;
    y: number;
  };
  description?: string;
  category: 'academic' | 'residential' | 'dining' | 'athletic' | 'administrative' | 'parking';
}

export interface Route {
  from: Location;
  to: Location;
  distance: number; // in meters
  walkingTime: number; // in minutes
  path: Array<{x: number, y: number}>; // path coordinates
  directions: Array<{
    instruction: string;
    distance: number;
    time: number;
  }>;
}

// Sample campus locations data
export const campusLocations: Location[] = [
  {
    id: "science-hall",
    name: "Science Hall",
    coordinates: { x: 200, y: 150 },
    description: "Main science building with labs and lecture halls",
    category: "academic"
  },
  {
    id: "student-center",
    name: "Student Center",
    coordinates: { x: 350, y: 200 },
    description: "Central building for student activities and dining",
    category: "dining"
  },
  {
    id: "library",
    name: "Main Library",
    coordinates: { x: 280, y: 120 },
    description: "University's main library with study spaces",
    category: "academic"
  },
  {
    id: "dorm-a",
    name: "Residence Hall A",
    coordinates: { x: 150, y: 300 },
    description: "Freshman dormitory",
    category: "residential"
  },
  {
    id: "admin-building",
    name: "Administration Building",
    coordinates: { x: 400, y: 100 },
    description: "Houses administrative offices and registrar",
    category: "administrative"
  },
  {
    id: "sports-complex",
    name: "Sports Complex",
    coordinates: { x: 450, y: 350 },
    description: "Gymnasium, pool, and fitness center",
    category: "athletic"
  },
  {
    id: "engineering-building",
    name: "Engineering Building",
    coordinates: { x: 320, y: 250 },
    description: "Home to the engineering department",
    category: "academic"
  },
  {
    id: "west-parking",
    name: "West Parking Lot",
    coordinates: { x: 100, y: 200 },
    description: "Main parking area on west side of campus",
    category: "parking"
  }
];

// Calculate Euclidean distance between two points
const calculateDistance = (a: {x: number, y: number}, b: {x: number, y: number}): number => {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
};

// Calculate walking time based on distance (assuming 1 unit = 1 meter, average walking speed = 1.4 m/s)
const calculateWalkingTime = (distance: number): number => {
  const walkingSpeedMetersPerMinute = 80; // ~5 km/h in meters/min
  return Math.round((distance / walkingSpeedMetersPerMinute) * 10) / 10; // Round to 1 decimal place
};

// Generate simple directions between two locations
const generateDirections = (from: Location, to: Location): Route['directions'] => {
  const distance = calculateDistance(from.coordinates, to.coordinates);
  const time = calculateWalkingTime(distance);
  
  // Simple direction generation based on relative positions
  const dx = to.coordinates.x - from.coordinates.x;
  const dy = to.coordinates.y - from.coordinates.y;
  
  const directions: Route['directions'] = [];
  
  if (Math.abs(dx) > 20) {
    const direction = dx > 0 ? "east" : "west";
    const dist = Math.abs(dx);
    directions.push({
      instruction: `Head ${direction} from ${from.name}`,
      distance: dist,
      time: calculateWalkingTime(dist)
    });
  }
  
  if (Math.abs(dy) > 20) {
    const direction = dy > 0 ? "south" : "north";
    const dist = Math.abs(dy);
    directions.push({
      instruction: `Continue ${direction} towards ${to.name}`,
      distance: dist,
      time: calculateWalkingTime(dist)
    });
  }
  
  directions.push({
    instruction: `Arrive at ${to.name}`,
    distance: 0,
    time: 0
  });
  
  return directions;
};

// Generate a simple path between two points (straight line with a midpoint for simplicity)
const generatePath = (from: Location, to: Location): Array<{x: number, y: number}> => {
  // Create a simple path with 3 points (start, middle, end)
  const midPoint = {
    x: (from.coordinates.x + to.coordinates.x) / 2,
    y: (from.coordinates.y + to.coordinates.y) / 2
  };
  
  return [
    { x: from.coordinates.x, y: from.coordinates.y },
    { x: midPoint.x, y: midPoint.y },
    { x: to.coordinates.x, y: to.coordinates.y }
  ];
};

// Function to find a route between two locations
export const findRoute = (fromId: string, toId: string): Route | null => {
  const from = campusLocations.find(loc => loc.id === fromId);
  const to = campusLocations.find(loc => loc.id === toId);
  
  if (!from || !to) return null;
  
  const distance = calculateDistance(from.coordinates, to.coordinates);
  const walkingTime = calculateWalkingTime(distance);
  const path = generatePath(from, to);
  const directions = generateDirections(from, to);
  
  return {
    from,
    to,
    distance,
    walkingTime,
    path,
    directions
  };
};
