
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { useAcceptOffer, useDenyOffer } from "../hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";

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
          <Button variant="ghost" size="icon" disabled={disabled}>
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

      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Svara på erbjudande</AlertDialogTitle>
            <AlertDialogDescription>
              Tacka ja åt {applicantName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleAccept}
              disabled={acceptOffer.isPending}
            >
              {acceptOffer.isPending ? "Bekräftar..." : "Bekräfta tacka ja"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showDenyDialog} onOpenChange={setShowDenyDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Svara på erbjudande</AlertDialogTitle>
            <AlertDialogDescription>
              Tacka nej åt {applicantName}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeny}
              disabled={denyOffer.isPending}
            >
              {denyOffer.isPending ? "Bekräftar..." : "Bekräfta tacka nej"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
