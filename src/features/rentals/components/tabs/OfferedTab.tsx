import { Input } from "@/components/ui/input";
import { Search, Car, Loader2 } from "lucide-react";
import { useParkingSpaceListingsByType } from "../../hooks/useParkingSpaceListingsByType";
import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ParkingRowActions } from "../ParkingRowActions";
import type { ParkingSpace } from "../types/parking";

export const OfferedTab = () => {
  const { data: offeredSpaces, isLoading, error } = useParkingSpaceListingsByType('offered');
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar erbjudna bilplatser...</span>
      </div>
    );
  }

  if (error || !offeredSpaces || offeredSpaces.length === 0) {
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
            <p>Inga erbjudna bilplatser</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "address", label: "Bilplats", className: "w-[250px] whitespace-nowrap",
      render: (s: ParkingSpace) => (<div><div className="font-medium">{s.address}</div><div className="text-sm text-muted-foreground">{s.id}</div></div>),
    },
    { key: "area", label: "Område", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.area },
    { key: "type", label: "Bilplatstyp", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.type },
    { key: "queueType", label: "Kötyp", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.queueType },
    { key: "rent", label: "Hyra", className: "whitespace-nowrap", render: (s: ParkingSpace) => <div className="font-medium">{s.rent}</div> },
    { key: "seekers", label: "Sökande", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => <div className="font-medium">{s.seekers}</div> },
    { key: "publishedTo", label: "Publicerad t.om", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.publishedTo },
    { key: "publishedFrom", label: "Publicerad fr.o.m", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.publishedFrom },
    { key: "expiresAt", label: "Sista svarsdatum", className: "whitespace-nowrap", hideOnMobile: true, render: (s: ParkingSpace) => s.offer?.expiresAt || "" },
    {
      key: "actions", label: "", className: "text-right whitespace-nowrap", hideOnMobile: true,
      render: (s: ParkingSpace) => <ParkingRowActions parkingSpace={s} tab="erbjudna" />,
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
        <span className="text-muted-foreground">Sista svarsdatum:</span><span>{s.offer?.expiresAt || "-"}</span>
      </div>
      <ParkingRowActions parkingSpace={s} tab="erbjudna" variant="mobile" />
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
        data={offeredSpaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
        onRowClick={(s) => navigate(`/rentals/parking/${s.id}`, { state: { from: "?tab=erbjudna" } })}
      />
      <p className="text-sm text-muted-foreground">{offeredSpaces.length} annonser</p>
    </div>
  );
};
