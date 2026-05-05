import { useNavigate } from "react-router-dom";
import { publishedHousingSpaces } from "../data/published-housing";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";
import { HousingRowActions } from "./HousingRowActions";
import { getHousingObjectNumber } from "../utils/object-number";

export function ReadyForOfferHousingTable() {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  const readyForOfferHousings = filterHousingByStatus(publishedHousingSpaces, 'ready_for_offer');

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
    { key: "seekers", label: "Sökande", render: (h: any) => h.seekers },
    { key: "publishedTo", label: "Publicerad till", render: (h: any) => new Date(h.publishedTo).toLocaleDateString('sv-SE'), hideOnMobile: true },
    { key: "preferredMoveOutDate", label: "Ev tillgänglig från", render: (h: any) => h.preferredMoveOutDate ? new Date(h.preferredMoveOutDate).toLocaleDateString('sv-SE') : '-', hideOnMobile: true },
    {
      key: "actions",
      label: "",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (h: any) => <HousingRowActions housing={h} tab="klaraForErbjudande" />,
    },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{getHousingObjectNumber(housing.id)}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Hyra:</span>
        <span className="text-sm">{housing.rent}</span>
        <span className="text-sm text-muted-foreground">Sökande:</span>
        <span className="text-sm">{housing.seekers}</span>
      </div>
      <HousingRowActions housing={housing} tab="klaraForErbjudande" variant="mobile" />
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={readyForOfferHousings}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Inga bostäder klara för erbjudande"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "klaraForErbjudande" } })}
        rowClassName="group"
      />
      <p className="text-sm text-muted-foreground mt-3">{readyForOfferHousings.length} annonser</p>
    </>
  );
}
