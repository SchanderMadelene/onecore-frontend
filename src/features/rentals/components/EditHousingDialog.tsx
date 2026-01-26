
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Edit } from "lucide-react";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { toast } from "sonner";
import { BasicInfoSection } from "./edit-housing/BasicInfoSection";
import { EditableFormSection } from "./edit-housing/EditableFormSection";
import { DetailedDescriptionTab } from "./edit-housing/DetailedDescriptionTab";
import { PlanritningTab } from "./edit-housing/PlanritningTab";
import { useIsMobile } from "@/hooks/use-mobile";
import type { EditHousingFormData } from "./edit-housing/types";

interface EditHousingDialogProps {
  housingSpace: UnpublishedHousingSpace;
}

export function EditHousingDialog({ housingSpace }: EditHousingDialogProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const form = useForm<EditHousingFormData>({
    defaultValues: {
      housingObjectType: "Standard, Poängfri, Korttidskontrakt, Lätt att ...",
      moveIn: "Omgående",
      moveInDate: "dd-mm-yy",
      availableFrom: "dd-mm-yy",
      eventuallyAvailableFrom: "dd-mm-yy",
      queue: "Ingen spärr",
      standardNote: "Ej visningsbar pga renovering fram till dd-mm-yy",
      // Detailed description defaults
      mainHeading: "",
      sellingPoint: "",
      webNote: "",
      subHeading: "",
      description: "",
      dishwasher: false,
      frontLoadingWasher: false,
      individualKitchenMeasurement: false,
      tvViaFiber: false,
      individualWaterHeaterMeasurement: false,
      accessToCommonRoom: false,
      combinedRefrigeratorFreezer: false,
      accessToOvernightRoom: false,
      microwave: false,
      handshower: false,
      pantry: false,
      smokeFreeHouse: false,
      tumbleDryer: false,
      propertyOwnerPaidApartmentInsurance: false,
      parkingInfo: "",
      visitorParkingInfo: "",
    },
  });

  const onSubmit = (data: EditHousingFormData) => {
    toast.success("Bostadsannonsen har sparats");
    setOpen(false);
  };

  const handlePublish = () => {
    toast.success("Bostadsannonsen har publicerats");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          {isMobile ? "Redigera" : "Redigera"}
        </Button>
      </DialogTrigger>
      <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh] m-2' : 'max-w-4xl max-h-[90vh]'} overflow-y-auto`}>
        <DialogHeader className={isMobile ? "pb-4" : ""}>
          <DialogTitle className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold`}>
            Redigera Annons
          </DialogTitle>
          <DialogDescription className={isMobile ? "text-sm" : ""}>
            Redigera detaljer för {housingSpace.address}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="grundlaggande" className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${isMobile ? 'h-auto' : ''}`}>
            <TabsTrigger value="grundlaggande" className={`font-semibold ${isMobile ? 'text-xs px-2 py-2' : ''}`}>
              {isMobile ? "Grund" : "Grundläggande"}
            </TabsTrigger>
            <TabsTrigger value="detaljerad" className={`font-semibold text-muted-foreground ${isMobile ? 'text-xs px-2 py-2' : ''}`}>
              {isMobile ? "Detaljerad" : "Detaljerad Beskrivning"}
            </TabsTrigger>
            <TabsTrigger value="planritning" className={`font-semibold text-muted-foreground ${isMobile ? 'text-xs px-2 py-2' : ''}`}>
              Planritning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="grundlaggande" className={`mt-4 ${isMobile ? 'mt-3' : 'mt-6'}`}>
            <div className={`space-y-4 ${isMobile ? 'space-y-4' : 'space-y-6'}`}>
              <BasicInfoSection housingSpace={housingSpace} />
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <EditableFormSection control={form.control} />
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="detaljerad" className={`mt-4 ${isMobile ? 'mt-3' : 'mt-6'}`}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <DetailedDescriptionTab control={form.control} />
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="planritning" className={`mt-4 ${isMobile ? 'mt-3' : 'mt-6'}`}>
            <PlanritningTab />
          </TabsContent>
        </Tabs>

        <DialogFooter className={`${isMobile ? 'flex-col gap-2 pt-4' : 'flex justify-between pt-6'} border-t`}>
          {isMobile ? (
            <div className="flex flex-col gap-2 w-full">
              <Button 
                onClick={form.handleSubmit(onSubmit)} 
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Spara/uppdatera annons
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
                Förhandsgranska
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setOpen(false)} className="px-8">
                Förhandsgranska
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)} className="px-8 bg-black hover:bg-gray-800 text-white">
                Spara/uppdatera annons
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
