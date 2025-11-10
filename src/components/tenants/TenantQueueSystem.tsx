import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoIcon, Home, Car, User, UserCheck, Users, Plus, Warehouse, ExternalLink } from "lucide-react";
import { CreateParkingInterestDialog } from "./CreateParkingInterestDialog";
import { ApplicantProfileModal } from "../rentals/ApplicantProfileModal";

// Mock data for the queue system
const queueData = {
  housingPoints: 1245,
  parkingPoints: 386,
  storagePoints: 892,
  activeInterests: [
    {
      id: "int-001",
      type: "housing",
      address: "Storgatan 45, 2tr",
      dateRegistered: "2023-09-12",
      status: "waiting",
      publishedUntil: "2024-12-31",
      availableFrom: "2024-02-01",
      applicationStatus: "Väntar"
    },
    {
      id: "int-002",
      type: "parking",
      address: "P-plats Norra garaget",
      dateRegistered: "2023-11-05",
      status: "offered",
      publishedUntil: "2024-11-30",
      availableFrom: "2024-01-15",
      applicationStatus: "Erbjuden"
    }
  ],
  housingReferences: {
    currentHousingForm: "Hyresrätt",
    landlord: "Mimer Fastigheter AB",
    adultsInHousehold: 2,
    childrenInHousehold: 1,
    referenceStatus: "Godkänd"
  }
};

// Helper function to get the appropriate color for reference status
const getReferenceStatusColor = (status: string) => {
  switch (status) {
    case "Godkänd":
      return "bg-green-500";
    case "Ej godkänd":
      return "bg-red-500";
    case "Kontaktad - ej svar":
      return "bg-amber-500";
    case "Referens krävs ej":
      return "bg-blue-500";
    default:
      return "bg-slate-500";
  }
};

interface TenantQueueSystemProps {
  customerNumber: string;
  customerName: string;
  personalNumber?: string;
}

export function TenantQueueSystem({ customerNumber, customerName, personalNumber }: TenantQueueSystemProps) {
  const [activeInterests, setActiveInterests] = useState(queueData.activeInterests);

  // Listen for new parking interest applications
  useEffect(() => {
    const handleNewInterest = (event: CustomEvent) => {
      const { parkingSpaces } = event.detail;
      const newInterests = parkingSpaces.map((space: any) => ({
        id: `int-parking-${Date.now()}-${space.id}`,
        type: "parking",
        address: space.address,
        dateRegistered: new Date().toISOString().split('T')[0],
        status: "waiting"
      }));
      
      setActiveInterests(prev => [...newInterests, ...prev]);
    };

    window.addEventListener('parkingInterestCreated', handleNewInterest as EventListener);
    return () => window.removeEventListener('parkingInterestCreated', handleNewInterest as EventListener);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Home className="h-5 w-5 text-muted-foreground" />
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
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ny intresseanmälan bostad
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Car className="h-5 w-5 text-muted-foreground" />
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
              <CreateParkingInterestDialog 
                customerNumber={customerNumber}
                customerName={customerName}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Warehouse className="h-5 w-5 text-muted-foreground" />
              Förråd
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Köpoäng</p>
                <p className="text-2xl font-bold">{queueData.storagePoints}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Motsvarar ca {Math.floor(queueData.storagePoints / 365)} år och {queueData.storagePoints % 365} dagar
                </p>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ny intresseanmälan förråd
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            Boendereferenser
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nuvarande boendeform</p>
                <p className="font-medium">{queueData.housingReferences.currentHousingForm}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hyresvärd</p>
                <p className="font-medium">{queueData.housingReferences.landlord}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Vuxna i hushållet</p>
                </div>
                <p className="font-medium">{queueData.housingReferences.adultsInHousehold}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Barn i hushållet</p>
                </div>
                <p className="font-medium">{queueData.housingReferences.childrenInHousehold}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Status på boendereferens</p>
              </div>
              <Badge 
                className={`${getReferenceStatusColor(queueData.housingReferences.referenceStatus)} text-white mt-1`}
              >
                {queueData.housingReferences.referenceStatus}
              </Badge>
            </div>
            <div className="pt-4 border-t">
              <ApplicantProfileModal 
                customerNumber={customerNumber}
                customerName={customerName}
                personalNumber={personalNumber}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Aktiva intresseanmälningar</CardTitle>
        </CardHeader>
        <CardContent>
          {activeInterests.length > 0 ? (
            <div className="space-y-4">
              {activeInterests.map((interest) => (
                <div key={interest.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-medium">
                        {interest.address}
                      </span>
                    </div>
                    <Badge 
                      variant={interest.status === "offered" ? "default" : "outline"}
                      className={interest.status === "offered" ? "bg-amber-500" : ""}
                    >
                      {interest.applicationStatus || (interest.status === "waiting" ? "Väntar" : "Erbjuden")}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Anmäld: </span>
                      <span>{new Date(interest.dateRegistered).toLocaleDateString('sv-SE')}</span>
                    </div>
                    {interest.publishedUntil && (
                      <div>
                        <span className="text-muted-foreground">Publicerad tom: </span>
                        <span>{new Date(interest.publishedUntil).toLocaleDateString('sv-SE')}</span>
                      </div>
                    )}
                    {interest.availableFrom && (
                      <div>
                        <span className="text-muted-foreground">Ledigt från: </span>
                        <span>{new Date(interest.availableFrom).toLocaleDateString('sv-SE')}</span>
                      </div>
                    )}
                  </div>
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
