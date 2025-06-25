
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Home, Eye } from "lucide-react";
import { EditHousingDialog } from "./EditHousingDialog";
import { unpublishedHousingSpaces } from "@/data/unpublished-housing";

const getStatusColor = (status: string) => {
  switch (status) {
    case "draft":
      return "bg-gray-100 text-gray-800";
    case "needs_review":
      return "bg-yellow-100 text-yellow-800";
    case "ready_to_publish":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "draft":
      return "Utkast";
    case "needs_review":
      return "Behöver granskning";
    case "ready_to_publish":
      return "Redo att publicera";
    default:
      return status;
  }
};

export function UnpublishedHousingTable() {
  if (unpublishedHousingSpaces.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <Home className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>Inga opublicerade bostäder</p>
        </div>
      </div>
    );
  }

  return (
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
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Senast ändrad</TableHead>
            <TableHead className="whitespace-nowrap">Skapad av</TableHead>
            <TableHead className="text-right whitespace-nowrap">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unpublishedHousingSpaces.map(space => (
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
                <Badge className={getStatusColor(space.status)}>
                  {getStatusText(space.status)}
                </Badge>
              </TableCell>
              <TableCell>{space.lastModified}</TableCell>
              <TableCell>{space.createdBy}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>Förhandsgranska</span>
                  </Button>
                  <EditHousingDialog housingSpace={space} />
                  <Button variant="destructive" size="sm" className="flex items-center gap-1">
                    <Trash2 className="h-4 w-4" />
                    <span>Ta bort</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
