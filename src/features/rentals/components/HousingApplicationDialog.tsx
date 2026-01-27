import { CreateHousingApplicationDialog } from "./CreateHousingApplicationDialog";
import type { HousingSpace } from "./types/housing";

interface HousingApplicationDialogProps {
  housingSpace: HousingSpace;
}

export const HousingApplicationDialog = ({ housingSpace }: HousingApplicationDialogProps) => {
  return <CreateHousingApplicationDialog housingSpace={housingSpace} />;
};