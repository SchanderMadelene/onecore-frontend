
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car, Loader2 } from "lucide-react";
import { ParkingSpaceDetail } from "../ParkingSpaceDetail";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { DeleteListingDialog } from "../DeleteListingDialog";
import { useParkingSpaceListingsByType } from "@/hooks/useParkingSpaceListingsByType";

export const ReadyForOfferTab = () => {
  const { data: readyForOfferSpaces, isLoading, error } = useParkingSpaceListingsByType('ready-for-offer');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar bilplatser klara för erbjudande...</span>
      </div>
    );
  }

  if (error || !readyForOfferSpaces || readyForOfferSpaces.length === 0) {
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
          {readyForOfferSpaces.map(space => (
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
