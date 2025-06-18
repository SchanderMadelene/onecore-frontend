
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Trash2 } from "lucide-react";
import { ParkingSpaceDetail } from "../ParkingSpaceDetail";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { PublishParkingSpacesDialog } from "../PublishParkingSpacesDialog";
import type { ParkingSpace } from "../types/parking";

const demoData: ParkingSpace[] = [
  {
    id: "123-123-123-0201",
    address: "Bellmansgatan 1",
    area: "Centrum (Områdesbegränsning)",
    type: "Garage m el",
    queueType: "Poängfri",
    rent: "540kr/mån",
    seekers: 0,
    publishedFrom: "2024-01-01",
    publishedTo: "2024-01-01"
  },
  {
    id: "123-123-123-0202",
    address: "Bellmansgatan 2",
    area: "Gryta",
    type: "Garage m el",
    queueType: "Poängfri",
    rent: "540kr/mån",
    seekers: 1,
    publishedFrom: "2024-01-01",
    publishedTo: "2024-01-01"
  },
  {
    id: "123-123-123-0203",
    address: "Kungsgatan 15",
    area: "Centrum",
    type: "Carport",
    queueType: "Poängfri",
    rent: "450kr/mån",
    seekers: 3,
    publishedFrom: "2024-01-01",
    publishedTo: "2024-02-01"
  },
  {
    id: "123-123-123-0204",
    address: "Stigbergsgatan 7",
    area: "Stigberget",
    type: "Utomhusplats",
    queueType: "Poängfri",
    rent: "350kr/mån",
    seekers: 2,
    publishedFrom: "2024-01-15",
    publishedTo: "2024-02-15"
  },
  {
    id: "123-123-123-0205",
    address: "Vasagatan 22",
    area: "Vasastaden",
    type: "Garage m el",
    queueType: "Poängfri",
    rent: "595kr/mån",
    seekers: 5,
    publishedFrom: "2024-01-10",
    publishedTo: "2024-02-10"
  },
  {
    id: "123-123-123-0206",
    address: "Östra Hamngatan 11",
    area: "Nordstan",
    type: "Garage m el",
    queueType: "Poängfri",
    rent: "650kr/mån",
    seekers: 4,
    publishedFrom: "2024-01-05",
    publishedTo: "2024-02-05"
  }
];

export const PublishedParkingTab = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <PublishParkingSpacesDialog />
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[250px] whitespace-nowrap">Bilplats</TableHead>
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
            {demoData.map(space => (
              <TableRow key={space.id} className="group">
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
                    <ParkingApplicationDialog parkingSpace={space} />
                    <ParkingSpaceDetail space={space} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
