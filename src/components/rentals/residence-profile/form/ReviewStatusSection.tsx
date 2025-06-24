
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, Phone, Shield } from "lucide-react";
import type { ProfileFormData, ReviewStatus, RejectedReason } from "../types";
import { housingFieldMatrix } from "../model/conditional";

interface ReviewStatusSectionProps {
  form: UseFormReturn<ProfileFormData>;
}

const reviewStatusOptions: { value: ReviewStatus; label: string; icon: React.ReactNode }[] = [
  { value: "PENDING", label: "Väntar på granskning", icon: <Clock className="h-4 w-4" /> },
  { value: "APPROVED", label: "Godkänd", icon: <CheckCircle className="h-4 w-4" /> },
  { value: "REJECTED", label: "Avvisad", icon: <XCircle className="h-4 w-4" /> },
  { value: "CONTACTED_UNREACHABLE", label: "Kontaktad - ej nåbar", icon: <Phone className="h-4 w-4" /> },
  { value: "REFERENCE_NOT_REQUIRED", label: "Referens ej krävs", icon: <Shield className="h-4 w-4" /> },
];

const rejectedReasonOptions: { value: RejectedReason; label: string }[] = [
  { value: "DEBT_TO_LANDLORD", label: "Skuld till hyresvärd" },
  { value: "DISTURBANCE", label: "Störningar" },
  { value: "LATE_RENT_PAYMENT", label: "Sen hyresbetalning" },
  { value: "MISMANAGEMENT", label: "Misskötsel" },
];

export function ReviewStatusSection({ form }: ReviewStatusSectionProps) {
  const { watch, setValue } = form;
  const reviewStatus = watch("housingReference.reviewStatus");
  const housingType = watch("housingType");
  const showRejectedReason = reviewStatus === "REJECTED";
  
  // Kontrollera om denna boendeform kräver referens
  const fieldsToShow = housingType ? housingFieldMatrix[housingType as keyof typeof housingFieldMatrix] || [] : [];
  const requiresReference = fieldsToShow.includes('housingReference.phone') || fieldsToShow.includes('housingReference.email');

  // Visa inte denna sektion om referens inte krävs för denna boendeform
  if (!requiresReference) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Granskningsstatus
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reviewStatus">Status</Label>
            <Select
              value={reviewStatus}
              onValueChange={(value) => setValue("housingReference.reviewStatus", value as ReviewStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj granskningsstatus" />
              </SelectTrigger>
              <SelectContent>
                {reviewStatusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      {option.icon}
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {showRejectedReason && (
            <div className="space-y-2">
              <Label htmlFor="reasonRejected">Anledning för avvisning</Label>
              <Select
                value={watch("housingReference.reasonRejected")}
                onValueChange={(value) => setValue("housingReference.reasonRejected", value as RejectedReason)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Välj anledning" />
                </SelectTrigger>
                <SelectContent>
                  {rejectedReasonOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
