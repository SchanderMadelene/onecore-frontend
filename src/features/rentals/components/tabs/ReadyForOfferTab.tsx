
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Car, Loader2, ChevronRight } from "lucide-react";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { DeleteListingDialog } from "../DeleteListingDialog";
import { useParkingSpaceListingsByType } from "../../hooks/useParkingSpaceListingsByType";
import { Link } from "react-router-dom";
import { FilterableTableHead } from "../FilterableTableHead";
import { useState, useMemo } from "react";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import type { ParkingSpace } from "../types/parking";

export const ReadyForOfferTab = () => {
  const { data: readyForOfferSpaces, isLoading, error } = useParkingSpaceListingsByType('ready-for-offer');
  const [filters, setFilters] = useState({
    address: "",
    area: "",
    type: "",
    queueType: ""
  });

  const filteredSpaces = useMemo(() => {
    if (!readyForOfferSpaces) return [];
    
    return readyForOfferSpaces.filter(space => {
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
  }, [readyForOfferSpaces, filters]);

  const filterOptions = useMemo(() => {
    if (!readyForOfferSpaces) return { addresses: [], areas: [], types: [], queueTypes: [] };
    
    return {
      addresses: [...new Set(readyForOfferSpaces.map(space => space.address))].sort(),
      areas: [...new Set(readyForOfferSpaces.map(space => space.area))].sort(),
      types: [...new Set(readyForOfferSpaces.map(space => space.type))].sort(),
      queueTypes: [...new Set(readyForOfferSpaces.map(space => space.queueType))].sort(),
    };
  }, [readyForOfferSpaces]);

  const handleFilterChange = (field: keyof typeof filters) => (value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar bilplatser klara för erbjudande...</span>
      </div>
    );
  }

  if (error || !readyForOfferSpaces || readyForOfferSpaces.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga bilplatser klara för erbjudande</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "address",
      label: "Bilplats",
      className: "w-[250px] whitespace-nowrap",
      headerRender: () => (
        <FilterableTableHead
          inline
          onFilter={handleFilterChange('address')}
          filterValue={filters.address}
          filterOptions={filterOptions.addresses}
          placeholder="Sök adress..."
        >
          Bilplats
        </FilterableTableHead>
      ),
      render: (space: ParkingSpace) => (
        <div>
          <div className="font-medium">{space.address}</div>
          <div className="text-sm text-muted-foreground">{space.id}</div>
        </div>
      ),
    },
    {
      key: "area",
      label: "Område",
      className: "whitespace-nowrap",
      hideOnMobile: true,
      headerRender: () => (
        <FilterableTableHead
          inline
          onFilter={handleFilterChange('area')}
          filterValue={filters.area}
          filterOptions={filterOptions.areas}
          placeholder="Sök område..."
        >
          Område
        </FilterableTableHead>
      ),
      render: (space: ParkingSpace) => space.area,
    },
    {
      key: "type",
      label: "Bilplatstyp",
      className: "whitespace-nowrap",
      hideOnMobile: true,
      headerRender: () => (
        <FilterableTableHead
          inline
          onFilter={handleFilterChange('type')}
          filterValue={filters.type}
          filterOptions={filterOptions.types}
          placeholder="Sök typ..."
        >
          Bilplatstyp
        </FilterableTableHead>
      ),
      render: (space: ParkingSpace) => space.type,
    },
    {
      key: "queueType",
      label: "Kötyp",
      className: "whitespace-nowrap",
      hideOnMobile: true,
      headerRender: () => (
        <FilterableTableHead
          onFilter={handleFilterChange('queueType')}
          filterValue={filters.queueType}
          filterOptions={filterOptions.queueTypes}
          placeholder="Sök kötyp..."
        >
          Kötyp
        </FilterableTableHead>
      ),
      render: (space: ParkingSpace) => space.queueType,
    },
    { key: "rent", label: "Hyra", className: "whitespace-nowrap", render: (space: ParkingSpace) => <div className="font-medium">{space.rent}</div> },
    { key: "seekers", label: "Sökande", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => <div className="font-medium">{space.seekers}</div> },
    { key: "publishedTo", label: "Publicerad t.om", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => space.publishedTo },
    { key: "publishedFrom", label: "Publicerad fr.o.m", className: "whitespace-nowrap", hideOnMobile: true, render: (space: ParkingSpace) => space.publishedFrom },
    {
      key: "actions",
      label: "Åtgärder",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (space: ParkingSpace) => (
        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <DeleteListingDialog parkingSpace={space} />
          <ParkingApplicationDialog parkingSpace={space} />
          <Link to={`/rentals/parking/${space.id}`} state={{ from: "?tab=klaraForErbjudande" }}>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const mobileCardRenderer = (space: ParkingSpace) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{space.address}</div>
          <div className="text-sm text-muted-foreground">{space.id}</div>
        </div>
        <Link to={`/rentals/parking/${space.id}`} state={{ from: "?tab=klaraForErbjudande" }}>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
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
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>

      <ResponsiveTable
        data={filteredSpaces}
        columns={columns}
        keyExtractor={(space) => space.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
      />
    </div>
  );
};
