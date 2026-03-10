
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/shared/common";
import type { ParkingSpace } from "./types/parking";

interface DeleteListingDialogProps {
  parkingSpace: ParkingSpace;
  disabled?: boolean;
}

export const DeleteListingDialog = ({ parkingSpace, disabled = false }: DeleteListingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDelete = async () => {
    setIsPending(true);
    setError(null);
    
    try {
      // TODO: Implementera API-anrop här senare
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOpen(false);
      toast({
        title: "Bilplatsannons borttagen",
        description: `Annonsen för ${parkingSpace.address} har tagits bort.`,
      });
    } catch (err) {
      setError("Det gick inte att ta bort bilplatsen. Troligtvis för att det redan finns intresseanmälningar på den. Kontakta support.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <Button 
        variant="destructive" 
        size="sm" 
        className="flex items-center gap-1"
        disabled={disabled}
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
        <span>Ta bort</span>
      </Button>

      <ConfirmDialog
        open={open}
        onOpenChange={(v) => { setOpen(v); if (!v) setError(null); }}
        title="Ta bort bilplatsannons"
        description={`Vill du ta bort bilplatsannons ${parkingSpace.address} med hyresid ${parkingSpace.id}?`}
        onConfirm={onDelete}
        variant="destructive"
        isPending={isPending}
        pendingLabel="Tar bort..."
        error={error}
        className="max-w-xs"
      />
    </>
  );
};
