
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useRemoveApplicant } from "../hooks/useOfferActions";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/shared/common";

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
          <Button variant="outline" size="icon" disabled={disabled}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-background border shadow-md">
          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
          >
            Ta bort anmälan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        title="Ta bort intresseanmälan"
        description={`Vill du ta bort ${applicantName} som intressent för ${listingAddress}?`}
        onConfirm={handleRemove}
        confirmLabel="Ja, ta bort"
        variant="destructive"
        isPending={removeApplicant.isPending}
        pendingLabel="Tar bort..."
      />
    </>
  );
};
