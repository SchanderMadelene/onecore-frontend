
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ImagePlus } from "lucide-react";

interface InspectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedItemId: string | null;
  selectedIssues: string[];
  onIssuesChange: (issues: string[]) => void;
  customNote: string;
  onCustomNoteChange: (note: string) => void;
}

const commonIssues = [
  "Slitage utöver normal förslitning",
  "Fuktskada",
  "Färgsläpp/tapetsläpp",
  "Spricka",
  "Trasigt handtag/beslag",
  "Skada i ytskikt",
  "Funktionsfel",
  "Saknas helt",
  "Felaktig installation",
  "Rengöringsbehov"
];

export const InspectionDialog = ({
  open,
  onOpenChange,
  selectedItemId,
  selectedIssues,
  onIssuesChange,
  customNote,
  onCustomNoteChange,
}: InspectionDialogProps) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Bild uppladdad:", file.name);
      // Här skulle vi normalt hantera bilduppladdningen
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Registrera anmärkning</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium">Vanliga åtgärder</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonIssues.map((issue) => (
                <div key={issue} className="flex items-center space-x-2">
                  <Checkbox
                    id={`issue-${issue}`}
                    checked={selectedIssues.includes(issue)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onIssuesChange([...selectedIssues, issue]);
                      } else {
                        onIssuesChange(selectedIssues.filter(i => i !== issue));
                      }
                    }}
                  />
                  <Label htmlFor={`issue-${issue}`}>{issue}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="customNote">Övriga anteckningar</Label>
            <Textarea
              id="customNote"
              placeholder="Beskriv anmärkningen..."
              value={customNote}
              onChange={(e) => onCustomNoteChange(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUpload">Lägg till bild</Label>
            <div className="flex items-center gap-4">
              <Input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                <ImagePlus className="h-4 w-4" />
                Välj bild
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Avbryt
            </Button>
            <Button
              onClick={() => {
                console.log("Sparar anmärkning:", {
                  itemId: selectedItemId,
                  issues: selectedIssues,
                  customNote,
                });
                onOpenChange(false);
              }}
            >
              Spara anmärkning
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
