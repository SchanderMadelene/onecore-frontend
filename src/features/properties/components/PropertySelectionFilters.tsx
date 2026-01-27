
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertySelectionFiltersProps {
  districtFilter: string;
  setDistrictFilter: (value: string) => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
  designationFilter: string;
  setDesignationFilter: (value: string) => void;
  propertyManagerFilter: string;
  setPropertyManagerFilter: (value: string) => void;
  marketAreaFilter: string;
  setMarketAreaFilter: (value: string) => void;
  propertyNumberFilter: string;
  setPropertyNumberFilter: (value: string) => void;
  allDistricts: string[];
  allAreas: string[];
  allDesignations: string[];
  allPropertyManagers: string[];
  allMarketAreas: string[];
  allPropertyNumbers: string[];
}

export const PropertySelectionFilters = ({
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
  allDistricts,
  allAreas,
  allDesignations,
  allPropertyManagers,
  allMarketAreas,
  allPropertyNumbers,
}: PropertySelectionFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <Select value={designationFilter} onValueChange={setDesignationFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Fastighetsbeteckning" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla beteckningar</SelectItem>
          {allDesignations.map((designation) => (
            <SelectItem key={designation} value={designation}>
              {designation}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={propertyManagerFilter} onValueChange={setPropertyManagerFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kvartersvärd" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla kvartersvärdar</SelectItem>
          {allPropertyManagers.map((manager) => (
            <SelectItem key={manager} value={manager}>
              {manager}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={marketAreaFilter} onValueChange={setMarketAreaFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Marknadsområde" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla marknadsområden</SelectItem>
          {allMarketAreas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={propertyNumberFilter} onValueChange={setPropertyNumberFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Fastighetsnummer" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla fastighetsnummer</SelectItem>
          {allPropertyNumbers.map((number) => (
            <SelectItem key={number} value={number}>
              {number}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={districtFilter} onValueChange={setDistrictFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Distrikt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla distrikt</SelectItem>
          {allDistricts.map((district) => (
            <SelectItem key={district} value={district}>
              {district}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={areaFilter} onValueChange={setAreaFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Kvartersvärdsområde" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla områden</SelectItem>
          {allAreas.map((area) => (
            <SelectItem key={area} value={area}>
              {area}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
