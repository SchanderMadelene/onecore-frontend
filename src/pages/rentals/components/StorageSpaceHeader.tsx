import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { StorageApplicationDialog } from "@/features/rentals/components/StorageApplicationDialog";
import type { StorageSpace } from "@/features/rentals/components/types/storage";

interface StorageSpaceHeaderProps {
  spaceAddress: string;
  offerStatus: string;
  space: StorageSpace;
  hasOffers: boolean;
  onBack: () => void;
  onCreateOffer: () => void;
  isCreatingOffer: boolean;
}

export function StorageSpaceHeader({
  spaceAddress,
  offerStatus,
  space,
  hasOffers,
  onBack,
  onCreateOffer,
  isCreatingOffer,
}: StorageSpaceHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-muted-foreground">Förråd</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{spaceAddress}</h1>
            {offerStatus && <Badge variant="info">{offerStatus}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            {space?.id && <StorageApplicationDialog storageSpace={space} />}
            {!hasOffers && space?.id && (
              <Button
                onClick={onCreateOffer}
                disabled={isCreatingOffer}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span>{isCreatingOffer ? "Startar..." : "Starta erbjudandeomgång"}</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
