import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { historicalHousingSpaces } from "../data/historical-housing";
import { ResponsiveTable } from "@/shared/ui/responsive-table";

export function HistoricalHousingTable() {
  const navigate = useNavigate();

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    { key: "assignedTo", label: "Tilldelad", render: (h: any) => h.assignedTo },
    { 
      key: "status", 
      label: "Status", 
      render: () => (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Uthyrd
        </Badge>
      )
    },
    { key: "contractSignedDate", label: "Kontrakt", render: (h: any) => new Date(h.contractSignedDate).toLocaleDateString('sv-SE'), hideOnMobile: true },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Uthyrd
        </Badge>
        <span className="text-sm text-muted-foreground">{housing.assignedTo}</span>
      </div>
    </div>
  );

  return (
    <ResponsiveTable
      data={historicalHousingSpaces}
      columns={columns}
      keyExtractor={(h) => h.id}
      emptyMessage="Ingen historik"
      mobileCardRenderer={mobileCardRenderer}
      onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "historik" } })}
    />
  );
}
