
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { ParkingSpaceForPublishing } from "@/hooks/useParkingSpaceListings";
import { QueueTypeCheckboxes } from "./QueueTypeCheckboxes";

interface ParkingSpacesTableProps {
  parkingSpaces: ParkingSpaceForPublishing[];
  selectedCount: number;
  isLoading: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectSpace: (index: number, checked: boolean) => void;
  onQueueTypeChange: (index: number, queueType: 'intern' | 'external' | 'poangfri', checked: boolean) => void;
}

export const ParkingSpacesTable = ({
  parkingSpaces,
  selectedCount,
  isLoading,
  onSelectAll,
  onSelectSpace,
  onQueueTypeChange
}: ParkingSpacesTableProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar bilplatser...</span>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox 
                checked={selectedCount === parkingSpaces.length && selectedCount > 0}
                onCheckedChange={onSelectAll}
              />
            </TableHead>
            <TableHead>Bilplats</TableHead>
            <TableHead>Område</TableHead>
            <TableHead>Distrikt</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Hyra inkl.</TableHead>
            <TableHead>Hyra exkl.</TableHead>
            <TableHead className="text-center">Publiceringar</TableHead>
            <TableHead>Kötyp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parkingSpaces.map((space, index) => (
            <TableRow key={space.id}>
              <TableCell>
                <Checkbox 
                  checked={space.selected}
                  onCheckedChange={(checked) => onSelectSpace(index, !!checked)}
                />
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{space.address}</div>
                  <div className="text-sm text-muted-foreground">{space.id}</div>
                </div>
              </TableCell>
              <TableCell>{space.area}</TableCell>
              <TableCell>{space.district}</TableCell>
              <TableCell>{space.type}</TableCell>
              <TableCell>{space.rentIncl}</TableCell>
              <TableCell>{space.rentExcl}</TableCell>
              <TableCell className="text-center">{space.publications}</TableCell>
              <TableCell>
                <QueueTypeCheckboxes 
                  space={space}
                  index={index}
                  onQueueTypeChange={onQueueTypeChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
