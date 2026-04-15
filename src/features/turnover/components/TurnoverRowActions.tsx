import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoveOutEditDialog } from './MoveOutEditDialog';
import { MoveInEditDialog } from './MoveInEditDialog';
import { CleaningStatus, ContactStatus } from '../types/move-in-list-types';
import { TurnoverNote } from '../types/turnover-note-types';

interface MoveOutProps {
  entryId: string;
  tenantName: string;
  onAddNote: (entryId: string, content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
  notes: TurnoverNote[];
  cleaningStatus: CleaningStatus;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  keysHandled: boolean;
  onCleaningStatusChange: (status: CleaningStatus) => void;
  onCleaningBookedDateChange: (date: string | undefined) => void;
  onKeysHandledChange: (handled: boolean) => void;
}

interface MoveInProps {
  entryId: string;
  tenantName: string;
  onAddNote: (entryId: string, content: string, isImportant?: boolean) => void;
  onToggleImportant: (noteId: string) => void;
  notes: TurnoverNote[];
  contactStatus: ContactStatus;
  contactAttempts: number;
  visitBookedDate?: string;
  nameAndIntercomDone: boolean;
  welcomeHomeDone: boolean;
  inspectionProtocolDone: boolean;
  keysHandled: boolean;
  hasQuickMoveIn: boolean;
  onContactStatusChange: (status: ContactStatus) => void;
  onContactAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  onNameAndIntercomChange: (checked: boolean) => void;
  onWelcomeHomeChange: (done: boolean) => void;
  onInspectionProtocolChange: (done: boolean) => void;
  onKeysHandledChange: (handled: boolean) => void;
  onQuickMoveInChange: (value: boolean) => void;
}

type TurnoverRowActionsProps =
  | ({ type: 'move_out' } & MoveOutProps)
  | ({ type: 'move_in' } & MoveInProps);

export function TurnoverRowActions(props: TurnoverRowActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setOpen(true)}>
        <Pencil className="h-4 w-4" />
      </Button>

      {props.type === 'move_out' && (
        <MoveOutEditDialog
          open={open}
          onOpenChange={setOpen}
          tenantName={props.tenantName}
          cleaningStatus={props.cleaningStatus}
          cleaningBookedDate={props.cleaningBookedDate}
          cleaningApprovedDate={props.cleaningApprovedDate}
          keysHandled={props.keysHandled}
          notes={props.notes}
          onCleaningStatusChange={props.onCleaningStatusChange}
          onCleaningBookedDateChange={props.onCleaningBookedDateChange}
          onKeysHandledChange={props.onKeysHandledChange}
          onAddNote={(content, isImportant) => props.onAddNote(props.entryId, content, isImportant)}
          onToggleImportant={props.onToggleImportant}
        />
      )}

      {props.type === 'move_in' && (
        <MoveInEditDialog
          open={open}
          onOpenChange={setOpen}
          tenantName={props.tenantName}
          contactStatus={props.contactStatus}
          contactAttempts={props.contactAttempts}
          visitBookedDate={props.visitBookedDate}
          nameAndIntercomDone={props.nameAndIntercomDone}
          welcomeHomeDone={props.welcomeHomeDone}
          inspectionProtocolDone={props.inspectionProtocolDone}
          keysHandled={props.keysHandled}
          hasQuickMoveIn={props.hasQuickMoveIn}
          notes={props.notes}
          onContactStatusChange={props.onContactStatusChange}
          onContactAttemptsChange={props.onContactAttemptsChange}
          onVisitBookedDateChange={props.onVisitBookedDateChange}
          onNameAndIntercomChange={props.onNameAndIntercomChange}
          onWelcomeHomeChange={props.onWelcomeHomeChange}
          onInspectionProtocolChange={props.onInspectionProtocolChange}
          onKeysHandledChange={props.onKeysHandledChange}
          onQuickMoveInChange={props.onQuickMoveInChange}
          onAddNote={(content, isImportant) => props.onAddNote(props.entryId, content, isImportant)}
          onToggleImportant={props.onToggleImportant}
        />
      )}
    </>
  );
}