import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";
import { HousingRowActions } from "./HousingRowActions";
import { getHousingObjectNumber } from "../utils/object-number";
import { ConfirmDialog } from "@/shared/common";
import { toast } from "sonner";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useUnpublishedSpaces,
  setMultipleSpaceStatus,
} from "../data/unpublished-housing-store";

const STATUS_LABEL: Record<UnpublishedHousingSpace["status"], string> = {
  draft: "Utkast",
  needs_review: "Behöver granskning",
  ready_to_publish: "Redo att publicera",
};

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
  const spaces = useUnpublishedSpaces();
  const [selected, setSelected] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const filtered = useMemo(() => {
    if (!statusFilter) return spaces;
    const map: Record<string, UnpublishedHousingSpace["status"]> = {
      "Utkast": "draft",
      "Behöver granskning": "needs_review",
      "Redo att publicera": "ready_to_publish",
    };
    const target = map[statusFilter];
    return target ? spaces.filter((s) => s.status === target) : spaces;
  }, [spaces, statusFilter]);

  const eligibleSelected = useMemo(
    () => selected.filter((id) => spaces.find((s) => s.id === id)?.status === "needs_review"),
    [selected, spaces],
  );

  const runBulkReview = async () => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 350));
    const changed = setMultipleSpaceStatus(eligibleSelected, "ready_to_publish");
    setPending(false);
    setConfirmOpen(false);
    setSelected([]);
    toast.success(
      changed === selected.length
        ? `${changed} annonser markerade som granskade`
        : `${changed} av ${selected.length} markerades (övriga var inte i 'Behöver granskning')`,
    );
  };

  const columns = [
    { key: "address", label: "Adress", render: (s: any) => (
      <div>
        <div className="font-medium">{s.address}</div>
        <div className="text-sm text-muted-foreground">{getHousingObjectNumber(s.id)}</div>
      </div>
    ) },
    { key: "area", label: "Område", render: (s: any) => s.area, hideOnMobile: true },
    { key: "district", label: "Distrikt", render: (s: any) => getDistrictByArea(s.area), hideOnMobile: true },
    { key: "rentalType", label: "Hyresobjektstyp", render: (s: any) => <BuildingTypeBadge type={getRentalObjectType(s.id)} />, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (s: any) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: any) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: any) => s.rent },
    {
      key: "status",
      label: "Status",
      render: (s: any) => getStatusBadge(s.status),
      filterOptions: ["Utkast", "Behöver granskning", "Redo att publicera"],
      filterValue: statusFilter,
      onFilter: (v: string) => setStatusFilter(v),
      filterPlaceholder: "Filtrera status",
    },
    { key: "lastModified", label: "Senast ändrad", render: (s: any) => s.lastModified, hideOnMobile: true },
    { key: "preferredMoveOutDate", label: "Ev tillgänglig från", render: (s: any) => s.preferredMoveOutDate ? new Date(s.preferredMoveOutDate).toLocaleDateString('sv-SE') : '-', hideOnMobile: true },
    { key: "createdBy", label: "Skapad av", render: (s: any) => s.createdBy, hideOnMobile: true },
    {
      key: "actions",
      label: "",
      className: "text-right whitespace-nowrap",
      hideOnMobile: true,
      render: (s: any) => <HousingRowActions housing={s} tab="behovAvPublicering" />,
    },
  ];

  const mobileCardRenderer = (space: any) => (
    <div>
      <div className="font-medium">{space.address}</div>
      <div className="text-sm text-muted-foreground">{getHousingObjectNumber(space.id)}</div>
      <div className="text-sm text-muted-foreground">{space.area}</div>
      <div className="flex items-center gap-2 mt-2">
        {getStatusBadge(space.status)}
        <span className="text-sm text-muted-foreground">{space.rent}</span>
      </div>
      <HousingRowActions housing={space} tab="behovAvPublicering" variant="mobile" />
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={filtered}
        columns={columns}
        keyExtractor={(s) => s.id}
        emptyMessage="Inga opublicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(s) => navigate(`/rentals/housing/${s.id}`, { state: { activeHousingTab: "behovAvPublicering" } })}
        rowClassName="group"
        selectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
      />
      <p className="text-sm text-muted-foreground mt-3">{filtered.length} annonser</p>

      {selected.length > 0 && (
        <div className={cn(
          "fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg",
          "animate-in slide-in-from-bottom-2 duration-200",
        )}>
          <div className="container max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium">
                {selected.length} {selected.length === 1 ? "annons vald" : "annonser valda"}
                {eligibleSelected.length !== selected.length && (
                  <span className="text-muted-foreground font-normal"> · {eligibleSelected.length} kan markeras som granskade</span>
                )}
              </span>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])} className="h-8 px-2 sm:hidden">
                <X className="h-4 w-4 mr-1" /> Rensa
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelected([])} className="hidden sm:inline-flex">
                <X className="h-4 w-4 mr-1" /> Rensa
              </Button>
              <Button
                onClick={() => setConfirmOpen(true)}
                disabled={eligibleSelected.length === 0}
              >
                Markera som granskade
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Markera som granskade"
        description={
          eligibleSelected.length === selected.length
            ? `Markera ${selected.length} annonser som granskade och redo att publicera?`
            : `${eligibleSelected.length} av ${selected.length} valda annonser kommer markeras som granskade. Övriga är redan granskade eller är utkast.`
        }
        confirmLabel="Markera som granskade"
        pendingLabel="Markerar..."
        isPending={pending}
        onConfirm={runBulkReview}
      />
    </>
  );
}
