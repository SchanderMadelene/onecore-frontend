import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TriangleAlert, Bug } from "lucide-react";
import type { Residence } from "@/types/api";
import { useParams } from "react-router-dom";
import { mockTenant, mockMultipleTenants, mockSecondHandTenants } from "@/data/tenants";

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

const requiresSpecialHandling = (residenceId: string): boolean => {
  // For demo purposes, mark lgh-1002 and lgh-001 as requiring special handling
  // In a real application, this would come from the API data
  return residenceId === "lgh-1002" || residenceId === "lgh-001";
};

const requiresPestControl = (residenceId: string): boolean => {
  // For demo purposes, mark lgh-1002 and lgh-001 as having pest issues
  // In a real application, this would come from the API data
  return residenceId === "lgh-1002" || residenceId === "lgh-001";
};

// Function to check if residence has second-hand rental
const checkSecondHandRental = (residenceId: string): boolean => {
  // Get tenant data based on residence ID
  switch(residenceId) {
    case "lgh-1001":
      return false; // Multiple tenants but not second-hand
    case "lgh-1002":
    case "lgh-002":
      return mockSecondHandTenants.some(t => t.relationshipType === "secondaryTenant");
    default:
      return false;
  }
};

export const ResidenceBasicInfo = ({ residence, property, district }: ResidenceBasicInfoProps) => {
  const { id } = useParams<{ id: string }>();
  
  // Check if this is a secondary rental based on tenant data
  const isSecondaryRental = checkSecondHandRental(id || "");
  const needsSpecialHandling = requiresSpecialHandling(id || "");
  const hasPestIssues = requiresPestControl(id || "");
  
  return (
    <TooltipProvider>
      <div className="mb-6">
        <div className="flex flex-col gap-2 mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{residence.name}</h1>
          {(needsSpecialHandling || hasPestIssues) && (
            <div className="flex items-center gap-2">
              {needsSpecialHandling && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-7 h-7 bg-amber-100 rounded-full border border-amber-200 cursor-help">
                      <TriangleAlert className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Kräver särskild hantering</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {hasPestIssues && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-center w-7 h-7 bg-red-100 rounded-full border border-red-200 cursor-help">
                      <Bug className="h-3.5 w-3.5 text-red-600" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Skadedjursproblem rapporterat</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Grundinformation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
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
              <p className="text-sm text-muted-foreground">Hyra</p>
              <p className="font-medium">{residence.rent ? `${residence.rent} kr/mån` : "N/A"}</p>
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
    </TooltipProvider>
  );
};
