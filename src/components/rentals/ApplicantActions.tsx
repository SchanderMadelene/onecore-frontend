
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MoreHorizontal } from "lucide-react";
import { useRemoveApplicant } from "@/hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";

interface ApplicantActionsProps {
  applicantId: number;
  applicantName: string;
  listingAddress: string;
  listingId: number;
  disabled?: boolean;
}

export const ApplicantActions = ({ 
  applicantId, 
  applicantName, 
  listingAddress, 
  listingId, 
  disabled = false 
}: ApplicantActionsProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const removeApplicant = useRemoveApplicant();
  const { toast } = useToast();

  const handleRemove = () => {
    removeApplicant.mutate(
      { applicantId, listingId },
      {
        onSuccess: () => {
          setShowDeleteDialog(false);
          toast({
            title: "Intresseanmälan borttagen",
            description: `${applicantName} har tagits bort från ${listingAddress}`,
          });
        },
        onError: () => {
          toast({
            title: "Fel",
            description: "Kunde inte ta bort intresseanmälan",
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
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:text-destructive"
          >
            Ta bort anmälan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ta bort intresseanmälan</AlertDialogTitle>
            <AlertDialogDescription>
              Vill du ta bort {applicantName} som intressent för {listingAddress}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleRemove}
              disabled={removeApplicant.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {removeApplicant.isPending ? "Tar bort..." : "Ja, ta bort"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
