
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Settings, Lock, Zap, PaintBucket } from "lucide-react";
import type { Building, InstallationType } from "@/types/api";

interface BuildingInstallationsTabProps {
  building: Building;
}

const getInstallationIcon = (type: InstallationType) => {
  switch (type) {
    case "Lås & Passage":
      return <Lock className="h-4 w-4 text-blue-600" />;
    case "Hissar":
      return <Settings className="h-4 w-4 text-green-600" />;
    case "VVS":
      return <PaintBucket className="h-4 w-4 text-cyan-600" />;
    case "El":
      return <Zap className="h-4 w-4 text-yellow-600" />;
    case "Fiber":
      return <Zap className="h-4 w-4 text-purple-600" />;
    default:
      return <Settings className="h-4 w-4 text-gray-600" />;
  }
};

const getStatusBadge = (status: string) => {
  const variant = status === "Aktiv" ? "default" : 
                  status === "Under underhåll" ? "secondary" : "destructive";
  
  return <Badge variant={variant} className="text-xs">{status}</Badge>;
};

export const BuildingInstallationsTab = ({ building }: BuildingInstallationsTabProps) => {
  const installations = building.installations || [];

  if (installations.length === 0) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-xl font-medium mb-2">Inga installationer</h3>
            <p className="text-muted-foreground">
              Det finns inga installationer registrerade för denna byggnad ännu.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Group installations by type
  const groupedInstallations = installations.reduce((acc, installation) => {
    if (!acc[installation.type]) {
      acc[installation.type] = [];
    }
    acc[installation.type].push(installation);
    return acc;
  }, {} as Record<InstallationType, typeof installations>);

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {Object.entries(groupedInstallations).map(([type, installationList]) => (
          <AccordionItem 
            key={type} 
            value={type}
            className="border border-slate-200"
          >
            <AccordionTrigger className="px-3 sm:px-4 py-3 hover:bg-accent/50">
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2">
                  {getInstallationIcon(type as InstallationType)}
                  <span className="font-medium">{type}</span>
                  <span className="text-sm text-muted-foreground">({installationList.length})</span>
                </div>
              </div>
            </AccordionTrigger>
            
            <AccordionContent>
              <div className="px-3 sm:px-4 pb-4 pt-1 space-y-3">
                {installationList.map(installation => (
                  <Card key={installation.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{installation.name}</CardTitle>
                        {getStatusBadge(installation.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {installation.description && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {installation.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        {installation.lastMaintenance && (
                          <div>
                            <span className="font-medium">Senast underhåll:</span>
                            <span className="ml-1">{installation.lastMaintenance}</span>
                          </div>
                        )}
                        {installation.nextMaintenance && (
                          <div>
                            <span className="font-medium">Nästa underhåll:</span>
                            <span className="ml-1">{installation.nextMaintenance}</span>
                          </div>
                        )}
                        {installation.specs && Object.entries(installation.specs).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium">{key}:</span>
                            <span className="ml-1">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
