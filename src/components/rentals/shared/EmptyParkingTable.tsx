
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Car } from "lucide-react";

interface EmptyParkingTableProps {
  message: string;
  columns: string[];
}

export function EmptyParkingTable({ message, columns }: EmptyParkingTableProps) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map((column, index) => (
              <TableHead 
                key={column} 
                className={`whitespace-nowrap ${index === 0 ? 'w-[250px]' : ''}`}
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center py-8 text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <Car className="h-10 w-10 text-muted-foreground/50" />
                <p>{message}</p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
