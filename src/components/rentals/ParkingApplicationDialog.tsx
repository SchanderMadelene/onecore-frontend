
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ParkingSpaceInfo } from "./parking-application/ParkingSpaceInfo";
import { CustomerSearch } from "./parking-application/CustomerSearch";
import { CustomerInfo } from "./parking-application/CustomerInfo";
import { ApplicationForm } from "./parking-application/ApplicationForm";
import type { ParkingSpace, Customer } from "./types/parking";

interface ParkingApplicationDialogProps {
  parkingSpace: ParkingSpace;
}

export const ParkingApplicationDialog = ({ parkingSpace }: ParkingApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [applicationType, setApplicationType] = useState<"Byte" | "Hyra flera">("Hyra flera");
  const [notes, setNotes] = useState("");
  const [applicationTypeError, setApplicationTypeError] = useState("");

  const handleApplicationTypeChange = (value: "Byte" | "Hyra flera") => {
    setApplicationType(value);
    setApplicationTypeError(""); // Clear error when user makes a selection
  };

  const handleSubmit = () => {
    if (!selectedCustomer) return;

    // Validate application type (example validation)
    if (!applicationType) {
      setApplicationTypeError("Du måste välja en ärendetyp");
      return;
    }

    console.log("Anmälan skickad:", {
      parkingSpace: parkingSpace.id,
      customer: selectedCustomer.customerNumber,
      applicationType,
      notes
    });

    // Reset form
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setApplicationType("Hyra flera");
    setNotes("");
    setApplicationTypeError("");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Ny anmälan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Anmäl hyresgäst för bilplats</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Objektsinformation */}
          <ParkingSpaceInfo parkingSpace={parkingSpace} />

          {/* Kundsökning */}
          <CustomerSearch 
            onCustomerSelect={setSelectedCustomer}
            selectedCustomer={selectedCustomer}
          />

          {/* Vald kund med flikar */}
          {selectedCustomer && (
            <CustomerInfo customer={selectedCustomer} />
          )}

          {/* Ansökningsformulär - endast synlig när kund är vald */}
          {selectedCustomer && (
            <ApplicationForm
              applicationType={applicationType}
              onApplicationTypeChange={handleApplicationTypeChange}
              notes={notes}
              onNotesChange={setNotes}
              applicationTypeError={applicationTypeError}
              hasAreaRestriction={true} // Set to true to show the example error
            />
          )}
        </div>

        {/* Åtgärder */}
        <div className="flex justify-end gap-3 pt-4 border-t flex-shrink-0 bg-background">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedCustomer}
            className="bg-primary hover:bg-primary/90"
          >
            Skicka anmälan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
