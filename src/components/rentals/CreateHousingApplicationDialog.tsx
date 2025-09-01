import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { FormWrapper } from "@/components/ui/form-wrapper";
import { useTenantValidation } from "@/hooks/useTenantValidation";
import { useCreateHousingApplication } from "@/hooks/useCreateHousingApplication";
import { CustomerInfoLoading } from "./CustomerInfoLoading";
import { useToast } from "@/hooks/use-toast";
import type { HousingSpace } from "./types/housing";
import type { Customer } from "./types/parking";
import { HousingObjectInformation } from "./housing-application/HousingObjectInformation";
import { CustomerSearch } from "./interest-application/CustomerSearch";
import { CustomerInformation } from "./interest-application/CustomerInformation";
import { ValidationAlerts } from "./housing-application/ValidationAlerts";
import { NotesSection } from "./interest-application/NotesSection";

interface CreateHousingApplicationDialogProps {
  housingSpace: HousingSpace;
}

export const CreateHousingApplicationDialog = ({ housingSpace }: CreateHousingApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const createApplication = useCreateHousingApplication();
  
  const tenantValidation = useTenantValidation(
    selectedCustomer?.customerNumber,
    "CENTRUM", // Mock district code
    housingSpace.id
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
      housingSpaceId: housingSpace.id,
      customerNumber: selectedCustomer.customerNumber,
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Bostadsansökan skapad",
          description: `Ansökan för ${selectedCustomer.firstName} ${selectedCustomer.lastName} har skapats`,
        });
        resetForm();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Fel",
          description: error.message || "Kunde inte skapa bostadsansökan",
          variant: "destructive",
        });
      }
    });
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
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
          <span>Ny ansökan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold text-left">
            Ny bostadsansökan, {housingSpace.address}
          </DialogTitle>
        </DialogHeader>

        <FormWrapper onSubmit={handleSubmit} maxHeight="70vh">
          <HousingObjectInformation housingSpace={housingSpace} />

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