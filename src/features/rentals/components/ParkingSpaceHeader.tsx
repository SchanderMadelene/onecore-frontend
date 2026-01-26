import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { ParkingApplicationDialog } from "@/components/rentals/ParkingApplicationDialog";

interface ParkingSpaceHeaderProps {
  spaceAddress: string;
  offerStatus: string;
  space: any;
  hasOffers: boolean;
  onBack: () => void;
  onCreateOffer: () => void;
  isCreatingOffer: boolean;
}

export function ParkingSpaceHeader({
  spaceAddress,
  offerStatus,
  space,
  hasOffers,
  onBack,
  onCreateOffer,
  isCreatingOffer
}: ParkingSpaceHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold text-muted-foreground">Bilplatser</h2>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{spaceAddress}</h1>
            <Badge variant="outline" className="bg-primary/10 text-primary font-normal">
              {offerStatus}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <ParkingApplicationDialog parkingSpace={space} />
            {!hasOffers && (
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