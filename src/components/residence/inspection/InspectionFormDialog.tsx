
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (inspectorName: string) => void;
}

export function InspectionFormDialog({ isOpen, onClose, onStart }: InspectionFormDialogProps) {
  const [inspectorName, setInspectorName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(inspectorName);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Starta ny besiktning</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="inspectorName">Besiktningsman</Label>
              <Input
                id="inspectorName"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Ange ditt namn"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Lägenhet</Label>
              <p className="text-sm text-muted-foreground">Odenplan 5, lägenhet 1001</p>
            </div>
            <div className="space-y-2">
              <Label>Datum</Label>
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString("sv-SE")}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Avbryt
            </Button>
            <Button type="submit" disabled={!inspectorName.trim()}>
              Starta besiktning
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
