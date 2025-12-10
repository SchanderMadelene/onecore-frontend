import { useState, useMemo } from 'react';
import { LeaseContract, LeaseContractType, LeaseContractStatus } from '@/types/leaseContract';

export function useLeaseContractFilters(contracts: LeaseContract[]) {
  const [selectedType, setSelectedType] = useState<LeaseContractType | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<LeaseContractStatus | ''>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Date range filters
  const [fromDateStart, setFromDateStart] = useState<Date | undefined>(undefined);
  const [fromDateEnd, setFromDateEnd] = useState<Date | undefined>(undefined);
  const [lastDebitDateStart, setLastDebitDateStart] = useState<Date | undefined>(undefined);
  const [lastDebitDateEnd, setLastDebitDateEnd] = useState<Date | undefined>(undefined);
  
  // Include contacts option
  const [includeContacts, setIncludeContacts] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(25);
  
  // Dropdown states
  const [openTypeDropdown, setOpenTypeDropdown] = useState(false);
  const [openStatusDropdown, setOpenStatusDropdown] = useState(false);
  const [openDistrictDropdown, setOpenDistrictDropdown] = useState(false);

  const contractTypes: LeaseContractType[] = ['Bostadskontrakt', 'Bilplatskontrakt', 'Förrådkontrakt'];
  const statusOptions: LeaseContractStatus[] = [0, 1, 2, 3, 4, 5];

  const uniqueDistricts = useMemo(() => {
    const districts = contracts
      .map(c => c.district)
      .filter((d): d is string => Boolean(d));
    return [...new Set(districts)].sort();
  }, [contracts]);

  const filterContracts = (contractsToFilter: LeaseContract[]) => {
    return contractsToFilter.filter(contract => {
      // Type filter
      if (selectedType && contract.type !== selectedType) return false;
      
      // Status filter
      if (selectedStatus !== '' && contract.status !== selectedStatus) return false;
      
      // District filter
      if (selectedDistrict && contract.district !== selectedDistrict) return false;
      
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
      
      // Search query (search in lease ID, tenant name, address)
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
    setSelectedStatus('');
    setSelectedDistrict('');
    setSearchQuery('');
    setFromDateStart(undefined);
    setFromDateEnd(undefined);
    setLastDebitDateStart(undefined);
    setLastDebitDateEnd(undefined);
    setPage(1);
  };

  const hasActiveFilters = Boolean(
    selectedType || 
    selectedStatus !== '' || 
    selectedDistrict || 
    searchQuery ||
    fromDateStart ||
    fromDateEnd ||
    lastDebitDateStart ||
    lastDebitDateEnd
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
    selectedStatus,
    setSelectedStatus,
    selectedDistrict,
    setSelectedDistrict,
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
    includeContacts,
    setIncludeContacts,
    page,
    setPage,
    limit,
    openTypeDropdown,
    setOpenTypeDropdown,
    openStatusDropdown,
    setOpenStatusDropdown,
    openDistrictDropdown,
    setOpenDistrictDropdown,
    contractTypes,
    statusOptions,
    uniqueDistricts,
    filterContracts,
    getPaginatedContracts,
    totalPages,
    clearFilters,
    hasActiveFilters
  };
}
