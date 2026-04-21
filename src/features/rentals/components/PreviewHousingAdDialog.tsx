import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock } from "lucide-react";
import { MimerAdPreview } from "./preview/MimerAdPreview";
import type { EditHousingFormData } from "./edit-housing/types";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";

interface PreviewHousingAdDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  housingSpace: UnpublishedHousingSpace;
  formValues: Partial<EditHousingFormData>;
}

export function PreviewHousingAdDialog({
  open,
  onOpenChange,
  housingSpace,
  formValues,
}: PreviewHousingAdDialogProps) {
  const slug = housingSpace.address
    .toLowerCase()
    .replace(/[åä]/g, "a")
    .replace(/ö/g, "o")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const previewUrl = `mimer.nu/lediga-objekt/${slug}-${housingSpace.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] max-w-5xl flex-col overflow-hidden p-0"
      >
        <DialogHeader className="border-b px-6 pb-4 pt-6">
          <DialogTitle>Förhandsgranskning – så här visas annonsen på Mimer.nu</DialogTitle>
          <DialogDescription>
            En live-förhandsvisning baserad på dina nuvarande inställningar. Annonsen är inte publicerad.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-muted/40 p-4">
          <div className="mx-auto overflow-hidden rounded-lg border border-border bg-background shadow-sm">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-border bg-muted px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex flex-1 items-center gap-2 rounded-full bg-background px-3 py-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3" />
                <span className="truncate">{previewUrl}</span>
              </div>
            </div>

            {/* The actual ad */}
            <MimerAdPreview housing={housingSpace} form={formValues} />
          </div>
        </div>

        <DialogFooter className="border-t bg-background px-6 py-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Stäng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
