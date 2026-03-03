import { TurnoverRow, MoveInListChecklist, CleaningStatus, WelcomeHomeMethod, ContactStatus } from '../types/move-in-list-types';
import { ArrowUpRight, ArrowDownLeft, Phone, Check, Key, Zap, MessageSquare, ExternalLink } from 'lucide-react';
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
import { KeysHandledBadge } from './KeysHandledBadge';
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
  onQuickMoveInChange: (entryId: string, value: boolean) => void;
}

export function CombinedTurnoverTable({ entries, onChecklistChange, onCleaningStatusChange, onCleaningCountChange, onCleaningBookedDateChange, onWelcomeHomeChange, onContactStatusChange, onContactAttemptsChange, onVisitBookedDateChange, onQuickMoveInChange }: CombinedTurnoverTableProps) {
  const isMobile = useIsMobile();
  const { getNotesForEntry, addNote } = useTurnoverNotes();

  /** Derive residence detail URL from contract number, e.g. "211-080-02-0101/03" → "/properties/211-080/02/0101" */
  const getResidenceUrl = (row: TurnoverRow): string | null => {
    const contract = row.moveOut?.contractNumber ?? row.moveIn?.contractNumber;
    if (!contract) return null;
    const parts = contract.split('-');
    if (parts.length < 4) return null;
    const property = `${parts[0]}-${parts[1]}`;
    const building = parts[2];
    const residencePart = parts[3].split('/')[0];
    return `/properties/${property}/${building}/${residencePart}`;
  };

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
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm">{row.address}</span>
            <span className="text-xs text-muted-foreground">{row.apartmentType} · {row.residenceCode}</span>
          </div>
          {getResidenceUrl(row) && (
            <Button variant="outline" size="icon" className="h-8 w-8 shrink-0" asChild>
              <a href={getResidenceUrl(row)!} target="_blank" rel="noopener noreferrer" title="Öppna lägenhetskort">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      ),
      content: (
        <div className="space-y-5">
          {/* Utflytt */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Utflytt</h4>
            </div>
            {row.moveOut ? (
              <div className="rounded-lg border bg-card p-3 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-medium">{row.moveOut.tenantName}</span>
                    <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                    {row.moveOut.hasTenantNote && (
                      <Badge variant="muted" size="icon" title="Notering på hyresgäst">
                        <MessageSquare className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
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
                      keysHandled={row.moveOut!.checklist.keysHandled}
                      onKeysHandledChange={(v) => onChecklistChange(row.moveOut!.id, 'keysHandled', v)}
                    />
                  </div>
                </div>
                {row.moveOut.tenantPhone && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{row.moveOut.tenantPhone}</span>
                    <a href={`tel:${row.moveOut.tenantPhone}`} className="text-muted-foreground hover:text-primary" title="Ring">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
                <div className="grid grid-cols-[auto_auto] justify-start gap-x-3 gap-y-1.5 text-xs items-center">
                  <span className="text-muted-foreground">Städ:</span>
                  <CleaningStatusBadge
                    status={row.moveOut.checklist.cleaningStatus}
                    bookedDate={row.moveOut.checklist.cleaningBookedDate}
                    approvedDate={row.moveOut.checklist.cleaningApprovedDate}
                  />
                  <span className="text-muted-foreground">Nycklar:</span>
                  <KeysHandledBadge handled={row.moveOut.checklist.keysHandled} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic pl-5">Ingen utflytt</p>
            )}
          </div>

          {/* Inflytt */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <ArrowDownLeft className="h-3.5 w-3.5 text-muted-foreground" />
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Inflytt</h4>
            </div>
            {row.moveIn ? (
              <div className="rounded-lg border bg-card p-3 space-y-2.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-medium">{row.moveIn.tenantName}</span>
                    <SecurityWarningIcon show={row.moveIn.hasSecurityWarning} />
                    {row.moveIn.hasTenantNote && (
                      <Badge variant="muted" size="icon" title="Notering på hyresgäst">
                        <MessageSquare className="h-3 w-3" />
                      </Badge>
                    )}
                    {row.moveIn.hasQuickMoveIn && (
                      <Badge variant="info" size="icon" title="Snabb inflytt">
                        <Zap className="h-3 w-3" />
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
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
                      keysHandled={row.moveIn!.checklist.keysHandled}
                      hasQuickMoveIn={row.moveIn!.hasQuickMoveIn ?? false}
                      onKeysHandledChange={(v) => onChecklistChange(row.moveIn!.id, 'keysHandled', v)}
                      onQuickMoveInChange={(v) => onQuickMoveInChange(row.moveIn!.id, v)}
                    />
                  </div>
                </div>
                {row.moveIn.tenantPhone && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{row.moveIn.tenantPhone}</span>
                    <a href={`tel:${row.moveIn.tenantPhone}`} className="text-muted-foreground hover:text-primary" title="Ring">
                      <Phone className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
                <div className="grid grid-cols-[auto_auto] justify-start gap-x-3 gap-y-1.5 text-xs items-center">
                  <span className="text-muted-foreground">Kontakt:</span>
                  <ContactStatusBadge
                    status={row.moveIn.checklist.contactStatus}
                    attempts={row.moveIn.checklist.contactAttempts}
                    visitBookedDate={row.moveIn.checklist.visitBookedDate}
                  />
                  <span className="text-muted-foreground">Namn/Port:</span>
                  <div>
                    {row.moveIn.checklist.nameAndIntercomDone ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <span className="text-muted-foreground">–</span>
                    )}
                  </div>
                  <span className="text-muted-foreground">Välk. hem:</span>
                  <span className="font-medium">{WELCOME_LABELS[row.moveIn.checklist.welcomeHomeMethod]}</span>
                  <span className="text-muted-foreground">Nycklar:</span>
                  <KeysHandledBadge handled={row.moveIn.checklist.keysHandled} />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic pl-5">Ingen inflytt</p>
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
          <Table className="[&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Uppgång</TableHead>
                <TableHead className="w-[48px]">Typ</TableHead>
                <TableHead className="border-l-2 border-border">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-muted">
                      <ArrowUpRight className="h-3 w-3 text-foreground" />
                    </span>
                    Hyresgäst
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">Sista deb.</TableHead>
                <TableHead className="text-center whitespace-nowrap">Städkontr.</TableHead>
                <TableHead className="w-[40px] text-center p-1"><Key className="h-3.5 w-3.5 mx-auto" /></TableHead>
                <TableHead className="w-[28px] p-0"></TableHead>
                <TableHead className="w-[40px] p-1"></TableHead>
                <TableHead className="border-l-2 border-border">
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-muted">
                      <ArrowDownLeft className="h-3 w-3 text-foreground" />
                    </span>
                    Hyresgäst
                  </div>
                </TableHead>
                <TableHead className="whitespace-nowrap">Kontrakt</TableHead>
                <TableHead>Kontakt</TableHead>
                <TableHead className="text-center whitespace-nowrap">Namn/Port</TableHead>
                <TableHead className="text-center whitespace-nowrap">Välk. hem</TableHead>
                <TableHead className="w-[40px] text-center p-1"><Key className="h-3.5 w-3.5 mx-auto" /></TableHead>
                <TableHead className="w-[28px] p-0"></TableHead>
                <TableHead className="w-[40px] p-1"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(row => (
                <TableRow key={row.residenceKey}>
                  <TableCell className="font-medium text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {row.address}
                      {getResidenceUrl(row) && (
                        <Button variant="outline" size="icon" className="h-6 w-6" asChild>
                          <a href={getResidenceUrl(row)!} target="_blank" rel="noopener noreferrer" title="Öppna lägenhetskort">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{row.apartmentType}</TableCell>
                  {/* Move-out tenant */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveOut ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{row.moveOut.tenantName}</span>
                        <SecurityWarningIcon show={row.moveOut.hasSecurityWarning} />
                        {row.moveOut.hasTenantNote && (
                          <Badge variant="muted" size="icon" title="Notering på hyresgäst">
                            <MessageSquare className="h-3 w-3" />
                          </Badge>
                        )}
                        {row.moveOut.tenantPhone && (
                          <a href={`tel:${row.moveOut.tenantPhone}`} className="text-muted-foreground hover:text-primary" title={row.moveOut.tenantPhone}>
                            <Phone className="h-3 w-3" />
                          </a>
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
                      <KeysHandledBadge handled={row.moveOut.checklist.keysHandled} />
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
                        keysHandled={row.moveOut!.checklist.keysHandled}
                        onKeysHandledChange={(v) => onChecklistChange(row.moveOut!.id, 'keysHandled', v)}
                      />
                    ) : null}
                  </TableCell>
                  {/* Move-in tenant */}
                  <TableCell className="border-l-2 border-border">
                    {row.moveIn ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm">{row.moveIn.tenantName}</span>
                        <SecurityWarningIcon show={row.moveIn.hasSecurityWarning} />
                        {row.moveIn.hasTenantNote && (
                          <Badge variant="muted" size="icon" title="Notering på hyresgäst">
                            <MessageSquare className="h-3 w-3" />
                          </Badge>
                        )}
                        {row.moveIn.tenantPhone && (
                          <a href={`tel:${row.moveIn.tenantPhone}`} className="text-muted-foreground hover:text-primary" title={row.moveIn.tenantPhone}>
                            <Phone className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ) : <span className="text-muted-foreground">–</span>}
                  </TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      {formatDate(row.moveIn?.date)}
                      {row.moveIn?.hasQuickMoveIn && (
                        <Badge variant="info" size="icon" title="Snabb inflytt">
                          <Zap className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
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
                      <KeysHandledBadge handled={row.moveIn.checklist.keysHandled} />
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
                        keysHandled={row.moveIn!.checklist.keysHandled}
                        hasQuickMoveIn={row.moveIn!.hasQuickMoveIn ?? false}
                        onKeysHandledChange={(v) => onChecklistChange(row.moveIn!.id, 'keysHandled', v)}
                        onQuickMoveInChange={(v) => onQuickMoveInChange(row.moveIn!.id, v)}
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
