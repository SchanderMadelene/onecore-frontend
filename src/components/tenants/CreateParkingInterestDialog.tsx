import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useTenantValidation } from "@/hooks/useTenantValidation";
import { useCreateInterestApplication } from "@/hooks/useCreateInterestApplication";
import { useToast } from "@/hooks/use-toast";
import { ParkingSpaceSearch } from "./parking-interest/ParkingSpaceSearch";
import { ApplicationTypeSelection } from "@/components/rentals/interest-application/ApplicationTypeSelection";
import { NotesSection } from "@/components/rentals/interest-application/NotesSection";
import { ValidationAlerts } from "@/components/rentals/interest-application/ValidationAlerts";
import type { ParkingSpaceForPublishing } from "@/hooks/useParkingSpaceListings";

interface CreateParkingInterestDialogProps {
  customerNumber: string;
  customerName: string;
}

export const CreateParkingInterestDialog = ({ 
  customerNumber, 
  customerName 
}: CreateParkingInterestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedParkingSpace, setSelectedParkingSpace] = useState<ParkingSpaceForPublishing | null>(null);
  const [applicationType, setApplicationType] = useState<"Replace" | "Additional">("Additional");
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const createApplication = useCreateInterestApplication();
  
  const tenantValidation = useTenantValidation(
    customerNumber,
    selectedParkingSpace?.district || "",
    selectedParkingSpace?.id || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParkingSpace) return;

    createApplication.mutate({
      parkingSpaceId: selectedParkingSpace.id,
      customerNumber,
      applicationType,
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Intresseanmälan skapad",
          description: `Anmälan för ${customerName} på ${selectedParkingSpace.address} har skapats`,
        });
        resetForm();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Fel",
          description: error.message || "Kunde inte skapa intresseanmälan",
          variant: "destructive",
        });
      }
    });
  };

  const resetForm = () => {
    setSelectedParkingSpace(null);
    setApplicationType("Additional");
    setNotes("");
  };

  const tenantHasValidContractForTheDistrict = () => {
    if (!tenantValidation.data) return false;
    return tenantValidation.data.hasContractInDistrict || tenantValidation.data.hasUpcomingContractInDistrict;
  };

  const canSubmit = selectedParkingSpace && 
                  tenantValidation.data?.validationResult !== 'no-contract' && 
                  tenantHasValidContractForTheDistrict() &&
                  !createApplication.isPending;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Ny intresseanmälan bilplats
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-left">
            Ny intresseanmälan bilplats - {customerName}
          </DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handleSubmit} maxHeight="70vh">
          <ParkingSpaceSearch 
            selectedParkingSpace={selectedParkingSpace}
            onParkingSpaceSelect={setSelectedParkingSpace}
          />

          {selectedParkingSpace && tenantValidation.data && (
            <>
              <ValidationAlerts tenantValidation={tenantValidation.data} />

              <ApplicationTypeSelection 
                applicationType={applicationType}
                onApplicationTypeChange={setApplicationType}
                tenantValidation={tenantValidation.data}
              />

              <NotesSection 
                notes={notes}
                onNotesChange={setNotes}
              />
            </>
          )}

          <div className="flex justify-between gap-4 pt-4 border-t border-border">
            <Button 
              variant="outline" 
              type="button"
              onClick={() => setOpen(false)}
              disabled={createApplication.isPending}
              className="flex-1"
            >
              Avbryt
            </Button>
            <Button 
              type="submit"
              disabled={!canSubmit}
              className="flex-1"
            >
              {createApplication.isPending ? "Skapar..." : "Lägg till"}
            </Button>
          </div>
        </FormWrapper>
      </DialogContent>
    </Dialog>
  );
};