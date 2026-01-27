import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PhotoGallery } from "./PhotoGallery";
import { ActionChecklist } from "./ActionChecklist";
import { Camera, Wrench, MessageSquare, Clock, FileText } from "lucide-react";

interface ComponentDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  componentKey: string;
  label: string;
  condition: string;
  note: string;
  photos: string[];
  actions: string[];
  componentType: "walls" | "floor" | "ceiling" | "details";
  onNoteChange: (note: string) => void;
  onPhotoAdd: (photoDataUrl: string) => void;
  onPhotoRemove: (index: number) => void;
  onActionToggle: (action: string) => void;
}

const CONDITION_CONFIG = {
  "God": { variant: "default" as const, className: "bg-green-500 hover:bg-green-600" },
  "Acceptabel": { variant: "secondary" as const, className: "bg-yellow-500 hover:bg-yellow-600" },
  "Skadad": { variant: "destructive" as const, className: "" }
};

export function ComponentDetailSheet({
  isOpen,
  onClose,
  label,
  condition,
  note,
  photos,
  actions,
  componentType,
  onNoteChange,
  onPhotoAdd,
  onPhotoRemove,
  onActionToggle
}: ComponentDetailSheetProps) {
  const conditionConfig = condition ? CONDITION_CONFIG[condition as keyof typeof CONDITION_CONFIG] : null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{label}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-4">
          {/* Condition Badge */}
          {condition && conditionConfig && (
            <div>
              <p className="text-sm text-muted-foreground mb-2">Skick</p>
              <Badge variant={conditionConfig.variant} className={conditionConfig.className}>
                {condition}
              </Badge>
            </div>
          )}

          <Separator />

          {/* Photos Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Foton ({photos.length})</h3>
            </div>
            <PhotoGallery
              photos={photos}
              onRemovePhoto={onPhotoRemove}
              onAddPhoto={onPhotoAdd}
            />
          </div>

          <Separator />

          {/* Actions Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Åtgärder</h3>
            </div>
            <ActionChecklist
              componentType={componentType}
              selectedActions={actions}
              onActionToggle={onActionToggle}
            />
          </div>

          <Separator />

          {/* Notes Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Anteckningar</h3>
            </div>
            <Textarea
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              placeholder="Skriv en anteckning..."
              className="min-h-[100px]"
            />
          </div>

          <Separator />

          {/* History Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Historik</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• 2024-01-15: God (Anna A.)</p>
              <p>• 2023-06-20: God (Erik E.)</p>
            </div>
          </div>

          <Separator />

          {/* Create Order Button */}
          <Button className="w-full" variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Skapa ärende
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
