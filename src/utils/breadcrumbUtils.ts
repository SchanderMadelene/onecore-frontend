
export interface BreadcrumbItem {
  label: string;
  path: string;
}

export const getBreadcrumbLabel = (segment: string, type: 'city' | 'district' | 'property' | 'building'): string => {
  const mappings = {
    // Cities
    vasteras: "Västerås",
    
    // Districts
    lundby: "Lundby",
    backby: "Bäckby", 
    domkyrkan: "Domkyrkan",
    pettersberg: "Pettersberg",
    oxbacken: "Oxbacken",
    hammarby: "Hammarby",
    centrum: "Centrum",
    
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
  
  if (segments.length < 2) return breadcrumbs;
  
  // Build path progressively
  let currentPath = "";
  
  segments.forEach((segment, index) => {
    if (segment === 'properties') return; // Skip the properties segment
    
    currentPath += `/${segment}`;
    const fullPath = `/properties${currentPath}`;
    
    let type: 'city' | 'district' | 'property' | 'building';
    if (index === 1) type = 'city';
    else if (index === 2) type = 'district';  
    else if (index === 3) type = 'property';
    else type = 'building';
    
    breadcrumbs.push({
      label: getBreadcrumbLabel(segment, type),
      path: fullPath
    });
  });
  
  return breadcrumbs;
};
