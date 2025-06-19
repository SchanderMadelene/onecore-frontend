
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useTenantValidation } from "@/hooks/useTenantValidation";
import { useCreateInterestApplication } from "@/hooks/useCreateInterestApplication";
import { CustomerInfoLoading } from "./CustomerInfoLoading";
import { useToast } from "@/hooks/use-toast";
import type { ParkingSpace, Customer } from "./types/parking";
import { ObjectInformation } from "./interest-application/ObjectInformation";
import { CustomerSearch } from "./interest-application/CustomerSearch";
import { CustomerInformation } from "./interest-application/CustomerInformation";
import { ValidationAlerts } from "./interest-application/ValidationAlerts";
import { ApplicationTypeSelection } from "./interest-application/ApplicationTypeSelection";
import { NotesSection } from "./interest-application/NotesSection";

interface CreateInterestApplicationDialogProps {
  parkingSpace: ParkingSpace;
}

export const CreateInterestApplicationDialog = ({ parkingSpace }: CreateInterestApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [applicationType, setApplicationType] = useState<"Replace" | "Additional">("Additional");
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const createApplication = useCreateInterestApplication();
  
  const tenantValidation = useTenantValidation(
    selectedCustomer?.customerNumber,
    "CENTRUM", // Mock district code
    parkingSpace.id
  );

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSelectedCustomer(null);
    }
  };

  const handleSubmit = () => {
    if (!selectedCustomer) return;

    createApplication.mutate({
      parkingSpaceId: parkingSpace.id,
      customerNumber: selectedCustomer.customerNumber,
      applicationType,
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Intresseanmälan skapad",
          description: `Anmälan för ${selectedCustomer.firstName} ${selectedCustomer.lastName} har skapats`,
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
    setSelectedCustomer(null);
    setSearchQuery("");
    setApplicationType("Additional");
    setNotes("");
  };

  const tenantHasValidContractForTheDistrict = () => {
    if (!tenantValidation.data) return false;
    return tenantValidation.data.hasContractInDistrict || tenantValidation.data.hasUpcomingContractInDistrict;
  };

  const canSubmit = selectedCustomer && 
                  tenantValidation.data?.validationResult !== 'no-contract' && 
                  tenantHasValidContractForTheDistrict() &&
                  !createApplication.isPending;

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-left">
            Ny intresseanmälan, {parkingSpace.address}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <ObjectInformation parkingSpace={parkingSpace} />

          <CustomerSearch 
            searchQuery={searchQuery}
            selectedCustomer={selectedCustomer}
            onSearchChange={handleSearchChange}
            onCustomerSelect={handleCustomerSelect}
          />

          {selectedCustomer && (
            <>
              {tenantValidation.isLoading && <CustomerInfoLoading />}
              
              {tenantValidation.data && (
                <>
                  <CustomerInformation 
                    customer={selectedCustomer} 
                    tenantValidation={tenantValidation.data} 
                  />
                  
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
            </>
          )}
        </div>

        <div className="flex justify-between gap-4 pt-6 border-t">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            disabled={createApplication.isPending}
            className="flex-1"
          >
            Avbryt
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {createApplication.isPending ? "Skapar..." : "Lägg till"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
