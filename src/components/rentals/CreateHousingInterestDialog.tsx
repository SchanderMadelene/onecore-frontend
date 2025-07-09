import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useTenantValidation } from "@/hooks/useTenantValidation";
import { useCreateInterestApplication } from "@/hooks/useCreateInterestApplication";
import { CustomerInfoLoading } from "./CustomerInfoLoading";
import { useToast } from "@/hooks/use-toast";
import type { Customer } from "./types/parking";
import { CustomerSearch } from "./interest-application/CustomerSearch";
import { CustomerInformation } from "./interest-application/CustomerInformation";
import { ValidationAlerts } from "./interest-application/ValidationAlerts";
import { ApplicationTypeSelection } from "./interest-application/ApplicationTypeSelection";
import { NotesSection } from "./interest-application/NotesSection";
import { HousingObjectInformation } from "./interest-application/HousingObjectInformation";

interface CreateHousingInterestDialogProps {
  triggerButton?: React.ReactNode;
}

export const CreateHousingInterestDialog = ({ triggerButton }: CreateHousingInterestDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [applicationType, setApplicationType] = useState<"Replace" | "Additional">("Additional");
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const createApplication = useCreateInterestApplication();
  
  // Mock housing object for demonstration
  const mockHousingObject = {
    id: "housing-general",
    address: "Allmän bostadskö",
    type: "housing" as const,
    description: "Intresseanmälan för allmän bostadskö"
  };
  
  const tenantValidation = useTenantValidation(
    selectedCustomer?.customerNumber,
    "CENTRUM",
    mockHousingObject.id
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    createApplication.mutate({
      parkingSpaceId: mockHousingObject.id,
      customerNumber: selectedCustomer.customerNumber,
      applicationType,
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Intresseanmälan skapad",
          description: `Bostadsanmälan för ${selectedCustomer.firstName} ${selectedCustomer.lastName} har skapats`,
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

  const defaultTrigger = (
    <Button variant="outline" className="w-full">
      <PlusCircle className="h-4 w-4 mr-2" />
      Ny intresseanmälan bostad
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        {triggerButton || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-left">
            Ny intresseanmälan, bostad
          </DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handleSubmit} maxHeight="70vh">
          <HousingObjectInformation />

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