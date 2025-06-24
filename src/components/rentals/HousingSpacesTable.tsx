
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Home, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HousingSpaceDetail } from "./HousingSpaceDetail";
import { useNavigate } from "react-router-dom";
import type { HousingSpace } from "./types/housing";

const demoData: HousingSpace[] = [{
  id: "234-234-234-0101",
  address: "Storgatan 10, 2tr",
  area: "Centrum",
  type: "Lägenhet",
  size: "65m²",
  rent: "8500kr/mån",
  rooms: 3,
  floor: "2",
  seekers: 12,
  publishedFrom: "2024-01-01",
  publishedTo: "2024-02-01"
}, {
  id: "234-234-234-0102",
  address: "Kungsgatan 15, 1tr",
  area: "Vasastan",
  type: "Lägenhet",
  size: "45m²",
  rent: "6500kr/mån",
  rooms: 2,
  floor: "1",
  seekers: 8,
  publishedFrom: "2024-01-15",
  publishedTo: "2024-02-15"
}, {
  id: "234-234-234-0103",
  address: "Drottninggatan 5",
  area: "Gamla Stan",
  type: "Lägenhet",
  size: "85m²",
  rent: "12000kr/mån",
  rooms: 4,
  floor: "3",
  seekers: 15,
  publishedFrom: "2024-01-10",
  publishedTo: "2024-02-10"
}];

export function HousingSpacesTable() {
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate('/rentals/residence-profile');
  };

  return (
    <div className="w-full space-y-8">
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
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={handleCreateProfile}
                >
                  <UserPlus className="h-4 w-4" />
                  Skapa sökandeprofil
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök bostad..." className="pl-9 w-full sm:w-[300px]" />
              </div>
            </div>

            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[250px] whitespace-nowrap">Bostad</TableHead>
                    <TableHead className="whitespace-nowrap">Område</TableHead>
                    <TableHead className="whitespace-nowrap">Typ</TableHead>
                    <TableHead className="whitespace-nowrap">Storlek</TableHead>
                    <TableHead className="whitespace-nowrap">Rum</TableHead>
                    <TableHead className="whitespace-nowrap">Hyra</TableHead>
                    <TableHead className="whitespace-nowrap">Sökande</TableHead>
                    <TableHead className="whitespace-nowrap">Publicerad t.om</TableHead>
                    <TableHead className="whitespace-nowrap">Publicerad fr.o.m</TableHead>
                    <TableHead className="text-right whitespace-nowrap">Åtgärder</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demoData.map(space => (
                    <TableRow key={space.id} className="group">
                      <TableCell>
                        <div className="font-medium">{space.address}</div>
                        <div className="text-sm text-muted-foreground">{space.id}</div>
                      </TableCell>
                      <TableCell>{space.area}</TableCell>
                      <TableCell>{space.type}</TableCell>
                      <TableCell>{space.size}</TableCell>
                      <TableCell>{space.rooms}</TableCell>
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
                            <UserPlus className="h-4 w-4" />
                            <span>Ny anmälan</span>
                          </Button>
                          <HousingSpaceDetail space={space} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="klaraForErbjudande">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Home className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga bostäder klara för erbjudande</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="erbjudna">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Home className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga erbjudna bostäder</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="historik">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Home className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Ingen historik tillgänglig</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="behovAvPublicering">
          <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
            <div className="text-center">
              <Home className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
              <p>Inga bostäder behöver publiceras</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
