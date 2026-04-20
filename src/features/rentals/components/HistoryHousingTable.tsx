import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { historyHousingSpaces } from "../data/history-housing";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";

export function HistoryHousingTable() {
  const navigate = useNavigate();

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "district", label: "Distrikt", render: (h: any) => getDistrictByArea(h.area), hideOnMobile: true },
    { key: "rentalType", label: "Hyresobjektstyp", render: (h: any) => <BuildingTypeBadge type={getRentalObjectType(h.id)} />, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    { key: "contractedTo", label: "Tilldelad", render: (h: any) => h.contractedTo },
    { key: "contractStart", label: "Kontraktstart", render: (h: any) => new Date(h.contractStart).toLocaleDateString('sv-SE'), hideOnMobile: true },
    { key: "signedAt", label: "Tecknat", render: (h: any) => new Date(h.signedAt).toLocaleDateString('sv-SE'), hideOnMobile: true },
    { key: "applicants", label: "Sökande", render: (h: any) => h.applicants, hideOnMobile: true },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Tilldelad:</span>
        <span className="text-sm">{housing.contractedTo}</span>
        <span className="text-sm text-muted-foreground">Kontraktstart:</span>
        <span className="text-sm">{new Date(housing.contractStart).toLocaleDateString('sv-SE')}</span>
        <span className="text-sm text-muted-foreground">Hyra:</span>
        <span className="text-sm">{housing.rent}</span>
      </div>
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={historyHousingSpaces}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Ingen historik"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "historik" } })}
      />
      <p className="text-sm text-muted-foreground mt-3">{historyHousingSpaces.length} annonser</p>
    </>
  );
}
