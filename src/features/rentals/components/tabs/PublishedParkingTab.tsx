
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ChevronRight, MoreHorizontal, EyeOff, Trash2 } from "lucide-react";
import { ParkingApplicationDialog } from "../ParkingApplicationDialog";
import { PublishParkingSpacesDialog } from "../PublishParkingSpacesDialog";
import { SyncParkingSpacesDialog } from "../SyncParkingSpacesDialog";
import { useParkingSpaceListingsByType } from "../../hooks/useParkingSpaceListingsByType";
import { Loader2, Car } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ConfirmDialog } from "@/shared/common/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ParkingSpace } from "../types/parking";

export const PublishedParkingTab = () => {
  const { data: publishedSpaces, isLoading, error } = useParkingSpaceListingsByType('published');
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    address: "",
    area: "",
    type: "",
    queueType: ""
  });
  const [confirmUnpublish, setConfirmUnpublish] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; open: boolean }>({ id: "", open: false });

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

  const handleUnpublishConfirm = () => {
    setConfirmUnpublish({ id: "", open: false });
    toast({ title: "Bilplatsannons avpublicerad" });
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete({ id: "", open: false });
    toast({ title: "Bilplatsannons borttagen" });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar publicerade bilplatser...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
          <p>Kunde inte hämta bilplatser</p>
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
            <Input placeholder="Sök bilplats..." className="pl-9 w-full sm:w-[300px]" />
          </div>
          <div className="flex gap-2">
            <PublishParkingSpacesDialog />
            <SyncParkingSpacesDialog />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <Car className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga publicerade bilplatser</p>
          </div>
        </div>
      </div>
    );
  }

  const renderActions = (space: ParkingSpace) => (
    <div className="flex items-center justify-end gap-2">
      <div onClick={(e) => e.stopPropagation()}>
        <ParkingApplicationDialog parkingSpace={space} />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setConfirmUnpublish({ id: space.id, open: true })}>
            <EyeOff className="h-4 w-4 mr-2" />
            Avpublicera
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setConfirmDelete({ id: space.id, open: true })}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Link to={`/rentals/parking/${space.id}`} state={{ from: "?tab=publicerade" }} onClick={(e) => e.stopPropagation()}>
        <Button variant="outline" size="sm">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );

  const columns = [
    {
      key: "address",
      label: "Bilplats",
      className: "w-[250px] whitespace-nowrap",
      filterOptions: filterOptions.addresses,
      filterValue: filters.address,
      onFilter: handleFilterChange('address'),
      filterPlaceholder: "Sök adress...",
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
      filterOptions: filterOptions.areas,
      filterValue: filters.area,
      onFilter: handleFilterChange('area'),
      filterPlaceholder: "Sök område...",
      render: (space: ParkingSpace) => space.area,
    },
    {
      key: "type",
      label: "Bilplatstyp",
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
      render: (space: ParkingSpace) => renderActions(space),
    },
  ];

  const mobileCardRenderer = (space: ParkingSpace) => (
    <div className="space-y-2">
      <div>
        <div className="font-medium">{space.address}</div>
        <div className="text-sm text-muted-foreground">{space.id}</div>
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
      <div className="flex items-center gap-2 mt-3">
        {renderActions(space)}
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
        <div className="flex gap-2">
          <PublishParkingSpacesDialog />
          <SyncParkingSpacesDialog />
        </div>
      </div>

      <ResponsiveTable
        data={filteredSpaces}
        columns={columns}
        keyExtractor={(space) => space.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
      />

      <ConfirmDialog
        open={confirmUnpublish.open}
        onOpenChange={(open) => !open && setConfirmUnpublish({ id: "", open: false })}
        title="Avpublicera bilplats"
        description="Är du säker på att du vill avpublicera denna bilplatsannons?"
        confirmLabel="Avpublicera"
        onConfirm={handleUnpublishConfirm}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onOpenChange={(open) => !open && setConfirmDelete({ id: "", open: false })}
        title="Ta bort bilplatsannons"
        description="Är du säker på att du vill ta bort denna bilplatsannons? Detta kan inte ångras."
        confirmLabel="Ta bort"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
