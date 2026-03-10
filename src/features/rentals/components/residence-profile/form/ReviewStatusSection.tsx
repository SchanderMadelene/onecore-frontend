
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { CheckCircle, XCircle, Clock, Phone, Shield } from "lucide-react";
import { sv } from "date-fns/locale";
import { DatePicker } from '@/shared/common/DatePicker';
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
  const { control, watch } = form;
  const reviewStatus = watch("housingReference.reviewStatus");
  const housingType = watch("housingType");
  const showRejectedFields = reviewStatus === "REJECTED";
  
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
        <FormField
          control={control}
          name="housingReference.reviewStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ange status boendereferens *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj granskningsstatus" />
                  </SelectTrigger>
                </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {showRejectedFields && (
          <div className="space-y-4">
            <FormField
              control={control}
              name="housingReference.reasonRejected"
              rules={{ required: "Du behöver välja en anledning" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anledning ej godkänd *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Välj ur lista" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {rejectedReasonOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="housingReference.expiresAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ej godkänd till och med *</FormLabel>
                  <DatePicker
                    value={field.value}
                    onChange={field.onChange}
                    dateFormat="PPP"
                    locale={sv}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
