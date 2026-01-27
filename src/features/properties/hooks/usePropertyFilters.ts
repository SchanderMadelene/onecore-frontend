import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { mockProperties } from "@/features/properties/data";
import { mockSearchResults, SearchResult } from "@/data/search";
import { Property } from "@/types/api";

type SearchTypeFilter = "property" | "building" | "apartment" | "maintenance" | "buildingpart";

export const usePropertyFilters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "bostad" | "kontor">("all");
  const [districtFilter, setDistrictFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [designationFilter, setDesignationFilter] = useState<string>("all");
  const [propertyManagerFilter, setPropertyManagerFilter] = useState<string>("all");
  const [marketAreaFilter, setMarketAreaFilter] = useState<string>("all");
  const [propertyNumberFilter, setPropertyNumberFilter] = useState<string>("all");
  const [searchTypeFilter, setSearchTypeFilter] = useState<SearchTypeFilter>("property");
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Apartment filters
  const [sizeFilter, setSizeFilter] = useState({ min: "", max: "" });
  const [rentFilter, setRentFilter] = useState({ min: "", max: "" });
  const [hasContractFilter, setHasContractFilter] = useState<string>("all");
  const [contractStatusFilter, setContractStatusFilter] = useState<string>("all");

  // Simulate loading when filters change
  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, filter, districtFilter, areaFilter, designationFilter, propertyManagerFilter, marketAreaFilter, propertyNumberFilter, searchTypeFilter, sizeFilter, rentFilter, hasContractFilter, contractStatusFilter]);

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

  // Filter the search results by type and search query
  const filteredSearchResults = searchResults.filter(item => {
    const matchesSearch = 
      searchQuery.trim() === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = item.type === searchTypeFilter;
    
    // Apartment-specific filters
    if (searchTypeFilter === "apartment") {
      const matchesSize = 
        (sizeFilter.min === "" || (item.size && item.size >= parseInt(sizeFilter.min))) &&
        (sizeFilter.max === "" || (item.size && item.size <= parseInt(sizeFilter.max)));
      
      const matchesRent = 
        (rentFilter.min === "" || (item.rent && item.rent >= parseInt(rentFilter.min))) &&
        (rentFilter.max === "" || (item.rent && item.rent <= parseInt(rentFilter.max)));
      
      const matchesHasContract = 
        hasContractFilter === "all" ||
        (hasContractFilter === "yes" && item.hasContract === true) ||
        (hasContractFilter === "no" && item.hasContract === false);
      
      const matchesContractStatus = 
        contractStatusFilter === "all" ||
        item.contractStatus === contractStatusFilter;
      
      return matchesSearch && matchesType && matchesSize && matchesRent && matchesHasContract && matchesContractStatus;
    }
    
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

    const matchesDesignation = 
      designationFilter === "all" || 
      property.designation === designationFilter;

    const matchesPropertyManager = 
      propertyManagerFilter === "all" || 
      property.propertyManager === propertyManagerFilter;

    const matchesMarketArea = 
      marketAreaFilter === "all" || 
      property.marketArea === marketAreaFilter;

    const matchesPropertyNumber = 
      propertyNumberFilter === "all" || 
      property.propertyNumber === propertyNumberFilter;
    
    return matchesSearch && matchesFilter && matchesDistrict && matchesArea && 
           matchesDesignation && matchesPropertyManager && matchesMarketArea && matchesPropertyNumber;
  });

  // Always show search results for building and apartment types
  // or when there's a search query for properties
  const showSearchResults = 
    searchTypeFilter === "building" || 
    searchTypeFilter === "apartment" ||
    searchTypeFilter === "maintenance" ||
    searchTypeFilter === "buildingpart" ||
    (searchTypeFilter === "property" && searchQuery.trim() !== "");

  return {
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    districtFilter,
    setDistrictFilter,
    areaFilter,
    setAreaFilter,
    designationFilter,
    setDesignationFilter,
    propertyManagerFilter,
    setPropertyManagerFilter,
    marketAreaFilter,
    setMarketAreaFilter,
    propertyNumberFilter,
    setPropertyNumberFilter,
    searchTypeFilter,
    setSearchTypeFilter,
    sizeFilter,
    setSizeFilter,
    rentFilter,
    setRentFilter,
    hasContractFilter,
    setHasContractFilter,
    contractStatusFilter,
    setContractStatusFilter,
    properties,
    filteredProperties,
    filteredSearchResults,
    allDistricts: [...new Set(properties?.map(p => p.district) || [])],
    allAreas: [...new Set(properties?.map(p => p.propertyManagerArea) || [])],
    allDesignations: [...new Set(properties?.map(p => p.designation) || [])],
    allPropertyManagers: [...new Set(properties?.map(p => p.propertyManager).filter(Boolean) || [])],
    allMarketAreas: [...new Set(properties?.map(p => p.marketArea).filter(Boolean) || [])],
    allPropertyNumbers: [...new Set(properties?.map(p => p.propertyNumber).filter(Boolean) || [])],
    showSearchResults,
    isFiltering
  };
};
