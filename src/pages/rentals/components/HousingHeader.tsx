import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
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
  /** Read-only läge för historik-annonser: dölj alla actions */
  readOnly?: boolean;
  /** Visa "Skicka erbjudande" istället för "Starta ny erbjudandeomgång" (urvalsläge) */
  showSendOfferAction?: boolean;
  /** Visa "Starta ny erbjudandeomgång"-knapp (lägger till parallell omgång) */
  canStartNewRound?: boolean;
  /** I urvalsläge för ny omgång — visa "Avbryt urval" */
  isSelectingForNewRound?: boolean;
  onStartNewRound?: () => void;
  onCancelSelection?: () => void;
  /** Antal aktiva omgångar (för chip) */
  activeRoundsCount?: number;
  /** Senaste rondnummer (för chip när bara en omgång är aktiv) */
  latestRoundNumber?: number;
  /** Etikett för tabben man kom från (visas i breadcrumb) */
  sourceTabLabel?: string;
}

const STATUS_TO_TAB: Record<string, HousingActionTab> = {
  Publicerad: "publicerade",
  "Klara för erbjudande": "klaraForErbjudande",
  Erbjudna: "erbjudna",
  Tilldelad: "erbjudna",
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
  readOnly = false,
  showSendOfferAction,
  canStartNewRound = false,
  isSelectingForNewRound = false,
  onStartNewRound,
  onCancelSelection,
  activeRoundsCount = 0,
  latestRoundNumber,
  sourceTabLabel,
}: HousingHeaderProps) {
  const tab = STATUS_TO_TAB[offerStatus] ?? "publicerade";

  // Default: Skicka-erbjudande-knappen visas i "Klara för erbjudande" utan rondar.
  const defaultShowSendOffer = !readOnly && tab === "klaraForErbjudande" && !hasOffers;
  const showSendOffer = !readOnly && (showSendOfferAction ?? defaultShowSendOffer);

  // "Starta ny erbjudandeomgång": minst en rond finns, listing inte tilldelad,
  // inte i urvalsläge, inte i read-only.
  const showStartNewRound =
    !readOnly && hasOffers && canStartNewRound && !isSelectingForNewRound;

  const showCancelSelection = !readOnly && isSelectingForNewRound;

  // Chip för aktiva omgångar
  const roundChip =
    !readOnly && hasOffers ? (
      activeRoundsCount > 1 ? (
        <Badge variant="info">{activeRoundsCount} omgångar aktiva</Badge>
      ) : latestRoundNumber !== undefined ? (
        <Badge variant="info">Omgång {latestRoundNumber}</Badge>
      ) : null
    ) : null;

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-muted-foreground">Bostäder</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
            <Badge variant="info">{offerStatus}</Badge>
            {roundChip}
          </div>
          {!readOnly && (
            <div className="flex items-center gap-2 flex-wrap">
              {showSendOffer && (
                <Button
                  onClick={onCreateOffer}
                  disabled={isCreatingOffer || !hasSelectedApplicants}
                >
                  {isCreatingOffer ? "Skickar..." : "Skicka erbjudande"}
                </Button>
              )}
              {showStartNewRound && (
                <Button onClick={onStartNewRound} variant="default">
                  Starta ny erbjudandeomgång
                </Button>
              )}
              {showCancelSelection && (
                <Button variant="outline" onClick={onCancelSelection}>
                  Avbryt urval
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
          )}
        </div>
      </div>
    </>
  );
}
