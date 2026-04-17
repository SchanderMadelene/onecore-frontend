import { Badge } from "@/components/ui/badge";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { useNavigate } from "react-router-dom";
import { historicalHousingSpaces, type HistoricalHousingSpace } from "../data/historical-housing";

const getOutcomeBadge = (outcome: HistoricalHousingSpace["outcome"]) => {
  switch (outcome) {
    case "rented":
      return <Badge variant="success">Uthyrd</Badge>;
    case "withdrawn":
      return <Badge variant="secondary">Tillbakadragen</Badge>;
    case "expired":
      return <Badge variant="warning">Inga sökande</Badge>;
  }
};

const formatDate = (d: string) => (d ? new Date(d).toLocaleDateString("sv-SE") : "—");

export function HistoricalHousingTable() {
  const navigate = useNavigate();

  const columns = [
    { key: "address", label: "Adress", render: (h: HistoricalHousingSpace) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: HistoricalHousingSpace) => h.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: HistoricalHousingSpace) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: HistoricalHousingSpace) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: HistoricalHousingSpace) => h.rent, hideOnMobile: true },
    { key: "tenant", label: "Hyresgäst", render: (h: HistoricalHousingSpace) => (
      <div>
        <div>{h.tenant}</div>
        {h.tenantCustomerNumber !== "—" && (
          <div className="text-xs text-muted-foreground">{h.tenantCustomerNumber}</div>
        )}
      </div>
    ) },
    { key: "contractPeriod", label: "Kontraktsperiod", render: (h: HistoricalHousingSpace) =>
      h.contractStart ? `${formatDate(h.contractStart)} – ${formatDate(h.contractEnd)}` : "—",
      hideOnMobile: true,
    },
    { key: "outcome", label: "Utfall", render: (h: HistoricalHousingSpace) => getOutcomeBadge(h.outcome) },
  ];

  const mobileCardRenderer = (h: HistoricalHousingSpace) => (
    <div>
      <div className="font-medium">{h.address}</div>
      <div className="text-sm text-muted-foreground">{h.area}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Hyresgäst:</span>
        <span className="text-sm">{h.tenant}</span>
        <span className="text-sm text-muted-foreground">Period:</span>
        <span className="text-sm">{h.contractStart ? `${formatDate(h.contractStart)} – ${formatDate(h.contractEnd)}` : "—"}</span>
      </div>
      <div className="mt-2">{getOutcomeBadge(h.outcome)}</div>
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
