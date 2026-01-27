import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProperties } from "@/data/properties";
import { mockBuildings } from "@/data/buildings";
import { useMemo } from "react";

interface TenantSelectionFiltersProps {
  contractStatusFilter: string;
  setContractStatusFilter: (value: string) => void;
  contractTypeFilter: string;
  setContractTypeFilter: (value: string) => void;
  customerTypeFilter: string;
  setCustomerTypeFilter: (value: string) => void;
  propertyFilter?: string;
  setPropertyFilter?: (value: string) => void;
  buildingFilter?: string;
  setBuildingFilter?: (value: string) => void;
  districtFilter?: string;
  setDistrictFilter?: (value: string) => void;
}

export function TenantSelectionFilters({
  contractStatusFilter,
  setContractStatusFilter,
  contractTypeFilter,
  setContractTypeFilter,
  customerTypeFilter,
  setCustomerTypeFilter,
  propertyFilter = "all",
  setPropertyFilter,
  buildingFilter = "all",
  setBuildingFilter,
  districtFilter = "all",
  setDistrictFilter,
}: TenantSelectionFiltersProps) {
  // Get unique districts from properties
  const districts = useMemo(() => {
    const uniqueDistricts = [...new Set(mockProperties.map(p => p.district))];
    return uniqueDistricts.sort();
  }, []);

  // Get buildings filtered by selected property
  const filteredBuildings = useMemo(() => {
    if (propertyFilter === "all") {
      return mockBuildings;
    }
    const selectedProperty = mockProperties.find(p => p.designation === propertyFilter);
    if (!selectedProperty) return mockBuildings;
    return mockBuildings.filter(b => b.propertyId === selectedProperty.id);
  }, [propertyFilter]);

  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kundtyp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla kundtyper</SelectItem>
          <SelectItem value="Hyresgäst">Hyresgäst</SelectItem>
          <SelectItem value="Sökande">Sökande</SelectItem>
          <SelectItem value="God man">God man</SelectItem>
          <SelectItem value="Nyttjare">Nyttjare</SelectItem>
        </SelectContent>
      </Select>

      {setPropertyFilter && (
        <Select value={propertyFilter} onValueChange={(value) => {
          setPropertyFilter(value);
          if (setBuildingFilter) {
            setBuildingFilter("all");
          }
        }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Fastighet" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla fastigheter</SelectItem>
            {mockProperties.map(property => (
              <SelectItem key={property.id} value={property.designation}>
                {property.designation}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {setBuildingFilter && (
        <Select value={buildingFilter} onValueChange={setBuildingFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Byggnad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla byggnader</SelectItem>
            {filteredBuildings.map(building => (
              <SelectItem key={building.id} value={building.id}>
                {building.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {setDistrictFilter && (
        <Select value={districtFilter} onValueChange={setDistrictFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Distrikt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla distrikt</SelectItem>
            {districts.map(district => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Select value={contractStatusFilter} onValueChange={setContractStatusFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kontraktstatus" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla statusar</SelectItem>
          <SelectItem value="active">Aktivt</SelectItem>
          <SelectItem value="expiring">Utgående</SelectItem>
          <SelectItem value="expired">Utgånget</SelectItem>
          <SelectItem value="vacant">Vakant</SelectItem>
        </SelectContent>
      </Select>

      <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kontraktstyp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla kontraktstyper</SelectItem>
          <SelectItem value="housing">Bostad</SelectItem>
          <SelectItem value="parking">Parkering</SelectItem>
          <SelectItem value="commercial">Lokal</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
