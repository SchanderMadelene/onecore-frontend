
import { ReactNode } from "react";
import { Building, Home, DoorOpen, MapPin, LayoutGrid } from "lucide-react";

export const getNodeIcon = (iconName?: string): ReactNode => {
  switch (iconName) {
    case "🏛":
      return <Building className="h-4 w-4 text-primary" />;
    case "📍":
      return <MapPin className="h-4 w-4 text-accent" />;
    case "🏢":
      return <Building className="h-4 w-4 text-muted-foreground" />;
    case "🏗":
      return <Building className="h-4 w-4 text-muted-foreground" />;
    case "🏠":
      return <Home className="h-4 w-4 text-muted-foreground" />;
    case "🚪":
      return <DoorOpen className="h-4 w-4 text-muted-foreground" />;
    default:
      return <LayoutGrid className="h-4 w-4 text-muted-foreground" />;
  }
};
