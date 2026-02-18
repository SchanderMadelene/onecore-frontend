import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LeaseContract, LeaseContractType, LeaseContractStatus, LeaseContractSubType } from '../types/leaseContract';

interface PropertyOption {
  id: string;
  name: string;
}

interface BuildingOption {
  id: string;
  name: string;
  propertyId: string;
}

function parseUrlDate(value: string | null): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isNaN(d.getTime()) ? undefined : d;
}

export function useLeaseContractFilters(contracts: LeaseContract[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params
  const [selectedType, setSelectedType] = useState<LeaseContractType | ''>(() => 
    (searchParams.get('type') as LeaseContractType) || '');
  const [selectedSubType, setSelectedSubType] = useState<LeaseContractSubType | ''>(() =>
    (searchParams.get('subType') as LeaseContractSubType) || '');
  const [selectedStatus, setSelectedStatus] = useState<LeaseContractStatus | ''>(() => {
    const s = searchParams.get('status');
    return s !== null ? Number(s) as LeaseContractStatus : '';
  });
  const [selectedDistrict, setSelectedDistrict] = useState<string>(() => searchParams.get('district') || '');
  const [selectedProperty, setSelectedProperty] = useState<string>(() => searchParams.get('property') || '');
  const [selectedBuilding, setSelectedBuilding] = useState<string>(() => searchParams.get('building') || '');
  const [selectedKvvArea, setSelectedKvvArea] = useState<string>(() => searchParams.get('kvvArea') || '');
  const [selectedCostCenter, setSelectedCostCenter] = useState<string>(() => searchParams.get('costCenter') || '');
  const [selectedMarketArea, setSelectedMarketArea] = useState<string>(() => searchParams.get('marketArea') || '');
  const [selectedRentRow, setSelectedRentRow] = useState<string>(() => searchParams.get('rentRow') || '');
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') || '');
  
  // Date range filters
  const [fromDateStart, setFromDateStart] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('fromDateStart')));
  const [fromDateEnd, setFromDateEnd] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('fromDateEnd')));
  const [lastDebitDateStart, setLastDebitDateStart] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('lastDebitDateStart')));
  const [lastDebitDateEnd, setLastDebitDateEnd] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('lastDebitDateEnd')));
  const [noticeDateStart, setNoticeDateStart] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('noticeDateStart')));
  const [noticeDateEnd, setNoticeDateEnd] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('noticeDateEnd')));
  const [terminationDateStart, setTerminationDateStart] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('terminationDateStart')));
  const [terminationDateEnd, setTerminationDateEnd] = useState<Date | undefined>(() => parseUrlDate(searchParams.get('terminationDateEnd')));
  
  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  
  // Dropdown states
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openDistrictDropdown, setOpenDistrictDropdown] = useState(false);
  const [openPropertyDropdown, setOpenPropertyDropdown] = useState(false);
  const [openBuildingDropdown, setOpenBuildingDropdown] = useState(false);

  const contractTypes: LeaseContractType[] = ['Bostadskontrakt', 'Bilplatskontrakt', 'Förrådkontrakt'];
  const subTypes: LeaseContractSubType[] = ['standard', 'andrahand', 'korttid'];
  const statusOptions: LeaseContractStatus[] = [0, 1, 2, 3, 4, 5, 6];

  // Extract unique properties from contracts
  const uniqueProperties = useMemo((): PropertyOption[] => {
    const propertyMap = new Map<string, string>();
    contracts.forEach(c => {
      if (c.propertyId && c.propertyName) {
        propertyMap.set(c.propertyId, c.propertyName);
      }
    });
    return Array.from(propertyMap.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contracts]);

  // Extract unique buildings from contracts - filtered by selected property if one is selected
  const uniqueBuildings = useMemo((): BuildingOption[] => {
    const buildingMap = new Map<string, BuildingOption>();
    contracts.forEach(c => {
      if (c.buildingId && c.buildingName && c.propertyId) {
        buildingMap.set(c.buildingId, {
          id: c.buildingId,
          name: c.buildingName,
          propertyId: c.propertyId
        });
      }
    });
    return Array.from(buildingMap.values())
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [contracts]);

  // Get available buildings based on selected property
  const availableBuildings = useMemo((): BuildingOption[] => {
    if (!selectedProperty) {
      return uniqueBuildings;
    }
    return uniqueBuildings.filter(b => b.propertyId === selectedProperty);
  }, [uniqueBuildings, selectedProperty]);

  // Cascading reset: clear building selection when property changes
  useEffect(() => {
    if (selectedProperty && selectedBuilding) {
      const buildingBelongsToProperty = uniqueBuildings.some(
        b => b.id === selectedBuilding && b.propertyId === selectedProperty
      );
      if (!buildingBelongsToProperty) {
        setSelectedBuilding('');
      }
    }
  }, [selectedProperty, selectedBuilding, uniqueBuildings]);

  const uniqueDistricts = useMemo(() => {
    const districts = contracts
      .map(c => c.district)
      .filter((d): d is string => Boolean(d));
    return [...new Set(districts)].sort();
  }, [contracts]);

  const uniqueKvvAreas = useMemo(() => {
    const areas = contracts
      .map(c => c.kvvArea)
      .filter((a): a is string => Boolean(a));
    return [...new Set(areas)].sort();
  }, [contracts]);

  const uniqueCostCenters = useMemo(() => {
    const centers = contracts
      .map(c => c.costCenter)
      .filter((c): c is string => Boolean(c));
    return [...new Set(centers)].sort();
  }, [contracts]);

  const uniqueMarketAreas = useMemo(() => {
    const areas = contracts
      .map(c => c.marketArea)
      .filter((a): a is string => Boolean(a));
    return [...new Set(areas)].sort();
  }, [contracts]);

  const uniqueRentRows = useMemo(() => {
    const descriptions = new Set<string>();
    contracts.forEach(c => {
      c.rentRows?.forEach(rr => descriptions.add(rr.description));
    });
    return [...descriptions].sort();
  }, [contracts]);

  const filterContracts = (contractsToFilter: LeaseContract[]) => {
    return contractsToFilter.filter(contract => {
      if (selectedType && contract.type !== selectedType) return false;
      if (selectedSubType && contract.subType !== selectedSubType) return false;
      if (selectedStatus !== '' && contract.status !== selectedStatus) return false;
      if (selectedDistrict && contract.district !== selectedDistrict) return false;
      if (selectedProperty && contract.propertyId !== selectedProperty) return false;
      if (selectedBuilding && contract.buildingId !== selectedBuilding) return false;
      if (selectedKvvArea && contract.kvvArea !== selectedKvvArea) return false;
      if (selectedCostCenter && contract.costCenter !== selectedCostCenter) return false;
      if (selectedMarketArea && contract.marketArea !== selectedMarketArea) return false;
      
      // Rent row filter
      if (selectedRentRow) {
        const hasRentRow = contract.rentRows?.some(rr => rr.description === selectedRentRow);
        if (!hasRentRow) return false;
      }
      
      // Date range filter for lease start date
      if (fromDateStart || fromDateEnd) {
        const leaseStart = contract.leaseStartDate ? new Date(contract.leaseStartDate) : null;
        if (!leaseStart) return false;
        if (fromDateStart && leaseStart < fromDateStart) return false;
        if (fromDateEnd && leaseStart > fromDateEnd) return false;
      }
      
      // Date range filter for last debit date
      if (lastDebitDateStart || lastDebitDateEnd) {
        const lastDebit = contract.lastDebitDate ? new Date(contract.lastDebitDate) : null;
        if (!lastDebit) return false;
        if (lastDebitDateStart && lastDebit < lastDebitDateStart) return false;
        if (lastDebitDateEnd && lastDebit > lastDebitDateEnd) return false;
      }

      // Date range filter for notice date
      if (noticeDateStart || noticeDateEnd) {
        const notice = contract.noticeDate ? new Date(contract.noticeDate) : null;
        if (!notice) return false;
        if (noticeDateStart && notice < noticeDateStart) return false;
        if (noticeDateEnd && notice > noticeDateEnd) return false;
      }

      // Date range filter for termination/move-out date
      if (terminationDateStart || terminationDateEnd) {
        const termDate = contract.terminationDate 
          ? new Date(contract.terminationDate) 
          : contract.preferredMoveOutDate 
            ? new Date(contract.preferredMoveOutDate) 
            : null;
        if (!termDate) return false;
        if (terminationDateStart && termDate < terminationDateStart) return false;
        if (terminationDateEnd && termDate > terminationDateEnd) return false;
      }
      
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const tenantName = contract.tenants[0]?.fullName?.toLowerCase() || '';
        const address = contract.tenants[0]?.address?.street?.toLowerCase() || '';
        const leaseId = contract.leaseId.toLowerCase();
        
        if (!tenantName.includes(query) && !address.includes(query) && !leaseId.includes(query)) {
          return false;
        }
      }
      
      return true;
    });
  };

  const clearFilters = () => {
    setSelectedType('');
    setSelectedSubType('');
    setSelectedStatus('');
    setSelectedDistrict('');
    setSelectedProperty('');
    setSelectedBuilding('');
    setSelectedKvvArea('');
    setSelectedCostCenter('');
    setSelectedMarketArea('');
    setSelectedRentRow('');
    setSearchQuery('');
    setFromDateStart(undefined);
    setFromDateEnd(undefined);
    setLastDebitDateStart(undefined);
    setLastDebitDateEnd(undefined);
    setNoticeDateStart(undefined);
    setNoticeDateEnd(undefined);
    setTerminationDateStart(undefined);
    setTerminationDateEnd(undefined);
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    selectedType || 
    selectedSubType ||
    selectedStatus !== '' || 
    selectedDistrict || 
    selectedProperty ||
    selectedBuilding ||
    selectedKvvArea ||
    selectedCostCenter ||
    selectedMarketArea ||
    selectedRentRow ||
    searchQuery ||
    fromDateStart ||
    fromDateEnd ||
    lastDebitDateStart ||
    lastDebitDateEnd ||
    noticeDateStart ||
    noticeDateEnd ||
    terminationDateStart ||
    terminationDateEnd
  );

  // Pagination helpers
  const getPaginatedContracts = (filteredContracts: LeaseContract[]) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return filteredContracts.slice(startIndex, endIndex);
  };

  const totalPages = (totalItems: number) => Math.ceil(totalItems / limit);

  return {
    selectedType,
    setSelectedType,
    selectedSubType,
    setSelectedSubType,
    selectedStatus,
    setSelectedStatus,
    selectedDistrict,
    setSelectedDistrict,
    selectedProperty,
    setSelectedProperty,
    selectedBuilding,
    setSelectedBuilding,
    selectedKvvArea,
    setSelectedKvvArea,
    selectedCostCenter,
    setSelectedCostCenter,
    selectedMarketArea,
    setSelectedMarketArea,
    selectedRentRow,
    setSelectedRentRow,
    searchQuery,
    setSearchQuery,
    fromDateStart,
    setFromDateStart,
    fromDateEnd,
    setFromDateEnd,
    lastDebitDateStart,
    setLastDebitDateStart,
    lastDebitDateEnd,
    setLastDebitDateEnd,
    noticeDateStart,
    setNoticeDateStart,
    noticeDateEnd,
    setNoticeDateEnd,
    terminationDateStart,
    setTerminationDateStart,
    terminationDateEnd,
    setTerminationDateEnd,
    page,
    setPage,
    limit,
    openTypeDropdown,
    setOpenTypeDropdown,
    openStatusDropdown,
    setOpenStatusDropdown,
    openDistrictDropdown,
    setOpenDistrictDropdown,
    openPropertyDropdown,
    setOpenPropertyDropdown,
    openBuildingDropdown,
    setOpenBuildingDropdown,
    contractTypes,
    subTypes,
    statusOptions,
    uniqueDistricts,
    uniqueProperties,
    availableBuildings,
    uniqueKvvAreas,
    uniqueCostCenters,
    uniqueMarketAreas,
    uniqueRentRows,
    filterContracts,
    getPaginatedContracts,
    totalPages,
    clearFilters,
    hasActiveFilters
  };
}
