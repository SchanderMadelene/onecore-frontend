import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Phone, User, Key, FileText } from "lucide-react";
import type { ExtendedInspection } from "@/pages/inspections/data/mockInspections";

interface InspectionCaseInfoProps {
  inspection: ExtendedInspection;
  onStartInspection: () => void;
  onClose: () => void;
}

export function InspectionCaseInfo({ 
  inspection, 
  onStartInspection,
  onClose 
}: InspectionCaseInfoProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Ärendeinformation</span>
            <Badge variant={inspection.priority === 'avflytt' ? 'destructive' : 'secondary'}>
              {inspection.priority === 'avflytt' ? 'Avflytt' : 'Inflytt'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Adress</p>
                <p className="font-medium">{inspection.address || 'Ej angiven'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Kontrakt ID</p>
                <p className="font-medium">{inspection.contractId || 'Ej angivet'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Uppsägningsdatum</p>
                <p className="font-medium">{inspection.terminationDate || 'Ej angivet'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">{inspection.tenantPhone || 'Ej angivet'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Distrikt</p>
                <p className="font-medium">{inspection.district || 'Ej angivet'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Key className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Huvudnyckel</p>
                <p className="font-medium">{inspection.masterKey ? 'Ja' : 'Nej'}</p>
              </div>
            </div>
          </div>

          {inspection.tenant && (
            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Hyresgäst</h4>
              <p className="text-sm">{inspection.tenant.name}</p>
              {inspection.tenant.phone && (
                <p className="text-sm text-muted-foreground">{inspection.tenant.phone}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onClose}>
          Stäng
        </Button>
        <Button onClick={onStartInspection}>
          Starta besiktning
        </Button>
      </div>
    </div>
  );
}
