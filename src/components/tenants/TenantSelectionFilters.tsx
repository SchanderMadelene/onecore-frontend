import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="customerType">Kundtyp</Label>
        <Select value={customerTypeFilter} onValueChange={setCustomerTypeFilter}>
          <SelectTrigger id="customerType">
            <SelectValue placeholder="Alla typer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla typer</SelectItem>
            <SelectItem value="Hyresgäst">Hyresgäst</SelectItem>
            <SelectItem value="Sökande">Sökande</SelectItem>
            <SelectItem value="God man">God man</SelectItem>
            <SelectItem value="Nyttjare">Nyttjare</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {setPropertyFilter && (
        <div className="space-y-2">
          <Label htmlFor="property">Fastighet</Label>
          <Select value={propertyFilter} onValueChange={(value) => {
            setPropertyFilter(value);
            // Clear building filter when property changes
            if (setBuildingFilter) {
              setBuildingFilter("all");
            }
          }}>
            <SelectTrigger id="property">
              <SelectValue placeholder="Alla fastigheter" />
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
        </div>
      )}

      {setBuildingFilter && (
        <div className="space-y-2">
          <Label htmlFor="building">Byggnad</Label>
          <Select value={buildingFilter} onValueChange={setBuildingFilter}>
            <SelectTrigger id="building">
              <SelectValue placeholder="Alla byggnader" />
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
        </div>
      )}

      {setDistrictFilter && (
        <div className="space-y-2">
          <Label htmlFor="district">Distrikt</Label>
          <Select value={districtFilter} onValueChange={setDistrictFilter}>
            <SelectTrigger id="district">
              <SelectValue placeholder="Alla distrikt" />
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
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="contractStatus">Kontraktstatus</Label>
        <Select value={contractStatusFilter} onValueChange={setContractStatusFilter}>
          <SelectTrigger id="contractStatus">
            <SelectValue placeholder="Alla statusar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla statusar</SelectItem>
            <SelectItem value="active">Aktivt</SelectItem>
            <SelectItem value="expiring">Utgående</SelectItem>
            <SelectItem value="expired">Utgånget</SelectItem>
            <SelectItem value="vacant">Vakant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contractType">Kontraktstyp</Label>
        <Select value={contractTypeFilter} onValueChange={setContractTypeFilter}>
          <SelectTrigger id="contractType">
            <SelectValue placeholder="Alla typer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla typer</SelectItem>
            <SelectItem value="housing">Bostad</SelectItem>
            <SelectItem value="parking">Parkering</SelectItem>
            <SelectItem value="commercial">Lokal</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}