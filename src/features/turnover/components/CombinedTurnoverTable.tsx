import { TurnoverRow, MoveInListChecklist } from '../types/move-in-list-types';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { ChecklistCell } from './ChecklistCell';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileAccordion, MobileAccordionItem } from '@/shared/ui/mobile-accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface CombinedTurnoverTableProps {
  entries: TurnoverRow[];
  onChecklistChange: (entryId: string, field: keyof MoveInListChecklist, value: boolean) => void;
}

export function CombinedTurnoverTable({ entries, onChecklistChange }: CombinedTurnoverTableProps) {
  const isMobile = useIsMobile();

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Inga poster hittades för valt datumintervall
      </div>
    );
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '–';
    return format(parseISO(dateStr), 'd MMM', { locale: sv });
  };

  if (isMobile) {
    const items: MobileAccordionItem[] = entries.map(row => ({
      id: row.residenceKey,
      title: (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{row.address}</span>
          <span className="text-xs text-muted-foreground">{row.apartmentType} · {row.residenceCode}</span>
        </div>
      ),
      content: (
        <div className="space-y-4">
          {/* Utflytt */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-600">Utflytt</h4>
            {row.moveOut ? (
              <div className="rounded-md bg-rose-50 p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{row.moveOut.tenantName}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(row.moveOut.date)}</span>
                </div>
                {row.moveOut.tenantPhone && (
                  <a href={`tel:${row.moveOut.tenantPhone}`} className="text-xs text-primary underline">
                    {row.moveOut.tenantPhone}
                  </a>
                )}
                <div className="flex items-center gap-2 pt-1">
                  <ChecklistCell
                    checked={row.moveOut.checklist.cleaningDone}
                    onChange={(v) => onChecklistChange(row.moveOut!.id, 'cleaningDone', v)}
                    label="Städkontroll"
                  />
                  <span className="text-xs">Städkontroll</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">Ingen utflytt</p>
            )}
          </div>

          {/* Inflytt */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-emerald-600">Inflytt</h4>
            {row.moveIn ? (
              <div className="rounded-md bg-emerald-50 p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{row.moveIn.tenantName}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(row.moveIn.date)}</span>
                </div>
                {row.moveIn.tenantPhone && (
                  <a href={`tel:${row.moveIn.tenantPhone}`} className="text-xs text-primary underline">
                    {row.moveIn.tenantPhone}
                  </a>
                )}
                <div className="space-y-1 pt-1">
                  {([
                    ['welcomeCallDone', 'Samtal'],
                    ['welcomeVisitDone', 'Besök'],
                    ['nameAndIntercomDone', 'Namn/Port'],
                  ] as const).map(([field, label]) => (
                    <div key={field} className="flex items-center gap-2">
                      <ChecklistCell
                        checked={row.moveIn!.checklist[field]}
                        onChange={(v) => onChecklistChange(row.moveIn!.id, field, v)}
                        label={label}
                      />
                      <span className="text-xs">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">Ingen inflytt</p>
            )}
          </div>
        </div>
      ),
    }));

    return (
      <Card>
        <CardHeader>
          <CardTitle>Ut- & inflytt ({entries.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <MobileAccordion items={items} />
        </CardContent>
      </Card>
    );
  }

  // Desktop table
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ut- & inflytt ({entries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Uppgång</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead className="border-l-2 border-border">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-muted">
                      <ArrowUpRight className="h-3.5 w-3.5 text-foreground" />
                    </span>
                    Hyresgäst
                  </div>
                </TableHead>
                <TableHead>Sista deb.</TableHead>
                <TableHead className="text-center">Städkontr.</TableHead>
                <TableHead className="border-l-2 border-border">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-muted">
                      <ArrowDownLeft className="h-3.5 w-3.5 text-foreground" />
                    </span>
                    Hyresgäst
                  </div>
                </TableHead>
                <TableHead>Kontrakt</TableHead>
                <TableHead className="text-center">Samtal</TableHead>
                <TableHead className="text-center">Besök</TableHead>
                <TableHead className="text-center">Namn/Port</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(row => (
                <TableRow key={row.residenceKey}>
                  <TableCell className="font-medium text-sm whitespace-nowrap">{row.address}</TableCell>
                  <TableCell className="text-sm">{row.apartmentType}</TableCell>
                  {/* Move-out columns */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveOut ? (
                      <div>
                        <span className="text-sm">{row.moveOut.tenantName}</span>
                        {row.moveOut.tenantPhone && (
                          <div className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</div>
                        )}
                      </div>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(row.moveOut?.date)}
                  </TableCell>
                  <TableCell>
                    {row.moveOut ? (
                      <ChecklistCell
                        checked={row.moveOut.checklist.cleaningDone}
                        onChange={(v) => onChecklistChange(row.moveOut!.id, 'cleaningDone', v)}
                        label="Städkontroll"
                      />
                    ) : <span className="text-center block text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Move-in columns */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveIn ? (
                      <div>
                        <span className="text-sm">{row.moveIn.tenantName}</span>
                        {row.moveIn.tenantPhone && (
                          <div className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</div>
                        )}
                      </div>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {formatDate(row.moveIn?.date)}
                  </TableCell>
                  {(['welcomeCallDone', 'welcomeVisitDone', 'nameAndIntercomDone'] as const).map(field => (
                    <TableCell key={field}>
                      {row.moveIn ? (
                        <ChecklistCell
                          checked={row.moveIn.checklist[field]}
                          onChange={(v) => onChecklistChange(row.moveIn!.id, field, v)}
                          label={field}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}