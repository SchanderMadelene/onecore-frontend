
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { EmptyParkingTable } from "../shared/EmptyParkingTable";

export function HistoryTab() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-start gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>

      <EmptyParkingTable 
        message="Ingen historik tillgänglig"
        columns={[
          "Bilplats", "Område", "Bilplatstyp", "Kötyp", "Hyra", "Sökande", "Publicerad t.o.m", "Ledig fr.o.m"
        ]}
      />
    </div>
  );
}
