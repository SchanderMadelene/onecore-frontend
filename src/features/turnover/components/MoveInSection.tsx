import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { MoveInListEntry, MoveInListChecklist } from '../types/move-in-list-types';
import { ChecklistCell } from './ChecklistCell';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface MoveInSectionProps {
  entries: MoveInListEntry[];
  onChecklistChange: (entryId: string, field: keyof MoveInListChecklist, value: boolean) => void;
}

export function MoveInSection({ entries, onChecklistChange }: MoveInSectionProps) {
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
      label: 'Inflyttdatum',
      render: (item: MoveInListEntry) => format(parseISO(item.date), 'd MMM', { locale: sv }),
      hideOnMobile: true,
    },
    {
      key: 'welcomeCall',
      label: 'Samtal',
      render: (item: MoveInListEntry) => (
        <ChecklistCell
          checked={item.checklist.welcomeCallDone}
          onChange={(val) => onChecklistChange(item.id, 'welcomeCallDone', val)}
          label="Välkomstsamtal"
        />
      ),
      className: 'w-[80px] text-center',
    },
    {
      key: 'welcomeVisit',
      label: 'Besök',
      render: (item: MoveInListEntry) => (
        <ChecklistCell
          checked={item.checklist.welcomeVisitDone}
          onChange={(val) => onChecklistChange(item.id, 'welcomeVisitDone', val)}
          label="Välkomstbesök"
        />
      ),
      className: 'w-[80px] text-center',
    },
    {
      key: 'nameIntercom',
      label: 'Namn/Port',
      render: (item: MoveInListEntry) => (
        <ChecklistCell
          checked={item.checklist.nameAndIntercomDone}
          onChange={(val) => onChecklistChange(item.id, 'nameAndIntercomDone', val)}
          label="Namn och porttelefon"
        />
      ),
      className: 'w-[80px] text-center',
    },
  ];

  const mobileCardRenderer = (item: MoveInListEntry) => (
    <div className="space-y-2">
      <div className="font-medium">{item.address}</div>
      <div className="text-sm text-muted-foreground">{item.tenantName}</div>
      <div className="text-sm text-muted-foreground">
        {format(parseISO(item.date), 'd MMM yyyy', { locale: sv })}
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center gap-2">
          <ChecklistCell
            checked={item.checklist.welcomeCallDone}
            onChange={(val) => onChecklistChange(item.id, 'welcomeCallDone', val)}
            label="Välkomstsamtal"
          />
          <span className="text-sm">Välkomstsamtal</span>
        </div>
        <div className="flex items-center gap-2">
          <ChecklistCell
            checked={item.checklist.welcomeVisitDone}
            onChange={(val) => onChecklistChange(item.id, 'welcomeVisitDone', val)}
            label="Välkomstbesök"
          />
          <span className="text-sm">Välkomstbesök</span>
        </div>
        <div className="flex items-center gap-2">
          <ChecklistCell
            checked={item.checklist.nameAndIntercomDone}
            onChange={(val) => onChecklistChange(item.id, 'nameAndIntercomDone', val)}
            label="Namn och porttelefon"
          />
          <span className="text-sm">Namn/porttelefon</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Inflyttningar ({entries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveTable
          data={entries}
          columns={columns}
          keyExtractor={(item) => item.id}
          emptyMessage="Inga inflyttningar i denna period"
          mobileCardRenderer={mobileCardRenderer}
        />
      </CardContent>
    </Card>
  );
}
