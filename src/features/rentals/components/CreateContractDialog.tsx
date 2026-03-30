import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/shared/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Info } from "lucide-react";

interface CreateContractDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  applicantName: string;
  applicantNationalId: string;
  housingAddress: string;
  rent?: string;
  onConfirm: () => void;
}

export function CreateContractDialog({
  open,
  onOpenChange,
  applicantName,
  applicantNationalId,
  housingAddress,
  rent,
  onConfirm,
}: CreateContractDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
    toast({
      title: "Kontraktsskapande initierat",
      description: "Kontraktet ska nu skapas i Tenfast. Sökanden har markerats som tilldelad.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Koppla kontrakt</DialogTitle>
          <DialogDescription>
            Granska uppgifterna nedan och bekräfta för att skapa kontrakt.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <div className="text-muted-foreground">Namn</div>
              <div className="font-medium">{applicantName}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Personnummer</div>
              <div className="font-medium">{applicantNationalId}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Bostad</div>
              <div className="font-medium">{housingAddress}</div>
            </div>
            {rent && (
              <div>
                <div className="text-muted-foreground">Hyra</div>
                <div className="font-medium">{rent}</div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <p>
              Kontraktet skapas i det externa systemet <strong>Tenfast</strong>. 
              När du bekräftar markeras sökanden som tilldelad i OneCore.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Avbryt
          </Button>
          <Button onClick={handleConfirm}>
            Skapa kontrakt i Tenfast
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
