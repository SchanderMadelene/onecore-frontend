
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { useIsMobile } from "@/hooks/use-mobile";
import { mockTenant } from "@/data/tenants";
import { MobileInspectionSheet } from "./mobile/MobileInspectionSheet";
import { DesktopInspectionForm } from "./desktop/DesktopInspectionForm";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
  buttonSize?: string;
  tenant?: any; // Optional tenant prop if we want to pass different tenant data
}

export function InspectionFormDialog({ 
  isOpen, 
  onClose, 
  onSubmit, 
  rooms, 
  buttonSize,
  tenant = mockTenant // Default to mock tenant if not provided
}: InspectionFormDialogProps) {
  const isMobile = useIsMobile();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  // Use mobile sheet for mobile devices
  if (isMobile) {
    return (
      <MobileInspectionSheet
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        rooms={rooms}
        tenant={tenant}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] xl:max-w-7xl p-4 sm:p-6 max-h-[95vh]">
        <DialogHeader className="space-y-1">
          <DialogTitle>Genomför besiktning</DialogTitle>
          <DialogDescription>
            Gå igenom och bedöm skicket på alla rum
          </DialogDescription>
        </DialogHeader>

        <DesktopInspectionForm
          rooms={rooms}
          onSave={onSubmit}
          onCancel={onClose}
          tenant={tenant}
        />
      </DialogContent>
    </Dialog>
  );
}
