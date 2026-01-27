
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomerInfo } from "./form/CustomerInfo";
import { HousingTypeSection } from "./form/HousingTypeSection";
import { ReviewStatusSection } from "./form/ReviewStatusSection";
import { HousingReferenceComment } from "./form/HousingReferenceComment";
import { CustomerReference } from "./form/CustomerReference";
import type { ContactSearchData, ProfileFormData } from "./types";
import { toast } from "sonner";

const getFormDefaults = (): ProfileFormData => ({
  housingType: '',
  housingTypeDescription: '',
  landlord: '',
  numAdults: 1,
  numChildren: 0,
  housingReference: {
    comment: '',
    email: '',
    phone: '',
    reviewStatus: 'PENDING',
    reasonRejected: '',
    expiresAt: undefined,
  },
});

interface ProfileFormProps {
  contact: ContactSearchData;
}

export function ProfileForm({ contact }: ProfileFormProps) {
  const form = useForm<ProfileFormData>({
    defaultValues: getFormDefaults(),
  });

  const onSubmit = (data: ProfileFormData) => {
    toast.success("Boendeprofilen har sparats");
  };

  // Mock data för CustomerReference - i verkligheten skulle detta komma från backend
  const mockReferenceData = {
    customerReferenceReceivedAt: new Date('2024-01-15'),
    housingReferenceUpdatedAt: new Date('2024-01-10'),
    updatedBy: 'Anna Andersson',
    expiresAt: undefined,
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomerInfo contact={contact} />
        
        <div className="border-t pt-6">
          <HousingTypeSection form={form} />
        </div>
        
        <div className="border-t pt-6">
          <ReviewStatusSection form={form} />
        </div>
        
        <div className="border-t pt-6">
          <CustomerReference {...mockReferenceData} />
        </div>
        
        <div className="border-t pt-6">
          <HousingReferenceComment form={form} />
        </div>

        <div className="flex justify-center pt-6">
          <Button type="submit" size="lg">
            Spara/uppdatera boendereferens
          </Button>
        </div>
      </form>
    </Form>
  );
}
