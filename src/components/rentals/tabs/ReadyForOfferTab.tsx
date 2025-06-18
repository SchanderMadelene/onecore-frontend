
import { Input } from "@/components/ui/input";
import { Search, Car } from "lucide-react";
import { EmptyParkingTable } from "../shared/EmptyParkingTable";

export function ReadyForOfferTab() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-start gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>

      <EmptyParkingTable 
        message="Inga bilplatser klara för erbjudande"
        columns={[
          "Bilplats", "Område", "Bilplatstyp", "Kötyp", "Hyra", "Sökande", "Publicerad t.om", "Publicerad fr.o.m", "Åtgärder"
        ]}
      />
    </div>
  );
}
