import { Sheet, SheetContent } from "@/components/ui/sheet";
import { MobileInspectionForm } from "./MobileInspectionForm";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "../types";

interface MobileInspectionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
  tenant?: any;
}

export function MobileInspectionSheet({ 
  isOpen, 
  onClose, 
  onSubmit, 
  rooms, 
  tenant 
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
        />
      </SheetContent>
    </Sheet>
  );
}