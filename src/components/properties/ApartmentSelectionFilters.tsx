import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApartmentSelectionFiltersProps {
  sizeFilter: { min: string; max: string };
  setSizeFilter: (value: { min: string; max: string }) => void;
  rentFilter: { min: string; max: string };
  setRentFilter: (value: { min: string; max: string }) => void;
  hasContractFilter: string;
  setHasContractFilter: (value: string) => void;
  contractStatusFilter: string;
  setContractStatusFilter: (value: string) => void;
}

export const ApartmentSelectionFilters = ({
  sizeFilter,
  setSizeFilter,
  rentFilter,
  setRentFilter,
  hasContractFilter,
  setHasContractFilter,
  contractStatusFilter,
  setContractStatusFilter,
}: ApartmentSelectionFiltersProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Yta (m²)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={sizeFilter.min}
            onChange={(e) => setSizeFilter({ ...sizeFilter, min: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Max"
            value={sizeFilter.max}
            onChange={(e) => setSizeFilter({ ...sizeFilter, max: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Hyra (kr)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={rentFilter.min}
            onChange={(e) => setRentFilter({ ...rentFilter, min: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Max"
            value={rentFilter.max}
            onChange={(e) => setRentFilter({ ...rentFilter, max: e.target.value })}
          />
        </div>
      </div>

      <Select value={hasContractFilter} onValueChange={setHasContractFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Befintligt kontrakt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla</SelectItem>
          <SelectItem value="yes">Ja</SelectItem>
          <SelectItem value="no">Nej</SelectItem>
        </SelectContent>
      </Select>

      <Select value={contractStatusFilter} onValueChange={setContractStatusFilter}>
        <SelectTrigger>
          <SelectValue placeholder="Status kontrakt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla</SelectItem>
          <SelectItem value="active">Aktivt</SelectItem>
          <SelectItem value="expiring">Utgående</SelectItem>
          <SelectItem value="expired">Utgånget</SelectItem>
          <SelectItem value="vacant">Vakant</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
