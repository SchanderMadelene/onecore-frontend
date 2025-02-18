
import { useParams } from "react-router-dom";
import { NavigationBar } from "@/components/NavigationBar";
import { TreeView } from "@/components/TreeView";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import type { Residence, Room, InspectionProtocol, InspectionItem } from "@/types/api";
import type { APIResponse } from "@/types/api";

const mockResidenceData: APIResponse<Residence> = {
  content: {
    id: "101",
    code: "LGH-101",
    name: "Kontorslokal med utsikt",
    deleted: false,
    validityPeriod: {
      fromDate: "2024-01-01T00:00:00Z",
      toDate: "2024-12-31T23:59:59Z"
    }
  }
};

const mockRoomsData: APIResponse<Room[]> = {
  content: [
    {
      id: "1",
      code: "RUM-101",
      name: "Vardagsrum",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 1
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 1
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 1,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "1",
        roomTypeCode: "VARDAGSRUM",
        name: "Vardagsrum",
        use: 1,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: "2",
      code: "RUM-102",
      name: "Kök",
      usage: {
        shared: false,
        allowPeriodicWorks: true,
        spaceType: 2
      },
      features: {
        hasToilet: false,
        isHeated: true,
        hasThermostatValve: true,
        orientation: 2
      },
      dates: {
        installation: null,
        from: "2024-01-01T00:00:00Z",
        to: "2024-12-31T23:59:59Z",
        availableFrom: null,
        availableTo: null
      },
      sortingOrder: 2,
      deleted: false,
      timestamp: "2024-01-01T00:00:00Z",
      roomType: {
        roomTypeId: "2",
        roomTypeCode: "KOK",
        name: "Kök",
        use: 2,
        optionAllowed: 0,
        isSystemStandard: 1,
        allowSmallRoomsInValuation: 0,
        timestamp: "2024-01-01T00:00:00Z"
      }
    }
  ]
};

const mockInspectionItems: Record<string, InspectionItem[]> = {
  floor: [
    { id: "f1", type: "floor", name: "Parkettgolv", condition: "good", notes: "" },
    { id: "f2", type: "floor", name: "Trösklar", condition: "good", notes: "" }
  ],
  wall: [
    { id: "w1", type: "wall", name: "Väggar", condition: "good", notes: "" },
    { id: "w2", type: "wall", name: "Tapeter", condition: "good", notes: "" }
  ],
  ceiling: [
    { id: "c1", type: "ceiling", name: "Innertak", condition: "good", notes: "" }
  ],
  appliance: [
    { id: "a1", type: "appliance", name: "Kylskåp", condition: "good", notes: "" },
    { id: "a2", type: "appliance", name: "Spis", condition: "good", notes: "" }
  ]
};

const fetchResidence = async (id: string): Promise<Residence> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockResidenceData.content;
};

const fetchRooms = async (id: string): Promise<Room[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockRoomsData.content;
};

