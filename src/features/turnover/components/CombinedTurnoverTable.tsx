import { TurnoverRow, MoveInListChecklist, CleaningStatus, WelcomeHomeMethod, ContactStatus } from '../types/move-in-list-types';
import { ArrowUpRight, ArrowDownLeft, Phone, Check, Key } from 'lucide-react';
import { CleaningStatusBadge } from './CleaningStatusBadge';
import { ContactStatusBadge } from './ContactStatusBadge';
import { SecurityWarningIcon } from './SecurityWarningIcon';
import { TurnoverRowActions } from './TurnoverRowActions';
import { TurnoverNoteIndicator } from './TurnoverNoteIndicator';
import { useTurnoverNotes } from '../hooks/useTurnoverNotes';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileAccordion, MobileAccordionItem } from '@/shared/ui/mobile-accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';

const WELCOME_LABELS: Record<WelcomeHomeMethod, string> = {
  none: '–',
  digital: 'Digital',
  manual: 'Manuell',
};

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

export function CombinedTurnoverTable({ entries, onChecklistChange, onCleaningStatusChange, onCleaningCountChange, onCleaningBookedDateChange, onWelcomeHomeChange, onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange }: CombinedTurnoverTableProps) {
  const isMobile = useIsMobile();
  const { getNotesForEntry, addNote } = useTurnoverNotes();

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
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium">{row.moveOut.tenantName}</span>
                    <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                  </div>
                  <div className="flex items-center gap-1">
                    <TurnoverNoteIndicator notes={getNotesForEntry(row.moveOut.id)} />
                    <TurnoverRowActions
                    type="move_out"
                    entryId={row.moveOut.id}
                    tenantName={row.moveOut.tenantName}
                    onAddNote={addNote}
                    cleaningStatus={row.moveOut.checklist.cleaningStatus}
                    cleaningBookedDate={row.moveOut.checklist.cleaningBookedDate}
                    cleaningApprovedDate={row.moveOut.checklist.cleaningApprovedDate}
                    onCleaningStatusChange={(s) => onCleaningStatusChange(row.moveOut!.id, s)}
                    onCleaningBookedDateChange={(d) => onCleaningBookedDateChange(row.moveOut!.id, d)}
                  />
                  </div>
                </div>
                {row.moveOut.tenantPhone && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => window.location.href = `tel:${row.moveOut.tenantPhone}`} title="Ring">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="pt-1">
                  <CleaningStatusBadge
                    status={row.moveOut.checklist.cleaningStatus}
                    bookedDate={row.moveOut.checklist.cleaningBookedDate}
                    approvedDate={row.moveOut.checklist.cleaningApprovedDate}
                    showLabel
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant={row.moveOut.checklist.keysHandled ? "success" : "outline"} className="text-[10px] px-2 py-0.5">
                    {row.moveOut.checklist.keysHandled ? "Ja" : "Nej"}
                  </Badge>
                  <span className="text-xs">Nycklar</span>
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
                  <div className="flex items-center gap-1">
                    <TurnoverNoteIndicator notes={getNotesForEntry(row.moveIn.id)} />
                    <TurnoverRowActions
                    type="move_in"
                    entryId={row.moveIn.id}
                    tenantName={row.moveIn.tenantName}
                    onAddNote={addNote}
                    contactStatus={row.moveIn.checklist.contactStatus}
                    contactAttempts={row.moveIn.checklist.contactAttempts}
                    visitBookedDate={row.moveIn.checklist.visitBookedDate}
                    nameAndIntercomDone={row.moveIn.checklist.nameAndIntercomDone}
                    welcomeHomeMethod={row.moveIn.checklist.welcomeHomeMethod}
                    onContactStatusChange={(s) => onContactStatusChange(row.moveIn!.id, s)}
                    onContactAttemptsChange={(c) => onContactAttemptsChange(row.moveIn!.id, c)}
                    onVisitBookedDateChange={(d) => onVisitBookedDateChange(row.moveIn!.id, d)}
                    onNameAndIntercomChange={(v) => onChecklistChange(row.moveIn!.id, 'nameAndIntercomDone', v)}
                    onWelcomeHomeChange={(m) => onWelcomeHomeChange(row.moveIn!.id, m)}
                  />
                  </div>
                </div>
                {row.moveIn.tenantPhone && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => window.location.href = `tel:${row.moveIn.tenantPhone}`} title="Ring">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="pt-1">
                  <ContactStatusBadge
                    status={row.moveIn.checklist.contactStatus}
                    attempts={row.moveIn.checklist.contactAttempts}
                    visitBookedDate={row.moveIn.checklist.visitBookedDate}
                    showLabel
                  />
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {row.moveIn.checklist.nameAndIntercomDone ? (
                    <Check className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <span className="h-4 w-4 text-muted-foreground">–</span>
                  )}
                  <span className="text-xs">Namn/Port</span>
                </div>
                <div className="pt-1">
                  <span className="text-xs text-muted-foreground">Välkommen hem: </span>
                  <span className="text-xs font-medium">{WELCOME_LABELS[row.moveIn.checklist.welcomeHomeMethod]}</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <Badge variant={row.moveIn.checklist.keysHandled ? "success" : "outline"} className="text-[10px] px-2 py-0.5">
                    {row.moveIn.checklist.keysHandled ? "Ja" : "Nej"}
                  </Badge>
                  <span className="text-xs">Nycklar</span>
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
                <TableHead className="w-[52px] text-center"><Key className="h-4 w-4 mx-auto" /></TableHead>
                <TableHead className="w-[32px] p-0"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
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
                <TableHead className="w-[52px] text-center"><Key className="h-4 w-4 mx-auto" /></TableHead>
                <TableHead className="w-[32px] p-0"></TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(row => (
                <TableRow key={row.residenceKey}>
                  <TableCell className="font-medium text-sm whitespace-nowrap">{row.address}</TableCell>
                  <TableCell className="text-sm">{row.apartmentType}</TableCell>
                  {/* Move-out tenant */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveOut ? (
                      <div className="py-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{row.moveOut.tenantName}</span>
                          <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                        </div>
                        {row.moveOut.tenantPhone && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <span className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => window.location.href = `tel:${row.moveOut.tenantPhone}`} title="Ring">
                              <Phone className="h-4 w-4" />
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
                      />
                    ) : <span className="text-center block text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Move-out keys */}
                  <TableCell className="text-center">
                    {row.moveOut ? (
                      <Badge variant={row.moveOut.checklist.keysHandled ? "success" : "outline"} className="text-[10px] px-2 py-0.5">
                        {row.moveOut.checklist.keysHandled ? "Ja" : "Nej"}
                      </Badge>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Move-out notes */}
                  <TableCell className="p-0 text-center">
                    {row.moveOut ? (
                      <TurnoverNoteIndicator notes={getNotesForEntry(row.moveOut.id)} />
                    ) : null}
                  </TableCell>
                  {/* Move-out actions */}
                  <TableCell>
                    {row.moveOut ? (
                      <TurnoverRowActions
                        type="move_out"
                        entryId={row.moveOut.id}
                        tenantName={row.moveOut.tenantName}
                        onAddNote={addNote}
                        cleaningStatus={row.moveOut.checklist.cleaningStatus}
                        cleaningBookedDate={row.moveOut.checklist.cleaningBookedDate}
                        cleaningApprovedDate={row.moveOut.checklist.cleaningApprovedDate}
                        onCleaningStatusChange={(s) => onCleaningStatusChange(row.moveOut!.id, s)}
                        onCleaningBookedDateChange={(d) => onCleaningBookedDateChange(row.moveOut!.id, d)}
                      />
                    ) : null}
                  </TableCell>
                  {/* Move-in tenant */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveIn ? (
                      <div className="py-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{row.moveIn.tenantName}</span>
                          <SecurityWarningIcon show={row.moveIn.hasSecurityWarning} />
                        </div>
                        {row.moveIn.tenantPhone && (
                          <div className="flex items-center gap-1 mt-1.5">
                            <span className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</span>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => window.location.href = `tel:${row.moveIn.tenantPhone}`} title="Ring">
                              <Phone className="h-4 w-4" />
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
                      />
                    ) : <span className="text-center block text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Read-only Namn/Port */}
                  <TableCell className="text-center">
                    {row.moveIn ? (
                      row.moveIn.checklist.nameAndIntercomDone ? (
                        <Check className="h-4 w-4 text-emerald-600 mx-auto" />
                      ) : (
                        <span className="text-muted-foreground">–</span>
                      )
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Read-only Välkommen hem */}
                  <TableCell className="text-center text-sm">
                    {row.moveIn ? (
                      <span>{WELCOME_LABELS[row.moveIn.checklist.welcomeHomeMethod]}</span>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Move-in keys */}
                  <TableCell className="text-center">
                    {row.moveIn ? (
                      <Badge variant={row.moveIn.checklist.keysHandled ? "success" : "outline"} className="text-[10px] px-2 py-0.5">
                        {row.moveIn.checklist.keysHandled ? "Ja" : "Nej"}
                      </Badge>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  {/* Move-in actions */}
                  {/* Move-in notes */}
                  <TableCell className="p-0 text-center">
                    {row.moveIn ? (
                      <TurnoverNoteIndicator notes={getNotesForEntry(row.moveIn.id)} />
                    ) : null}
                  </TableCell>
                  {/* Move-in actions */}
                  <TableCell>
                    {row.moveIn ? (
                      <TurnoverRowActions
                        type="move_in"
                        entryId={row.moveIn.id}
                        tenantName={row.moveIn.tenantName}
                        onAddNote={addNote}
                        contactStatus={row.moveIn.checklist.contactStatus}
                        contactAttempts={row.moveIn.checklist.contactAttempts}
                        visitBookedDate={row.moveIn.checklist.visitBookedDate}
                        nameAndIntercomDone={row.moveIn.checklist.nameAndIntercomDone}
                        welcomeHomeMethod={row.moveIn.checklist.welcomeHomeMethod}
                        onContactStatusChange={(s) => onContactStatusChange(row.moveIn!.id, s)}
                        onContactAttemptsChange={(c) => onContactAttemptsChange(row.moveIn!.id, c)}
                        onVisitBookedDateChange={(d) => onVisitBookedDateChange(row.moveIn!.id, d)}
                        onNameAndIntercomChange={(v) => onChecklistChange(row.moveIn!.id, 'nameAndIntercomDone', v)}
                        onWelcomeHomeChange={(m) => onWelcomeHomeChange(row.moveIn!.id, m)}
                      />
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
