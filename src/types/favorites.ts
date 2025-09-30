export type FavoriteCategory = 
  | "rentals"
  | "properties" 
  | "tenants"
  | "barriers"
  | "turnover"
  | "inspections"
  | "general";

export type FavoriteVisibility = "personal" | "team";

export interface FavoriteParameters {
  [key: string]: string | string[] | number | boolean | undefined;
}

export interface Favorite {
  id: string;
  name: string;
  description?: string;
  category: FavoriteCategory;
  targetUrl: string;
  parameters: FavoriteParameters;
  metadata: {
    pageTitle: string;
    icon?: string;
    estimatedResults?: number;
  };
  visibility: FavoriteVisibility;
  createdAt: Date;
  lastUsed: Date;
  useCount: number;
  createdBy?: string;
  sharedWith?: string[];
}

export interface FavoriteGroup {
  category: FavoriteCategory;
  label: string;
  icon: string;
  favorites: Favorite[];
}
