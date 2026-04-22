
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PublishParkingSpacesDialog } from "../PublishParkingSpacesDialog";
import { SyncParkingSpacesDialog } from "../SyncParkingSpacesDialog";
import { useAssetListingsByType } from "../../hooks/useAssetListingsByType";
import { Loader2, Car } from "lucide-react";
import { useState, useMemo } from "react";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ParkingRowActions } from "../ParkingRowActions";
import { useNavigate } from "react-router-dom";
import type { ParkingSpace } from "../types/parking";
import { getObjectNumber } from "../../utils/object-number";
import { ASSET_COPY, type AssetType } from "../../utils/asset-type";

interface Props {
  assetType?: AssetType;
}

export const PublishedParkingTab = ({ assetType = "parking" }: Props) => {
  const navigate = useNavigate();
  const copy = ASSET_COPY[assetType];
  const { data: publishedSpaces, isLoading, error } = useAssetListingsByType(assetType, 'published');
  const [filters, setFilters] = useState({
    address: "",
    area: "",
    type: "",
    queueType: ""
  });

  const filteredSpaces = useMemo(() => {
    if (!publishedSpaces) return [];
    
    return publishedSpaces.filter(space => {
      const matchesAddress = !filters.address || 
        space.address.toLowerCase().includes(filters.address.toLowerCase());
      const matchesArea = !filters.area || 
        space.area.toLowerCase().includes(filters.area.toLowerCase());
      const matchesType = !filters.type || 
        space.type.toLowerCase().includes(filters.type.toLowerCase());
      const matchesQueueType = !filters.queueType || 
        space.queueType.toLowerCase().includes(filters.queueType.toLowerCase());
      
      return matchesAddress && matchesArea && matchesType && matchesQueueType;
    });
  }, [publishedSpaces, filters]);

  const filterOptions = useMemo(() => {
    if (!publishedSpaces) return { addresses: [], areas: [], types: [], queueTypes: [] };
    
    return {
      addresses: [...new Set(publishedSpaces.map(space => space.address))].sort(),
      areas: [...new Set(publishedSpaces.map(space => space.area))].sort(),
      types: [...new Set(publishedSpaces.map(space => space.type))].sort(),
      queueTypes: [...new Set(publishedSpaces.map(space => space.queueType))].sort(),
    };
  }, [publishedSpaces]);

  const handleFilterChange = (field: keyof typeof filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar publicerade {copy.plural}...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>Kunde inte hämta {copy.plural}</p>
          <p className="text-sm mt-2">Kontrollera din anslutning och försök igen</p>
        </div>
      </div>
    );
  }

  if (!publishedSpaces || publishedSpaces.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder={`Sök ${copy.singular}...`} className="pl-9 w-full sm:w-[300px]" />
          </div>
          {assetType === "parking" && (
            <div className="flex gap-2">
              <PublishParkingSpacesDialog />
              <SyncParkingSpacesDialog />
            </div>
          )}
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga publicerade {copy.plural}</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "address",
      label: assetType === "storage" ? "Förråd" : "Bilplats",
      className: "w-[250px] whitespace-nowrap",
      filterOptions: filterOptions.addresses,
      filterValue: filters.address,
      onFilter: handleFilterChange('address'),
      filterPlaceholder: "Sök adress...",
      render: (space: ParkingSpace) => (
        <div>
          <div className="font-medium">{space.address}</div>
          <div className="text-sm text-muted-foreground">{getObjectNumber(space.id)}</div>
        </div>
      ),
    },
    {
      key: "area",
      label: "Område",
      className: "whitespace-nowrap",
      hideOnMobile: true,
      filterOptions: filterOptions.areas,
      filterValue: filters.area,
      onFilter: handleFilterChange('area'),
      filterPlaceholder: "Sök område...",
      render: (space: ParkingSpace) => space.area,
    },
    {
      key: "type",
      label: copy.typeColumnLabel,
      className: "whitespace-nowrap",
      hideOnMobile: true,
      filterOptions: filterOptions.types,
      filterValue: filters.type,
      onFilter: handleFilterChange('type'),
      filterPlaceholder: "Sök typ...",
      render: (space: ParkingSpace) => space.type,
    },
    {
      key: "queueType",
      label: "Kötyp",
      className: "whitespace-nowrap",
      hideOnMobile: true,
      filterOptions: filterOptions.queueTypes,
      filterValue: filters.queueType,
      onFilter: handleFilterChange('queueType'),
      filterPlaceholder: "Sök kötyp...",
      render: (space: ParkingSpace) => space.queueType,
    },
    { key: "rent", label: "Hyra", className: "whitespace-nowrap", render: (space: ParkingSpace) => <div className="font-medium">{space.rent}</div> },
    { key: "seekers", label: "Sökande", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => <div className="font-medium">{space.seekers}</div> },
    { key: "publishedTo", label: "Publicerad t.om", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => space.publishedTo },
    { key: "publishedFrom", label: "Publicerad fr.o.m", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => space.publishedFrom },
    {
      key: "actions",
      label: "",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (space: ParkingSpace) => <ParkingRowActions parkingSpace={space} tab="publicerade" assetType={assetType} />,
    },
  ];

  const mobileCardRenderer = (space: ParkingSpace) => (
    <div className="space-y-2">
      <div>
        <div className="font-medium">{space.address}</div>
        <div className="text-sm text-muted-foreground">{getObjectNumber(space.id)}</div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 justify-start text-sm">
        <span className="text-muted-foreground">Område:</span>
        <span>{space.area}</span>
        <span className="text-muted-foreground">Typ:</span>
        <span>{space.type}</span>
        <span className="text-muted-foreground">Hyra:</span>
        <span className="font-medium">{space.rent}</span>
        <span className="text-muted-foreground">Sökande:</span>
        <span>{space.seekers}</span>
      </div>
      <ParkingRowActions parkingSpace={space} tab="publicerade" variant="mobile" assetType={assetType} />
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder={`Sök ${copy.singular}...`} className="pl-9 w-full sm:w-[300px]" />
        </div>
        {assetType === "parking" && (
          <div className="flex gap-2">
            <PublishParkingSpacesDialog />
            <SyncParkingSpacesDialog />
          </div>
        )}
      </div>

      <ResponsiveTable
        data={filteredSpaces}
        columns={columns}
        keyExtractor={(space) => space.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
        onRowClick={(space) => navigate(`/rentals/${copy.routeSegment}/${space.id}`, { state: { from: "?tab=publicerade" } })}
      />
      <p className="text-sm text-muted-foreground">{filteredSpaces.length} annonser</p>
    </div>
  );
};
