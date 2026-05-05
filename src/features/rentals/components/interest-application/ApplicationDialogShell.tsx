import { ReactNode, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useTenantValidation, type TenantValidation } from "@/features/tenants/hooks/useTenantValidation";
import { CustomerInfoLoading } from "../CustomerInfoLoading";
import { CustomerSearch } from "./CustomerSearch";
import { CustomerInformation } from "./CustomerInformation";
import { NotesSection } from "./NotesSection";
import type { Customer } from "../types/parking";

interface ApplicationDialogShellProps {
  title: string;
  triggerLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
  objectId: string;
  districtCode?: string;
  objectInfo: ReactNode;
  renderValidation?: (validation: TenantValidation) => ReactNode;
  renderExtraSections?: (validation: TenantValidation) => ReactNode;
  isSubmitting: boolean;
  submitLabel?: string;
  submittingLabel?: string;
  canSubmit?: (customer: Customer, validation: TenantValidation | undefined) => boolean;
  onSubmit: (data: { customer: Customer; notes: string }) => void;
}

export const ApplicationDialogShell = ({
  title,
  triggerLabel = "Ny anmälan",
  open: controlledOpen,
  onOpenChange,
  hideTrigger,
  objectId,
  districtCode = "CENTRUM",
  objectInfo,
  renderValidation,
  renderExtraSections,
  isSubmitting,
  submitLabel = "Lägg till",
  submittingLabel = "Skapar...",
  canSubmit,
  onSubmit,
}: ApplicationDialogShellProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen ?? internalOpen;
  const setOpen = (v: boolean) => {
    if (onOpenChange) onOpenChange(v);
    else setInternalOpen(v);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState("");

  const tenantValidation = useTenantValidation(
    selectedCustomer?.customerNumber,
    districtCode,
    objectId,
  );

  const resetForm = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setNotes("");
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) setSelectedCustomer(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;
    onSubmit({ customer: selectedCustomer, notes });
  };

  const submitEnabled =
    !!selectedCustomer &&
    !isSubmitting &&
    (canSubmit ? canSubmit(selectedCustomer, tenantValidation.data) : true);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) resetForm();
      }}
    >
      {!hideTrigger && (
        <DialogTrigger asChild>
          <Button className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            <span>{triggerLabel}</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        className="max-w-2xl max-h-[90vh] p-0 flex flex-col gap-0"
        onClick={(e) => e.stopPropagation()}
      >
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle className="text-xl font-semibold text-left">
            {title}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {objectInfo}

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
                      onClear={resetForm}
                    />
                    {renderValidation?.(tenantValidation.data)}
                    {renderExtraSections?.(tenantValidation.data)}
                    <NotesSection notes={notes} onNotesChange={setNotes} />
                  </>
                )}
              </>
            )}
          </div>

          <div className="border-t p-6 flex justify-between gap-4 shrink-0">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
              className="flex-1"
            >
              Avbryt
            </Button>
            <Button type="submit" disabled={!submitEnabled} className="flex-1">
              {isSubmitting ? submittingLabel : submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
