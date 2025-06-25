
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { SubHeadingsSection } from "../SubHeadingsSection";
import type { EditHousingFormData } from "./types";

interface DetailedDescriptionTabProps {
  control: Control<EditHousingFormData>;
}

export function DetailedDescriptionTab({ control }: DetailedDescriptionTabProps) {
  // Available description items for read-only display
  const descriptionItems = [
    "Diskmaskin",
    "Frontmatad tvättmaskin installerad",
    "Individuell mätning av hushållsel",
    "TV via fiber",
    "Individuell mätning av varmvatten",
    "Tillgång till gemensamhetsutrymme",
    "Kombinerad kyl och frys",
    "Tillgång till övernattningsrum",
    "Mikrovågsugn",
    "Handduschstork",
    "Spiskåpa",
    "Rökfritt hus",
    "Torktumlare",
    "Fastighetsägarsttyrt lägenhetsunderhåll FLU"
  ];

  return (
    <div className="space-y-6">
      <FormField
        control={control}
        name="mainHeading"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Huvudrubrik</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Fräsch trea med fantastisk utsikt" className="h-12" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="sellingPoint"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Säljande ingress</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Upptäck Bäckby - en levande stadsdel som kombinerar naturskönhet med ett pulserande samhällsliv. Här finner du allt från mysiga caféer till spännande aktiviteter för hela familjen. Välkommen att utforska vad Bäckby har att erbjuda!"
                className="min-h-[80px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="webNote"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Webbnotering</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Välkommen till denna fantastiska bostad i hjärtat av Bäckby! Här får du en perfekt kombination av modern komfort och naturskön omgivning..."
                className="min-h-[120px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <SubHeadingsSection control={control} />

      <div className="space-y-4">
        <FormLabel className="text-sm font-medium">Beskrivning</FormLabel>
        
        <div className="space-y-2">
          {descriptionItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full flex-shrink-0 mt-2"></div>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={control}
        name="parkingInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Parkera bilen</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Parkering i Bäckby är både enkelt och bekvämt. Det finns flera parkeringsalternativ tillgängliga..."
                className="min-h-[100px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="visitorParkingInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">Bilplatser till besökare</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Det finns avgiftsbelagda besöksparkeringar i alla våra områden..."
                className="min-h-[80px] resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
