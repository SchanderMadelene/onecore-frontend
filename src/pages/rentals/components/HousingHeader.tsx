import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle, RotateCcw } from "lucide-react";
import { HousingRowActions, type HousingActionTab } from "@/features/rentals/components/HousingRowActions";
import type { HousingSpace } from "@/features/rentals/components/types/housing";

interface HousingHeaderProps {
  housingAddress: string;
  offerStatus: string;
  /** Aktuellt omgångsnummer (visas som chip när exakt 1 aktiv omgång finns) */
  currentRoundNumber?: number;
  /** Antal parallellt aktiva omgångar (visas som chip när >1) */
  activeRoundsCount?: number;
  housing?: HousingSpace;
  hasOffers: boolean;
  hasSelectedApplicants?: boolean;
  /** Sant när handläggaren kan starta en ny omgång (annonsen ej tilldelad) */
  canStartNewRound?: boolean;
  /** Sant medan handläggaren håller på att välja sökande till ny omgång (visa "Skicka erbjudande") */
  isSelectingForNewRound?: boolean;
  onBack: () => void;
  /** Skicka erbjudande för aktuellt urval (omgång 1 eller ny omgång) */
  onCreateOffer: () => void;
  /** Starta ny omgång (öppna urvalsläget) */
  onStartNewRound?: () => void;
  isCreatingOffer: boolean;
  /** Read-only läge för historik-annonser: dölj alla actions */
  readOnly?: boolean;
}

const STATUS_TO_TAB: Record<string, HousingActionTab> = {
  Publicerad: "publicerade",
  "Klara för erbjudande": "klaraForErbjudande",
  "Klar för ny omgång": "erbjudna",
  "Erbjudande pågår": "erbjudna",
  Tilldelad: "erbjudna",
  Erbjudna: "erbjudna",
};

export function HousingHeader({
  housingAddress,
  offerStatus,
  currentRoundNumber,
  activeRoundsCount,
  housing,
  hasOffers,
  hasSelectedApplicants = false,
  canStartNewRound = false,
  isSelectingForNewRound = false,
  onBack,
  onCreateOffer,
  onStartNewRound,
  isCreatingOffer,
  readOnly = false,
}: HousingHeaderProps) {
  const tab = STATUS_TO_TAB[offerStatus] ?? "publicerade";

  // "Skicka erbjudande" visas i två fall:
  // 1) Första omgången (status "Klara för erbjudande", inga rounds än)
  // 2) Handläggaren är i urvalsläge för ny omgång
  const showSendOffer =
    !readOnly && ((tab === "klaraForErbjudande" && !hasOffers) || isSelectingForNewRound);

  // "Starta ny erbjudandeomgång" visas alltid när det finns omgångar och annonsen
  // inte är tilldelad — oavsett om en omgång pågår eller ej. Knappen avbryter inget.
  const showStartNewRound =
    !readOnly && canStartNewRound && hasOffers && !isSelectingForNewRound;

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
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
            <Badge variant="info">{offerStatus}</Badge>
            {activeRoundsCount !== undefined && activeRoundsCount > 1 ? (
              <Badge variant="muted">{activeRoundsCount} omgångar aktiva</Badge>
            ) : currentRoundNumber !== undefined ? (
              <Badge variant="muted">Omgång {currentRoundNumber}</Badge>
            ) : null}
          </div>
          {!readOnly && (
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
              {showStartNewRound && (
                <Button onClick={onStartNewRound} className="flex items-center gap-1">
                  <RotateCcw className="h-4 w-4" />
                  <span>Starta ny erbjudandeomgång</span>
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
