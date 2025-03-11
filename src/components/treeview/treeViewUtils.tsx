
import { ReactNode } from "react";
import { Building, DoorOpen, MapPin, LayoutGrid, LandPlot, Castle, Tag } from "lucide-react";

export const getNodeIcon = (iconName?: string): ReactNode => {
  switch (iconName) {
    case "location":
      return <LandPlot className="h-4 w-4 text-primary" />;
    case "map":
      return <MapPin className="h-4 w-4 text-accent" />;
    case "area":
      return <Tag className="h-4 w-4 text-secondary" />;
    case "building":
      return <Castle className="h-4 w-4 text-muted-foreground" />;
    case "home":
      return <DoorOpen className="h-4 w-4 text-muted-foreground" />;
    default:
      return <LayoutGrid className="h-4 w-4 text-muted-foreground" />;
  }
};
