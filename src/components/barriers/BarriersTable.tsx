import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Barrier } from "@/data/barriers";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface BarriersTableProps {
  barriers: Barrier[];
}

const getStatusBadge = (status: Barrier['status']) => {
  switch (status) {
    case 'active':
      return <Badge variant="destructive">Aktiv</Badge>;
    case 'inactive':
      return <Badge variant="secondary">Inaktiv</Badge>;
    case 'expired':
      return <Badge variant="outline">Utgången</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('sv-SE');
};

export function BarriersTable({ barriers }: BarriersTableProps) {
  if (barriers.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Inga spärrar hittades
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Objekt</TableHead>
              <TableHead>Adress</TableHead>
              <TableHead>Orsak</TableHead>
              <TableHead>Startdatum</TableHead>
              <TableHead>Slutdatum</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Skapad av</TableHead>
              <TableHead className="w-24">Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {barriers.map((barrier) => (
              <TableRow key={barrier.id}>
                <TableCell className="font-medium">{barrier.object}</TableCell>
                <TableCell>{barrier.address}</TableCell>
                <TableCell>{barrier.reason}</TableCell>
                <TableCell>{formatDate(barrier.startDate)}</TableCell>
                <TableCell>
                  {barrier.endDate ? formatDate(barrier.endDate) : '-'}
                </TableCell>
                <TableCell>{getStatusBadge(barrier.status)}</TableCell>
                <TableCell>{barrier.createdBy}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" disabled={barrier.status === 'active'}>
                      <Trash2 className="h-4 w-4" />
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