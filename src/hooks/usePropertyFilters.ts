
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockProperties } from "@/data/properties";
import { mockSearchResults, SearchResult } from "@/data/search";
import { Property } from "@/types/api";

type SearchTypeFilter = "all" | "property" | "building" | "apartment";

export const usePropertyFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "bostad" | "kontor">("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [searchTypeFilter, setSearchTypeFilter] = useState<SearchTypeFilter>("all");

  // Property data for the regular property list
  const { data: properties } = useQuery<Property[]>({
    queryKey: ['properties'],
    queryFn: () => Promise.resolve(mockProperties)
  });

  // Search results data for the enhanced search
  const { data: searchResults = [] } = useQuery<SearchResult[]>({
    queryKey: ['searchResults'],
    queryFn: () => Promise.resolve(mockSearchResults)
  });

  const allDistricts = [...new Set(properties?.map(p => p.district) || [])];
  const allAreas = [...new Set(properties?.map(p => p.propertyManagerArea) || [])];

  // Filter the search results by type if a specific type is selected
  const filteredSearchResults = searchResults.filter(item => {
    const matchesSearch = searchQuery.trim() !== "" && (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    const matchesType = 
      searchTypeFilter === "all" || 
      item.type === searchTypeFilter;
    
    return matchesSearch && matchesType;
  });

  // Regular property filtering logic
  const filteredProperties = properties?.filter(property => {
    const matchesSearch = 
      searchQuery === "" || (
        property.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "bostad" && property.purpose === "Bostad") || 
      (filter === "kontor" && property.purpose === "Kontor");

    const matchesDistrict = 
      districtFilter === "all" || 
      property.district === districtFilter;

    const matchesArea = 
      areaFilter === "all" || 
      property.propertyManagerArea === areaFilter;
    
    return matchesSearch && matchesFilter && matchesDistrict && matchesArea;
  });

  // Use search results when there's a search query, otherwise use filtered properties
  const showSearchResults = searchQuery.trim() !== "";

  return {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    districtFilter,
    setDistrictFilter,
    areaFilter,
    setAreaFilter,
    searchTypeFilter,
    setSearchTypeFilter,
    properties,
    filteredProperties,
    filteredSearchResults,
    allDistricts,
    allAreas,
    showSearchResults
  };
};
