
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Room } from "@/types/api";
import type { InspectionRoom as InspectionRoomType } from "./types";
import { InspectionTabs } from "./form/InspectionTabs";
import { useInspectionForm } from "@/hooks/useInspectionForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";
import { mockTenant } from "@/data/tenants";

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
  
  const {
    inspectorName,
    setInspectorName,
    apartmentInfo,
    setApartmentInfo,
    expandedRoomIds,
    inspectionData,
    handleCancel: resetForm,
    handleToggleRoom,
    handleConditionUpdate,
    handleActionUpdate,
    handleComponentNoteUpdate
  } = useInspectionForm(rooms);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inspectorName, inspectionData);
    handleCancel();
  };

  const handleCancel = () => {
    onClose();
    resetForm();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleCancel();
    }
  };

  if (rooms.length > 0 && expandedRoomIds.length === 0) {
    // Initialize with the first room expanded
    handleToggleRoom(rooms[0].id);
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`${isMobile ? 'w-[95vw] max-w-[95vw] p-3' : 'max-w-[95vw] sm:max-w-4xl p-4 sm:p-6'} max-h-[95vh] overflow-y-auto`}>
        <DialogHeader className="space-y-1">
          <DialogTitle>Genomför besiktning</DialogTitle>
          <DialogDescription>
            Gå igenom och bedöm skicket på alla rum
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2">
          <div className="space-y-4">
            {/* Tenant information section */}
            <TenantInformationCard tenant={tenant} />
            
            <InspectionTabs
              inspectorName={inspectorName}
              setInspectorName={setInspectorName}
              apartmentInfo={apartmentInfo}
              rooms={rooms}
              expandedRoomIds={expandedRoomIds}
              inspectionData={inspectionData}
              onToggleRoom={handleToggleRoom}
              onConditionUpdate={handleConditionUpdate}
              onActionUpdate={handleActionUpdate}
              onComponentNoteUpdate={handleComponentNoteUpdate}
            />
          </div>

          <DialogFooter className="flex-col-reverse sm:flex-row gap-2 mt-6">
            <Button variant="outline" type="button" onClick={handleCancel} className="w-full sm:w-auto">
              Avbryt
            </Button>
            <Button type="submit" className="w-full sm:w-auto">Spara besiktning</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
