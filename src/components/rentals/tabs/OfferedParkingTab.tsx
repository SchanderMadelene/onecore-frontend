
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const offeredData = [
  {
    id: "123-123-123-0301",
    address: "Storgatan 12",
    area: "Centrum",
    type: "Garage m el",
    queueType: "Poängfri",
    rent: "520kr/mån",
    seekers: 2,
    publishedTo: "2024-01-20",
    publishedFrom: "2024-01-05",
    lastAnswerDate: "2024-01-25"
  },
  {
    id: "123-123-123-0302",
    address: "Lundagatan 8",
    area: "Lundby",
    type: "Carport",
    queueType: "Poängfri",
    rent: "420kr/mån",
    seekers: 1,
    publishedTo: "2024-01-18",
    publishedFrom: "2024-01-03",
    lastAnswerDate: "2024-01-23"
  }
];

export function OfferedParkingTab() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-start gap-4">
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
              <TableHead className="whitespace-nowrap">Publicerad t.o.m</TableHead>
              <TableHead className="whitespace-nowrap">Ledig fr.o.m</TableHead>
              <TableHead className="whitespace-nowrap">Sista svarsdatum</TableHead>
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
                <TableCell>{space.lastAnswerDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