const ResidencePage = () => {
  const { city, district, property, id } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInspectionDialogOpen, setIsInspectionDialogOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      inspector: "",
      notes: "",
    },
  });

  const { data: residenceData, isLoading: isLoadingResidence, error: residenceError } = useQuery({
    queryKey: ['residence', id],
    queryFn: () => fetchResidence(id || ''),
    enabled: !!id
  });

  const { data: roomsData, isLoading: isLoadingRooms, error: roomsError } = useQuery({
    queryKey: ['rooms', id],
    queryFn: () => fetchRooms(id || ''),
    enabled: !!id
  });

  const onCreateInspection = (data: any) => {
    console.log("Creating inspection protocol:", data);
    setIsInspectionDialogOpen(false);
  };

  const getOrientationText = (orientation: number) => {
    switch (orientation) {
      case 1: return "Norr";
      case 2: return "Öster";
      case 3: return "Söder";
      case 4: return "Väster";
      default: return "Okänd";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'good': return 'text-green-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (isLoadingResidence || isLoadingRooms) {
    return <div>Laddar...</div>;
  }

  if (residenceError || roomsError) {
    return <div>Ett fel uppstod: {(residenceError || roomsError)?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary">
      <NavigationBar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex h-[calc(100vh-3.5rem)] mt-14 relative">
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            w-[280px] lg:w-64 
            bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
            fixed lg:static 
            left-0 top-14 
            h-[calc(100vh-3.5rem)] 
            transition-transform duration-300 ease-in-out
            z-50 lg:z-0
            border-r
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <TreeView onNavigate={() => setIsSidebarOpen(false)} />
        </aside>

        <main
          className={`
            flex-1 
            p-4 sm:p-6 lg:p-8 
            transition-all duration-300 
            w-full
            overflow-y-auto
            ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}
          `}
        >
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">Lägenhet {residenceData?.code}</h1>
                <p className="text-muted-foreground">{property?.replace("-", " ")}, {district}</p>
              </div>
              
              <Dialog open={isInspectionDialogOpen} onOpenChange={setIsInspectionDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Skapa nytt besiktningsprotokoll
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Nytt besiktningsprotokoll</DialogTitle>
                    <DialogDescription>
                      Skapa ett nytt besiktningsprotokoll för lägenheten. Fyll i grundläggande information nedan.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onCreateInspection)} className="space-y-6">
                      <div className="grid grid-cols-1 gap-4">
                        <FormField
                          control={form.control}
                          name="inspector"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Besiktningsman</FormLabel>
                              <FormControl>
                                <Input placeholder="Ange namn" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="notes"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Generella anteckningar</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Generella anteckningar om besiktningen"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Rum att besiktiga</h3>
                        <div className="grid gap-4">
                          {roomsData?.map((room) => (
                            <div
                              key={room.id}
                              className="border rounded-lg p-4 space-y-4"
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-medium">{room.name || room.code}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {room.roomType?.name || "Typ ej specificerad"}
                                  </p>
                                </div>
                                <Button
                                  variant="secondary"
                                  onClick={() => setSelectedRoomId(room.id)}
                                >
                                  Besiktiga rum
                                </Button>
                              </div>
                              
                              {selectedRoomId === room.id && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                      <h5 className="font-medium">Golv</h5>
                                      {mockInspectionItems.floor.map((item) => (
                                        <div key={item.id} className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <select
                                              className="text-sm border rounded p-1"
                                              value={item.condition}
                                              onChange={(e) => console.log(e.target.value)}
                                            >
                                              <option value="good">Bra skick</option>
                                              <option value="fair">Acceptabelt</option>
                                              <option value="poor">Behöver åtgärd</option>
                                            </select>
                                          </div>
                                          <Textarea
                                            placeholder="Anteckningar om skicket..."
                                            className="text-sm"
                                            value={item.notes}
                                            onChange={(e) => console.log(e.target.value)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="space-y-3">
                                      <h5 className="font-medium">Väggar</h5>
                                      {mockInspectionItems.wall.map((item) => (
                                        <div key={item.id} className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <select
                                              className="text-sm border rounded p-1"
                                              value={item.condition}
                                              onChange={(e) => console.log(e.target.value)}
                                            >
                                              <option value="good">Bra skick</option>
                                              <option value="fair">Acceptabelt</option>
                                              <option value="poor">Behöver åtgärd</option>
                                            </select>
                                          </div>
                                          <Textarea
                                            placeholder="Anteckningar om skicket..."
                                            className="text-sm"
                                            value={item.notes}
                                            onChange={(e) => console.log(e.target.value)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="space-y-3">
                                      <h5 className="font-medium">Tak</h5>
                                      {mockInspectionItems.ceiling.map((item) => (
                                        <div key={item.id} className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <select
                                              className="text-sm border rounded p-1"
                                              value={item.condition}
                                              onChange={(e) => console.log(e.target.value)}
                                            >
                                              <option value="good">Bra skick</option>
                                              <option value="fair">Acceptabelt</option>
                                              <option value="poor">Behöver åtgärd</option>
                                            </select>
                                          </div>
                                          <Textarea
                                            placeholder="Anteckningar om skicket..."
                                            className="text-sm"
                                            value={item.notes}
                                            onChange={(e) => console.log(e.target.value)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                    
                                    <div className="space-y-3">
                                      <h5 className="font-medium">Vitvaror</h5>
                                      {mockInspectionItems.appliance.map((item) => (
                                        <div key={item.id} className="space-y-2">
                                          <div className="flex justify-between items-center">
                                            <span>{item.name}</span>
                                            <select
                                              className="text-sm border rounded p-1"
                                              value={item.condition}
                                              onChange={(e) => console.log(e.target.value)}
                                            >
                                              <option value="good">Bra skick</option>
                                              <option value="fair">Acceptabelt</option>
                                              <option value="poor">Behöver åtgärd</option>
                                            </select>
                                          </div>
                                          <Textarea
                                            placeholder="Anteckningar om skicket..."
                                            className="text-sm"
                                            value={item.notes}
                                            onChange={(e) => console.log(e.target.value)}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="flex justify-end space-x-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => setSelectedRoomId(null)}
                                    >
                                      Stäng
                                    </Button>
                                    <Button
                                      onClick={() => console.log("Sparar rumsbesiktning")}
                                    >
                                      Spara
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsInspectionDialogOpen(false)}
                        >
                          Avbryt
                        </Button>
                        <Button type="submit">
                          Spara protokoll
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Grundinformation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Lägenhetskod</p>
                      <p className="font-medium">{residenceData?.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Namn</p>
                      <p className="font-medium">{residenceData?.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="font-medium">{residenceData?.deleted ? "Borttagen" : "Aktiv"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Giltighetstid</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig från</p>
                      <p className="font-medium">
                        {new Date(residenceData?.validityPeriod.fromDate || '').toLocaleDateString('sv-SE')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Giltig till</p>
                      <p className="font-medium">
                        {new Date(residenceData?.validityPeriod.toDate || '').toLocaleDateString('sv-SE')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Rum för besiktning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {roomsData?.map(room => (
                    <div key={room.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Rumskod</p>
                          <p className="font-medium">{room.code}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Namn</p>
                          <p className="font-medium">{room.name || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Typ</p>
                          <p className="font-medium">{room.roomType?.name || '-'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Orientering</p>
                          <p className="font-medium">{getOrientationText(room.features.orientation)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Golv</h4>
                          <ul className="text-sm space-y-1">
                            {mockInspectionItems.floor.map(item => (
                              <li key={item.id} className="text-muted-foreground">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Väggar</h4>
                          <ul className="text-sm space-y-1">
                            {mockInspectionItems.wall.map(item => (
                              <li key={item.id} className="text-muted-foreground">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Tak</h4>
                          <ul className="text-sm space-y-1">
                            {mockInspectionItems.ceiling.map(item => (
                              <li key={item.id} className="text-muted-foreground">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Vitvaror</h4>
                          <ul className="text-sm space-y-1">
                            {mockInspectionItems.appliance.map(item => (
                              <li key={item.id} className="text-muted-foreground">
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResidencePage;
