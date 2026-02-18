import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Barrier } from '../types/barrier';

interface TransitionBarrier extends Barrier {
  leadTimeDays?: number;
}

interface Props {
  transitions: TransitionBarrier[];
}

export function VluFluTransitionsTable({ transitions }: Props) {
  if (transitions.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">VLU till FLU-övergångar</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Inga genomförda VLU-övergångar hittades.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">VLU till FLU-övergångar</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Objekt</TableHead>
              <TableHead className="hidden sm:table-cell">Adress</TableHead>
              <TableHead>Startdatum</TableHead>
              <TableHead>Slutdatum</TableHead>
              <TableHead className="text-right">Ledtid (dagar)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transitions.map(t => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.object}</TableCell>
                <TableCell className="hidden sm:table-cell">{t.address}</TableCell>
                <TableCell>{t.startDate}</TableCell>
                <TableCell>{t.endDate || '–'}</TableCell>
                <TableCell className="text-right">{t.leadTimeDays ?? '–'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
