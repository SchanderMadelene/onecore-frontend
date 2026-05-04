import { Input } from "@/components/ui/input";
import { Search, Car, Archive, Loader2 } from "lucide-react";
import { useParkingSpaceListingsByType } from "../../hooks/useParkingSpaceListingsByType";
import { useStorageSpaceListingsByType } from "../../hooks/useStorageSpaceListingsByType";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ParkingRowActions } from "../ParkingRowActions";
import type { ParkingSpace } from "../types/parking";
import { getAssetConfig, type AssetType } from "../../utils/asset-config";

interface Props { assetType?: AssetType }

export const ReadyForOfferTab = ({ assetType = "parking" }: Props) => {
  const navigate = useNavigate();
  const cfg = getAssetConfig(assetType);
  const isStorage = assetType === "storage";
  const parkingQuery = useParkingSpaceListingsByType("ready-for-offer");
  const storageQuery = useStorageSpaceListingsByType("ready-for-offer");
  const { data: readyForOfferSpaces, isLoading, error } = isStorage ? storageQuery : parkingQuery;
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

  const EmptyIcon = isStorage ? Archive : Car;
  const typeLabel = isStorage ? "Förrådstyp" : "Bilplatstyp";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar {cfg.nounPlural} klara för erbjudande...</span>
      </div>
    );
  }

  if (error || !readyForOfferSpaces || readyForOfferSpaces.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`Sök ${cfg.noun}...`} className="pl-9 w-full sm:w-[300px]" />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <EmptyIcon className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga {cfg.nounPlural} klara för erbjudande</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "address", label: cfg.capitalized, className: "w-[250px] whitespace-nowrap",
      filterOptions: filterOptions.addresses, filterValue: filters.address,
      onFilter: handleFilterChange('address'), filterPlaceholder: "Sök adress...",
      render: (s: ParkingSpace) => (<div><div className="font-medium">{s.address}</div><div className="text-sm text-muted-foreground">{s.id}</div></div>),
    },
    { key: "area", label: "Område", className: "whitespace-nowrap", hideOnMobile: true, filterOptions: filterOptions.areas, filterValue: filters.area, onFilter: handleFilterChange('area'), filterPlaceholder: "Sök område...", render: (s: ParkingSpace) => s.area },
    { key: "type", label: typeLabel, className: "whitespace-nowrap", hideOnMobile: true, filterOptions: filterOptions.types, filterValue: filters.type, onFilter: handleFilterChange('type'), filterPlaceholder: "Sök typ...", render: (s: ParkingSpace) => s.type },
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
          <Input placeholder={`Sök ${cfg.noun}...`} className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>
      <ResponsiveTable
        data={filteredSpaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
        onRowClick={(s) => navigate(cfg.detailRoute(s.id), { state: { from: "?tab=klaraForErbjudande" } })}
      />
      <p className="text-sm text-muted-foreground">{filteredSpaces.length} annonser</p>
    </div>
  );
};
