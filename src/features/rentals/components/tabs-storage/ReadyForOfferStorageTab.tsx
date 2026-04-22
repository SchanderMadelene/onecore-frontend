import { Input } from "@/components/ui/input";
import { Search, Archive, Loader2 } from "lucide-react";
import { useStorageSpaceListingsByType } from "../../hooks/useStorageSpaceListingsByType";
import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { StorageRowActions } from "../StorageRowActions";
import type { StorageSpace } from "../types/storage";

export const ReadyForOfferStorageTab = () => {
  const { data: spaces, isLoading, error } = useStorageSpaceListingsByType('ready-for-offer');
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Hämtar förråd klara för erbjudande...</span>
      </div>
    );
  }

  if (error || !spaces || spaces.length === 0) {
    return (
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Sök förråd..." className="pl-9 w-full sm:w-[300px]" />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
          <div className="text-center">
            <Archive className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50" />
            <p>Inga förråd klara för erbjudande</p>
          </div>
        </div>
      </div>
    );
  }

  const columns = [
    { key: "address", label: "Förråd", className: "w-[250px] whitespace-nowrap", render: (s: StorageSpace) => (<div><div className="font-medium">{s.address}</div><div className="text-sm text-muted-foreground">{s.id}</div></div>) },
    { key: "area", label: "Område", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => s.area },
    { key: "type", label: "Förrådstyp", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => s.type },
    { key: "size", label: "Storlek", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => s.size },
    { key: "queueType", label: "Kötyp", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => s.queueType },
    { key: "rent", label: "Hyra", className: "whitespace-nowrap", render: (s: StorageSpace) => <div className="font-medium">{s.rent}</div> },
    { key: "seekers", label: "Sökande", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => <div className="font-medium">{s.seekers}</div> },
    { key: "publishedTo", label: "Publicerad t.om", className: "whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => s.publishedTo },
    { key: "actions", label: "", className: "text-right whitespace-nowrap", hideOnMobile: true, render: (s: StorageSpace) => <StorageRowActions storageSpace={s} tab="klaraForErbjudande" /> },
  ];

  const mobileCardRenderer = (s: StorageSpace) => (
    <div className="space-y-2">
      <div>
        <div className="font-medium">{s.address}</div>
        <div className="text-sm text-muted-foreground">{s.id}</div>
      </div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 justify-start text-sm">
        <span className="text-muted-foreground">Område:</span><span>{s.area}</span>
        <span className="text-muted-foreground">Typ:</span><span>{s.type}</span>
        <span className="text-muted-foreground">Storlek:</span><span>{s.size}</span>
        <span className="text-muted-foreground">Hyra:</span><span className="font-medium">{s.rent}</span>
        <span className="text-muted-foreground">Sökande:</span><span>{s.seekers}</span>
      </div>
      <StorageRowActions storageSpace={s} tab="klaraForErbjudande" variant="mobile" />
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Sök förråd..." className="pl-9 w-full sm:w-[300px]" />
        </div>
      </div>
      <ResponsiveTable
        data={spaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        mobileCardRenderer={mobileCardRenderer}
        rowClassName="group"
        onRowClick={(s) => navigate(`/rentals/storage/${s.id}`, { state: { from: "?tab=klaraForErbjudande" } })}
      />
      <p className="text-sm text-muted-foreground">{spaces.length} annonser</p>
    </div>
  );
};
