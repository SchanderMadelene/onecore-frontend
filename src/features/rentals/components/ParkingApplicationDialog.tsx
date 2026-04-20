
import { CreateInterestApplicationDialog } from "./CreateInterestApplicationDialog";
import type { ParkingSpace } from "./types/parking";

interface ParkingApplicationDialogProps {
  parkingSpace: ParkingSpace;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
}

export const ParkingApplicationDialog = ({ parkingSpace, open, onOpenChange, hideTrigger }: ParkingApplicationDialogProps) => {
  return <CreateInterestApplicationDialog parkingSpace={parkingSpace} open={open} onOpenChange={onOpenChange} hideTrigger={hideTrigger} />;
};
