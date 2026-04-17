import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";

const getStatusBadge = (status: UnpublishedHousingSpace["status"]) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Utkast</Badge>;
    case "needs_review":
      return <Badge variant="warning">Behöver granskning</Badge>;
    case "ready_to_publish":
      return <Badge variant="success">Redo att publicera</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function UnpublishedHousingTable() {
  const navigate = useNavigate();

  const goToDetail = (s: UnpublishedHousingSpace) =>
    navigate(`/rentals/housing/${s.id}`, { state: { activeHousingTab: "behovAvPublicering" } });

  const renderActions = (s: UnpublishedHousingSpace) => (
    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
      <Button
        size="sm"
        onClick={() => toast.success(`"${s.address}" publicerad`)}
      >
        Publicera
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Fler åtgärder">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => goToDetail(s)}>Visa</DropdownMenuItem>
          <DropdownMenuItem onClick={() => goToDetail(s)}>Redigera</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => toast.error(`"${s.address}" borttagen`)}
          >
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="icon"
        aria-label="Öppna"
        onClick={() => goToDetail(s)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const columns = [
    { key: "address", label: "Adress", render: (s: UnpublishedHousingSpace) => <span className="font-medium">{s.address}</span> },
    { key: "area", label: "Område", render: (s: UnpublishedHousingSpace) => s.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (s: UnpublishedHousingSpace) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: UnpublishedHousingSpace) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: UnpublishedHousingSpace) => s.rent },
    { key: "status", label: "Status", render: (s: UnpublishedHousingSpace) => getStatusBadge(s.status) },
    { key: "lastModified", label: "Senast ändrad", render: (s: UnpublishedHousingSpace) => s.lastModified, hideOnMobile: true },
    { key: "createdBy", label: "Skapad av", render: (s: UnpublishedHousingSpace) => s.createdBy, hideOnMobile: true },
    { key: "actions", label: "", className: "text-right", render: renderActions },
  ];

  const mobileCardRenderer = (space: UnpublishedHousingSpace) => (
    <div>
      <div className="font-medium">{space.address}</div>
      <div className="text-sm text-muted-foreground">{space.area}</div>
      <div className="flex items-center gap-2 mt-2">
        {getStatusBadge(space.status)}
        <span className="text-sm text-muted-foreground">{space.rent}</span>
      </div>
      <div className="mt-3">{renderActions(space)}</div>
    </div>
  );

  return (
    <ResponsiveTable
      data={unpublishedHousingSpaces}
      columns={columns}
      keyExtractor={(s) => s.id}
      emptyMessage="Inga opublicerade bostäder"
      mobileCardRenderer={mobileCardRenderer}
      onRowClick={goToDetail}
    />
  );
}
