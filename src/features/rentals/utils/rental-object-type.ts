// Härleder hyresobjektstyp för bostadsannonser (mock).
// Använder samma typkoder som förvaltningsområden så att vi kan
// återanvända BuildingTypeBadge för konsekvent utseende.
const TYPES = ["STD", "POANGFRITT", "CO-LIVING", "STUD", "TRYGG"] as const;

export function getRentalObjectType(id: string): string {
  const seed = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return TYPES[seed % TYPES.length];
}
