import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { HousingApplicationDialog } from "@/features/rentals/components/HousingApplicationDialog";
import { ConfirmDialog } from "@/shared/common";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { toast } from "@/hooks/use-toast";
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

export function HousingHeader({
  housingAddress,
  offerStatus,
  housing,
  hasOffers,
  hasSelectedApplicants = false,
  onBack,
  onCreateOffer,
  isCreatingOffer
}: HousingHeaderProps) {
  const { markEarlyUnpublished } = useHousingOffers();
  const [earlyOpen, setEarlyOpen] = useState(false);
  const [earlyPending, setEarlyPending] = useState(false);

  const isPublished = offerStatus === "Publicerad";
  const seekers = housing?.seekers ?? 0;
  const canEarlyUnpublish = isPublished && !hasOffers && seekers > 0;

  const handleEarlyUnpublish = async () => {
    if (!housing) return;
    setEarlyPending(true);
    await new Promise((r) => setTimeout(r, 400));
    markEarlyUnpublished(housing.id);
    toast({
      title: "Annons flyttad till Klara för erbjudande",
      description: housing.address,
    });
    setEarlyPending(false);
    setEarlyOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-muted-foreground">Bostäder</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{housingAddress}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary font-normal">
              {offerStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            {housing && isPublished && <HousingApplicationDialog housingSpace={housing} />}
            {canEarlyUnpublish && (
              <Button variant="outline" onClick={() => setEarlyOpen(true)}>
                Tidigarelägg avpublicering
              </Button>
            )}
            {!hasOffers && (
              <Button
                onClick={onCreateOffer}
                disabled={isCreatingOffer || !hasSelectedApplicants}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>{isCreatingOffer ? "Skickar..." : "Skicka erbjudande"}</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={earlyOpen}
        onOpenChange={(v) => !v && setEarlyOpen(false)}
        title="Tidigarelägg avpublicering"
        description={`Vill du avsluta publiceringen av ${housingAddress} i förtid? Annonsen flyttas till "Klara för erbjudande" och nya intresseanmälningar kan inte längre lämnas.`}
        confirmLabel="Tidigarelägg avpublicering"
        pendingLabel="Avpublicerar..."
        isPending={earlyPending}
        onConfirm={handleEarlyUnpublish}
      />
    </>
  );
}
