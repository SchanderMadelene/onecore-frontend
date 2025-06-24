
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Home } from "lucide-react";
import type { ProfileFormData, HousingType } from "../types";

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
  const { register, watch, setValue } = form;
  const housingType = watch("housingType");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-5 w-5" />
          Nuvarande boende
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="housingType">Bostadstyp</Label>
            <Select
              value={housingType}
              onValueChange={(value) => setValue("housingType", value as HousingType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj bostadstyp" />
              </SelectTrigger>
              <SelectContent>
                {housingTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord">Hyresvärd/Ägare</Label>
            <Input
              id="landlord"
              {...register("landlord")}
              placeholder="Namn på hyresvärd eller ägare"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="housingTypeDescription">Beskrivning av boende</Label>
          <Input
            id="housingTypeDescription"
            {...register("housingTypeDescription")}
            placeholder="Ytterligare information om boendet"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numAdults">Antal vuxna</Label>
            <Input
              id="numAdults"
              type="number"
              min="1"
              {...register("numAdults", { valueAsNumber: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numChildren">Antal barn</Label>
            <Input
              id="numChildren"
              type="number"
              min="0"
              {...register("numChildren", { valueAsNumber: true })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
