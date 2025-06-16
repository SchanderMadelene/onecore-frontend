
export interface BreadcrumbItem {
  label: string;
  path: string;
}

export const getBreadcrumbLabel = (segment: string, type: 'property' | 'building' | 'residence'): string => {
  const mappings = {
    // Properties
    "odenplan-5": "Älgen 1",
    "gotgatan-15": "Lindaren 2",
    "sveavagen-10": "Björnen 4",
    "pipan-1": "Pipan 1",
    "oskaria-1": "Oskaria 1",
    "styrhylsan-9": "Styrhylsan 9",
    "bavern-1": "Bävern 1",
    
    // Buildings
    "building-a": "Bellmansgatan 1A - 2C",
    "building-b": "Byggnad B",
    "hus-a-lindaren": "Byggnad A",
    "kontorsbyggnad-a": "Kontorsbyggnad A",
    "kontorsbyggnad-b": "Kontorsbyggnad B",
    "flerfamiljshus-pipan": "Flerfamiljshus",
    "kontorsbyggnad-oskaria": "Kontorsbyggnad",
    "radhus-styrhylsan": "Radhus",
    "kontorskomplex-bavern": "Kontorskomplex",
    
    // Residences
    "lgh-1001": "Lägenhet 1001",
    "lgh-1002": "Lägenhet 1002",
    "lgh-1003": "Lägenhet 1003",
    "lgh-2001": "Lägenhet 2001",
    "lgh-2002": "Lägenhet 2002",
  };
  
  return mappings[segment] || segment;
};

export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Always start with Properties
  breadcrumbs.push({
    label: "Fastigheter",
    path: "/properties"
  });
  
  if (segments.length < 4) return breadcrumbs; // Need at least /properties/city/district/property
  
  // Extract relevant segments: skip 'properties', 'city', 'district'
  const propertySegment = segments[3]; // The property segment
  const buildingSegment = segments[4]; // The building segment (if exists)
  const residenceSegment = segments[5]; // The residence segment (if exists)
  
  if (propertySegment) {
    // Add property breadcrumb
    const propertyPath = `/properties/${segments[1]}/${segments[2]}/${propertySegment}`;
    breadcrumbs.push({
      label: getBreadcrumbLabel(propertySegment, 'property'),
      path: propertyPath
    });
    
    // Add building breadcrumb if exists
    if (buildingSegment) {
      const buildingPath = `${propertyPath}/${buildingSegment}`;
      breadcrumbs.push({
        label: getBreadcrumbLabel(buildingSegment, 'building'),
        path: buildingPath
      });
      
      // Add residence breadcrumb if exists
      if (residenceSegment) {
        const residencePath = `${buildingPath}/${residenceSegment}`;
        breadcrumbs.push({
          label: getBreadcrumbLabel(residenceSegment, 'residence'),
          path: residencePath
        });
      }
    }
  }
  
  return breadcrumbs;
};
