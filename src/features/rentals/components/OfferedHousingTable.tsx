import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { publishedHousingSpaces } from "../data/published-housing";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";
import { HousingRowActions } from "./HousingRowActions";
import { getHousingObjectNumber } from "../utils/object-number";

export function OfferedHousingTable() {
  const navigate = useNavigate();
  const { offers } = useHousingOffers();
  const { filterHousingByStatus } = useHousingStatus();

  const offeredHousings = filterHousingByStatus(publishedHousingSpaces, 'offered');

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
      key: "offered",
      label: "Erbjudna",
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        return `${offer?.selectedApplicants.length || 0} st`;
      }
    },
    {
      key: "accepted",
      label: "Tackat ja",
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        const total = offer?.selectedApplicants.length || 0;
        const seed = h.id.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
        const accepted = total === 0 ? 0 : seed % (total + 1);
        return `${accepted} st`;
      }
    },
    {
      key: "sentAt",
      label: "Skickat",
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        return offer?.sentAt ? new Date(offer.sentAt).toLocaleDateString('sv-SE') : '-';
      },
      hideOnMobile: true
    },
    { key: "preferredMoveOutDate", label: "Önskad avflyttning", render: (h: any) => h.preferredMoveOutDate ? new Date(h.preferredMoveOutDate).toLocaleDateString('sv-SE') : '-', hideOnMobile: true },
    {
      key: "actions",
      label: "",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (h: any) => <HousingRowActions housing={h} tab="erbjudna" />,
    },
  ];

  const mobileCardRenderer = (housing: any) => {
    const offer = offers.find(o => o.listingId === housing.id);
    return (
      <div>
        <div className="font-medium">{housing.address}</div>
        <div className="text-sm text-muted-foreground">{getHousingObjectNumber(housing.id)}</div>
        <div className="text-sm text-muted-foreground">{housing.area}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Väntar på svar
          </Badge>
          <span className="text-sm text-muted-foreground">{offer?.selectedApplicants.length || 0} erbjudna</span>
        </div>
        <HousingRowActions housing={housing} tab="erbjudna" variant="mobile" />
      </div>
    );
  };

  return (
    <>
      <ResponsiveTable
        data={offeredHousings}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Inga erbjudanden skickade"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "erbjudna" } })}
        rowClassName="group"
      />
      <p className="text-sm text-muted-foreground mt-3">{offeredHousings.length} annonser</p>
    </>
  );
}
