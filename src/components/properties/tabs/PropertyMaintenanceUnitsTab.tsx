
import { Card, CardContent } from "@/components/ui/card";
import { MaintenanceUnit } from "@/types/api";
import { 
  Building, 
  Wind, 
  ArrowUpDown, 
  DoorClosed, 
  Lock, 
  WashingMachine, 
  Fan, 
  Thermometer, 
  Box,
  HomeIcon,
  ExternalLink,
  LayoutGrid,
  Warehouse,
  Landmark
} from "lucide-react";

interface PropertyMaintenanceUnitsTabProps {
  maintenanceUnits?: MaintenanceUnit[];
}

// Hjälpfunktion för att få rätt ikon baserat på typ
const getMaintenanceUnitIcon = (type: MaintenanceUnit['type']) => {
  switch (type) {
    case "Tak":
      return <HomeIcon className="h-5 w-5" />;
    case "Fasad":
      return <Building className="h-5 w-5" />;
    case "Fönster":
      return <Wind className="h-5 w-5" />; // Using Wind instead of Window
    case "Balkong":
      return <ExternalLink className="h-5 w-5" />;
    case "Uteplats":
      return <LayoutGrid className="h-5 w-5" />;
    case "Allmänna ytor":
      return <Landmark className="h-5 w-5" />;
    case "Källare":
      return <Warehouse className="h-5 w-5" />;
    case "Vind":
      return <Building className="h-5 w-5" />;
    case "Förråd":
      return <Box className="h-5 w-5" />;
    case "Lokal":
      return <Building className="h-5 w-5" />;
    case "Hiss":
      return <ArrowUpDown className="h-5 w-5" />; // Using ArrowUpDown instead of Elevator
    case "Skyddsrum":
      return <DoorClosed className="h-5 w-5" />; // Changed from Door to DoorClosed
    case "Lås & passage":
      return <Lock className="h-5 w-5" />;
    case "Tvättstuga":
      return <WashingMachine className="h-5 w-5" />;
    case "Miljöbod":
      return <Fan className="h-5 w-5" />; // Using Fan instead of AirVent
    case "Undercentral":
      return <Thermometer className="h-5 w-5" />;
    default:
      return <Box className="h-5 w-5" />;
  }
};

// Hjälpfunktion för att gruppera underhållsenheter
const groupMaintenanceUnits = (units: MaintenanceUnit[]) => {
  const groups: Record<string, MaintenanceUnit[]> = {
    "Byggnad": [], // Tak, Fasad, Fönster
    "Utrymmen": [], // Balkong, Uteplats, Allmänna ytor, Källare, Vind, Förråd, Lokal, Skyddsrum
    "System": [],   // Hiss, Lås & passage, Tvättstuga, Miljöbod, Undercentral
    "Övrigt": []    // Annat
  };

  units.forEach(unit => {
    switch (unit.type) {
      case "Tak":
      case "Fasad":
      case "Fönster":
        groups["Byggnad"].push(unit);
        break;
      case "Balkong":
      case "Uteplats":
      case "Allmänna ytor":
      case "Källare":
      case "Vind":
      case "Förråd":
      case "Lokal":
      case "Skyddsrum":
        groups["Utrymmen"].push(unit);
        break;
      case "Hiss":
      case "Lås & passage":
      case "Tvättstuga":
      case "Miljöbod":
      case "Undercentral":
        groups["System"].push(unit);
        break;
      default:
        groups["Övrigt"].push(unit);
        break;
    }
  });

  return groups;
};

export const PropertyMaintenanceUnitsTab = ({ maintenanceUnits }: PropertyMaintenanceUnitsTabProps) => {
  if (!maintenanceUnits || maintenanceUnits.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium text-muted-foreground">
          Inga underhållsenheter registrerade för denna fastighet
        </h3>
      </div>
    );
  }

  const groupedUnits = groupMaintenanceUnits(maintenanceUnits);

  return (
    <div className="space-y-8">
      {Object.entries(groupedUnits).map(([groupName, units]) => (
        units.length > 0 && (
          <div key={groupName} className="space-y-4">
            <h2 className="text-xl font-semibold">{groupName}</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {units.map((unit) => (
                <Card key={unit.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex items-center gap-3">
                    <div className="text-primary">
                      {getMaintenanceUnitIcon(unit.type)}
                    </div>
                    <h3 className="font-semibold text-lg">{unit.type}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};
