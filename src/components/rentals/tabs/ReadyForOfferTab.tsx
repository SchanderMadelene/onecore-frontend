
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car } from "lucide-react";
import { ParkingSpaceDetail } from "../ParkingSpaceDetail";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { DeleteListingDialog } from "../DeleteListingDialog";
import type { ParkingSpace } from "../types/parking";

// Mock data för demonstration - i verkligheten skulle detta komma från API
const readyForOfferData: ParkingSpace[] = [
  {
    id: "P-001",
    address: "Stenhamravägen 12",
    area: "Centrum",
    type: "Garage m el",
    queueType: "Kronologisk",
    rent: "650 kr/mån",
    seekers: 8,
    publishedFrom: "2024-01-15",
    publishedTo: "2024-02-15"
  },
  {
    id: "P-002", 
    address: "Karlsgatan 5",
    area: "Malmaberg",
    type: "Carport",
    queueType: "Poängfri",
    rent: "450 kr/mån",
    seekers: 3,
    publishedFrom: "2024-01-20",
    publishedTo: "2024-02-20"
  }
];

export const ReadyForOfferTab = () => {
  if (readyForOfferData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>Inga bilplatser klara för erbjudande</p>
        </div>
      </div>
    );
  }

  return (
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
          {readyForOfferData.map(space => (
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
                  <DeleteListingDialog parkingSpace={space} />
                  <ParkingApplicationDialog parkingSpace={space} />
                  <ParkingSpaceDetail space={space} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
