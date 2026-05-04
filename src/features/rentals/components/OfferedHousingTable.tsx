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

interface OfferAggregate {
  selected: number;
  accepted: number;
  declined: number;
  pending: number;
  hasAwarded: boolean;
  earliestSent?: string;
}

export function OfferedHousingTable() {
  const navigate = useNavigate();
  const { getRoundsForListing } = useHousingOffers();
  const { filterHousingByStatus } = useHousingStatus();

  const offeredHousings = filterHousingByStatus(publishedHousingSpaces, 'offered');

  const aggregateFor = (listingId: string): OfferAggregate => {
    const rounds = getRoundsForListing(listingId);
    let selected = 0;
    let accepted = 0;
    let declined = 0;
    let earliestSent: string | undefined;
    let hasAwarded = false;

    for (const r of rounds) {
      if (r.status === 'Awarded') hasAwarded = true;
      // Räkna bara levande/relevanta rondar för "väntar"
      if (r.status === 'Active') {
        selected += r.selectedApplicants.length;
      }
      // Räkna alla svar (även från döda rondar för historik-visning)
      for (const resp of r.responses) {
        if (resp.response === 'accepted') accepted++;
        else if (resp.response === 'declined') declined++;
      }
      if (!earliestSent || r.sentAt < earliestSent) earliestSent = r.sentAt;
    }

    const pending = Math.max(0, selected - accepted - declined);
    return { selected, accepted, declined, pending, hasAwarded, earliestSent };
  };

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
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    {
      key: "accepted",
      label: "Tackat ja",
      render: (h: any) => `${aggregateFor(h.id).accepted} st`,
    },
    {
      key: "declined",
      label: "Tackat nej",
      render: (h: any) => `${aggregateFor(h.id).declined} st`,
      hideOnMobile: true,
    },
    {
      key: "pending",
      label: "Väntar",
      render: (h: any) => `${aggregateFor(h.id).pending} st`,
      hideOnMobile: true,
    },
    {
      key: "sentAt",
      label: "Skickat",
      render: (h: any) => {
        const sent = aggregateFor(h.id).earliestSent;
        return sent ? new Date(sent).toLocaleDateString('sv-SE') : '-';
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
    const agg = aggregateFor(housing.id);
    return (
      <div>
        <div className="font-medium">{housing.address}</div>
        <div className="text-sm text-muted-foreground">{getHousingObjectNumber(housing.id)}</div>
        <div className="text-sm text-muted-foreground">{housing.area}</div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          {agg.accepted > 0 && !agg.hasAwarded ? (
            <Badge variant="success">Klar för tilldelning</Badge>
          ) : (
            <Badge variant="warning">Väntar svar</Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {agg.accepted} ja · {agg.declined} nej · {agg.pending} väntar
          </span>
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
