
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Home, Car } from "lucide-react";

// Mock data for the queue system
const queueData = {
  housingPoints: 1245,
  parkingPoints: 386,
  activeInterests: [
    {
      id: "int-001",
      type: "housing",
      address: "Storgatan 45, 2tr",
      dateRegistered: "2023-09-12",
      status: "waiting"
    },
    {
      id: "int-002",
      type: "parking",
      address: "P-plats Norra garaget",
      dateRegistered: "2023-11-05",
      status: "offered"
    }
  ]
};

export function TenantQueueSystem() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5 text-blue-500" />
              Bostadskö
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Köpoäng</p>
                <p className="text-2xl font-bold">{queueData.housingPoints}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Motsvarar ca {Math.floor(queueData.housingPoints / 365)} år och {queueData.housingPoints % 365} dagar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-blue-500" />
              Bilplatskö
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Köpoäng</p>
                <p className="text-2xl font-bold">{queueData.parkingPoints}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Motsvarar ca {Math.floor(queueData.parkingPoints / 365)} år och {queueData.parkingPoints % 365} dagar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Aktiva intresseanmälningar</CardTitle>
        </CardHeader>
        <CardContent>
          {queueData.activeInterests.length > 0 ? (
            <div className="space-y-4">
              {queueData.activeInterests.map((interest) => (
                <div key={interest.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {interest.type === "housing" ? (
                        <Home className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Car className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="font-medium">
                        {interest.address}
                      </span>
                    </div>
                    <Badge 
                      variant={interest.status === "offered" ? "default" : "outline"}
                      className={interest.status === "offered" ? "bg-amber-500" : ""}
                    >
                      {interest.status === "waiting" ? "Väntar" : "Erbjuden"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Anmäld: {new Date(interest.dateRegistered).toLocaleDateString('sv-SE')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Inga aktiva intresseanmälningar</AlertTitle>
              <AlertDescription>
                Det finns inga aktiva intresseanmälningar för denna kund.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
