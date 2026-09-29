import { usePublishedSpaces } from "../data/unpublished-housing-store";
import { useNavigate } from "react-router-dom";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";
import { HousingRowActions } from "./HousingRowActions";
import { getHousingObjectNumber } from "../utils/object-number";
import { useMemo, useState } from "react";
import { Tag } from "@/components/ui/tag";
import { useFeatureToggles } from "@/shared/contexts/FeatureTogglesContext";
import { usePoangfriListings } from "../data/poangfri-store";
import { RENTAL_METHOD_LABELS, type PublishedHousingSpace } from "../data/published-housing";
import { applyHousingFilters, type HousingFiltersState } from "../utils/housing-filters";

export function PublishedHousingTable({ filters }: { filters: HousingFiltersState }) {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();
  const publishedHousingSpaces = usePublishedSpaces();

  const { features } = useFeatureToggles();
  const unified = features.showRentalsUnifiedHousing;
  const poangfriListings = usePoangfriListings();
  const [methodFilter, setMethodFilter] = useState("");

  const publishedHousings = useMemo(() => {
    const standard = filterHousingByStatus(publishedHousingSpaces, 'published');
    if (!unified) return standard;
    const ids = new Set(standard.map((h) => h.id));
    // Poängfria annonser som är publicerade (och inte redan finns i listan)
    const poangfri: PublishedHousingSpace[] = poangfriListings
      .filter((l) => (l.status === "published" || l.status === "in_progress") && !ids.has(l.id))
      .map((l) => ({
        id: l.id,
        address: l.address,
        area: l.area,
        type: l.type,
        size: l.size,
        rent: l.rent,
        rooms: l.rooms,
        floor: l.floor,
        seekers: l.interests.length,
        publishedFrom: l.publishedAt,
        publishedTo: "",
        availableFrom: l.availableFrom ?? "",
        preferredMoveOutDate: "",
        description: l.description,
        rentalMethod: "poangfri",
      }));
    const all = applyHousingFilters([...standard, ...poangfri], filters);
    if (!methodFilter) return all;
    return all.filter((h) => RENTAL_METHOD_LABELS[h.rentalMethod ?? "standard"] === methodFilter);
  }, [publishedHousingSpaces, poangfriListings, unified, methodFilter, filters, filterHousingByStatus]);

  const formatDate = (d?: string) => (d ? new Date(d).toLocaleDateString('sv-SE') : '-');
  const methodLabel = (h: PublishedHousingSpace) => RENTAL_METHOD_LABELS[h.rentalMethod ?? "standard"];
  const methodColumn = {
    key: "rentalMethod",
    label: "Uthyrningsmetod",
    hideOnMobile: true,
    filterOptions: Object.values(RENTAL_METHOD_LABELS),
    filterValue: methodFilter,
    onFilter: setMethodFilter,
    render: (h: any) => <Tag>{methodLabel(h)}</Tag>,
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
    ...(unified ? [methodColumn] : []),
    { key: "rentalType", label: "Hyresobjektstyp", render: (h: any) => <BuildingTypeBadge type={getRentalObjectType(h.id)} />, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    { key: "publishedFrom", label: "Publicerad från", render: (h: any) => formatDate(h.publishedFrom), hideOnMobile: true },
    { key: "publishedTo", label: "Publicerad till", render: (h: any) => (h.rentalMethod === "poangfri" ? "Tills vidare" : formatDate(h.publishedTo)), hideOnMobile: true },
    { key: "availableFrom", label: "Ledig från", render: (h: any) => formatDate(h.availableFrom), hideOnMobile: true },
    { key: "preferredMoveOutDate", label: "Ev tillgänglig från", render: (h: any) => h.preferredMoveOutDate ? new Date(h.preferredMoveOutDate).toLocaleDateString('sv-SE') : '-', hideOnMobile: true },
    { key: "seekers", label: "Sökande", render: (h: any) => h.seekers },
    {
      key: "actions",
      label: "",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (h: any) => <HousingRowActions housing={h} tab="publicerade" />,
    },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{getHousingObjectNumber(housing.id)}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      {unified && <Tag className="mt-2">{methodLabel(housing)}</Tag>}
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Rum:</span>
        <span className="text-sm">{housing.rooms}</span>
        <span className="text-sm text-muted-foreground">Hyra:</span>
        <span className="text-sm">{housing.rent}</span>
        <span className="text-sm text-muted-foreground">Sökande:</span>
        <span className="text-sm">{housing.seekers}</span>
      </div>
      <HousingRowActions housing={housing} tab="publicerade" variant="mobile" />
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={publishedHousings}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Inga publicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) =>
          h.rentalMethod === "poangfri"
            ? navigate(`/rentals/housing/poangfritt/${h.id}`)
            : navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "publicerade" } })
        }
        rowClassName="group"
      />
      <p className="text-sm text-muted-foreground mt-3">{publishedHousings.length} annonser</p>
    </>
  );
}
