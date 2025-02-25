
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BasicInformationProps {
  inspectorName: string;
  roomCount: number;
}

export function BasicInformation({ inspectorName, roomCount }: BasicInformationProps) {
  const [issueDescription, setIssueDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateIssue = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating issue:", {
      description: issueDescription,
      timestamp: new Date().toISOString(),
    });

    toast({
      title: "Ärende skapat",
      description: "Ärendet har registrerats och kommer att hanteras inom kort.",
    });

    setIssueDescription("");
    setIsDialogOpen(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Besiktningsman</p>
        <p className="font-medium">{inspectorName}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Datum</p>
        <p className="font-medium">{new Date().toLocaleDateString("sv-SE")}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Antal rum</p>
        <p className="font-medium">{roomCount}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Status</p>
        <p className="font-medium">Pågående</p>
      </div>
      <div className="col-span-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <AlertCircle className="mr-2 h-4 w-4" />
              Skapa ärende
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Skapa nytt ärende</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateIssue} className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="description">Beskrivning av ärendet</Label>
                  <Input
                    id="description"
                    placeholder="Beskriv felet eller ärendet..."
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Avbryt
                </Button>
                <Button type="submit">Skapa ärende</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
