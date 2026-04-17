import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";

import { publishedHousingSpaces } from "../data/published-housing";

export function ContractHousingTable() {
  const navigate = useNavigate();

  // Annonser där publiceringsperioden har passerat (redo för kontraktsskrivning)
  const today = new Date();
  const contractHousings = publishedHousingSpaces.filter((h) => {
    const publishedTo = new Date(h.publishedTo);
    return publishedTo < today;
  });

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    {
      key: "publishedTo",
      label: "Publicerad t.o.m.",
      render: (h: any) => new Date(h.publishedTo).toLocaleDateString("sv-SE"),
    },
    {
      key: "availableFrom",
      label: "Tillträde",
      render: (h: any) => new Date(h.availableFrom).toLocaleDateString("sv-SE"),
      hideOnMobile: true,
    },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Publicerad t.o.m.:</span>
        <span className="text-sm">{new Date(housing.publishedTo).toLocaleDateString("sv-SE")}</span>
        <span className="text-sm text-muted-foreground">Tillträde:</span>
        <span className="text-sm">{new Date(housing.availableFrom).toLocaleDateString("sv-SE")}</span>
        <span className="text-sm text-muted-foreground">Hyra:</span>
        <span className="text-sm">{housing.rent}</span>
      </div>
    </div>
  );

  return (
    <ResponsiveTable
      data={contractHousings}
      columns={columns}
      keyExtractor={(h) => h.id}
      emptyMessage="Inga annonser klara för kontrakt"
      mobileCardRenderer={mobileCardRenderer}
      onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "kontrakt" } })}
    />
  );
}
