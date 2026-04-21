import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { HousingRowActions, type HousingActionTab } from "@/features/rentals/components/HousingRowActions";
import type { HousingSpace } from "@/features/rentals/components/types/housing";

interface HousingHeaderProps {
  housingAddress: string;
  offerStatus: string;
  housing?: HousingSpace;
  hasOffers: boolean;
  hasSelectedApplicants?: boolean;
  onBack: () => void;
  onCreateOffer: () => void;
  isCreatingOffer: boolean;
}

const STATUS_TO_TAB: Record<string, HousingActionTab> = {
  Publicerad: "publicerade",
  "Klara för erbjudande": "klaraForErbjudande",
  Erbjudna: "erbjudna",
};

export function HousingHeader({
  housingAddress,
  offerStatus,
  housing,
  hasOffers,
  hasSelectedApplicants = false,
  onBack,
  onCreateOffer,
  isCreatingOffer,
}: HousingHeaderProps) {
  const tab = STATUS_TO_TAB[offerStatus] ?? "publicerade";
  const showSendOffer = tab === "klaraForErbjudande" && !hasOffers;

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-muted-foreground">Bostäder</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary font-normal">
              {offerStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {showSendOffer && (
              <Button
                onClick={onCreateOffer}
                disabled={isCreatingOffer || !hasSelectedApplicants}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>{isCreatingOffer ? "Skickar..." : "Skicka erbjudande"}</span>
              </Button>
            )}
            {housing && (
              <HousingRowActions
                housing={housing}
                tab={tab}
                variant="detail"
                hidePrimary={tab === "klaraForErbjudande"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
