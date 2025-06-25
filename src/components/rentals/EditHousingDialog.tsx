

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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Edit, CalendarIcon } from "lucide-react";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { toast } from "sonner";

interface EditHousingDialogProps {
  housingSpace: UnpublishedHousingSpace;
}

interface EditHousingFormData {
  housingObjectType: string;
  moveIn: string;
  moveInDate: string;
  availableFrom: string;
  eventuallyAvailableFrom: string;
  queue: string;
  standardNote: string;
  // Detailed description fields
  mainHeading: string;
  sellingPoint: string;
  webNote: string;
  subHeading: string;
  description: string;
  dishwasher: boolean;
  frontLoadingWasher: boolean;
  individualKitchenMeasurement: boolean;
  tvViaFiber: boolean;
  individualWaterHeaterMeasurement: boolean;
  accessToCommonRoom: boolean;
  combinedRefrigeratorFreezer: boolean;
  accessToOvernightRoom: boolean;
  microwave: boolean;
  handshower: boolean;
  pantry: boolean;
  smokeFreeHouse: boolean;
  tumbleDryer: boolean;
  propertyOwnerPaidApartmentInsurance: boolean;
  parkingInfo: string;
  visitorParkingInfo: string;
}

export function EditHousingDialog({ housingSpace }: EditHousingDialogProps) {
  const [open, setOpen] = useState(false);
  
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
    console.log('Saving housing space:', data);
    toast.success("Bostadsannonsen har sparats");
    setOpen(false);
  };

  const handlePublish = () => {
    console.log('Publishing housing space:', housingSpace.id);
    toast.success("Bostadsannonsen har publicerats");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Edit className="h-4 w-4" />
          Redigera
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Redigera annons</DialogTitle>
          <DialogDescription>
            Redigera detaljer för {housingSpace.address}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="grundlaggande" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grundlaggande" className="font-semibold">Grundläggande</TabsTrigger>
            <TabsTrigger value="detaljerad" className="font-semibold text-muted-foreground">Detaljerad beskrivning</TabsTrigger>
            <TabsTrigger value="planritning" className="font-semibold text-muted-foreground">Planritning</TabsTrigger>
          </TabsList>

          <TabsContent value="grundlaggande" className="mt-6">
            <div className="space-y-6">
              {/* Read-only information card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Grundläggande information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Adress</label>
                      <div className="text-sm font-medium mt-1">{housingSpace.address}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nummer</label>
                      <div className="text-sm font-medium mt-1">-</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Område</label>
                      <div className="text-sm font-medium mt-1">{housingSpace.area}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Rum</label>
                      <div className="text-sm font-medium mt-1">{housingSpace.rooms}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Yta</label>
                      <div className="text-sm font-medium mt-1">{housingSpace.size}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Hiss</label>
                      <div className="text-sm font-medium mt-1">Ja/Nej</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Hyra/månad</label>
                      <div className="text-sm font-medium mt-1">{housingSpace.rent || "10 000 kr"}</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Byggnadsår</label>
                      <div className="text-sm font-medium mt-1">1950</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Objektsnummer</label>
                      <div className="text-sm font-medium mt-1">xxxx</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Besiktning genomförd</label>
                      <div className="text-sm font-medium mt-1">dd-mm-yy</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Editable form fields */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="housingObjectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Hyresobjektstyp</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Standard, Poängfri, Korttidskontrakt, Lätt att ..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="poangfri">Poängfri</SelectItem>
                            <SelectItem value="korttid">Korttidskontrakt</SelectItem>
                            <SelectItem value="latt">Lätt att...</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="moveIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Inflyttning</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12">
                                <SelectValue placeholder="Omgående" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="omgående">Omgående</SelectItem>
                              <SelectItem value="datum">Specifikt datum</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="moveInDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Inflyttning</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                              <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="availableFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Tillgänglig från</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                              <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="eventuallyAvailableFrom"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Eventuellt tillgänglig från</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input {...field} placeholder="dd-mm-yy" className="h-12 pr-10" />
                              <CalendarIcon className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="queue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Spärra</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12">
                              <SelectValue placeholder="Ingen spärr" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ingen">Ingen spärr</SelectItem>
                            <SelectItem value="temporar">Temporär spärr</SelectItem>
                            <SelectItem value="permanent">Permanent spärr</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="standardNote"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Standardnotering</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            placeholder="Ej visningsbar pga renovering fram till dd-mm-yy"
                            className="min-h-[80px] resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="detaljerad" className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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

                <FormField
                  control={form.control}
                  name="subHeading"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Underrubrik</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ny underrubrik" className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormLabel className="text-sm font-medium">Beskrivning</FormLabel>
                  
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <FormField
                      control={form.control}
                      name="dishwasher"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Diskmaskin</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="frontLoadingWasher"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Frontmatad tvättmaskin installerad</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="individualKitchenMeasurement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Individuell mätning av hushållsel</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tvViaFiber"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">TV via fiber</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="individualWaterHeaterMeasurement"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Individuell mätning av varmvatten</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accessToCommonRoom"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Tillgång till till gemenssamhetsutrymme</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="combinedRefrigeratorFreezer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Kombinerad kyl och frys</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accessToOvernightRoom"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Tillgång till övernattningsrum</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="microwave"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Mikrovågsugn</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="handshower"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Handduschstork</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pantry"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Spiskåpa</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="smokeFreeHouse"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Rökfritt hus</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tumbleDryer"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Torktumlare</FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="propertyOwnerPaidApartmentInsurance"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">Fastighetsägarsttyrt lägenhetsunderhåll FLU</FormLabel>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
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
                  control={form.control}
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
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="planritning" className="mt-6">
            <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
              <div className="text-center">
                <p>Planritning kommer att implementeras</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between pt-6 border-t">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)} className="px-8">
              Förhandsgranska
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} className="px-8 bg-black hover:bg-gray-800 text-white">
              Spara/uppdatera annons
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

