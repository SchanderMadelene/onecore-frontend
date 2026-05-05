import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { PreviewHousingAdDialog } from "@/features/rentals/components/PreviewHousingAdDialog";
import type { HousingSpace } from "@/features/rentals/components/types/housing";
import type { UnpublishedHousingSpace } from "@/features/rentals/components/types/unpublished-housing";

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
  /** Antal aktiva omgångar — visas som chip om > 0 */
  activeRoundsCount?: number;
  /** Visa knapp "Starta ny erbjudandeomgång" */
  canStartNewRound?: boolean;
  onStartNewRound?: () => void;
  /** I urvalsläge: visa "Skicka" + "Avbryt urval" */
  isSelectingForNewRound?: boolean;
  onCancelSelection?: () => void;
  onSendNewRound?: () => void;
}

export function HousingHeader({
  housingAddress,
  offerStatus,
  housing,
  hasOffers,
  hasSelectedApplicants = false,
  onBack,
  readOnly = false,
  activeRoundsCount = 0,
  canStartNewRound = false,
  onStartNewRound,
  isSelectingForNewRound = false,
  onCancelSelection,
  onSendNewRound,
}: HousingHeaderProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
      </div>

      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
            <Badge variant="info">{offerStatus}</Badge>
            {activeRoundsCount > 1 && (
              <Badge variant="muted">{activeRoundsCount} omgångar aktiva</Badge>
            )}
          </div>
          {housing && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setPreviewOpen(true)}
            >
              Förhandsgranska annons
            </Button>
          )}
        </div>

        {!readOnly && (
          <div className="flex items-center gap-2">
            {isSelectingForNewRound ? (
              <>
                <Button variant="outline" onClick={onCancelSelection}>
                  Avbryt urval
                </Button>
                <Button onClick={onSendNewRound} disabled={!hasSelectedApplicants}>
                  Skicka erbjudande
                </Button>
              </>
            ) : canStartNewRound && hasOffers ? (
              <Button variant="outline" onClick={onStartNewRound}>
                Starta ny erbjudandeomgång
              </Button>
            ) : null}
          </div>
        )}
      </div>

      {housing && (
        <PreviewHousingAdDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          housingSpace={housing as unknown as UnpublishedHousingSpace}
          formValues={{}}
        />
      )}
    </>
  );
}
