export type AssetType = "parking" | "storage";

export interface AssetCopy {
  /** Singular label, lowercase, used in placeholders/messages: "bilplats" / "förråd" */
  singular: string;
  /** Plural label, lowercase: "bilplatser" / "förråd" */
  plural: string;
  /** Type column header: "Bilplatstyp" / "Förrådstyp" */
  typeColumnLabel: string;
  /** URL segment for detail navigation */
  routeSegment: "parking" | "storage";
}

export const ASSET_COPY: Record<AssetType, AssetCopy> = {
  parking: {
    singular: "bilplats",
    plural: "bilplatser",
    typeColumnLabel: "Bilplatstyp",
    routeSegment: "parking",
  },
  storage: {
    singular: "förråd",
    plural: "förråd",
    typeColumnLabel: "Förrådstyp",
    routeSegment: "storage",
  },
};
