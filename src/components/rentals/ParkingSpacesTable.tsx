
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

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
  // Add more demo data here...
];

export function ParkingSpacesTable() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button variant="default" className="bg-primary">Publicerade</Button>
          <Button variant="ghost">Klara för erbjudande</Button>
          <Button variant="ghost">Erbjudna</Button>
          <Button variant="ghost">Historik</Button>
          <Button variant="ghost">Behov av publicering</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Publicera bilplatser från Xpand</Button>
          <input
            type="text"
            placeholder="Sök"
            className="px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bilplats</TableHead>
              <TableHead>Område</TableHead>
              <TableHead>Bilplatstyp</TableHead>
              <TableHead>Kötyp</TableHead>
              <TableHead>Hyra</TableHead>
              <TableHead>Sökande</TableHead>
              <TableHead>Publicerad T.O.M</TableHead>
              <TableHead>Publicerad Fr.O.M</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoData.map((space) => (
              <TableRow key={space.id}>
                <TableCell className="font-medium">
                  {space.address}
                  <br />
                  <span className="text-sm text-muted-foreground">{space.id}</span>
                </TableCell>
                <TableCell>{space.area}</TableCell>
                <TableCell>{space.type}</TableCell>
                <TableCell>{space.queueType}</TableCell>
                <TableCell>{space.rent}</TableCell>
                <TableCell>{space.seekers}</TableCell>
                <TableCell>{space.publishedTo}</TableCell>
                <TableCell>{space.publishedFrom}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="destructive" size="sm">Ta bort annons</Button>
                    <Button size="sm">Ny anmälan</Button>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
