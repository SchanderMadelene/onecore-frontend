import { useState } from 'react';
import { TurnoverRow, MoveInListChecklist, CleaningStatus, WelcomeHomeMethod, ContactStatus } from '../types/move-in-list-types';
import { ArrowUpRight, ArrowDownLeft, Phone } from 'lucide-react';
import { ChecklistCell } from './ChecklistCell';
import { CleaningStatusBadge } from './CleaningStatusBadge';
import { CleaningEditDialog } from './CleaningEditDialog';
import { ContactStatusBadge } from './ContactStatusBadge';
import { ContactEditDialog } from './ContactEditDialog';
import { WelcomeHomeCell } from './WelcomeHomeCell';
import { SecurityWarningIcon } from './SecurityWarningIcon';
import { TurnoverRowActions } from './TurnoverRowActions';
import { TurnoverNoteIndicator } from './TurnoverNoteIndicator';
import { useTurnoverNotes } from '../hooks/useTurnoverNotes';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileAccordion, MobileAccordionItem } from '@/shared/ui/mobile-accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

interface CombinedTurnoverTableProps {
  entries: TurnoverRow[];
  onChecklistChange: (entryId: string, field: keyof MoveInListChecklist, value: boolean) => void;
  onCleaningStatusChange: (entryId: string, status: CleaningStatus) => void;
  onCleaningCountChange: (entryId: string, count: number) => void;
  onCleaningBookedDateChange: (entryId: string, date: string | undefined) => void;
  onWelcomeHomeChange: (entryId: string, method: WelcomeHomeMethod) => void;
  onContactStatusChange: (entryId: string, status: ContactStatus) => void;
  onContactAttemptsChange: (entryId: string, count: number) => void;
  onVisitBookedDateChange: (entryId: string, datetime: string | undefined) => void;
}

type DialogState = { type: 'cleaning'; entryId: string; tenantName: string } | { type: 'contact'; entryId: string; tenantName: string } | null;

