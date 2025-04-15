import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Trash2, ChevronRight, CircleParking, Car } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
interface ParkingSpace {
  id: string;
  address: string;
  area: string;
  type: string;
  queueType: string;
  rent: string;
  seekers: number;
  publishedFrom: string;
  publishedTo: string;
}
const demoData: ParkingSpace[] = [{
  id: "123-123-123-0201",
  address: "Bellmansgatan 1",
  area: "Centrum (Områdesbegränsning)",
  type: "Garage m el",
  queueType: "Poängfri",
  rent: "540kr/mån",
  seekers: 0,
  publishedFrom: "2024-01-01",
  publishedTo: "2024-01-01"
}, {
  id: "123-123-123-0202",
  address: "Bellmansgatan 2",
  area: "Gryta",
  type: "Garage m el",
  queueType: "Poängfri",
  rent: "540kr/mån",
  seekers: 1,
  publishedFrom: "2024-01-01",
  publishedTo: "2024-01-01"
}];
export function ParkingSpacesTable() {
  return <div className="w-full space-y-8">
      <Tabs defaultValue="publicerade" className="w-full">
        <TabsList className="grid grid-cols-5 mb-8">
          <TabsTrigger value="publicerade">
            Publicerade
          </TabsTrigger>
          <TabsTrigger value="klaraForErbjudande">
            Klara för erbjudande
          </TabsTrigger>
          <TabsTrigger value="erbjudna">
            Erbjudna
          </TabsTrigger>
          <TabsTrigger value="historik">
            Historik
          </TabsTrigger>
          <TabsTrigger value="behovAvPublicering">
            Behov av publicering
          </TabsTrigger>
        </TabsList>

        <TabsContent value="publicerade">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button variant="default" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Publicera bilplatser från Xpand
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
              </div>
            </div>

            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[250px] whitespace-nowrap">Gatuadress & ID</TableHead>
                    <TableHead className="whitespace-nowrap">Område</TableHead>
                    <TableHead className="whitespace-nowrap">Bilplatstyp</TableHead>
                    <TableHead className="whitespace-nowrap">Kötyp</TableHead>
                    <TableHead className="whitespace-nowrap">Hyra</TableHead>
                    <TableHead className="whitespace-nowrap">Sökande</TableHead>
                    <TableHead className="whitespace-nowrap">Publicerad t.om</TableHead>
                    <TableHead className="whitespace-nowrap">Publicerad fr.o.m</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoData.map(space => <TableRow key={space.id} className="group">
                      <TableCell>
                        <div className="font-medium">{space.address}</div>
                        <div className="text-sm text-muted-foreground">{space.id}</div>
                      </TableCell>
                      <TableCell>{space.area}</TableCell>
                      <TableCell>{space.type}</TableCell>
                      <TableCell>{space.queueType}</TableCell>
                      <TableCell>
                        <div className="font-medium">{space.rent}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{space.seekers}</div>
                      </TableCell>
                      <TableCell>{space.publishedTo}</TableCell>
                      <TableCell>{space.publishedFrom}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="destructive" size="sm" className="flex items-center gap-1">
                            <Trash2 className="h-4 w-4" />
                            <span>Ta bort</span>
                          </Button>
                          <Button size="sm" className="flex items-center gap-1">
                            <PlusCircle className="h-4 w-4" />
                            <span>Ny anmälan</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>)}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="klaraForErbjudande">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga bilplatser klara för erbjudande</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="erbjudna">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga erbjudna bilplatser</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historik">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Ingen historik tillgänglig</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="behovAvPublicering">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga bilplatser behöver publiceras</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
}