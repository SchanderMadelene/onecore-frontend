import { useState, useEffect, useCallback } from "react";
import { Favorite, FavoriteCategory, FavoriteParameters, FavoriteVisibility } from "@/types/favorites";
import { favoritesService } from "@/services/favoritesService";
import { useNavigate, useLocation } from "react-router-dom";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [activeFavorite, setActiveFavoriteState] = useState<Favorite | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Load favorites on mount
  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
    setActiveFavoriteState(favoritesService.getActiveFavorite());
  }, []);

  // Reload favorites
  const reloadFavorites = useCallback(() => {
    setFavorites(favoritesService.getFavorites());
    setActiveFavoriteState(favoritesService.getActiveFavorite());
  }, []);

  // Create favorite from current page
  const createFavorite = useCallback((
    name: string,
    description: string | undefined,
    category: FavoriteCategory,
    pageTitle: string,
    visibility: FavoriteVisibility,
    icon?: string
  ) => {
    // Parse current URL parameters
    const searchParams = new URLSearchParams(location.search);
    const parameters: FavoriteParameters = {};
    
    searchParams.forEach((value, key) => {
      const existing = parameters[key];
      if (existing) {
        // Convert to array if multiple values
        parameters[key] = Array.isArray(existing) 
          ? [...existing, value] 
          : [String(existing), value];
      } else {
        parameters[key] = value;
      }
    });

    const favorite = favoritesService.createFromCurrentPage(
      name,
      description,
      category,
      location.pathname,
      parameters,
      pageTitle,
      visibility,
      icon
    );

    reloadFavorites();
    return favorite;
  }, [location, reloadFavorites]);

  // Create favorite with custom parameters
  const createCustomFavorite = useCallback((
    name: string,
    description: string | undefined,
    category: FavoriteCategory,
    targetUrl: string,
    parameters: FavoriteParameters,
    pageTitle: string,
    visibility: FavoriteVisibility,
    icon?: string
  ) => {
    const favorite = favoritesService.createFromCurrentPage(
      name,
      description,
      category,
      targetUrl,
      parameters,
      pageTitle,
      visibility,
      icon
    );

    reloadFavorites();
    return favorite;
  }, [reloadFavorites]);

  // Navigate to favorite
  const navigateToFavorite = useCallback((favorite: Favorite) => {
    favoritesService.useFavorite(favorite.id);
    favoritesService.setActiveFavorite(favorite.id);
    const url = favoritesService.buildUrlWithParameters(favorite);
    navigate(url);
    reloadFavorites();
  }, [navigate, reloadFavorites]);

  // Set active favorite
  const setActiveFavorite = useCallback((favoriteId: string) => {
    favoritesService.setActiveFavorite(favoriteId);
    setActiveFavoriteState(favoritesService.getActiveFavorite());
  }, []);

  // Clear active favorite
  const clearActiveFavorite = useCallback(() => {
    favoritesService.clearActiveFavorite();
    setActiveFavoriteState(null);
  }, []);

  // Check current URL status
  const getCurrentUrlStatus = useCallback(() => {
    if (!activeFavorite) return "no_match";
    const searchParams = new URLSearchParams(location.search);
    return favoritesService.compareUrlWithFavorite(location.pathname, searchParams, activeFavorite);
  }, [activeFavorite, location]);

  // Update favorite
  const updateFavorite = useCallback((
    id: string,
    updates: Partial<Omit<Favorite, 'id' | 'createdAt'>>
  ) => {
    favoritesService.updateFavorite(id, updates);
    reloadFavorites();
  }, [reloadFavorites]);

  // Delete favorite
  const deleteFavorite = useCallback((id: string) => {
    favoritesService.deleteFavorite(id);
    reloadFavorites();
  }, [reloadFavorites]);

  // Get favorites by category
  const getFavoritesByCategory = useCallback((category: FavoriteCategory) => {
    return favoritesService.getFavoritesByCategory(category);
  }, []);

  // Share favorite
  const shareFavorite = useCallback((id: string) => {
    return favoritesService.shareFavorite(id);
  }, []);

  // Export/Import
  const exportFavorites = useCallback(() => {
    return favoritesService.exportFavorites();
  }, []);

  const importFavorites = useCallback((jsonData: string) => {
    const count = favoritesService.importFavorites(jsonData);
    reloadFavorites();
    return count;
  }, [reloadFavorites]);

  return {
    favorites,
    activeFavorite,
    createFavorite,
    createCustomFavorite,
    navigateToFavorite,
    updateFavorite,
    deleteFavorite,
    getFavoritesByCategory,
    shareFavorite,
    exportFavorites,
    importFavorites,
    reloadFavorites,
    setActiveFavorite,
    clearActiveFavorite,
    getCurrentUrlStatus,
  };
}
