
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PropertySelectionFiltersProps {
  districtFilter: string;
  setDistrictFilter: (value: string) => void;
  areaFilter: string;
  setAreaFilter: (value: string) => void;
  allDistricts: string[];
  allAreas: string[];
}

export const PropertySelectionFilters = ({
  districtFilter,
  setDistrictFilter,
  areaFilter,
  setAreaFilter,
  allDistricts,
  allAreas,
}: PropertySelectionFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Select value={districtFilter} onValueChange={setDistrictFilter}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Välj distrikt" />
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
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Välj kvartersvärdsområde" />
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
