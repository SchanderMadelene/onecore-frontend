import { SearchResult, SearchResultType, SavedSearch } from "@/types/search";
import { mockGlobalSearchResults } from "@/features/search";
import { mockSavedSearches, mockSearchHistory } from "@/features/search/data/searchData";
import { detectIdentifierType, IdentifierMatch, getEntityTypeForIdentifier } from "@/utils/searchIdentifiers";

export interface SearchResponse {
  exactMatch: SearchResult | null;
  relatedResults: SearchResult[];
  identifierMatch: IdentifierMatch | null;
}

class GlobalSearchService {
  private static instance: GlobalSearchService;
  private searchHistory: string[] = [...mockSearchHistory];
  private savedSearches: SavedSearch[] = [...mockSavedSearches];

  static getInstance(): GlobalSearchService {
    if (!GlobalSearchService.instance) {
      GlobalSearchService.instance = new GlobalSearchService();
    }
    return GlobalSearchService.instance;
  }

  // Enhanced search with exact match detection
  async searchWithExactMatch(query: string, filters: SearchResultType[] = []): Promise<SearchResponse> {
    if (!query.trim()) {
      return { exactMatch: null, relatedResults: [], identifierMatch: null };
    }

    const normalizedQuery = query.toLowerCase().trim();
    const identifierMatch = detectIdentifierType(query);
    
    let exactMatch: SearchResult | null = null;
    let relatedResults: SearchResult[] = [];

    // If we detected an identifier, search for exact match first
    if (identifierMatch) {
      exactMatch = this.findExactMatch(identifierMatch);
    }

    // Then perform fuzzy search for related results
    relatedResults = mockGlobalSearchResults
      .map(result => ({
        ...result,
        score: this.calculateRelevanceScore(result, normalizedQuery, identifierMatch)
      }))
      .filter(result => {
        // Exclude the exact match from related results
        if (exactMatch && result.id === exactMatch.id) return false;
        // Apply type filters if any
        if (filters.length > 0 && !filters.includes(result.type)) return false;
        // Only include results with a score above threshold
        return result.score > 0;
      })
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 15);

    // Add search to history
    this.addToHistory(query);

