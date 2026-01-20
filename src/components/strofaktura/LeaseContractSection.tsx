import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomerLeaseContract } from "@/types/strofaktura";
import { cn } from "@/lib/utils";

interface LeaseContractSectionProps {
  leaseContracts: CustomerLeaseContract[];
  selectedLease: string;
  kst: string;
  fastighet: string;
  onLeaseSelect: (leaseId: string) => void;
  error?: string;
  disabled?: boolean;
}

export function LeaseContractSection({
  leaseContracts,
  selectedLease,
  kst,
  fastighet,
  onLeaseSelect,
  error,
  disabled = false
}: LeaseContractSectionProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="hyreskontrakt">Hyreskontrakt</Label>
        <Select
          value={selectedLease}
          onValueChange={onLeaseSelect}
          disabled={disabled || leaseContracts.length === 0}
        >
          <SelectTrigger 
            id="hyreskontrakt"
            className={cn(error && "border-destructive")}
          >
            <SelectValue placeholder={
              leaseContracts.length === 0 
                ? "Välj kund först" 
                : "Välj hyreskontrakt"
            } />
          </SelectTrigger>
          <SelectContent>
            {leaseContracts.map((lease) => (
              <SelectItem key={lease.leaseId} value={lease.leaseId}>
                <div className="flex flex-col">
                  <span>{lease.leaseId}</span>
                  <span className="text-xs text-muted-foreground">{lease.address}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kst">KST (Kostnadsställe)</Label>
        <Input
          id="kst"
          value={kst}
          readOnly
          disabled
          placeholder="Fylls i automatiskt"
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fastighet">Fastighet</Label>
        <Input
          id="fastighet"
          value={fastighet}
          readOnly
          disabled
          placeholder="Fylls i automatiskt"
          className="bg-muted"
        />
      </div>
    </div>
  );
}
