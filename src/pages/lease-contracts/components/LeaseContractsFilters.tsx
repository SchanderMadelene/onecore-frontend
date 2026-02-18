import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { LeaseContractType, LeaseContractStatus, LeaseContractSubType, LEASE_STATUS_LABELS, LEASE_TYPE_LABELS, LEASE_SUBTYPE_LABELS } from "../types/leaseContract";
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
  selectedSubType: LeaseContractSubType | '';
  setSelectedSubType: (subType: LeaseContractSubType | '') => void;
  selectedStatus: LeaseContractStatus | '';
  setSelectedStatus: (status: LeaseContractStatus | '') => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  selectedProperty: string;
  setSelectedProperty: (property: string) => void;
  selectedBuilding: string;
  setSelectedBuilding: (building: string) => void;
  selectedKvvArea: string;
  setSelectedKvvArea: (kvv: string) => void;
  selectedCostCenter: string;
  setSelectedCostCenter: (cc: string) => void;
  selectedMarketArea: string;
  setSelectedMarketArea: (ma: string) => void;
  selectedRentRow: string;
  setSelectedRentRow: (rr: string) => void;
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
  noticeDateStart: Date | undefined;
  setNoticeDateStart: (date: Date | undefined) => void;
  noticeDateEnd: Date | undefined;
  setNoticeDateEnd: (date: Date | undefined) => void;
  terminationDateStart: Date | undefined;
  setTerminationDateStart: (date: Date | undefined) => void;
  terminationDateEnd: Date | undefined;
  setTerminationDateEnd: (date: Date | undefined) => void;
  contractTypes: LeaseContractType[];
  subTypes: LeaseContractSubType[];
  statusOptions: LeaseContractStatus[];
  uniqueDistricts: string[];
  uniqueProperties: PropertyOption[];
  availableBuildings: BuildingOption[];
  uniqueKvvAreas: string[];
  uniqueCostCenters: string[];
  uniqueMarketAreas: string[];
  uniqueRentRows: string[];
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function LeaseContractsFilters(props: LeaseContractsFiltersProps) {
  const {
    selectedType, setSelectedType,
    selectedSubType, setSelectedSubType,
    selectedStatus, setSelectedStatus,
    selectedDistrict, setSelectedDistrict,
    selectedProperty, setSelectedProperty,
    selectedBuilding, setSelectedBuilding,
    selectedKvvArea, setSelectedKvvArea,
    selectedCostCenter, setSelectedCostCenter,
    selectedMarketArea, setSelectedMarketArea,
    selectedRentRow, setSelectedRentRow,
    searchQuery, setSearchQuery,
    fromDateStart, setFromDateStart,
    fromDateEnd, setFromDateEnd,
    lastDebitDateStart, setLastDebitDateStart,
    lastDebitDateEnd, setLastDebitDateEnd,
    noticeDateStart, setNoticeDateStart,
    noticeDateEnd, setNoticeDateEnd,
    terminationDateStart, setTerminationDateStart,
    terminationDateEnd, setTerminationDateEnd,
    contractTypes, subTypes, statusOptions,
    uniqueDistricts, uniqueProperties, availableBuildings,
    uniqueKvvAreas, uniqueCostCenters, uniqueMarketAreas, uniqueRentRows,
    clearFilters, hasActiveFilters
  } = props;

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

        {/* SubType Filter */}
        <Select 
          value={selectedSubType || "all"} 
          onValueChange={(value) => setSelectedSubType(value === "all" ? '' : value as LeaseContractSubType)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Undertyp" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla undertyper</SelectItem>
            {subTypes.map((st) => (
              <SelectItem key={st} value={st}>
                {LEASE_SUBTYPE_LABELS[st]}
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

        {/* KVV Area Filter */}
        {uniqueKvvAreas.length > 0 && (
          <Select 
            value={selectedKvvArea || "all"} 
            onValueChange={(value) => setSelectedKvvArea(value === "all" ? '' : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="KVV-område" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla KVV-områden</SelectItem>
              {uniqueKvvAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Cost Center Filter */}
        {uniqueCostCenters.length > 0 && (
          <Select 
            value={selectedCostCenter || "all"} 
            onValueChange={(value) => setSelectedCostCenter(value === "all" ? '' : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Kostnadsställe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla kostnadsställen</SelectItem>
              {uniqueCostCenters.map((cc) => (
                <SelectItem key={cc} value={cc}>
                  {cc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {/* Market Area Filter */}
        {uniqueMarketAreas.length > 0 && (
          <Select 
            value={selectedMarketArea || "all"} 
            onValueChange={(value) => setSelectedMarketArea(value === "all" ? '' : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Marknadsområde" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla marknadsområden</SelectItem>
              {uniqueMarketAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

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

        {/* Rent Row Filter */}
        {uniqueRentRows.length > 0 && (
          <Select 
            value={selectedRentRow || "all"} 
            onValueChange={(value) => setSelectedRentRow(value === "all" ? '' : value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Hyresrad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla hyresrader</SelectItem>
              {uniqueRentRows.map((rr) => (
                <SelectItem key={rr} value={rr}>
                  {rr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

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

        {/* Date Range Filter - Notice Date */}
        <DateRangeFilter
          label="Uppsägningsdatum"
          fromDate={noticeDateStart}
          toDate={noticeDateEnd}
          onFromDateChange={setNoticeDateStart}
          onToDateChange={setNoticeDateEnd}
        />

        {/* Date Range Filter - Termination/Move-out Date */}
        <DateRangeFilter
          label="Avflyttningsdatum"
          fromDate={terminationDateStart}
          toDate={terminationDateEnd}
          onFromDateChange={setTerminationDateStart}
          onToDateChange={setTerminationDateEnd}
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
