import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { HousingRowActions, type HousingActionTab } from "@/features/rentals/components/HousingRowActions";
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
  readOnly = false,
}: HousingHeaderProps) {
  const tab = STATUS_TO_TAB[offerStatus] ?? "publicerade";
  const showSendOffer = !readOnly && tab === "klaraForErbjudande" && !hasOffers;
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <div className="mb-4">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Tillbaka
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
              <Badge variant="info">{offerStatus}</Badge>
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
          )}
        </div>
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
