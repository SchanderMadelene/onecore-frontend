import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
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
  openTypeDropdown: boolean;
  setOpenTypeDropdown: (open: boolean) => void;
  openStatusDropdown: boolean;
  setOpenStatusDropdown: (open: boolean) => void;
  openDistrictDropdown: boolean;
  setOpenDistrictDropdown: (open: boolean) => void;
  openPropertyDropdown: boolean;
  setOpenPropertyDropdown: (open: boolean) => void;
  openBuildingDropdown: boolean;
  setOpenBuildingDropdown: (open: boolean) => void;
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
      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        {/* Type Filter */}
        <Popover open={openTypeDropdown} onOpenChange={setOpenTypeDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openTypeDropdown}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedType ? LEASE_TYPE_LABELS[selectedType] : "Kontraktstyp..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-background z-50" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>Ingen typ hittades.</CommandEmpty>
                <CommandGroup>
                  {contractTypes.map((type) => (
                    <CommandItem
                      key={type}
                      value={type}
                      onSelect={() => {
                        setSelectedType(selectedType === type ? '' : type);
                        setOpenTypeDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedType === type ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {LEASE_TYPE_LABELS[type]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Status Filter */}
        <Popover open={openStatusDropdown} onOpenChange={setOpenStatusDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStatusDropdown}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedStatus !== '' ? LEASE_STATUS_LABELS[selectedStatus] : "Status..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-background z-50" align="start">
            <Command>
              <CommandList>
                <CommandEmpty>Ingen status hittades.</CommandEmpty>
                <CommandGroup>
                  {statusOptions.map((status) => (
                    <CommandItem
                      key={status}
                      value={String(status)}
                      onSelect={() => {
                        setSelectedStatus(selectedStatus === status ? '' : status);
                        setOpenStatusDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStatus === status ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {LEASE_STATUS_LABELS[status]}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Property Filter */}
        <Popover open={openPropertyDropdown} onOpenChange={setOpenPropertyDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPropertyDropdown}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedProperty 
                ? uniqueProperties.find(p => p.id === selectedProperty)?.name || "Fastighet..."
                : "Fastighet..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-background z-50" align="start">
            <Command>
              <CommandInput placeholder="Sök fastighet..." />
              <CommandList>
                <CommandEmpty>Ingen fastighet hittades.</CommandEmpty>
                <CommandGroup>
                  {uniqueProperties.map((property) => (
                    <CommandItem
                      key={property.id}
                      value={property.name}
                      onSelect={() => {
                        setSelectedProperty(selectedProperty === property.id ? '' : property.id);
                        setOpenPropertyDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedProperty === property.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {property.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Building Filter */}
        <Popover open={openBuildingDropdown} onOpenChange={setOpenBuildingDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openBuildingDropdown}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedBuilding 
                ? availableBuildings.find(b => b.id === selectedBuilding)?.name || "Byggnad..."
                : "Byggnad..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-background z-50" align="start">
            <Command>
              <CommandInput placeholder="Sök byggnad..." />
              <CommandList>
                <CommandEmpty>Ingen byggnad hittades.</CommandEmpty>
                <CommandGroup>
                  {availableBuildings.map((building) => (
                    <CommandItem
                      key={building.id}
                      value={building.name}
                      onSelect={() => {
                        setSelectedBuilding(selectedBuilding === building.id ? '' : building.id);
                        setOpenBuildingDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedBuilding === building.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {building.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* District Filter */}
        <Popover open={openDistrictDropdown} onOpenChange={setOpenDistrictDropdown}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openDistrictDropdown}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedDistrict || "Distrikt..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-background z-50" align="start">
            <Command>
              <CommandInput placeholder="Sök distrikt..." />
              <CommandList>
                <CommandEmpty>Inget distrikt hittades.</CommandEmpty>
                <CommandGroup>
                  {uniqueDistricts.map((district) => (
                    <CommandItem
                      key={district}
                      value={district}
                      onSelect={() => {
                        setSelectedDistrict(selectedDistrict === district ? '' : district);
                        setOpenDistrictDropdown(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedDistrict === district ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {district}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

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
