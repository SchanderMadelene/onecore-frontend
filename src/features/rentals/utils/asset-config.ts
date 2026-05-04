/**
 * Centraliserad konfiguration för uthyrningstyper (bilplats / förråd).
 *
 * Komponenterna i features/rentals är ursprungligen byggda för bilplats men
 * generaliseras nu via en `assetType`-prop. All terminologi, ikoner och
 * routes går genom den här modulen så att samma komponent kan rendera båda.
 */

export type AssetType = "parking" | "storage";

export interface AssetConfig {
  /** Singular, gemener — för meningar ("avbryt uthyrningen av {noun}") */
  noun: string;
  /** Plural, gemener */
  nounPlural: string;
  /** Singular med versal — för rubriker */
  capitalized: string;
  /** Plural med versal */
  capitalizedPlural: string;
  /** URL-segment under /rentals/ */
  routeSegment: "parking" | "storage";
  /** Lucide-ikonens namn (för referens) */
  iconName: "car" | "archive";
  /** Bygg detaljroute för ett objekt */
  detailRoute: (id: string | number) => string;
  /** Översiktssidans queryKey-prefix */
  queryKeyPrefix: string;
}

export const ASSET_CONFIG: Record<AssetType, AssetConfig> = {
  parking: {
    noun: "bilplats",
    nounPlural: "bilplatser",
    capitalized: "Bilplats",
    capitalizedPlural: "Bilplatser",
    routeSegment: "parking",
    iconName: "car",
    detailRoute: (id) => `/rentals/parking/${id}`,
    queryKeyPrefix: "parkingSpace",
  },
  storage: {
    noun: "förråd",
    nounPlural: "förråd",
    capitalized: "Förråd",
    capitalizedPlural: "Förråd",
    routeSegment: "storage",
    iconName: "archive",
    detailRoute: (id) => `/rentals/storage/${id}`,
    queryKeyPrefix: "storageSpace",
  },
};

export const getAssetConfig = (type: AssetType = "parking"): AssetConfig =>
  ASSET_CONFIG[type];
