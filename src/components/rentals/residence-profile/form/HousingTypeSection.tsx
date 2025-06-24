
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Home } from "lucide-react";
import type { ProfileFormData, HousingType } from "../types";
import { housingFieldMatrix } from "../model/conditional";

interface HousingTypeSectionProps {
  form: UseFormReturn<ProfileFormData>;
}

const housingTypeOptions: { value: HousingType; label: string }[] = [
  { value: "RENTAL", label: "Hyresrätt" },
  { value: "SUB_RENTAL", label: "Andrahandsuthyrning" },
  { value: "LIVES_WITH_FAMILY", label: "Bor hos familj" },
  { value: "LODGER", label: "Inneboende" },
  { value: "OWNS_HOUSE", label: "Äger villa" },
  { value: "OWNS_FLAT", label: "Äger lägenhet" },
  { value: "OWNS_ROW_HOUSE", label: "Äger radhus" },
  { value: "OTHER", label: "Annat" },
];

export function HousingTypeSection({ form }: HousingTypeSectionProps) {
  const { control, watch } = form;
  const housingType = watch("housingType");
  
  // Hämta vilka fält som ska visas baserat på vald boendeform
  const fieldsToShow = housingType ? housingFieldMatrix[housingType as keyof typeof housingFieldMatrix] || [] : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Nuvarande boende
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="housingType"
          rules={{ required: "Du behöver välja en boendeform" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bostadstyp *</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Välj ur lista" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {housingTypeOptions.map((option) => (
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

        {/* Visa hyresvärd/ägare endast för vissa boendeformer */}
        {fieldsToShow.includes('landlord') && (
          <FormField
            control={control}
            name="landlord"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hyresvärd/Ägare *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Namn på nuvarande hyresvärd" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Visa beskrivning av boende för vissa boendeformer */}
        {fieldsToShow.includes('housingTypeDescription') && (
          <FormField
            control={control}
            name="housingTypeDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Beskriv boende *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ytterligare information om boendet" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Visa referenskontaktuppgifter endast för vissa boendeformer */}
        {(fieldsToShow.includes('housingReference.phone') || fieldsToShow.includes('housingReference.email')) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fieldsToShow.includes('housingReference.phone') && (
              <FormField
                control={control}
                name="housingReference.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonnummer hyresvärd *</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" placeholder="070-123 45 67" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {fieldsToShow.includes('housingReference.email') && (
              <FormField
                control={control}
                name="housingReference.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-post hyresvärd</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="referens@exempel.se" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        )}

        {/* Antal vuxna och barn visas alltid */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={control}
            name="numAdults"
            rules={{ 
              required: "Du behöver ange antalet vuxna i hushållet",
              min: { value: 1, message: "Minst 1 vuxen krävs" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antal vuxna *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="1"
                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="numChildren"
            rules={{ 
              required: "Du behöver ange antalet barn i hushållet",
              min: { value: 0, message: "Kan inte vara negativt" }
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antal barn *</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="0"
                    onChange={(e) => field.onChange(e.target.value === '' ? '' : parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
