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
import { Tag } from "@/components/ui/tag";
import { RENTAL_METHOD_LABELS } from "../data/published-housing";
import { applyHousingFilters, type HousingFiltersState } from "../utils/housing-filters";
import {
  useUnpublishedSpaces,
  setMultipleSpaceStatus,
  publishSpaces,
} from "../data/unpublished-housing-store";
import { useFeatureToggles } from "@/shared/contexts/FeatureTogglesContext";
import { RentalMethodPicker } from "./RentalMethodPicker";
import type { RentalMethod } from "../data/published-housing";

const STATUS_LABEL: Record<UnpublishedHousingSpace["status"], string> = {
  needs_review: "Behöver granskning",
  ready_to_publish: "Redo att publicera",
};

const getStatusBadge = (status: UnpublishedHousingSpace["status"]) => {
  switch (status) {
    case "needs_review":
      return <Badge variant="warning">Behöver granskning</Badge>;
    case "ready_to_publish":
      return <Badge variant="success">Redo att publicera</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function UnpublishedHousingTable({ filters }: { filters: HousingFiltersState }) {
  const navigate = useNavigate();
  const spaces = useUnpublishedSpaces();
  const [selected, setSelected] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [methodFilter, setMethodFilter] = useState<string>("");
  const [publishOpen, setPublishOpen] = useState(false);
  const [publishPending, setPublishPending] = useState(false);
  const [publishMethod, setPublishMethod] = useState<RentalMethod | null>(null);
  const { features } = useFeatureToggles();
  const unified = features.showRentalsUnifiedHousing;

  const filtered = useMemo(() => {
    let result = applyHousingFilters(spaces, filters);
    if (statusFilter) {
      const map: Record<string, UnpublishedHousingSpace["status"]> = {
        "Behöver granskning": "needs_review",
        "Redo att publicera": "ready_to_publish",
      };
      const target = map[statusFilter];
      result = target ? result.filter((s) => s.status === target) : result;
    }
    if (methodFilter) {
      result = result.filter((s) => s.lastRentalMethod && RENTAL_METHOD_LABELS[s.lastRentalMethod] === methodFilter);
    }
    return result;
  }, [spaces, statusFilter, methodFilter, filters]);

  const eligibleSelected = useMemo(
    () => selected.filter((id) => spaces.find((s) => s.id === id)?.status === "needs_review"),
    [selected, spaces],
  );

  const publishableSelected = useMemo(
    () => selected.filter((id) => spaces.find((s) => s.id === id)?.status === "ready_to_publish"),
    [selected, spaces],
  );

  const runBulkPublish = async () => {
    setPublishPending(true);
    await new Promise((r) => setTimeout(r, 400));
    publishSpaces(publishableSelected, unified ? publishMethod ?? "standard" : "standard");
    setPublishPending(false);
    setPublishOpen(false);
    setPublishMethod(null);
    setSelected([]);
    toast.success(
      publishableSelected.length === 1
        ? "1 annons publicerad"
        : `${publishableSelected.length} annonser publicerade`,
    );
  };

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
    {
      key: "lastRentalMethod",
      label: "Senaste uthyrningsmetod",
      hideOnMobile: true,
      filterOptions: Object.values(RENTAL_METHOD_LABELS),
      filterValue: methodFilter,
      onFilter: (v: string) => setMethodFilter(v),
      filterPlaceholder: "Filtrera metod",
      render: (s: any) =>
        s.lastRentalMethod
          ? <Tag>{RENTAL_METHOD_LABELS[s.lastRentalMethod as keyof typeof RENTAL_METHOD_LABELS]}</Tag>
          : <span className="text-muted-foreground">-</span>,
    },
    { key: "rooms", label: "Rum", render: (s: any) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: any) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: any) => s.rent },
    {
      key: "status",
      label: "Status",
      render: (s: any) => getStatusBadge(s.status),
      filterOptions: ["Behöver granskning", "Redo att publicera"],
      filterValue: statusFilter,
      onFilter: (v: string) => setStatusFilter(v),
      filterPlaceholder: "Filtrera status",
    },
    { key: "lastModified", label: "Senast ändrad", render: (s: any) => s.lastModified, hideOnMobile: true },
    { key: "preferredMoveOutDate", label: "Ev tillgänglig från", render: (s: any) => s.preferredMoveOutDate ? new Date(s.preferredMoveOutDate).toLocaleDateString('sv-SE') : '-', hideOnMobile: true },
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
                {publishableSelected.length !== selected.length && (
                  <span className="text-muted-foreground font-normal"> · {publishableSelected.length} kan publiceras</span>
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
                variant="outline"
                onClick={() => setConfirmOpen(true)}
                disabled={eligibleSelected.length === 0}
              >
                Markera som granskade
              </Button>
              <Button
                onClick={() => setPublishOpen(true)}
                disabled={publishableSelected.length === 0}
              >
                Publicera
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
            : `${eligibleSelected.length} av ${selected.length} valda annonser kommer markeras som granskade. Övriga är redan granskade.`
        }
        confirmLabel="Markera som granskade"
        pendingLabel="Markerar..."
        isPending={pending}
        onConfirm={runBulkReview}
      />

      <ConfirmDialog
        open={publishOpen}
        onOpenChange={(v) => {
          setPublishOpen(v);
          if (!v) setPublishMethod(null);
        }}
        title="Publicera annonser"
        description={
          unified ? (
            <div className="space-y-4">
              <p>
                {publishableSelected.length === selected.length
                  ? `Publicera ${publishableSelected.length} ${publishableSelected.length === 1 ? "annons" : "annonser"}?`
                  : `${publishableSelected.length} av ${selected.length} valda annonser kan publiceras. Övriga är inte redo att publicera.`}
              </p>
              <RentalMethodPicker value={publishMethod} onChange={setPublishMethod} idPrefix="bulk-method" />
            </div>
          ) : (
            publishableSelected.length === selected.length
              ? `Publicera ${publishableSelected.length} ${publishableSelected.length === 1 ? "annons" : "annonser"}?`
              : `${publishableSelected.length} av ${selected.length} valda annonser kan publiceras. Övriga är inte redo att publicera.`
          )
        }
        confirmLabel="Publicera"
        pendingLabel="Publicerar..."
        confirmDisabled={unified && !publishMethod}
        isPending={publishPending}
        onConfirm={runBulkPublish}
      />
    </>
  );
}
