import { Favorite, FavoriteCategory, FavoriteParameters, FavoriteVisibility } from "@/types/favorites";

class FavoritesService {
  private static instance: FavoritesService;
  private favorites: Favorite[] = [];
  private readonly STORAGE_KEY = "mimer-favorites";
  private readonly ACTIVE_FAVORITE_KEY = "mimer-active-favorite";

  static getInstance(): FavoritesService {
    if (!FavoritesService.instance) {
      FavoritesService.instance = new FavoritesService();
    }
    return FavoritesService.instance;
  }

  constructor() {
    this.loadFromStorage();
  }

  // Get all favorites
  getFavorites(): Favorite[] {
    return this.favorites.sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime());
  }

  // Get favorites by category
  getFavoritesByCategory(category: FavoriteCategory): Favorite[] {
    return this.favorites
      .filter(fav => fav.category === category)
      .sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime());
  }

  // Create favorite from current page
  createFromCurrentPage(
    name: string,
    description: string | undefined,
    category: FavoriteCategory,
    targetUrl: string,
    parameters: FavoriteParameters,
    pageTitle: string,
    visibility: FavoriteVisibility,
    icon?: string
  ): Favorite {
    const favorite: Favorite = {
      id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      category,
      targetUrl,
      parameters,
      metadata: {
        pageTitle,
        icon,
      },
      visibility,
      createdAt: new Date(),
      lastUsed: new Date(),
      useCount: 1,
    };

    this.favorites.push(favorite);
    this.saveToStorage();
    return favorite;
  }

  // Use a favorite (navigate to it)
  useFavorite(id: string): Favorite | null {
    const favorite = this.favorites.find(f => f.id === id);
    if (favorite) {
      favorite.lastUsed = new Date();
      favorite.useCount++;
      this.saveToStorage();
    }
    return favorite || null;
  }

  // Update a favorite
  updateFavorite(id: string, updates: Partial<Omit<Favorite, 'id' | 'createdAt'>>): Favorite | null {
    const favorite = this.favorites.find(f => f.id === id);
    if (favorite) {
      Object.assign(favorite, updates);
      this.saveToStorage();
    }
    return favorite || null;
  }

  // Delete a favorite
  deleteFavorite(id: string): void {
    this.favorites = this.favorites.filter(f => f.id !== id);
    this.saveToStorage();
  }

  // Share a favorite (future implementation)
  shareFavorite(id: string): string {
    const favorite = this.favorites.find(f => f.id === id);
    if (!favorite) throw new Error("Favorite not found");
    
    // Generate share URL with encoded favorite data
    const shareData = btoa(JSON.stringify({
      name: favorite.name,
      description: favorite.description,
      category: favorite.category,
      targetUrl: favorite.targetUrl,
      parameters: favorite.parameters,
      metadata: favorite.metadata
    }));
    
    return `${window.location.origin}/favorites/import?data=${shareData}`;
  }

  // Import shared favorite
  importSharedFavorite(shareData: string): Favorite {
    try {
      const data = JSON.parse(atob(shareData));
      return this.createFromCurrentPage(
        data.name,
        data.description,
        data.category,
        data.targetUrl,
        data.parameters,
        data.metadata.pageTitle,
        "personal", // Default to personal when importing
        data.metadata.icon
      );
    } catch (error) {
      throw new Error("Invalid share data");
    }
  }

  // Export favorites as JSON
  exportFavorites(): string {
    return JSON.stringify(this.favorites, null, 2);
  }

  // Import favorites from JSON
  importFavorites(jsonData: string): number {
    try {
      const imported = JSON.parse(jsonData) as Favorite[];
      let count = 0;
      
      imported.forEach(fav => {
        // Check if already exists
        if (!this.favorites.find(f => f.id === fav.id)) {
          this.favorites.push({
            ...fav,
            createdAt: new Date(fav.createdAt),
            lastUsed: new Date(fav.lastUsed),
          });
          count++;
        }
      });
      
      this.saveToStorage();
      return count;
    } catch (error) {
      throw new Error("Invalid JSON data");
    }
  }

  // Build URL with parameters
  buildUrlWithParameters(favorite: Favorite): string {
    const url = new URL(favorite.targetUrl, window.location.origin);
    
    Object.entries(favorite.parameters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => url.searchParams.append(key, String(v)));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    });
    
    return url.pathname + url.search;
  }

  // Active favorite management
  setActiveFavorite(favoriteId: string): void {
    try {
      sessionStorage.setItem(this.ACTIVE_FAVORITE_KEY, favoriteId);
    } catch (e) {
      console.warn("Failed to save active favorite", e);
    }
  }

  getActiveFavorite(): Favorite | null {
    try {
      const id = sessionStorage.getItem(this.ACTIVE_FAVORITE_KEY);
      if (id) {
        return this.favorites.find(f => f.id === id) || null;
      }
    } catch (e) {
      console.warn("Failed to get active favorite", e);
    }
    return null;
  }

  clearActiveFavorite(): void {
    try {
      sessionStorage.removeItem(this.ACTIVE_FAVORITE_KEY);
    } catch (e) {
      console.warn("Failed to clear active favorite", e);
    }
  }

  // Compare current URL with favorite
  compareUrlWithFavorite(pathname: string, searchParams: URLSearchParams, favorite: Favorite): "exact_match" | "modified" | "no_match" {
    // Check if pathname matches
    if (pathname !== favorite.targetUrl) {
      return "no_match";
    }

    // Convert URLSearchParams to object
    const currentParams: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      const existing = currentParams[key];
      if (existing) {
        currentParams[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
      } else {
        currentParams[key] = value;
      }
    });

    // Compare parameters
    const favoriteKeys = Object.keys(favorite.parameters);
    const currentKeys = Object.keys(currentParams);

    // Check if same number of parameters
    if (favoriteKeys.length !== currentKeys.length) {
      return "modified";
    }

    // Check if all keys and values match
    for (const key of favoriteKeys) {
      const favValue = favorite.parameters[key];
      const currentValue = currentParams[key];

      if (JSON.stringify(favValue) !== JSON.stringify(currentValue)) {
        return "modified";
      }
    }

    return "exact_match";
  }

  // LocalStorage helpers
  private saveToStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.favorites));
    } catch (e) {
      console.warn("Failed to save favorites to localStorage", e);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.favorites = JSON.parse(stored).map((fav: any) => ({
          ...fav,
          createdAt: new Date(fav.createdAt),
          lastUsed: new Date(fav.lastUsed),
        }));
      }
    } catch (e) {
      console.warn("Failed to load favorites from localStorage", e);
    }
  }
}

export const favoritesService = FavoritesService.getInstance();
