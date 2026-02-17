// Mimer's official color coding for building types
// Uses design system decorative color tokens

export interface BuildingTypeStyle {
  bg: string;
  text: string;
  label: string;
}

export const BUILDING_TYPE_STYLES: Record<string, BuildingTypeStyle> = {
  "STD": {
    bg: "bg-slate/30",
    text: "text-slate-foreground",
    label: "Standard"
  },
  "BLOCK": {
    bg: "bg-slate/50",
    text: "text-slate-foreground",
    label: "Block"
  },
  "55PLUS": {
    bg: "bg-purple/20",
    text: "text-purple-foreground",
    label: "55+"
  },
  "STUD": {
    bg: "bg-amber/40",
    text: "text-amber-foreground",
    label: "Student"
  },
  "TRYGG": {
    bg: "bg-teal/40",
    text: "text-teal-foreground",
    label: "Trygghetsboende"
  },
  "CO-LIVING": {
    bg: "bg-rose/30",
    text: "text-rose-foreground",
    label: "Co-living"
  },
  "KOOPERATIV": {
    bg: "bg-teal/40",
    text: "text-teal-foreground",
    label: "Kooperativ"
  },
  "POANGFRITT": {
    bg: "bg-orange/40",
    text: "text-orange-foreground",
    label: "Poängfritt"
  }
};

export function getBuildingTypeStyle(code: string | undefined): BuildingTypeStyle | null {
  if (!code) return null;
  return BUILDING_TYPE_STYLES[code] || {
    bg: "bg-muted",
    text: "text-muted-foreground",
    label: code
  };
}
