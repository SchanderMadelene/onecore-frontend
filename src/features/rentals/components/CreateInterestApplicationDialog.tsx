import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCreateInterestApplication } from "../hooks/useCreateInterestApplication";
import type { ParkingSpace } from "./types/parking";
import { ObjectInformation } from "./interest-application/ObjectInformation";
import { ValidationAlerts } from "./interest-application/ValidationAlerts";
import { ApplicationTypeSelection } from "./interest-application/ApplicationTypeSelection";
import { ApplicationDialogShell } from "./interest-application/ApplicationDialogShell";

interface CreateInterestApplicationDialogProps {
  parkingSpace: ParkingSpace;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export const CreateInterestApplicationDialog = ({
  parkingSpace,
  open,
  onOpenChange,
  hideTrigger,
}: CreateInterestApplicationDialogProps) => {
  const { toast } = useToast();
  const createApplication = useCreateInterestApplication();
  const [applicationType, setApplicationType] = useState<"Replace" | "Additional">("Additional");

  return (
    <ApplicationDialogShell
      title={`Ny intresseanmälan, ${parkingSpace.address}`}
      open={open}
      onOpenChange={onOpenChange}
      hideTrigger={hideTrigger}
      objectId={parkingSpace.id}
      objectInfo={<ObjectInformation parkingSpace={parkingSpace} />}
      renderValidation={(validation) => <ValidationAlerts tenantValidation={validation} />}
      renderExtraSections={(validation) => (
        <ApplicationTypeSelection
          applicationType={applicationType}
          onApplicationTypeChange={setApplicationType}
          tenantValidation={validation}
        />
      )}
      canSubmit={(_, validation) => {
        if (!validation) return false;
        if (validation.validationResult === "no-contract") return false;
        return validation.hasContractInDistrict || validation.hasUpcomingContractInDistrict;
      }}
      isSubmitting={createApplication.isPending}
      onSubmit={({ customer, notes }) => {
        createApplication.mutate(
          {
            parkingSpaceId: parkingSpace.id,
            customerNumber: customer.customerNumber,
            applicationType,
            notes,
          },
          {
            onSuccess: () => {
              toast({
                title: "Intresseanmälan skapad",
                description: `Anmälan för ${customer.firstName} ${customer.lastName} har skapats`,
              });
              setApplicationType("Additional");
              onOpenChange?.(false);
            },
            onError: (error) => {
              toast({
                title: "Fel",
                description: error.message || "Kunde inte skapa intresseanmälan",
                variant: "destructive",
              });
            },
          },
        );
      }}
    />
  );
};
