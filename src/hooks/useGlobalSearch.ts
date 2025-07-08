import { useState, useEffect, useCallback, useMemo } from "react";
import { SearchResult, SearchResultType, SearchState, SavedSearch } from "@/types/search";
import { globalSearchService } from "@/services/globalSearchService";
import { useDebounce } from "./useDebounce";

const SEARCH_FILTERS = [
  { type: "customer" as const, label: "Kunder", icon: "", active: false },
  { type: "residence" as const, label: "Bostäder", icon: "🏠", active: false },
  { type: "case" as const, label: "Ärenden", icon: "📌", active: false },
  { type: "invoice" as const, label: "Fakturor", icon: "🧾", active: false },
  { type: "key" as const, label: "Nycklar", icon: "🗝️", active: false },
  { type: "document" as const, label: "Dokument", icon: "📄", active: false },
];

export function useGlobalSearch() {
  const [searchState, setSearchState] = useState<SearchState>({
    query: "",
    results: [],
    filters: SEARCH_FILTERS,
    isLoading: false,
    isOpen: false,
    favorites: [],
    history: []
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedQuery = useDebounce(searchState.query, 300);

  // Load initial data
  useEffect(() => {
    setSearchState(prev => ({
      ...prev,
      favorites: globalSearchService.getSavedSearches(),
      history: globalSearchService.getSearchHistory()
    }));
  }, []);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery);
    } else {
      setSearchState(prev => ({ ...prev, results: [], isLoading: false }));
    }
  }, [debouncedQuery]);

  // Get suggestions as user types
  useEffect(() => {
    if (searchState.query.length >= 2) {
      const newSuggestions = globalSearchService.getSuggestions(searchState.query);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchState.query]);

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setSearchState(prev => ({ ...prev, isLoading: true }));

    try {
      const activeFilters = searchState.filters
        .filter(f => f.active)
        .map(f => f.type);
      
      const results = await globalSearchService.search(query, activeFilters);
      
      setSearchState(prev => ({ 
        ...prev, 
        results, 
        isLoading: false,
        history: globalSearchService.getSearchHistory()
      }));
    } catch (error) {
      console.error("Search failed:", error);
      setSearchState(prev => ({ ...prev, isLoading: false }));
    }
  }, [searchState.filters]);

  const setQuery = useCallback((query: string) => {
    setSearchState(prev => ({ ...prev, query }));
  }, []);

  const toggleFilter = useCallback((filterType: SearchResultType) => {
    setSearchState(prev => ({
      ...prev,
      filters: prev.filters.map(filter => 
        filter.type === filterType 
          ? { ...filter, active: !filter.active }
          : filter
      )
    }));

    // Re-search with new filters if there's a query
    if (debouncedQuery.trim()) {
      setTimeout(() => performSearch(debouncedQuery), 100);
    }
  }, [debouncedQuery, performSearch]);

  const clearFilters = useCallback(() => {
    setSearchState(prev => ({
      ...prev,
      filters: prev.filters.map(filter => ({ ...filter, active: false }))
    }));

    if (debouncedQuery.trim()) {
      setTimeout(() => performSearch(debouncedQuery), 100);
    }
  }, [debouncedQuery, performSearch]);

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
      isLoading: false 
    }));
    setSuggestions([]);
  }, []);

  const saveCurrentSearch = useCallback((name: string) => {
    if (!searchState.query.trim()) return null;

    const activeFilters = searchState.filters
      .filter(f => f.active)
      .map(f => f.type);

    const savedSearch = globalSearchService.saveSearch(
      name, 
      searchState.query, 
      activeFilters
    );

    setSearchState(prev => ({
      ...prev,
      favorites: globalSearchService.getSavedSearches()
    }));

    return savedSearch;
  }, [searchState.query, searchState.filters]);

  const useSavedSearch = useCallback((savedSearch: SavedSearch) => {
    // Set the query
    setSearchState(prev => ({ ...prev, query: savedSearch.query }));

    // Set the filters
    setSearchState(prev => ({
      ...prev,
      filters: prev.filters.map(filter => ({
        ...filter,
        active: savedSearch.filters.includes(filter.type)
      }))
    }));

    // Mark as used
    globalSearchService.useSavedSearch(savedSearch.id);
    
    // Update favorites list
    setSearchState(prev => ({
      ...prev,
      favorites: globalSearchService.getSavedSearches()
    }));
  }, []);

  const deleteSavedSearch = useCallback((id: string) => {
    globalSearchService.deleteSavedSearch(id);
    setSearchState(prev => ({
      ...prev,
      favorites: globalSearchService.getSavedSearches()
    }));
  }, []);

  // Group results by type for better display
  const groupedResults = useMemo(() => {
    const groups: Record<SearchResultType, SearchResult[]> = {
      customer: [],
      residence: [],
      case: [],
      invoice: [],
      key: [],
      document: []
    };

    searchState.results.forEach(result => {
      groups[result.type].push(result);
    });

    return Object.entries(groups)
      .map(([type, results]) => ({
        type: type as SearchResultType,
        results,
        count: results.length,
        label: SEARCH_FILTERS.find(f => f.type === type)?.label || type,
        icon: SEARCH_FILTERS.find(f => f.type === type)?.icon || "📄"
      }))
      .filter(group => group.count > 0);
  }, [searchState.results]);

  return {
    // State
    ...searchState,
    suggestions,
    groupedResults,
    hasActiveFilters: searchState.filters.some(f => f.active),
    
    // Actions
    setQuery,
    toggleFilter,
    clearFilters,
    openSearch,
    closeSearch,
    clearSearch,
    saveCurrentSearch,
    useSavedSearch,
    deleteSavedSearch,
    performSearch: () => performSearch(searchState.query)
  };
}