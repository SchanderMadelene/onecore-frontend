import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ChevronsUpDown, Check, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeaseContractType, LeaseContractStatus, LEASE_STATUS_LABELS, LEASE_TYPE_LABELS } from "@/types/leaseContract";

interface LeaseContractsFiltersProps {
  selectedType: LeaseContractType | '';
  setSelectedType: (type: LeaseContractType | '') => void;
  selectedStatus: LeaseContractStatus | '';
  setSelectedStatus: (status: LeaseContractStatus | '') => void;
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  showOnlyTerminated: boolean;
  setShowOnlyTerminated: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openTypeDropdown: boolean;
  setOpenTypeDropdown: (open: boolean) => void;
  openStatusDropdown: boolean;
  setOpenStatusDropdown: (open: boolean) => void;
  openDistrictDropdown: boolean;
  setOpenDistrictDropdown: (open: boolean) => void;
  contractTypes: LeaseContractType[];
  statusOptions: LeaseContractStatus[];
  uniqueDistricts: string[];
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

        {/* Terminated checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terminated"
            checked={showOnlyTerminated}
            onCheckedChange={(checked) => setShowOnlyTerminated(checked === true)}
          />
          <label
            htmlFor="terminated"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Visa endast uppsagda
          </label>
        </div>

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
