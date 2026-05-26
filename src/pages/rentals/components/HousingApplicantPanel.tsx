import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Form } from "@/components/ui/form";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { HousingTypeSection } from "@/features/rentals/components/residence-profile/form/HousingTypeSection";
import { CustomerReference } from "@/features/rentals/components/residence-profile/form/CustomerReference";
import { ReviewStatusSection } from "@/features/rentals/components/residence-profile/form/ReviewStatusSection";
import { HousingReferenceComment } from "@/features/rentals/components/residence-profile/form/HousingReferenceComment";
import type { ProfileFormData } from "@/features/rentals/components/residence-profile/types";
import type { HousingApplicant } from "@/features/rentals/hooks/useHousingListing";

interface HousingApplicantPanelProps {
  applicant: HousingApplicant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showOfferResponse?: boolean;
  offerStatus?: "Accepterat" | "Nekat" | "Väntar på svar";
  onMarkAccepted?: () => void;
  onMarkDeclined?: () => void;
}

const defaults: ProfileFormData = {
  housingType: "",
  landlord: "",
  housingTypeDescription: "",
  numAdults: 1,
  numChildren: 0,
  housingReference: {
    phone: "",
    email: "",
    reviewStatus: "PENDING",
    reasonRejected: "",
    expiresAt: undefined,
    comment: "",
  },
};

export function HousingApplicantPanel({
  applicant,
  open,
  onOpenChange,
  showOfferResponse = false,
  offerStatus,
  onMarkAccepted,
  onMarkDeclined,
}: HousingApplicantPanelProps) {
  const form = useForm<ProfileFormData>({ defaultValues: defaults });

  useEffect(() => {
    if (applicant) {
      form.reset({
        ...defaults,
        housingReference: {
          ...defaults.housingReference,
          phone: applicant.housingReference?.status ? "" : "",
        },
      });
    }
  }, [applicant, form]);

  if (!applicant) return null;

  const onSubmit = (_data: ProfileFormData) => {
    toast.success("Profil uppdaterad");
    onOpenChange(false);
  };

  const profileBadge =
    applicant.profileStatus === "Approved" ? (
      <Badge variant="success">Godkänd profil</Badge>
    ) : applicant.profileStatus === "PartiallyApproved" ? (
      <Badge variant="warning">Delvis godkänd</Badge>
    ) : (
      <Badge variant="destructive">Ej godkänd</Badge>
    );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            {profileBadge}
            <span className="text-xs text-muted-foreground">
              {applicant.queuePoints} köpoäng
            </span>
          </div>
          <SheetTitle className="text-left flex items-center gap-2">
            {applicant.name}
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={() =>
                window.open(
                  `/tenants/detail/${applicant.nationalRegistrationNumber}`,
                  "_blank"
                )
              }
              title="Öppna kundkort"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </SheetTitle>
          <div className="text-sm text-muted-foreground text-left">
            {applicant.contactCode} · {applicant.nationalRegistrationNumber}
          </div>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              <HousingTypeSection form={form} />
              <CustomerReference
                customerReferenceReceivedAt={new Date("2024-01-15")}
                housingReferenceUpdatedAt={new Date("2024-01-20")}
                updatedBy="Anna Andersson"
                expiresAt={null}
              />
              <ReviewStatusSection form={form} />
              <HousingReferenceComment form={form} />
            </div>

            <div className="border-t px-6 py-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Avbryt
              </Button>
              <Button type="submit">Uppdatera profil</Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
