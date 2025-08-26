import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { HousingTypeSection } from "./form/HousingTypeSection";
import { ReviewStatusSection } from "./form/ReviewStatusSection";
import { HousingReferenceComment } from "./form/HousingReferenceComment";
import { CustomerReference } from "./form/CustomerReference";
import type { ProfileFormData } from "./types";

interface CompactProfileFormProps {
  applicantId: string;
}

// Default form values
function getFormDefaults(): ProfileFormData {
  return {
    housingType: "",
    landlord: "",
    housingTypeDescription: "",
    numAdults: 1,
    numChildren: 0,
    housingReference: {
      phone: "",
      email: "",
      reviewStatus: "PENDING",
      reasonRejected: undefined,
      expiresAt: undefined,
      comment: "",
    },
  };
}

export function CompactProfileForm({ applicantId }: CompactProfileFormProps) {
  const form = useForm<ProfileFormData>({
    defaultValues: getFormDefaults(),
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log("Compact profile form data:", data);
    toast.success("Profil uppdaterad");
  };

  return (
    <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <HousingTypeSection form={form} />
          
          <CustomerReference
            customerReferenceReceivedAt={new Date("2024-01-15")}
            housingReferenceUpdatedAt={new Date("2024-01-20")}
            updatedBy="Anna Andersson"
            expiresAt={null}
          />
          
          <ReviewStatusSection form={form} />
          
          <HousingReferenceComment form={form} />
          
          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm">
              Uppdatera profil
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}