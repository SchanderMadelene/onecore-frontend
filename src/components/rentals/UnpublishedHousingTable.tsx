
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2 } from "lucide-react";
import { unpublishedHousingSpaces } from "@/data/unpublished-housing";
import { EditHousingDialog } from "./EditHousingDialog";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";

const getStatusBadge = (status: UnpublishedHousingSpace["status"]) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Utkast</Badge>;
    case "needs_review":
      return <Badge variant="outline">Behöver granskning</Badge>;
    case "ready_to_publish":
      return <Badge variant="default">Redo att publicera</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function UnpublishedHousingTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adress</TableHead>
            <TableHead>Område</TableHead>
            <TableHead>Rum</TableHead>
            <TableHead>Yta</TableHead>
            <TableHead>Hyra</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Senast ändrad</TableHead>
            <TableHead>Skapad av</TableHead>
            <TableHead className="text-right">Åtgärder</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unpublishedHousingSpaces.map((space) => (
            <TableRow key={space.id}>
              <TableCell className="font-medium">{space.address}</TableCell>
              <TableCell>{space.area}</TableCell>
              <TableCell>{space.rooms}</TableCell>
              <TableCell>{space.size}</TableCell>
              <TableCell>{space.rent}</TableCell>
              <TableCell>{getStatusBadge(space.status)}</TableCell>
              <TableCell>{space.lastModified}</TableCell>
              <TableCell>{space.createdBy}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <EditHousingDialog housingSpace={space} />
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
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
