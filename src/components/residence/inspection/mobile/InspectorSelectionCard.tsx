import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, MapPin, ExternalLink, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface InspectorSelectionCardProps {
  inspectorName: string;
  setInspectorName: (name: string) => void;
  inspectionTime: string;
  setInspectionTime: (time: string) => void;
  needsMasterKey: boolean;
  setNeedsMasterKey: (needs: boolean) => void;
  tenant?: any;
}

const inspectors = [
  "Anna Andersson",
  "Erik Eriksson", 
  "Maria Nilsson",
  "Johan Johansson"
];

// Simulate logged in user
const currentUser = "Anna Andersson";

export function InspectorSelectionCard({ 
  inspectorName, 
  setInspectorName,
  inspectionTime,
  setInspectionTime,
  needsMasterKey,
  setNeedsMasterKey,
  tenant 
}: InspectorSelectionCardProps) {
  const navigate = useNavigate();
  
  // Set default inspector if not already set
  useEffect(() => {
    if (!inspectorName && currentUser) {
      setInspectorName(currentUser);
    }
  }, [inspectorName, setInspectorName]);

  const handleOpenTenantProfile = () => {
    if (tenant?.id) {
      navigate(`/tenants/${tenant.id}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tenant Info Card */}
      {tenant && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Hyresgäst</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleOpenTenantProfile}
                className="h-8 w-8 p-0"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* User info section */}
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={tenant.avatar} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{tenant.name}</p>
                <p className="text-sm text-muted-foreground">{tenant.email}</p>
              </div>
            </div>

            {/* Contract status */}
            <div className="flex justify-center">
              <Badge 
                variant="outline"
                className={tenant.contractStatus === 'active' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-orange-50 text-orange-700 border-orange-200'
                }
              >
                {tenant.contractStatus === 'active' ? 'Aktivt kontrakt' : 'Inaktivt kontrakt'}
              </Badge>
            </div>
            
            {/* Date information */}
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Inflyttningsdatum</p>
                <p className="font-medium">{tenant.moveInDate || '2023-01-01'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utflyttningsdatum</p>
                <p className="font-medium">{tenant.moveOutDate || '2023-12-31'}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-3 border-t">
              <MapPin className="h-4 w-4" />
              <span>Odenplan 5, lägenhet 1001</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Inspector Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Välj besiktningsman</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={inspectorName} onValueChange={setInspectorName}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Välj vem som utför besiktningen" />
            </SelectTrigger>
            <SelectContent>
              {inspectors.map((inspector) => (
                <SelectItem key={inspector} value={inspector}>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {inspector.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {inspector}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Time and Master Key Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Besiktningsinställningar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="inspection-time" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Klockslag för besiktning
            </Label>
            <Input
              id="inspection-time"
              type="time"
              value={inspectionTime}
              onChange={(e) => setInspectionTime(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="master-key"
              checked={needsMasterKey}
              onCheckedChange={setNeedsMasterKey}
            />
            <Label htmlFor="master-key" className="cursor-pointer">
              Huvudnyckel krävs
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}