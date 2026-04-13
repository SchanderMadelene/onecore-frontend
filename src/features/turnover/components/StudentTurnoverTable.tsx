import { StudentTurnoverRow, CleaningStatus } from '../types/move-in-list-types';
import { TurnoverNote } from '../types/turnover-note-types';
import { ArrowUpRight, ArrowDownLeft, Mail, Pencil } from 'lucide-react';
import { CleaningStatusBadge } from './CleaningStatusBadge';
import { StudentEditDialog } from './StudentEditDialog';
import { TurnoverNoteIndicator } from './TurnoverNoteIndicator';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileAccordion, MobileAccordionItem } from '@/shared/ui/mobile-accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { format, parseISO } from 'date-fns';
import { sv } from 'date-fns/locale';
import { useState } from 'react';

const GENDER_LABELS: Record<string, string> = { M: 'Man', F: 'Kvinna', O: 'Annat' };

interface StudentTurnoverTableProps {
  entries: StudentTurnoverRow[];
  onCleaningStatusChange: (entryId: string, status: CleaningStatus) => void;
  onCleaningBookedDateChange: (entryId: string, date: string | undefined) => void;
  onAddNote: (entryId: string, content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
  getNotesForEntry: (entryId: string) => TurnoverNote[];
}

export function StudentTurnoverTable({
  entries, onCleaningStatusChange, onCleaningBookedDateChange,
  onAddNote, onToggleImportant, getNotesForEntry,
}: StudentTurnoverTableProps) {
  const isMobile = useIsMobile();
  const [editDialog, setEditDialog] = useState<{
    open: boolean;
    entryId: string;
    tenantName: string;
    status: CleaningStatus;
    bookedDate?: string;
    approvedDate?: string;
  }>({ open: false, entryId: '', tenantName: '', status: 'not_done' });

  const openEditDialog = (entry: StudentTurnoverRow['moveOut'] | StudentTurnoverRow['moveIn']) => {
    if (!entry) return;
    setEditDialog({
      open: true,
      entryId: entry.id,
      tenantName: entry.studentName,
      status: entry.cleaningChecklist.cleaningStatus,
      bookedDate: entry.cleaningChecklist.cleaningBookedDate,
      approvedDate: entry.cleaningChecklist.cleaningApprovedDate,
    });
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '–';
    return format(parseISO(dateStr), 'd MMM', { locale: sv });
  };

  const formatBirthDate = (dateStr: string) => {
    return format(parseISO(dateStr), 'yyyy-MM-dd');
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Inga studentposter hittades för valt datumintervall
      </div>
    );
  }

