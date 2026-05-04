import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";

import { publishedHousingSpaces } from "../data/published-housing";
import { getHousingObjectNumber } from "../utils/object-number";
import { useHousingStatus } from "../hooks/useHousingStatus";

export function ContractHousingTable() {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  // Annonser där minst en rond är Accepted (lifecycle-status === 'contract')
  const contractHousings = filterHousingByStatus(publishedHousingSpaces, 'contract');

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => (
      <div>
        <div className="font-medium">{h.address}</div>
        <div className="text-sm text-muted-foreground">{getHousingObjectNumber(h.id)}</div>
      </div>
    ) },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "district", label: "Distrikt", render: (h: any) => getDistrictByArea(h.area), hideOnMobile: true },
    { key: "rentalType", label: "Hyresobjektstyp", render: (h: any) => <BuildingTypeBadge type={getRentalObjectType(h.id)} />, hideOnMobile: true },
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
    {
      key: "preferredMoveOutDate",
      label: "Ev. tillgänglig",
      render: (h: any) => h.preferredMoveOutDate ? new Date(h.preferredMoveOutDate).toLocaleDateString("sv-SE") : "-",
      hideOnMobile: true,
    },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{getHousingObjectNumber(housing.id)}</div>
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
    <>
      <ResponsiveTable
        data={contractHousings}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Inga annonser klara för kontrakt"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "kontrakt" } })}
      />
      <p className="text-sm text-muted-foreground mt-3">{contractHousings.length} annonser</p>
    </>
  );
}
