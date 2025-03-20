
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
import { InspectionInfoStep } from "./form/InspectionInfoStep";
import { InspectionTabs } from "./form/InspectionTabs";
import { useInspectionForm } from "@/hooks/useInspectionForm";

interface InspectionFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (inspectorName: string, rooms: Record<string, InspectionRoomType>) => void;
  rooms: Room[];
}

export function InspectionFormDialog({ isOpen, onClose, onSubmit, rooms }: InspectionFormDialogProps) {
  const {
    inspectorName,
    setInspectorName,
    apartmentInfo,
    setApartmentInfo,
    step,
    setStep,
    expandedRoomIds,
    inspectionData,
    handleNext,
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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle>
            {step === "info" ? "Starta ny besiktning" : "Genomför besiktning"}
          </DialogTitle>
          <DialogDescription>
            {step === "info" 
              ? "Fyll i information om besiktningen" 
              : "Gå igenom och bedöm skicket på alla rum"
            }
          </DialogDescription>
        </DialogHeader>

        {step === "info" ? (
          <InspectionInfoStep
            inspectorName={inspectorName}
            onInspectorNameChange={setInspectorName}
            onApartmentInfoChange={setApartmentInfo}
            onNext={handleNext}
            onCancel={handleCancel}
          />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <InspectionTabs
                inspectorName={inspectorName}
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

            <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
              <Button variant="outline" type="button" onClick={() => setStep("info")}>
                Tillbaka
              </Button>
              <Button type="submit">Spara besiktning</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
