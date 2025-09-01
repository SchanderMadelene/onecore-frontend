import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { BasicInfoSection } from "@/components/rentals/edit-housing/BasicInfoSection";
import { EditableFormSection } from "@/components/rentals/edit-housing/EditableFormSection";
import { DetailedDescriptionTab } from "@/components/rentals/edit-housing/DetailedDescriptionTab";
import { PlanritningTab } from "@/components/rentals/edit-housing/PlanritningTab";
import { useIsMobile } from "@/hooks/use-mobile";
import type { EditHousingFormData } from "@/components/rentals/edit-housing/types";

export default function CreateHousingAdPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const form = useForm<EditHousingFormData>({
    defaultValues: {
      housingObjectType: "",
      moveIn: "Omgående",
      moveInDate: "",
      availableFrom: "",
      eventuallyAvailableFrom: "",
      queue: "Ingen spärr",
      standardNote: "",
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

  const handleBack = () => {
    // Navigate back to rentals page with bostad tab and the specific housing sub-tab
    const activeHousingTab = location.state?.activeHousingTab || "behovAvPublicering";
    navigate('/rentals?tab=bostad', { 
      state: { activeHousingTab }
    });
  };

  const onSubmit = (data: EditHousingFormData) => {
    console.log('Creating new housing ad:', data);
    toast.success("Ny bostadsannons har skapats");
    handleBack();
  };

  const handlePublish = () => {
    form.handleSubmit((data) => {
      console.log('Creating and publishing housing ad:', data);
      toast.success("Bostadsannons har skapats och publicerats");
      handleBack();
    })();
  };

  // Mock housing space data for BasicInfoSection
  const mockHousingSpace = {
    id: "new",
    address: "Ny bostadsannons",
    area: "0",
    rooms: 0,
    rent: "0",
    type: "Lägenhet",
    size: "0 kvm",
    floor: "0",
    seekers: 0,
    publishedFrom: "",
    publishedTo: "",
    status: "draft" as const,
    lastModified: new Date().toISOString(),
    createdBy: "Aktuell användare"
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Skapa ny bostadsannons</h1>
        </div>

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
              <BasicInfoSection housingSpace={mockHousingSpace} />
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

        <div className={`${isMobile ? 'flex-col gap-2 pt-4' : 'flex justify-between pt-6'} border-t mt-6`}>
          {isMobile ? (
            <div className="flex flex-col gap-2 w-full">
              <Button 
                onClick={form.handleSubmit(onSubmit)} 
                className="w-full bg-primary hover:bg-primary/90"
              >
                Skapa annons
              </Button>
              <Button 
                variant="outline" 
                onClick={handlePublish}
                className="w-full"
              >
                Skapa och publicera
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePublish} className="px-8">
                Skapa och publicera
              </Button>
              <Button onClick={form.handleSubmit(onSubmit)} className="px-8 bg-primary hover:bg-primary/90">
                Skapa annons
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}