    return { exactMatch, relatedResults, identifierMatch };
  }

  // Find exact match based on identifier
  private findExactMatch(identifierMatch: IdentifierMatch): SearchResult | null {
    const { type, normalizedValue } = identifierMatch;
    
    for (const result of mockGlobalSearchResults) {
      if (!result.identifiers) continue;

      const identifierValue = result.identifiers[type];
      if (!identifierValue) continue;

      // Normalize both values for comparison
      const normalizedIdentifier = identifierValue.replace(/[-\s]/g, '').toUpperCase();
      const normalizedSearch = normalizedValue.replace(/[-\s]/g, '').toUpperCase();

      if (normalizedIdentifier === normalizedSearch) {
        return result;
      }
    }

    return null;
  }

  // Legacy search method (keep for backwards compatibility)
  async search(query: string, filters: SearchResultType[] = []): Promise<SearchResult[]> {
    const response = await this.searchWithExactMatch(query, filters);
    const results = response.exactMatch 
      ? [response.exactMatch, ...response.relatedResults]
      : response.relatedResults;
    return results;
  }

  // Enhanced relevance scoring
  private calculateRelevanceScore(
    result: SearchResult, 
    query: string, 
    identifierMatch: IdentifierMatch | null
  ): number {
    let score = 0;
    const queryWords = query.split(' ');

    // If identifier detected, boost results of matching entity type
    if (identifierMatch) {
      const expectedEntityType = getEntityTypeForIdentifier(identifierMatch.type);
      if (result.type === expectedEntityType) {
        score += 50;
      }
    }

    // Title match (highest weight)
    if (result.title.toLowerCase().includes(query)) {
      score += 100;
    }
    
    // Partial title matches
    queryWords.forEach(word => {
      if (result.title.toLowerCase().includes(word)) {
        score += 50;
      }
    });

    // Subtitle match (includes identifiers like personnummer)
    if (result.subtitle.toLowerCase().includes(query)) {
      score += 90;
    }

    // Description match
    if (result.description?.toLowerCase().includes(query)) {
      score += 25;
    }

    // Metadata matches
    if (result.metadata) {
      Object.values(result.metadata).forEach(value => {
        if (typeof value === 'string' && value.toLowerCase().includes(query)) {
          score += 15;
        }
      });
    }

    // Identifier field matches
    if (result.identifiers) {
      Object.values(result.identifiers).forEach(value => {
        if (typeof value === 'string') {
          const normalizedValue = value.replace(/[-\s]/g, '').toLowerCase();
          const normalizedQuery = query.replace(/[-\s]/g, '').toLowerCase();
          if (normalizedValue.includes(normalizedQuery)) {
            score += 80;
          }
        }
      });
    }

    // Boost certain types
    switch (result.type) {
      case 'customer':
        score += 10;
        break;
      case 'residence':
        score += 8;
        break;
      case 'case':
        score += 6;
        break;
    }

    return score;
  }

  // Get search suggestions based on partial input
  getSuggestions(partialQuery: string): string[] {
    if (partialQuery.length < 2) return [];
    
    const suggestions = new Set<string>();
    const normalized = partialQuery.toLowerCase();

    // Add suggestions from existing data
    mockGlobalSearchResults.forEach(result => {
      const titleWords = result.title.toLowerCase().split(' ');
      const subtitleWords = result.subtitle.toLowerCase().split(' ');
      
      [...titleWords, ...subtitleWords].forEach(word => {
        if (word.startsWith(normalized) && word.length > normalized.length) {
          suggestions.add(word);
        }
      });

      // Add full titles that match
      if (result.title.toLowerCase().includes(normalized)) {
        suggestions.add(result.title);
      }
    });

    // Add from search history
    this.searchHistory.forEach(historyItem => {
      if (historyItem.toLowerCase().includes(normalized)) {
        suggestions.add(historyItem);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  // History management
  addToHistory(query: string): void {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    // Remove if already exists
    this.searchHistory = this.searchHistory.filter(item => item !== trimmedQuery);
    
    // Add to beginning
    this.searchHistory.unshift(trimmedQuery);
    
    // Keep only last 50 searches
    this.searchHistory = this.searchHistory.slice(0, 50);
    
    // Save to localStorage
    this.saveHistoryToStorage();
  }

  getSearchHistory(): string[] {
    return this.searchHistory.slice(0, 10);
  }

  clearHistory(): void {
    this.searchHistory = [];
    this.saveHistoryToStorage();
  }

  // Saved searches management
  getSavedSearches(): SavedSearch[] {
    return this.savedSearches.sort((a, b) => b.lastUsed.getTime() - a.lastUsed.getTime());
  }

  saveSearch(name: string, query: string, filters: SearchResultType[]): SavedSearch {
    const savedSearch: SavedSearch = {
      id: `saved-${Date.now()}`,
      name,
      query,
      filters,
      createdAt: new Date(),
      lastUsed: new Date(),
      useCount: 1
    };

    this.savedSearches.push(savedSearch);
    this.saveFavoritesToStorage();
    return savedSearch;
  }

  deleteSavedSearch(id: string): void {
    this.savedSearches = this.savedSearches.filter(search => search.id !== id);
    this.saveFavoritesToStorage();
  }

  useSavedSearch(id: string): SavedSearch | null {
    const search = this.savedSearches.find(s => s.id === id);
    if (search) {
      search.lastUsed = new Date();
      search.useCount++;
      this.saveFavoritesToStorage();
    }
    return search || null;
  }

  // LocalStorage helpers
  private saveHistoryToStorage(): void {
    try {
      localStorage.setItem('mimer-search-history', JSON.stringify(this.searchHistory));
    } catch (e) {
      console.warn('Failed to save search history to localStorage');
    }
  }

  private saveFavoritesToStorage(): void {
    try {
      localStorage.setItem('mimer-saved-searches', JSON.stringify(this.savedSearches));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage');
    }
  }

  private loadFromStorage(): void {
    try {
      const history = localStorage.getItem('mimer-search-history');
      if (history) {
        this.searchHistory = JSON.parse(history);
      }

      const favorites = localStorage.getItem('mimer-saved-searches');
      if (favorites) {
        this.savedSearches = JSON.parse(favorites).map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          lastUsed: new Date(item.lastUsed)
        }));
      }
    } catch (e) {
      console.warn('Failed to load search data from localStorage');
    }
  }

  constructor() {
    this.loadFromStorage();
  }
}

export const globalSearchService = GlobalSearchService.getInstance();
