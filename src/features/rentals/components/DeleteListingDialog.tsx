
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { ParkingSpace } from "./types/parking";

interface DeleteListingDialogProps {
  parkingSpace: ParkingSpace;
  disabled?: boolean;
}

export const DeleteListingDialog = ({ parkingSpace, disabled = false }: DeleteListingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClose = () => {
    setOpen(false);
    setError(null);
  };

  const onDelete = async () => {
    setIsPending(true);
    setError(null);
    
    try {
      // TODO: Implementera API-anrop här senare
      // Simulerar API-anrop för nu
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
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button 
          variant="destructive" 
          size="sm" 
          className="flex items-center gap-1"
          disabled={disabled}
        >
          <Trash2 className="h-4 w-4" />
          <span>Ta bort</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-left">
            Ta bort bilplatsannons
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center pt-4 pb-8">
            Vill du ta bort bilplatsannons {parkingSpace.address} med hyresid {parkingSpace.id}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {error && (
          <div className="text-center py-4 text-sm text-destructive">
            {error}
          </div>
        )}
        
        <AlertDialogFooter className="flex justify-between gap-24 pt-4">
          <AlertDialogCancel 
            onClick={onClose}
            disabled={isPending}
            className="flex-1"
          >
            Avbryt
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={isPending}
            className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isPending ? "Tar bort..." : "Bekräfta"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
