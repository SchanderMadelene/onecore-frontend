import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoveOutEditDialog } from './MoveOutEditDialog';
import { MoveInEditDialog } from './MoveInEditDialog';
import { CleaningStatus, ContactStatus, WelcomeHomeMethod } from '../types/move-in-list-types';

interface MoveOutProps {
  entryId: string;
  tenantName: string;
  onAddNote: (entryId: string, content: string) => void;
  cleaningStatus: CleaningStatus;
  cleaningBookedDate?: string;
  cleaningApprovedDate?: string;
  onCleaningStatusChange: (status: CleaningStatus) => void;
  onCleaningBookedDateChange: (date: string | undefined) => void;
}

interface MoveInProps {
  entryId: string;
  tenantName: string;
  onAddNote: (entryId: string, content: string) => void;
  contactStatus: ContactStatus;
  contactAttempts: number;
  visitBookedDate?: string;
  nameAndIntercomDone: boolean;
  welcomeHomeMethod: WelcomeHomeMethod;
  onContactStatusChange: (status: ContactStatus) => void;
  onContactAttemptsChange: (count: number) => void;
  onVisitBookedDateChange: (datetime: string | undefined) => void;
  onNameAndIntercomChange: (checked: boolean) => void;
  onWelcomeHomeChange: (method: WelcomeHomeMethod) => void;
}

type TurnoverRowActionsProps =
  | ({ type: 'move_out' } & MoveOutProps)
  | ({ type: 'move_in' } & MoveInProps);

export function TurnoverRowActions(props: TurnoverRowActionsProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(true)}>
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
          onCleaningStatusChange={props.onCleaningStatusChange}
          onCleaningBookedDateChange={props.onCleaningBookedDateChange}
          onAddNote={(content) => props.onAddNote(props.entryId, content)}
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
          welcomeHomeMethod={props.welcomeHomeMethod}
          onContactStatusChange={props.onContactStatusChange}
          onContactAttemptsChange={props.onContactAttemptsChange}
          onVisitBookedDateChange={props.onVisitBookedDateChange}
          onNameAndIntercomChange={props.onNameAndIntercomChange}
          onWelcomeHomeChange={props.onWelcomeHomeChange}
          onAddNote={(content) => props.onAddNote(props.entryId, content)}
        />
      )}
    </>
  );
}
