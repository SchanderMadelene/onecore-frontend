import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { LeaseContractType, LeaseContractStatus, LEASE_STATUS_LABELS, LEASE_TYPE_LABELS } from "@/types/leaseContract";
import { DateRangeFilter } from "./DateRangeFilter";

interface PropertyOption {
  id: string;
  name: string;
}

interface BuildingOption {
  id: string;
  name: string;
  propertyId: string;
}

interface LeaseContractsFiltersProps {
  selectedType: LeaseContractType | '';
  setSelectedType: (type: LeaseContractType | '') => void;
  selectedStatus: LeaseContractStatus | '';
  setSelectedStatus: (status: LeaseContractStatus | '') => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
  selectedBuilding: string;
  setSelectedBuilding: (building: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fromDateStart: Date | undefined;
  setFromDateStart: (date: Date | undefined) => void;
  fromDateEnd: Date | undefined;
  setFromDateEnd: (date: Date | undefined) => void;
  lastDebitDateStart: Date | undefined;
  setLastDebitDateStart: (date: Date | undefined) => void;
  lastDebitDateEnd: Date | undefined;
  setLastDebitDateEnd: (date: Date | undefined) => void;
  contractTypes: LeaseContractType[];
  statusOptions: LeaseContractStatus[];
  uniqueDistricts: string[];
  uniqueProperties: PropertyOption[];
  availableBuildings: BuildingOption[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function LeaseContractsFilters({
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  selectedDistrict,
  setSelectedDistrict,
  selectedProperty,
  setSelectedProperty,
  selectedBuilding,
  setSelectedBuilding,
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
  contractTypes,
  statusOptions,
  uniqueDistricts,
  uniqueProperties,
  availableBuildings,
  clearFilters,
  hasActiveFilters
}: LeaseContractsFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök kontrakt, hyresgäst eller adress..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        {/* Type Filter */}
        <Select 
          value={selectedType || "all"} 
          onValueChange={(value) => setSelectedType(value === "all" ? '' : value as LeaseContractType)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Kontraktstyp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla kontraktstyper</SelectItem>
            {contractTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {LEASE_TYPE_LABELS[type]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select 
          value={selectedStatus !== '' ? String(selectedStatus) : "all"} 
          onValueChange={(value) => setSelectedStatus(value === "all" ? '' : Number(value) as LeaseContractStatus)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla statusar</SelectItem>
            {statusOptions.map((status) => (
              <SelectItem key={status} value={String(status)}>
                {LEASE_STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Property Filter */}
        <Select 
          value={selectedProperty || "all"} 
          onValueChange={(value) => setSelectedProperty(value === "all" ? '' : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Fastighet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla fastigheter</SelectItem>
            {uniqueProperties.map((property) => (
              <SelectItem key={property.id} value={property.id}>
                {property.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Building Filter */}
        <Select 
          value={selectedBuilding || "all"} 
          onValueChange={(value) => setSelectedBuilding(value === "all" ? '' : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Byggnad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla byggnader</SelectItem>
            {availableBuildings.map((building) => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District Filter */}
        <Select 
          value={selectedDistrict || "all"} 
          onValueChange={(value) => setSelectedDistrict(value === "all" ? '' : value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Distrikt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla distrikt</SelectItem>
            {uniqueDistricts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Date Range Filter - Lease Start Date */}
        <DateRangeFilter
          label="Startdatum"
          fromDate={fromDateStart}
          toDate={fromDateEnd}
          onFromDateChange={setFromDateStart}
          onToDateChange={setFromDateEnd}
        />

        {/* Date Range Filter - Last Debit Date */}
        <DateRangeFilter
          label="Senaste debitering"
          fromDate={lastDebitDateStart}
          toDate={lastDebitDateEnd}
          onFromDateChange={setLastDebitDateStart}
          onToDateChange={setLastDebitDateEnd}
        />

        {/* Clear filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
            <X className="h-4 w-4" />
            Rensa filter
          </Button>
        )}
      </div>
    </div>
  );
}
