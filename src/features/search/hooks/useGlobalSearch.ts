import { useState, useEffect, useCallback } from "react";
import { SearchState, IdentifierMatch } from "@/types/search";
import { globalSearchService } from "@/services/globalSearchService";
import { useDebounce } from "@/hooks/useDebounce";
import { detectIdentifierType } from "@/utils/searchIdentifiers";

export function useGlobalSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    filters: [],
    isLoading: false,
    isOpen: false,
    favorites: [],
    history: [],
    identifierMatch: null,
    exactMatch: null
  });

  const debouncedQuery = useDebounce(searchState.query, 300);

  // Load search history on mount
  useEffect(() => {
    setSearchState(prev => ({
      ...prev,
      history: globalSearchService.getSearchHistory()
    }));
  }, []);

  // Detect identifier type immediately when query changes
  useEffect(() => {
    const identifierMatch = detectIdentifierType(searchState.query);
    setSearchState(prev => ({ ...prev, identifierMatch }));
  }, [searchState.query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setSearchState(prev => ({ 
        ...prev, 
        results: [], 
        isLoading: false,
        exactMatch: null 
      }));
    }
  }, [debouncedQuery]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setSearchState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await globalSearchService.searchWithExactMatch(query, []);
      
      setSearchState(prev => ({ 
        ...prev, 
        results: response.relatedResults,
        exactMatch: response.exactMatch,
        identifierMatch: response.identifierMatch,
        isLoading: false,
        history: globalSearchService.getSearchHistory()
      }));
    } catch (error) {
      setSearchState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const setQuery = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  }, []);

  const openSearch = useCallback(() => {
    setSearchState(prev => ({ ...prev, isOpen: true }));
  }, []);

  const closeSearch = useCallback(() => {
    setSearchState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState(prev => ({ 
      ...prev, 
      query: "", 
      results: [], 
      isLoading: false,
      exactMatch: null,
      identifierMatch: null
    }));
  }, []);

  return {
    query: searchState.query,
    isLoading: searchState.isLoading,
    isOpen: searchState.isOpen,
    history: searchState.history,
    identifierMatch: searchState.identifierMatch,
    exactMatch: searchState.exactMatch,
    setQuery,
    openSearch,
    closeSearch,
    clearSearch,
  };
}