export function CombinedTurnoverTable({ entries, onChecklistChange, onCleaningStatusChange, onCleaningCountChange, onCleaningBookedDateChange, onWelcomeHomeChange, onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange }: CombinedTurnoverTableProps) {
  const isMobile = useIsMobile();
  const { getNotesForEntry, addNote } = useTurnoverNotes();
  const [dialogState, setDialogState] = useState<DialogState>(null);

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

  // Find entry for active dialog
  const activeRow = dialogState ? entries.find(r => {
    if (dialogState.type === 'cleaning') return r.moveOut?.id === dialogState.entryId;
    return r.moveIn?.id === dialogState.entryId;
  }) : null;

  const activeEntry = dialogState?.type === 'cleaning' ? activeRow?.moveOut : activeRow?.moveIn;

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
          <div className="flex items-center gap-2">
            <TurnoverNoteIndicator notes={[...getNotesForEntry(row.moveOut?.id ?? ''), ...getNotesForEntry(row.moveIn?.id ?? '')]} />
            <TurnoverRowActions
              moveOutName={row.moveOut?.tenantName}
              moveInName={row.moveIn?.tenantName}
              moveOutId={row.moveOut?.id}
              moveInId={row.moveIn?.id}
              onAddNote={addNote}
            />
          </div>
          {/* Utflytt */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wide text-rose-600">Utflytt</h4>
            {row.moveOut ? (
              <div className="rounded-md bg-rose-50 p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{row.moveOut.tenantName}</span>
                    <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(row.moveOut.date)}</span>
                </div>
                {row.moveOut.tenantPhone && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => window.location.href = `tel:${row.moveOut.tenantPhone}`} title="Ring">
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                <div className="pt-1">
                  <CleaningStatusBadge
                    status={row.moveOut.checklist.cleaningStatus}
                    bookedDate={row.moveOut.checklist.cleaningBookedDate}
                    approvedDate={row.moveOut.checklist.cleaningApprovedDate}
                    onClick={() => setDialogState({ type: 'cleaning', entryId: row.moveOut!.id, tenantName: row.moveOut!.tenantName })}
                    showLabel
                  />
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
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{row.moveIn.tenantName}</span>
                    <SecurityWarningIcon show={row.moveIn.hasSecurityWarning} />
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(row.moveIn.date)}</span>
                </div>
                {row.moveIn.tenantPhone && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</span>
                    <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => window.location.href = `tel:${row.moveIn.tenantPhone}`} title="Ring">
                      <Phone className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                )}
                <div className="pt-1">
                  <ContactStatusBadge
                    status={row.moveIn.checklist.contactStatus}
                    attempts={row.moveIn.checklist.contactAttempts}
                    visitBookedDate={row.moveIn.checklist.visitBookedDate}
                    onClick={() => setDialogState({ type: 'contact', entryId: row.moveIn!.id, tenantName: row.moveIn!.tenantName })}
                    showLabel
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <ChecklistCell
                    checked={row.moveIn!.checklist.nameAndIntercomDone}
                    onChange={(v) => onChecklistChange(row.moveIn!.id, 'nameAndIntercomDone', v)}
                    label="Namn/Port"
                  />
                  <span className="text-xs">Namn/Port</span>
                </div>
                <div className="pt-1">
                  <WelcomeHomeCell
                    value={row.moveIn!.checklist.welcomeHomeMethod}
                    onChange={(m) => onWelcomeHomeChange(row.moveIn!.id, m)}
                    showLabel
                  />
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
      <>
        <Card>
          <CardHeader>
            <CardTitle>Ut- & inflytt ({entries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <MobileAccordion items={items} />
          </CardContent>
        </Card>
        {dialogState?.type === 'cleaning' && activeEntry && (
          <CleaningEditDialog
            open
            onOpenChange={(o) => !o && setDialogState(null)}
            tenantName={dialogState.tenantName}
            status={activeEntry.checklist.cleaningStatus}
            bookedDate={activeEntry.checklist.cleaningBookedDate}
            approvedDate={activeEntry.checklist.cleaningApprovedDate}
            onStatusChange={(s) => onCleaningStatusChange(dialogState.entryId, s)}
            onBookedDateChange={(d) => onCleaningBookedDateChange(dialogState.entryId, d)}
          />
        )}
        {dialogState?.type === 'contact' && activeEntry && (
          <ContactEditDialog
            open
            onOpenChange={(o) => !o && setDialogState(null)}
            tenantName={dialogState.tenantName}
            status={activeEntry.checklist.contactStatus}
            attempts={activeEntry.checklist.contactAttempts}
            visitBookedDate={activeEntry.checklist.visitBookedDate}
            onStatusChange={(s) => onContactStatusChange(dialogState.entryId, s)}
            onAttemptsChange={(c) => onContactAttemptsChange(dialogState.entryId, c)}
            onVisitBookedDateChange={(d) => onVisitBookedDateChange(dialogState.entryId, d)}
          />
        )}
      </>
    );
  }

  // Desktop table
  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border-0 overflow-x-auto">
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
                  <TableHead>Kontakt</TableHead>
                  <TableHead className="text-center">Namn/Port</TableHead>
                  <TableHead className="text-center">Välkommen hem</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map(row => (
                  <TableRow key={row.residenceKey}>
                    <TableCell className="font-medium text-sm whitespace-nowrap">{row.address}</TableCell>
                    <TableCell className="text-sm">{row.apartmentType}</TableCell>
                    <TableCell className="border-l-2 border-border">
                      {row.moveOut ? (
                        <div className="py-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{row.moveOut.tenantName}</span>
                            <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                            <TurnoverNoteIndicator notes={getNotesForEntry(row.moveOut.id)} />
                          </div>
                          {row.moveOut.tenantPhone && (
                            <div className="flex items-center gap-1 mt-1.5">
                              <span className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => window.location.href = `tel:${row.moveOut.tenantPhone}`} title="Ring">
                                <Phone className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : <span className="text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {formatDate(row.moveOut?.date)}
                    </TableCell>
                    <TableCell>
                      {row.moveOut ? (
                        <CleaningStatusBadge
                          status={row.moveOut.checklist.cleaningStatus}
                          bookedDate={row.moveOut.checklist.cleaningBookedDate}
                          approvedDate={row.moveOut.checklist.cleaningApprovedDate}
                          onClick={() => setDialogState({ type: 'cleaning', entryId: row.moveOut!.id, tenantName: row.moveOut!.tenantName })}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="border-l-2 border-border">
                      {row.moveIn ? (
                        <div className="py-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm">{row.moveIn.tenantName}</span>
                            <SecurityWarningIcon show={row.moveIn.hasSecurityWarning} />
                            <TurnoverNoteIndicator notes={getNotesForEntry(row.moveIn.id)} />
                          </div>
                          {row.moveIn.tenantPhone && (
                            <div className="flex items-center gap-1 mt-1.5">
                              <span className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</span>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => window.location.href = `tel:${row.moveIn.tenantPhone}`} title="Ring">
                                <Phone className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : <span className="text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {formatDate(row.moveIn?.date)}
                    </TableCell>
                    <TableCell>
                      {row.moveIn ? (
                        <ContactStatusBadge
                          status={row.moveIn.checklist.contactStatus}
                          attempts={row.moveIn.checklist.contactAttempts}
                          visitBookedDate={row.moveIn.checklist.visitBookedDate}
                          onClick={() => setDialogState({ type: 'contact', entryId: row.moveIn!.id, tenantName: row.moveIn!.tenantName })}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell>
                      {row.moveIn ? (
                        <ChecklistCell
                          checked={row.moveIn.checklist.nameAndIntercomDone}
                          onChange={(v) => onChecklistChange(row.moveIn!.id, 'nameAndIntercomDone', v)}
                          label="Namn/Port"
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell>
                      {row.moveIn ? (
                        <WelcomeHomeCell
                          value={row.moveIn.checklist.welcomeHomeMethod}
                          onChange={(m) => onWelcomeHomeChange(row.moveIn!.id, m)}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell>
                      <TurnoverRowActions
                        moveOutName={row.moveOut?.tenantName}
                        moveInName={row.moveIn?.tenantName}
                        moveOutId={row.moveOut?.id}
                        moveInId={row.moveIn?.id}
                        onAddNote={addNote}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {dialogState?.type === 'cleaning' && activeEntry && (
        <CleaningEditDialog
          open
          onOpenChange={(o) => !o && setDialogState(null)}
          tenantName={dialogState.tenantName}
          status={activeEntry.checklist.cleaningStatus}
          bookedDate={activeEntry.checklist.cleaningBookedDate}
          approvedDate={activeEntry.checklist.cleaningApprovedDate}
          onStatusChange={(s) => onCleaningStatusChange(dialogState.entryId, s)}
          onBookedDateChange={(d) => onCleaningBookedDateChange(dialogState.entryId, d)}
        />
      )}
      {dialogState?.type === 'contact' && activeEntry && (
        <ContactEditDialog
          open
          onOpenChange={(o) => !o && setDialogState(null)}
          tenantName={dialogState.tenantName}
          status={activeEntry.checklist.contactStatus}
          attempts={activeEntry.checklist.contactAttempts}
          visitBookedDate={activeEntry.checklist.visitBookedDate}
          onStatusChange={(s) => onContactStatusChange(dialogState.entryId, s)}
          onAttemptsChange={(c) => onContactAttemptsChange(dialogState.entryId, c)}
          onVisitBookedDateChange={(d) => onVisitBookedDateChange(dialogState.entryId, d)}
        />
      )}
    </>
  );
}
