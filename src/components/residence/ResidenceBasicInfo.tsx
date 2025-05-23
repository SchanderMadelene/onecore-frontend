
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Residence } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";
import { useParams } from "react-router-dom";

interface ResidenceBasicInfoProps {
  residence: Residence;
  property?: string;
  district?: string;
}

// Function to determine the contract status based on residence data
const getContractStatus = (residence: Residence): string => {
  if (residence.deleted) return "Borttagen";
  
  const now = new Date();
  const fromDate = new Date(residence.validityPeriod.fromDate);
  const toDate = new Date(residence.validityPeriod.toDate);
  
  if (fromDate > now) {
    return "Kommande";
  } else if (toDate < now) {
    return "Upphört";
  } else if (toDate.getTime() - now.getTime() < 90 * 24 * 60 * 60 * 1000) {
    // If contract expires within 90 days, consider it as "Uppsagt"
    return "Uppsagt";
  } else {
    return "Gällande";
  }
};

export const ResidenceBasicInfo = ({ residence, property, district }: ResidenceBasicInfoProps) => {
  const isMobile = useIsMobile();
  const { id } = useParams<{ id: string }>();
  
  // Check if this is a secondary rental based on ID
  // In a real application, this would come from the API data
  const isSecondaryRental = id === "lgh-1002";
  
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Lägenhet {residence.code}</h1>
        <p className="text-muted-foreground">Älgen 1, {district}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Grundinformation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`grid ${isMobile ? 'grid-cols-1 gap-y-4' : 'grid-cols-2 md:grid-cols-3 gap-4'}`}>
            <div>
              <p className="text-sm text-muted-foreground">Lägenhetskod</p>
              <p className="font-medium">{residence.code}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Namn</p>
              <p className="font-medium">{residence.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kontraktstatus</p>
              <p className="font-medium">{getContractStatus(residence)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Yta</p>
              <p className="font-medium">{residence.size ? `${residence.size} m²` : "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Anläggnings ID Mälarenergi</p>
              <p className="font-medium">{residence.malarenergiFacilityId || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Andrahandsuthyrning</p>
              <p className="font-medium">{isSecondaryRental ? "Ja" : "Nej"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Befintligt kontrakt från</p>
              <p className="font-medium">
                {new Date(residence.validityPeriod.fromDate).toLocaleDateString('sv-SE')}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Befintligt kontrakt till</p>
              <p className="font-medium">
                {new Date(residence.validityPeriod.toDate).toLocaleDateString('sv-SE')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
