import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/shared/ui/dialog";
import { FileImage } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FloorplanOverlayProps {
  floorplanImage?: string;
}

export function FloorplanOverlay({ floorplanImage }: FloorplanOverlayProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <FileImage className="h-4 w-4" />
              <span className="sr-only">Planritning</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Planritning</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] p-2 sm:p-4">
          {floorplanImage ? (
            <img
              src={floorplanImage}
              alt="Planritning"
              className="w-full h-auto max-h-[80vh] object-contain rounded"
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <FileImage className="h-16 w-16 opacity-30" />
              <p className="text-sm">Ingen planritning tillgänglig</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
