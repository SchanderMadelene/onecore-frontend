import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { MoveInListEntry, MoveInListChecklist } from '../types/move-in-list-types';
import { ChecklistCell } from './ChecklistCell';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface MoveOutSectionProps {
  entries: MoveInListEntry[];
  onChecklistChange: (entryId: string, field: keyof MoveInListChecklist, value: boolean) => void;
}

export function MoveOutSection({ entries, onChecklistChange }: MoveOutSectionProps) {
  const columns = [
    {
      key: 'contractNumber',
      label: 'Kontraktsnr',
      render: (item: MoveInListEntry) => (
        <span className="font-mono text-xs">{item.contractNumber}</span>
      ),
      hideOnMobile: true,
    },
    {
      key: 'address',
      label: 'Uppgång',
      render: (item: MoveInListEntry) => (
        <span className="font-medium">{item.address}</span>
      ),
    },
    {
      key: 'type',
      label: 'Typ',
      render: (item: MoveInListEntry) => item.apartmentType,
      hideOnMobile: true,
    },
    {
      key: 'tenant',
      label: 'Hyresgäst',
      render: (item: MoveInListEntry) => item.tenantName,
    },
    {
      key: 'phone',
      label: 'Telefon',
      render: (item: MoveInListEntry) => item.tenantPhone || '–',
      hideOnMobile: true,
    },
    {
      key: 'date',
      label: 'Sista deb.datum',
      render: (item: MoveInListEntry) => format(parseISO(item.date), 'd MMM', { locale: sv }),
      hideOnMobile: true,
    },
    {
      key: 'cleaning',
      label: 'Städkontroll',
      render: (item: MoveInListEntry) => (
        <ChecklistCell
          checked={item.checklist.cleaningDone}
          onChange={(val) => onChecklistChange(item.id, 'cleaningDone', val)}
          label="Städkontroll utförd"
        />
      ),
      className: 'w-[100px] text-center',
    },
  ];

  const mobileCardRenderer = (item: MoveInListEntry) => (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-medium">{item.address}</span>
        <span className="text-xs text-muted-foreground">{item.apartmentType}</span>
      </div>
      <div className="text-sm text-muted-foreground">{item.tenantName}</div>
      {item.tenantPhone && (
        <div className="text-sm text-muted-foreground">{item.tenantPhone}</div>
      )}
      <div className="text-xs text-muted-foreground font-mono">{item.contractNumber}</div>
      <div className="text-sm text-muted-foreground">
        {format(parseISO(item.date), 'd MMM yyyy', { locale: sv })}
      </div>
      <div className="flex items-center gap-2 pt-1">
        <ChecklistCell
          checked={item.checklist.cleaningDone}
          onChange={(val) => onChecklistChange(item.id, 'cleaningDone', val)}
          label="Städkontroll utförd"
        />
        <span className="text-sm">Städkontroll</span>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Utflyttningar ({entries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveTable
          data={entries}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="Inga utflyttningar i denna period"
          mobileCardRenderer={mobileCardRenderer}
        />
      </CardContent>
    </Card>
  );
}
