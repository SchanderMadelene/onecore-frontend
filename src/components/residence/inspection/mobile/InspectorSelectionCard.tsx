import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin } from "lucide-react";

interface InspectorSelectionCardProps {
  inspectorName: string;
  setInspectorName: (name: string) => void;
  tenant?: any;
}

const inspectors = [
  "Anna Andersson",
  "Erik Eriksson", 
  "Maria Nilsson",
  "Johan Johansson"
];

export function InspectorSelectionCard({ 
  inspectorName, 
  setInspectorName, 
  tenant 
}: InspectorSelectionCardProps) {
  return (
    <div className="space-y-4">
      {/* Tenant Info Card */}
      {tenant && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Hyresgäst</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={tenant.avatar} />
                <AvatarFallback>
                  <User className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{tenant.name}</p>
                <p className="text-sm text-muted-foreground">{tenant.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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
        <CardContent>
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
    </div>
  );
}