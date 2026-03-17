import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveTable } from '@/shared/ui/responsive-table';
import type { Barrier } from '../types/barrier';

interface RenovationBarrier extends Barrier {
  daysSinceStart: number;
}

interface Props {
  renovations: RenovationBarrier[];
}

export function RenovationTrackingTable({ renovations }: Props) {
  const columns = [
    { key: "object", label: "Objekt", render: (r: RenovationBarrier) => <span className="font-medium">{r.object}</span> },
    { key: "address", label: "Adress", render: (r: RenovationBarrier) => r.address, hideOnMobile: true },
    { 
      key: "type", 
      label: "Typ", 
      render: (r: RenovationBarrier) => (
        <Badge variant="outline" className="text-xs">
          {r.reasonCategory === 'renovation_before' ? 'Innan inflytt' : 'Efter inflytt'}
        </Badge>
      )
    },
    { key: "startDate", label: "Startdatum", render: (r: RenovationBarrier) => r.startDate },
    { key: "daysSinceStart", label: "Dagar sedan start", className: "text-right", render: (r: RenovationBarrier) => <span className="font-medium">{r.daysSinceStart}</span> },
  ];

  const mobileCardRenderer = (r: RenovationBarrier) => (
    <div>
      <div className="font-medium">{r.object}</div>
      <div className="text-sm text-muted-foreground">{r.address}</div>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="outline" className="text-xs">
          {r.reasonCategory === 'renovation_before' ? 'Innan inflytt' : 'Efter inflytt'}
        </Badge>
        <span className="text-sm text-muted-foreground">{r.daysSinceStart} dagar</span>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Renoveringar – uppföljning</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ResponsiveTable
          data={renovations}
          columns={columns}
          keyExtractor={(r) => r.id}
          emptyMessage="Inga aktiva renoveringar hittades."
          mobileCardRenderer={mobileCardRenderer}
        />
      </CardContent>
    </Card>
  );
}
