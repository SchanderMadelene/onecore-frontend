// Mappning från område (stadsdel) till distrikt i Västerås.
// Används för att visa distriktskolumn i bostadsannons-tabeller.
const AREA_TO_DISTRICT: Record<string, string> = {
  Centrum: "Centrum",
  Björkbacken: "Norr",
  Malmaberg: "Öster",
  Hammarby: "Väster",
  Tillberga: "Norr",
  Frösunda: "Norr",
  Pettersberg: "Väster",
  Skallberget: "Väster",
  Vallby: "Väster",
  Bjurhovda: "Öster",
  Råby: "Söder",
  Gryta: "Väster",
  Stigberget: "Centrum",
  Vasastaden: "Centrum",
};

export function getDistrictByArea(area: string): string {
  return AREA_TO_DISTRICT[area] ?? "—";
}
