
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useAcceptOffer, useDenyOffer } from "../hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/shared/common";

interface OfferActionsProps {
  offerId: number;
  listingId: number;
  applicantName: string;
  disabled?: boolean;
}

export const OfferActions = ({ 
  offerId, 
  listingId, 
  applicantName, 
  disabled = false 
}: OfferActionsProps) => {
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showDenyDialog, setShowDenyDialog] = useState(false);
  const acceptOffer = useAcceptOffer();
  const denyOffer = useDenyOffer();
  const { toast } = useToast();

  const handleAccept = () => {
    acceptOffer.mutate(
      { offerId, listingId },
      {
        onSuccess: () => {
          setShowAcceptDialog(false);
          toast({
            title: "Erbjudande accepterat",
            description: `Erbjudandet för ${applicantName} har accepterats`,
          });
        },
        onError: () => {
          toast({
            title: "Fel",
            description: "Kunde inte acceptera erbjudandet",
            variant: "destructive",
          });
        }
      }
    );
  };

  const handleDeny = () => {
    denyOffer.mutate(
      { offerId, listingId },
      {
        onSuccess: () => {
          setShowDenyDialog(false);
          toast({
            title: "Erbjudande nekat",
            description: `Erbjudandet för ${applicantName} har nekats`,
          });
        },
        onError: () => {
          toast({
            title: "Fel",
            description: "Kunde inte neka erbjudandet",
            variant: "destructive",
          });
        }
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" disabled={disabled}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border shadow-md">
          <DropdownMenuItem onClick={() => setShowAcceptDialog(true)}>
            Tacka ja
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowDenyDialog(true)}>
            Tacka nej
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={showAcceptDialog}
        onOpenChange={setShowAcceptDialog}
        title="Svara på erbjudande"
        description={`Tacka ja åt ${applicantName}?`}
        onConfirm={handleAccept}
        confirmLabel="Bekräfta tacka ja"
        isPending={acceptOffer.isPending}
      />

      <ConfirmDialog
        open={showDenyDialog}
        onOpenChange={setShowDenyDialog}
        title="Svara på erbjudande"
        description={`Tacka nej åt ${applicantName}?`}
        onConfirm={handleDeny}
        confirmLabel="Bekräfta tacka nej"
        isPending={denyOffer.isPending}
      />
    </>
  );
};
