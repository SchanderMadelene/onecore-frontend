import { ParkingSpacesTable } from "./ParkingSpacesTable";

/**
 * Förråd återanvänder bilplatsens tabell- och flikstruktur 1:1.
 * Per memory `cross-domain-logic-reuse` delar uthyrning av bilplats och förråd
 * samma UX och underliggande hooks. Tills förråd får egna avvikande flöden
 * fungerar denna komponent som en tunn alias.
 */
export function StorageSpacesTable() {
  return <ParkingSpacesTable />;
}
