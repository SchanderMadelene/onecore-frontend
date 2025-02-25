
import { useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function CreateIssue() {
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Ärenden</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary">
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
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Här kan du skapa nya ärenden för lägenheten, till exempel felanmälningar eller andra ärenden som behöver hanteras.
        </p>
      </CardContent>
    </Card>
  );
}
