
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car } from "lucide-react";
import { ParkingSpaceDetail } from "../ParkingSpaceDetail";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { DeleteListingDialog } from "../DeleteListingDialog";
import type { ParkingSpace } from "../types/parking";

// Utökad typ för erbjudna bilplatser med sista svarsdatum
interface OfferedParkingSpace extends ParkingSpace {
  lastResponseDate: string;
}

// Mock data för demonstration
const offeredData: OfferedParkingSpace[] = [
  {
    id: "P-003",
    address: "Vasagatan 22",
    area: "Vasastaden",
    type: "Garage m el",
    queueType: "Kronologisk",
    rent: "595 kr/mån",
    seekers: 5,
    publishedFrom: "2024-01-10",
    publishedTo: "2024-02-10",
    lastResponseDate: "2024-02-25"
  },
  {
    id: "P-004",
    address: "Högloftsvägen 8",
    area: "Gryta",
    type: "Utomhusplats",
    queueType: "Poängfri",
    rent: "350 kr/mån",
    seekers: 2,
    publishedFrom: "2024-01-25",
    publishedTo: "2024-02-25",
    lastResponseDate: "2024-02-28"
  }
];

export const OfferedTab = () => {
  if (offeredData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>Inga erbjudna bilplatser</p>
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
            <TableHead className="whitespace-nowrap">Sista svarsdatum</TableHead>
            <TableHead className="text-right whitespace-nowrap">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offeredData.map(space => (
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
              <TableCell>{space.lastResponseDate}</TableCell>
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
