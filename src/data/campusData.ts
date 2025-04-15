
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

// SRM University Kattankulathur campus locations data
export const campusLocations: Location[] = [
  {
    id: "main-building",
    name: "University Building",
    coordinates: { x: 300, y: 150 },
    description: "Main administrative and academic building",
    category: "administrative"
  },
  {
    id: "tech-park",
    name: "Tech Park",
    coordinates: { x: 200, y: 120 },
    description: "Technology and engineering labs",
    category: "academic"
  },
  {
    id: "library",
    name: "Central Library",
    coordinates: { x: 380, y: 130 },
    description: "University's main library and knowledge center",
    category: "academic"
  },
  {
    id: "hostel-mens",
    name: "Men's Hostel",
    coordinates: { x: 150, y: 320 },
    description: "Men's dormitory",
    category: "residential"
  },
  {
    id: "hostel-womens",
    name: "Women's Hostel",
    coordinates: { x: 450, y: 320 },
    description: "Women's dormitory",
    category: "residential"
  },
  {
    id: "food-court",
    name: "Food Court",
    coordinates: { x: 350, y: 190 },
    description: "Main dining area with multiple food options",
    category: "dining"
  },
  {
    id: "sports-complex",
    name: "Sports Complex",
    coordinates: { x: 450, y: 250 },
    description: "Stadium, gym, and sports facilities",
    category: "athletic"
  },
  {
    id: "auditorium",
    name: "Dr. T.P. Ganesan Auditorium",
    coordinates: { x: 250, y: 250 },
    description: "Main event space and auditorium",
    category: "academic"
  },
  {
    id: "medical-center",
    name: "Medical Center",
    coordinates: { x: 400, y: 210 },
    description: "Campus health and medical services",
    category: "administrative"
  },
  {
    id: "parking-main",
    name: "Main Parking",
    coordinates: { x: 100, y: 200 },
    description: "Main parking area",
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
