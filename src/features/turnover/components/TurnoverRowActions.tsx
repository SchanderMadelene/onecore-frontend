import { useState } from 'react';
import { MoreHorizontal, ExternalLink, Phone, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
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
  residenceUrl?: string | null;
  tenantId?: string;
  tenantPhone?: string;
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
  tenantId?: string;
  tenantPhone?: string;
}

type TurnoverRowActionsProps =
  | ({ type: 'move_out' } & MoveOutProps)
  | ({ type: 'move_in' } & MoveInProps);

export function TurnoverRowActions(props: TurnoverRowActionsProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const tenantId = props.type === 'move_out' ? props.tenantId : props.tenantId;
  const tenantPhone = props.type === 'move_out' ? props.tenantPhone : props.tenantPhone;
  const residenceUrl = props.type === 'move_out' ? props.residenceUrl : undefined;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <Pencil className="h-4 w-4 mr-2" />
            {props.type === 'move_out' ? 'Redigera utflytt' : 'Redigera inflytt'}
          </DropdownMenuItem>

          {(residenceUrl || tenantId || tenantPhone) && <DropdownMenuSeparator />}

          {residenceUrl && (
            <DropdownMenuItem asChild>
              <a href={residenceUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Öppna lägenhetskort
              </a>
            </DropdownMenuItem>
          )}

          {tenantId && (
            <DropdownMenuItem asChild>
              <a href={`/tenants/detail/${tenantId}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Öppna kundkort
              </a>
            </DropdownMenuItem>
          )}

          {tenantPhone && (
            <DropdownMenuItem asChild>
              <a href={`tel:${tenantPhone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Ring hyresgäst
              </a>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {props.type === 'move_out' && (
        <MoveOutEditDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
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
          open={dialogOpen}
          onOpenChange={setDialogOpen}
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
