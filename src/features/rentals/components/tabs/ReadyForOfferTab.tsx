import { Input } from "@/components/ui/input";
import { Search, Car, Loader2 } from "lucide-react";
import { useAssetListingsByType } from "../../hooks/useAssetListingsByType";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ParkingRowActions } from "../ParkingRowActions";
import type { ParkingSpace } from "../types/parking";
import { ASSET_COPY, type AssetType } from "../../utils/asset-type";

interface Props {
  assetType?: AssetType;
}

export const ReadyForOfferTab = ({ assetType = "parking" }: Props) => {
  const copy = ASSET_COPY[assetType];
  const { data: readyForOfferSpaces, isLoading, error } = useAssetListingsByType(assetType, 'ready-for-offer');
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ address: "", area: "", type: "", queueType: "" });

  const filteredSpaces = useMemo(() => {
    if (!readyForOfferSpaces) return [];
    return readyForOfferSpaces.filter(space => {
      const m = (a: string, b: string) => !a || b.toLowerCase().includes(a.toLowerCase());
      return m(filters.address, space.address) && m(filters.area, space.area) && m(filters.type, space.type) && m(filters.queueType, space.queueType);
    });
  }, [readyForOfferSpaces, filters]);

  const filterOptions = useMemo(() => {
    if (!readyForOfferSpaces) return { addresses: [], areas: [], types: [], queueTypes: [] };
    return {
      addresses: [...new Set(readyForOfferSpaces.map(s => s.address))].sort(),
      areas: [...new Set(readyForOfferSpaces.map(s => s.area))].sort(),
      types: [...new Set(readyForOfferSpaces.map(s => s.type))].sort(),
      queueTypes: [...new Set(readyForOfferSpaces.map(s => s.queueType))].sort(),
    };
  }, [readyForOfferSpaces]);

  const handleFilterChange = (field: keyof typeof filters) => (value: string) =>
    setFilters(prev => ({ ...prev, [field]: value }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar {copy.plural} klara för erbjudande...</span>
      </div>
    );
  }

  if (error || !readyForOfferSpaces || readyForOfferSpaces.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`Sök ${copy.singular}...`} className="pl-9 w-full sm:w-[300px]" />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga {copy.plural} klara för erbjudande</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "address", label: assetType === "storage" ? "Förråd" : "Bilplats", className: "w-[250px] whitespace-nowrap",
      filterOptions: filterOptions.addresses, filterValue: filters.address,
      onFilter: handleFilterChange('address'), filterPlaceholder: "Sök adress...",
      render: (s: ParkingSpace) => (<div><div className="font-medium">{s.address}</div><div className="text-sm text-muted-foreground">{s.id}</div></div>),
    },
    { key: "area", label: "Område", className: "whitespace-nowrap", hideOnMobile: true, filterOptions: filterOptions.areas, filterValue: filters.area, onFilter: handleFilterChange('area'), filterPlaceholder: "Sök område...", render: (s: ParkingSpace) => s.area },
    { key: "type", label: copy.typeColumnLabel, className: "whitespace-nowrap", hideOnMobile: true, filterOptions: filterOptions.types, filterValue: filters.type, onFilter: handleFilterChange('type'), filterPlaceholder: "Sök typ...", render: (s: ParkingSpace) => s.type },
    { key: "queueType", label: "Kötyp", className: "whitespace-nowrap", hideOnMobile: true, filterOptions: filterOptions.queueTypes, filterValue: filters.queueType, onFilter: handleFilterChange('queueType'), filterPlaceholder: "Sök kötyp...", render: (s: ParkingSpace) => s.queueType },
    { key: "rent", label: "Hyra", className: "whitespace-nowrap", render: (s: ParkingSpace) => <div className="font-medium">{s.rent}</div> },
    { key: "seekers", label: "Sökande", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => <div className="font-medium">{s.seekers}</div> },
    { key: "publishedTo", label: "Publicerad t.om", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.publishedTo },
    { key: "publishedFrom", label: "Publicerad fr.o.m", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.publishedFrom },
    {
      key: "actions", label: "", className: "text-right whitespace-nowrap", hideOnMobile: true,
      render: (s: ParkingSpace) => <ParkingRowActions parkingSpace={s} tab="klaraForErbjudande" assetType={assetType} />,
    },
  ];

  const mobileCardRenderer = (s: ParkingSpace) => (
    <div className="space-y-2">
      <div>
        <div className="font-medium">{s.address}</div>
        <div className="text-sm text-muted-foreground">{s.id}</div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 justify-start text-sm">
        <span className="text-muted-foreground">Område:</span><span>{s.area}</span>
        <span className="text-muted-foreground">Typ:</span><span>{s.type}</span>
        <span className="text-muted-foreground">Hyra:</span><span className="font-medium">{s.rent}</span>
        <span className="text-muted-foreground">Sökande:</span><span>{s.seekers}</span>
      </div>
      <ParkingRowActions parkingSpace={s} tab="klaraForErbjudande" variant="mobile" assetType={assetType} />
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Sök ${copy.singular}...`} className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>
      <ResponsiveTable
        data={filteredSpaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
        onRowClick={(s) => navigate(`/rentals/${copy.routeSegment}/${s.id}`, { state: { from: "?tab=klaraForErbjudande" } })}
      />
      <p className="text-sm text-muted-foreground">{filteredSpaces.length} annonser</p>
    </div>
  );
};
