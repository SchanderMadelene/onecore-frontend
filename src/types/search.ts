import { IdentifierType, IdentifierMatch } from "@/utils/searchIdentifiers";

export type SearchResultType = 
  | "customer" 
  | "residence" 
  | "case" 
  | "invoice" 
  | "key" 
  | "document";

export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  subtitle: string;
  description?: string;
  path: string;
  metadata?: Record<string, any>;
  score?: number;
  highlightedText?: string;
  // New fields for identifier matching
  identifiers?: {
    personnummer?: string;
    telefonnummer?: string;
    fakturanummer?: string;
    kontraktsnummer?: string;
    objektsnummer?: string;
    arendenummer?: string;
    nyckelnummer?: string;
  };
}

export interface SearchFilter {
  type: SearchResultType;
  label: string;
  icon: string;
  count?: number;
  active: boolean;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchResultType[];
  createdAt: Date;
  lastUsed: Date;
  useCount: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilter[];
  isLoading: boolean;
  isOpen: boolean;
  favorites: SavedSearch[];
  history: string[];
  // New fields for identifier detection
  identifierMatch: IdentifierMatch | null;
  exactMatch: SearchResult | null;
}

export type { IdentifierType, IdentifierMatch };