  if (isMobile) {
    const items: MobileAccordionItem[] = entries.map(row => ({
      id: row.roomKey,
      title: (
        <div className="flex flex-col gap-0.5">
          <span className="font-medium text-sm">{row.propertyName} · {row.roomCode}</span>
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
                  <span className="text-sm font-medium">{row.moveOut.studentName}</span>
                  <div className="flex items-center gap-1.5">
                    <TurnoverNoteIndicator notes={getNotesForEntry(row.moveOut.id)} />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(row.moveOut)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_auto] justify-start gap-x-3 gap-y-1.5 text-xs items-center">
                  <span className="text-muted-foreground">Kön:</span>
                  <span>{GENDER_LABELS[row.moveOut.gender]}</span>
                  <span className="text-muted-foreground">Född:</span>
                  <span>{formatBirthDate(row.moveOut.birthDate)}</span>
                  <span className="text-muted-foreground">E-post:</span>
                  <a href={`mailto:${row.moveOut.email}`} className="text-primary underline truncate max-w-[180px]">{row.moveOut.email}</a>
                  <span className="text-muted-foreground">Datum:</span>
                  <span>{formatDate(row.moveOut.date)}</span>
                  <span className="text-muted-foreground">Städ:</span>
                  <CleaningStatusBadge
                    status={row.moveOut.cleaningChecklist.cleaningStatus}
                    bookedDate={row.moveOut.cleaningChecklist.cleaningBookedDate}
                    approvedDate={row.moveOut.cleaningChecklist.cleaningApprovedDate}
                  />
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
                  <span className="text-sm font-medium">{row.moveIn.studentName}</span>
                  <div className="flex items-center gap-1.5">
                    <TurnoverNoteIndicator notes={getNotesForEntry(row.moveIn.id)} />
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(row.moveIn)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-[auto_auto] justify-start gap-x-3 gap-y-1.5 text-xs items-center">
                  <span className="text-muted-foreground">Kön:</span>
                  <span>{GENDER_LABELS[row.moveIn.gender]}</span>
                  <span className="text-muted-foreground">Född:</span>
                  <span>{formatBirthDate(row.moveIn.birthDate)}</span>
                  <span className="text-muted-foreground">E-post:</span>
                  <a href={`mailto:${row.moveIn.email}`} className="text-primary underline truncate max-w-[180px]">{row.moveIn.email}</a>
                  <span className="text-muted-foreground">Datum:</span>
                  <span>{formatDate(row.moveIn.date)}</span>
                  <span className="text-muted-foreground">Städ:</span>
                  <CleaningStatusBadge
                    status={row.moveIn.cleaningChecklist.cleaningStatus}
                    bookedDate={row.moveIn.cleaningChecklist.cleaningBookedDate}
                    approvedDate={row.moveIn.cleaningChecklist.cleaningApprovedDate}
                  />
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
      <>
        <Card>
          <CardHeader>
            <CardTitle>Studentboenden ({entries.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <MobileAccordion items={items} />
          </CardContent>
        </Card>
        <StudentEditDialog
          open={editDialog.open}
          onOpenChange={(o) => setEditDialog(prev => ({ ...prev, open: o }))}
          tenantName={editDialog.tenantName}
          cleaningStatus={editDialog.status}
          cleaningBookedDate={editDialog.bookedDate}
          cleaningApprovedDate={editDialog.approvedDate}
          onCleaningStatusChange={(s) => onCleaningStatusChange(editDialog.entryId, s)}
          onCleaningBookedDateChange={(d) => onCleaningBookedDateChange(editDialog.entryId, d)}
          onAddNote={(content, isImportant) => onAddNote(editDialog.entryId, content, isImportant)}
        />
      </>
    );
  }

  // Desktop table
  return (
    <>
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border-0 overflow-x-auto">
            <Table className="[&_th]:px-2 [&_th]:py-1.5 [&_td]:px-2 [&_td]:py-1.5">
              <TableHeader>
                <TableRow>
                  <TableHead className="whitespace-nowrap">Fastighet</TableHead>
                  <TableHead className="whitespace-nowrap">Rum</TableHead>
                  <TableHead className="border-l-2 border-border">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-muted">
                        <ArrowUpRight className="h-3 w-3 text-foreground" />
                      </span>
                      Student
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Kön</TableHead>
                  <TableHead className="whitespace-nowrap">Född</TableHead>
                  <TableHead className="whitespace-nowrap">Datum</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Städkontr.</TableHead>
                  <TableHead className="w-[32px] p-0"></TableHead>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="border-l-2 border-border">
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-muted">
                        <ArrowDownLeft className="h-3 w-3 text-foreground" />
                      </span>
                      Student
                    </div>
                  </TableHead>
                  <TableHead className="whitespace-nowrap">Kön</TableHead>
                  <TableHead className="whitespace-nowrap">Född</TableHead>
                  <TableHead className="whitespace-nowrap">Datum</TableHead>
                  <TableHead className="text-center whitespace-nowrap">Städkontr.</TableHead>
                  <TableHead className="w-[32px] p-0"></TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map(row => (
                  <TableRow key={row.roomKey}>
                    <TableCell className="font-medium text-sm whitespace-nowrap">{row.propertyName}</TableCell>
                    <TableCell className="text-sm whitespace-nowrap">{row.roomCode}</TableCell>
                    {/* Move-out student */}
                    <TableCell className="border-l-2 border-border">
                      {row.moveOut ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{row.moveOut.studentName}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" asChild>
                            <a href={`mailto:${row.moveOut.email}`} title={row.moveOut.email}>
                              <Mail className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      ) : <span className="text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {row.moveOut ? GENDER_LABELS[row.moveOut.gender] : '–'}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {row.moveOut ? formatBirthDate(row.moveOut.birthDate) : '–'}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {formatDate(row.moveOut?.date)}
                    </TableCell>
                    <TableCell>
                      {row.moveOut ? (
                        <CleaningStatusBadge
                          status={row.moveOut.cleaningChecklist.cleaningStatus}
                          bookedDate={row.moveOut.cleaningChecklist.cleaningBookedDate}
                          approvedDate={row.moveOut.cleaningChecklist.cleaningApprovedDate}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="p-0 text-center">
                      {row.moveOut ? (
                        <TurnoverNoteIndicator notes={getNotesForEntry(row.moveOut.id)} />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {row.moveOut ? (
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(row.moveOut)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </TableCell>
                    {/* Move-in student */}
                    <TableCell className="border-l-2 border-border">
                      {row.moveIn ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{row.moveIn.studentName}</span>
                          <Button variant="outline" size="icon" className="h-6 w-6" asChild>
                            <a href={`mailto:${row.moveIn.email}`} title={row.moveIn.email}>
                              <Mail className="h-3 w-3" />
                            </a>
                          </Button>
                        </div>
                      ) : <span className="text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {row.moveIn ? GENDER_LABELS[row.moveIn.gender] : '–'}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {row.moveIn ? formatBirthDate(row.moveIn.birthDate) : '–'}
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {formatDate(row.moveIn?.date)}
                    </TableCell>
                    <TableCell>
                      {row.moveIn ? (
                        <CleaningStatusBadge
                          status={row.moveIn.cleaningChecklist.cleaningStatus}
                          bookedDate={row.moveIn.cleaningChecklist.cleaningBookedDate}
                          approvedDate={row.moveIn.cleaningChecklist.cleaningApprovedDate}
                        />
                      ) : <span className="text-center block text-muted-foreground">–</span>}
                    </TableCell>
                    <TableCell className="p-0 text-center">
                      {row.moveIn ? (
                        <TurnoverNoteIndicator notes={getNotesForEntry(row.moveIn.id)} />
                      ) : null}
                    </TableCell>
                    <TableCell>
                      {row.moveIn ? (
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => openEditDialog(row.moveIn)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <StudentEditDialog
        open={editDialog.open}
        onOpenChange={(o) => setEditDialog(prev => ({ ...prev, open: o }))}
        tenantName={editDialog.tenantName}
        cleaningStatus={editDialog.status}
        cleaningBookedDate={editDialog.bookedDate}
        cleaningApprovedDate={editDialog.approvedDate}
        onCleaningStatusChange={(s) => onCleaningStatusChange(editDialog.entryId, s)}
        onCleaningBookedDateChange={(d) => onCleaningBookedDateChange(editDialog.entryId, d)}
        onAddNote={(content, isImportant) => onAddNote(editDialog.entryId, content, isImportant)}
      />
    </>
  );
}
