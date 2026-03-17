import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveTable } from '@/shared/ui/responsive-table';
import type { Barrier } from '../types/barrier';

interface TransitionBarrier extends Barrier {
  leadTimeDays?: number;
}

interface Props {
  transitions: TransitionBarrier[];
}

export function VluFluTransitionsTable({ transitions }: Props) {
  const columns = [
    { key: "object", label: "Objekt", render: (t: TransitionBarrier) => <span className="font-medium">{t.object}</span> },
    { key: "address", label: "Adress", render: (t: TransitionBarrier) => t.address, hideOnMobile: true },
    { key: "startDate", label: "Startdatum", render: (t: TransitionBarrier) => t.startDate },
    { key: "endDate", label: "Slutdatum", render: (t: TransitionBarrier) => t.endDate || '–' },
    { key: "leadTimeDays", label: "Ledtid (dagar)", className: "text-right", render: (t: TransitionBarrier) => t.leadTimeDays ?? '–' },
  ];

  const mobileCardRenderer = (t: TransitionBarrier) => (
    <div>
      <div className="font-medium">{t.object}</div>
      <div className="text-sm text-muted-foreground">{t.address}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Start:</span>
        <span className="text-sm">{t.startDate}</span>
        <span className="text-sm text-muted-foreground">Slut:</span>
        <span className="text-sm">{t.endDate || '–'}</span>
        <span className="text-sm text-muted-foreground">Ledtid:</span>
        <span className="text-sm">{t.leadTimeDays ?? '–'} dagar</span>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">VLU till FLU-övergångar</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveTable
          data={transitions}
          columns={columns}
          keyExtractor={(t) => t.id}
          emptyMessage="Inga genomförda VLU-övergångar hittades."
          mobileCardRenderer={mobileCardRenderer}
        />
      </CardContent>
    </Card>
  );
}
