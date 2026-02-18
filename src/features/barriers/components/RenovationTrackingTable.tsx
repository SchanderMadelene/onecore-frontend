import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { BARRIER_REASON_CATEGORY_LABELS, type BarrierReasonCategory } from '@/entities/barrier/types';
import type { Barrier } from '../types/barrier';

interface RenovationBarrier extends Barrier {
  daysSinceStart: number;
}

interface Props {
  renovations: RenovationBarrier[];
}

export function RenovationTrackingTable({ renovations }: Props) {
  if (renovations.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Renoveringar – uppföljning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Inga aktiva renoveringar hittades.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Renoveringar – uppföljning</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Objekt</TableHead>
              <TableHead className="hidden sm:table-cell">Adress</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Startdatum</TableHead>
              <TableHead className="text-right">Dagar sedan start</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {renovations.map(r => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.object}</TableCell>
                <TableCell className="hidden sm:table-cell">{r.address}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs">
                    {r.reasonCategory === 'renovation_before' ? 'Innan inflytt' : 'Efter inflytt'}
                  </Badge>
                </TableCell>
                <TableCell>{r.startDate}</TableCell>
                <TableCell className="text-right font-medium">{r.daysSinceStart}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
