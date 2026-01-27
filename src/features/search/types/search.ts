// Re-export types from global types
export type {
  SearchResult,
  SearchState,
  IdentifierMatch,
  IdentifierType,
} from '@/types/search';

// Local search result type (tree-based)
export interface TreeSearchResult {
  id: string;
  name: string;
  type: "property" | "building" | "apartment" | "tenant" | "maintenance" | "buildingpart";
  address: string;
  path: string;
  tenant?: {
    name: string;
    active: boolean;
  };
  size?: number;
  rent?: number;
  hasContract?: boolean;
  contractStatus?: "active" | "expiring" | "expired" | "vacant";
}
