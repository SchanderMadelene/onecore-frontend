import { CreateInterestApplicationDialog } from "./CreateInterestApplicationDialog";
import type { StorageSpace } from "./types/storage";

interface StorageApplicationDialogProps {
  storageSpace: StorageSpace;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export const StorageApplicationDialog = ({
  storageSpace,
  open,
  onOpenChange,
  hideTrigger,
}: StorageApplicationDialogProps) => {
  return (
    <CreateInterestApplicationDialog
      parkingSpace={storageSpace}
      kind="storage"
      open={open}
      onOpenChange={onOpenChange}
      hideTrigger={hideTrigger}
    />
  );
};
