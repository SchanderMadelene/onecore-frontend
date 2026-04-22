import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RefreshCw, Download } from "lucide-react";
import { useSyncInternalStorageSpaces } from "../hooks/useStorageSpaceActions";

export const SyncStorageSpacesDialog = () => {
  const [open, setOpen] = useState(false);
  const syncMutation = useSyncInternalStorageSpaces();

  const handleSync = () => {
    syncMutation.mutate(undefined, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          <span>Synka interna förråd</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Synkronisera interna förråd</DialogTitle>
          <DialogDescription>
            Detta kommer att hämta alla lediga interna förråd från systemet och göra dem tillgängliga för publicering.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={syncMutation.isPending}>
            Avbryt
          </Button>
          <Button onClick={handleSync} disabled={syncMutation.isPending} className="flex items-center gap-2">
            {syncMutation.isPending && <RefreshCw className="h-4 w-4 animate-spin" />}
            <span>{syncMutation.isPending ? "Synkroniserar..." : "Synkronisera"}</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
