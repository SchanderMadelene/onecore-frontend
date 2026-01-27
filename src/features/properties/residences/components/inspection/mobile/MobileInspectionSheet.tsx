import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MobileInspectionForm } from "./MobileInspectionForm";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType, InspectionSubmitData, Inspection } from "../types";

interface MobileInspectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    inspectorName: string, 
    rooms: Record<string, InspectionRoomType>, 
    status: 'draft' | 'completed',
    additionalData: InspectionSubmitData
  ) => void;
  rooms: Room[];
  tenant?: any;
  existingInspection?: Inspection;
}

export function MobileInspectionSheet({ 
  isOpen, 
  onClose, 
  onSubmit, 
  rooms, 
  tenant,
  existingInspection
}: MobileInspectionSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="bottom" 
        className="h-[95vh] p-0 max-w-none w-full"
      >
        <MobileInspectionForm
          rooms={rooms}
          onSave={onSubmit}
          onCancel={onClose}
          tenant={tenant}
          existingInspection={existingInspection}
        />
      </SheetContent>
    </Sheet>
  );
}
