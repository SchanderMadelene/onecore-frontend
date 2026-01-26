import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

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
    <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder="Min m²"
          value={sizeFilter.min}
          onChange={(e) => setSizeFilter({ ...sizeFilter, min: e.target.value })}
          className="w-24"
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          placeholder="Max m²"
          value={sizeFilter.max}
          onChange={(e) => setSizeFilter({ ...sizeFilter, max: e.target.value })}
          className="w-24"
        />
      </div>

      <div className="flex gap-2 items-center">
        <Input
          type="number"
          placeholder="Min kr"
          value={rentFilter.min}
          onChange={(e) => setRentFilter({ ...rentFilter, min: e.target.value })}
          className="w-24"
        />
        <span className="text-muted-foreground">–</span>
        <Input
          type="number"
          placeholder="Max kr"
          value={rentFilter.max}
          onChange={(e) => setRentFilter({ ...rentFilter, max: e.target.value })}
          className="w-24"
        />
      </div>

      <Select value={hasContractFilter} onValueChange={setHasContractFilter}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Befintligt kontrakt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla kontrakt</SelectItem>
          <SelectItem value="yes">Med kontrakt</SelectItem>
          <SelectItem value="no">Utan kontrakt</SelectItem>
        </SelectContent>
      </Select>

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
    </div>
  );
};
