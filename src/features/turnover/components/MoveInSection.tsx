import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveTable } from '@/components/ui/responsive-table';
import { MoveInListEntry, MoveInListChecklist, ContactStatus } from '../types/move-in-list-types';
import { ChecklistCell } from './ChecklistCell';
import { ContactStatusCell } from './ContactStatusCell';
import { SecurityWarningIcon } from './SecurityWarningIcon';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface MoveInSectionProps {
  entries: MoveInListEntry[];
  onChecklistChange: (entryId: string, field: keyof MoveInListChecklist, value: boolean) => void;
  onContactStatusChange: (entryId: string, status: ContactStatus) => void;
  onContactAttemptsChange: (entryId: string, count: number) => void;
  onVisitBookedDateChange: (entryId: string, datetime: string | undefined) => void;
}

export function MoveInSection({ entries, onChecklistChange, onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange }: MoveInSectionProps) {
  const columns = [
    {
      key: 'contractNumber',
      label: 'Kontraktsnr',
      render: (item: MoveInListEntry) => (
        <span className="text-sm">{item.contractNumber}</span>
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
      render: (item: MoveInListEntry) => (
        <div className="flex items-center gap-1.5">
          <span>{item.tenantName}</span>
          <SecurityWarningIcon show={item.hasSecurityWarning} />
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Telefon',
      render: (item: MoveInListEntry) => item.tenantPhone || '–',
      hideOnMobile: true,
    },
    {
      key: 'date',
      label: 'Kontraktstid',
      render: (item: MoveInListEntry) => format(parseISO(item.date), 'd MMM', { locale: sv }),
      hideOnMobile: true,
    },
    {
      key: 'contact',
      label: 'Kontakt',
      render: (item: MoveInListEntry) => (
        <ContactStatusCell
          status={item.checklist.contactStatus}
          attempts={item.checklist.contactAttempts}
          visitBookedDate={item.checklist.visitBookedDate}
          onStatusChange={(s) => onContactStatusChange(item.id, s)}
          onAttemptsChange={(c) => onContactAttemptsChange(item.id, c)}
          onVisitBookedDateChange={(d) => onVisitBookedDateChange(item.id, d)}
        />
      ),
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
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="font-medium">{item.address}</span>
        <span className="text-xs text-muted-foreground">{item.apartmentType}</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <span>{item.tenantName}</span>
        <SecurityWarningIcon show={item.hasSecurityWarning} />
      </div>
      {item.tenantPhone && (
        <div className="text-sm text-muted-foreground">{item.tenantPhone}</div>
      )}
      <div className="text-sm text-muted-foreground">{item.contractNumber}</div>
      <div className="text-sm text-muted-foreground">
        {format(parseISO(item.date), 'd MMM yyyy', { locale: sv })}
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <ContactStatusCell
          status={item.checklist.contactStatus}
          attempts={item.checklist.contactAttempts}
          visitBookedDate={item.checklist.visitBookedDate}
          onStatusChange={(s) => onContactStatusChange(item.id, s)}
          onAttemptsChange={(c) => onContactAttemptsChange(item.id, c)}
          onVisitBookedDateChange={(d) => onVisitBookedDateChange(item.id, d)}
          showLabel
        />
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
