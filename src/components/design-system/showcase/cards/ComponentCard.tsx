import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

interface ComponentSpec {
  label: string;
  value: string;
}

interface ComponentCardProps {
  title: string;
  description?: string;
  status?: "active" | "inactive" | "maintenance";
  icon?: LucideIcon;
  specs?: ComponentSpec[];
  type?: string;
  location?: string;
}

export const ComponentCard = ({ 
  title, 
  description, 
  status = "active", 
  icon: Icon, 
  specs = [],
  type,
  location 
}: ComponentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "inactive": return "bg-red-100 text-red-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Aktiv";
      case "inactive": return "Inaktiv";
      case "maintenance": return "Underhåll";
      default: return "Okänd";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <Badge className={getStatusColor(status)}>
            {getStatusText(status)}
          </Badge>
        </div>
        
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        
        {(type || location) && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              {type && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Typ:</span>
                  <span>{type}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Placering:</span>
                  <span>{location}</span>
                </div>
              )}
            </div>
          </>
        )}
        
        {specs.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              {specs.map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{spec.label}:</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};