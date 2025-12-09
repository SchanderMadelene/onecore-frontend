import { useState, useMemo } from 'react';
import { LeaseContract, LeaseContractType, LeaseContractStatus } from '@/types/leaseContract';

export function useLeaseContractFilters(contracts: LeaseContract[]) {
  const [selectedType, setSelectedType] = useState<LeaseContractType | ''>('');
  const [selectedStatus, setSelectedStatus] = useState<LeaseContractStatus | ''>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [showOnlyTerminated, setShowOnlyTerminated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
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
      
      // Terminated filter
      if (showOnlyTerminated && !contract.noticeDate) return false;
      
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
    setShowOnlyTerminated(false);
    setSearchQuery('');
  };

  const hasActiveFilters = Boolean(
    selectedType || 
    selectedStatus !== '' || 
    selectedDistrict || 
    showOnlyTerminated ||
    searchQuery
  );

  return {
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    selectedDistrict,
    setSelectedDistrict,
    showOnlyTerminated,
    setShowOnlyTerminated,
    searchQuery,
    setSearchQuery,
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
    clearFilters,
    hasActiveFilters
  };
}
