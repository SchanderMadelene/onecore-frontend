import { useToast } from "@/hooks/use-toast";
import { useCreateHousingApplication } from "../hooks/useCreateHousingApplication";
import type { HousingSpace } from "./types/housing";
import { HousingObjectInformation } from "./housing-application/HousingObjectInformation";
import { ValidationAlerts } from "./housing-application/ValidationAlerts";
import { ApplicationDialogShell } from "./interest-application/ApplicationDialogShell";

interface CreateHousingApplicationDialogProps {
  housingSpace: HousingSpace;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export const CreateHousingApplicationDialog = ({
  housingSpace,
  open,
  onOpenChange,
  hideTrigger,
}: CreateHousingApplicationDialogProps) => {
  const { toast } = useToast();
  const createApplication = useCreateHousingApplication();

  return (
    <ApplicationDialogShell
      title={`Ny intresseanmälan, ${housingSpace.address}`}
      open={open}
      onOpenChange={onOpenChange}
      hideTrigger={hideTrigger}
      objectId={housingSpace.id}
      objectInfo={<HousingObjectInformation housingSpace={housingSpace} />}
      renderValidation={(validation) => <ValidationAlerts tenantValidation={validation} />}
      isSubmitting={createApplication.isPending}
      onSubmit={({ customer, notes }) => {
        createApplication.mutate(
          {
            housingSpaceId: housingSpace.id,
            customerNumber: customer.customerNumber,
            notes,
          },
          {
            onSuccess: () => {
              toast({
                title: "Bostadsansökan skapad",
                description: `Ansökan för ${customer.firstName} ${customer.lastName} har skapats`,
              });
              onOpenChange?.(false);
            },
            onError: (error) => {
              toast({
                title: "Fel",
                description: error.message || "Kunde inte skapa bostadsansökan",
                variant: "destructive",
              });
            },
          },
        );
      }}
    />
  );
};
