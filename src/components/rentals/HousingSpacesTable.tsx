import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2, Home, UserPlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HousingSpaceDetail } from "./HousingSpaceDetail";
import { UnpublishedHousingTable } from "./UnpublishedHousingTable";
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

        <TabsContent value="behovAvPublicering">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Sök opublicerad bostad..." className="pl-9 w-full sm:w-[300px]" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Ny bostadsannons
                </Button>
              </div>
            </div>

            <UnpublishedHousingTable />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
