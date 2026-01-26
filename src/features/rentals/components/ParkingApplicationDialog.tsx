
import { CreateInterestApplicationDialog } from "./CreateInterestApplicationDialog";
import type { ParkingSpace } from "./types/parking";

interface ParkingApplicationDialogProps {
  parkingSpace: ParkingSpace;
}

export const ParkingApplicationDialog = ({ parkingSpace }: ParkingApplicationDialogProps) => {
  return <CreateInterestApplicationDialog parkingSpace={parkingSpace} />;
};
