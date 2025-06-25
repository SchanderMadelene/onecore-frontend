
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
import { useForm } from "react-hook-form";
import { Edit, CalendarIcon } from "lucide-react";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { toast } from "sonner";

interface EditHousingDialogProps {
  housingSpace: UnpublishedHousingSpace;
}

interface EditHousingFormData {
  address: string;
  number: string;
  area: string;
  rooms: string;
  size: string;
  elevator: string;
  rent: string;
  buildYear: string;
  objectNumber: string;
  inspectionCompleted: string;
  housingObjectType: string;
  moveIn: string;
  moveInDate: string;
  availableFrom: string;
  eventuallyAvailableFrom: string;
  queue: string;
  standardNote: string;
}

export function EditHousingDialog({ housingSpace }: EditHousingDialogProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<EditHousingFormData>({
    defaultValues: {
      address: housingSpace.address || "",
      number: "",
      area: housingSpace.area || "",
      rooms: housingSpace.rooms?.toString() || "",
      size: housingSpace.size || "",
      elevator: "Ja/Nej",
      rent: housingSpace.rent?.replace("kr/mån", "") || "",
      buildYear: "1950",
      objectNumber: "xxxx",
      inspectionCompleted: "dd-mm-yy",
      housingObjectType: "Standard, Poängfri, Korttidskontrakt, Lätt att ...",
      moveIn: "Omgående",
      moveInDate: "dd-mm-yy",
      availableFrom: "dd-mm-yy",
      eventuallyAvailableFrom: "dd-mm-yy",
      queue: "Ingen spärr",
      standardNote: "Ej visningsbar pga renovering fram till dd-mm-yy",
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
          <DialogTitle className="text-xl font-bold">REDIGERA ANNONS</DialogTitle>
          <DialogDescription>
            Redigera detaljer för {housingSpace.address}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="grundlaggande" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="grundlaggande" className="font-semibold">GRUNDLÄGGANDE</TabsTrigger>
            <TabsTrigger value="detaljerad" className="font-semibold text-muted-foreground">DETALJERAD BESKRIVNING</TabsTrigger>
            <TabsTrigger value="planritning" className="font-semibold text-muted-foreground">PLANRITNING</TabsTrigger>
          </TabsList>

          <TabsContent value="grundlaggande" className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Grundläggande information */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Adress</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nummer</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Område</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Rum</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Yta</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="elevator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Hiss</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Adress</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Nummer</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Område</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Antal rum</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Yta</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="elevator"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Ja/Nej</FormLabel>
                          <FormControl>
                            <Input {...field} className="h-10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Hyra/månad</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="10 000 kr" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="buildYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Byggnadsår</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="1950" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="objectNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Objektsnummer</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="xxxx" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inspectionCompleted"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Besiktning genomförd</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="dd-mm-yy" className="h-10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="housingObjectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">HYRESOBJEKTSTYP</FormLabel>
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
                        <FormLabel className="text-sm font-medium">INFLYTTNING</FormLabel>
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
                        <FormLabel className="text-sm font-medium">INFLYTTNING</FormLabel>
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
                        <FormLabel className="text-sm font-medium">TILLGÄNGLIG FRÅN</FormLabel>
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
                        <FormLabel className="text-sm font-medium">EVENTUELLT TILLGÄNGLIG FRÅN</FormLabel>
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
                      <FormLabel className="text-sm font-medium">SPÄRRA</FormLabel>
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
                      <FormLabel className="text-sm font-medium">STANDARDNOTERING</FormLabel>
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
          </TabsContent>

          <TabsContent value="detaljerad" className="mt-6">
            <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
              <div className="text-center">
                <p>Detaljerad beskrivning kommer att implementeras</p>
              </div>
            </div>
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
