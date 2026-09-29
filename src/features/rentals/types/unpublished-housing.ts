import type { HousingSpace } from "./housing";
import type { RentalMethod } from "../data/published-housing";

export interface UnpublishedHousingSpace extends HousingSpace {
  status: "draft" | "needs_review" | "ready_to_publish";
  lastModified: string;
  createdBy: string;
  description?: string;
  availableFrom?: string;
  preferredMoveOutDate?: string;
  /** Uthyrningsmetod som användes vid senaste publicering (saknas = aldrig publicerad) */
  lastRentalMethod?: RentalMethod;
}
