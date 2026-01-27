import type { HousingSpace } from "./housing";

export interface UnpublishedHousingSpace extends HousingSpace {
  status: "draft" | "needs_review" | "ready_to_publish";
  lastModified: string;
  createdBy: string;
  description?: string;
  availableFrom?: string;
}
