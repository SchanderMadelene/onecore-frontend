
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomerInfo } from "./form/CustomerInfo";
import { HousingTypeSection } from "./form/HousingTypeSection";
import { ReviewStatusSection } from "./form/ReviewStatusSection";
import { HousingReferenceComment } from "./form/HousingReferenceComment";
import type { ContactSearchData, HousingType, ReviewStatus, RejectedReason } from "./types";
import { toast } from "sonner";

export interface ProfileFormData {
  housingType: HousingType | '';
  housingTypeDescription: string;
  landlord: string;
  numAdults: number;
  numChildren: number;
  housingReference: {
    comment: string;
    email: string;
    phone: string;
    reviewStatus: ReviewStatus;
    reasonRejected: RejectedReason | '';
  };
}

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
    console.log('Profile form data:', data);
    toast.success("Boendeprofilen har sparats");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <CustomerInfo contact={contact} />
      
      <div className="border-t pt-6">
        <HousingTypeSection form={form} />
      </div>
      
      <div className="border-t pt-6">
        <ReviewStatusSection form={form} />
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
  );
}
