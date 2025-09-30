
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
  Tag,
  Monitor,
  Mail,
  Package,
  Wrench,
  Contact,
  Key,
  ShieldX,
  ArrowRightLeft,
  ClipboardList
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
      return <Contact className="h-4 w-4 text-muted-foreground" />;
    case "key":
      return <Key className="h-4 w-4 text-muted-foreground" />;
    case "shield-x":
      return <ShieldX className="h-4 w-4 text-muted-foreground" />;
    case "arrow-right-left":
      return <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />;
    case "clipboard-list":
      return <ClipboardList className="h-4 w-4 text-muted-foreground" />;
    case "monitor":
      return <Monitor className="h-4 w-4 text-blue-600" />;
    case "mail":
      return <Mail className="h-4 w-4 text-green-600" />;
    case "package":
      return <Package className="h-4 w-4 text-gray-600" />;
    case "wrench":
      return <Wrench className="h-4 w-4 text-orange-600" />;
    default:
      return <LayoutGrid className="h-4 w-4 text-muted-foreground" />;
  }
};
