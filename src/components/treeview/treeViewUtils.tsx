
import { ReactNode } from "react";
import { 
  Building, 
  Building2, 
  DoorOpen, 
  MapPin, 
  LayoutGrid, 
  Home, 
  User, 
  Users, 
  FileText, 
  Tag
} from "lucide-react";

export const getNodeIcon = (iconName?: string): ReactNode => {
  switch (iconName) {
    case "location":
      return <MapPin className="h-4 w-4 text-primary" />;
    case "map":
      return <MapPin className="h-4 w-4 text-accent" />;
    case "area":
      return <Tag className="h-4 w-4 text-secondary" />;
    case "building":
      return <Building className="h-4 w-4 text-muted-foreground" />;
    case "building2":
      return <Building2 className="h-4 w-4 text-muted-foreground" />;
    case "home":
      return <Home className="h-4 w-4 text-muted-foreground" />;
    case "user":
      return <User className="h-4 w-4 text-muted-foreground" />;
    case "users":
      return <Users className="h-4 w-4 text-muted-foreground" />;
    case "contact":
      return <FileText className="h-4 w-4 text-primary" />;
    default:
      return <LayoutGrid className="h-4 w-4 text-muted-foreground" />;
  }
};
