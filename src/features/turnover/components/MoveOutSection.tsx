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
      key: 'address',
      label: 'Adress',
      render: (item: MoveInListEntry) => (
        <span className="font-medium">{item.address}</span>
      ),
    },
    {
      key: 'tenant',
      label: 'Hyresgäst',
      render: (item: MoveInListEntry) => item.tenantName,
    },
    {
      key: 'date',
      label: 'Utflyttdatum',
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
    <div className="space-y-2">
      <div className="font-medium">{item.address}</div>
      <div className="text-sm text-muted-foreground">{item.tenantName}</div>
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
