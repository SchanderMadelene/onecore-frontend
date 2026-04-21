import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/shared/common";
import { toast } from "@/hooks/use-toast";
import { CreateHousingApplicationDialog } from "./CreateHousingApplicationDialog";
import { EditHousingDialog } from "./EditHousingDialog";
import { CancelRentalDialog } from "./CancelRentalDialog";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import type { HousingSpace } from "./types/housing";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";

export type HousingActionTab =
  | "publicerade"
  | "behovAvPublicering"
  | "klaraForErbjudande"
  | "erbjudna"
  | "historik";

interface HousingRowActionsProps {
  housing: HousingSpace | UnpublishedHousingSpace;
  tab: HousingActionTab;
  variant?: "row" | "mobile" | "detail";
  hidePrimary?: boolean;
}

type ConfirmSpec = {
  title: string;
  description: string;
  confirmLabel: string;
  pendingLabel: string;
  successTitle: string;
  destructive?: boolean;
};

type ActionDef =
  | { key: string; label: string; kind: "new-app" }
  | { key: string; label: string; kind: "edit" }
  | { key: string; label: string; kind: "navigate" }
  | { key: string; label: string; kind: "early-unpublish"; disabled?: boolean }
  | { key: string; label: string; kind: "confirm"; destructive?: boolean; confirm: ConfirmSpec };

function getActions(
  tab: HousingActionTab,
  address: string,
  seekers: number,
): { primary: ActionDef[]; menu: ActionDef[] } {
  const unpublish: ActionDef = {
    key: "unpublish",
    label: "Avbryt uthyrning",
    kind: "confirm",
    destructive: true,
    confirm: {
      title: "Avbryt uthyrning",
      description: `Vill du avbryta uthyrningen av ${address}?`,
      confirmLabel: "Avbryt uthyrning",
      pendingLabel: "Avbryter...",
      successTitle: "Uthyrning avbruten",
      destructive: true,
    },
  };
  const earlyUnpublish: ActionDef = {
    key: "early-unpublish",
    label: "Tidigarelägg avpublicering",
    kind: "early-unpublish",
    disabled: seekers === 0,
  };
  const publish: ActionDef = {
    key: "publish",
    label: "Publicera",
    kind: "confirm",
    confirm: {
      title: "Publicera bostadsannons",
      description: `Vill du publicera annonsen för ${address}?`,
      confirmLabel: "Publicera",
      pendingLabel: "Publicerar...",
      successTitle: "Annons publicerad",
    },
  };
  const remove: ActionDef = {
    key: "delete",
    label: "Ta bort",
    kind: "confirm",
    destructive: true,
    confirm: {
      title: "Ta bort bostadsannons",
      description: `Vill du ta bort annonsen för ${address}?`,
      confirmLabel: "Ta bort",
      pendingLabel: "Tar bort...",
      successTitle: "Annons borttagen",
      destructive: true,
    },
  };
  const newApp: ActionDef = { key: "new-app", label: "Ny anmälan", kind: "new-app" };
  const edit: ActionDef = { key: "edit", label: "Redigera annons", kind: "edit" };
  const createOffer: ActionDef = { key: "create-offer", label: "Skapa erbjudande", kind: "navigate" };
  const viewApplicants: ActionDef = { key: "view-applicants", label: "Visa sökande", kind: "navigate" };
  const viewOffer: ActionDef = { key: "view-offer", label: "Visa erbjudande", kind: "navigate" };
  const withdraw: ActionDef = {
    key: "withdraw",
    label: "Återkalla erbjudande",
    kind: "confirm",
    destructive: true,
    confirm: {
      title: "Återkalla erbjudande",
      description: `Vill du återkalla erbjudandet för ${address}?`,
      confirmLabel: "Återkalla",
      pendingLabel: "Återkallar...",
      successTitle: "Erbjudande återkallat",
      destructive: true,
    },
  };
  const viewAd: ActionDef = { key: "view", label: "Visa annons", kind: "navigate" };

  switch (tab) {
    case "publicerade":
      return { primary: [newApp, unpublish], menu: [newApp, edit, earlyUnpublish, unpublish] };
    case "behovAvPublicering":
      return { primary: [publish, remove], menu: [publish, edit, remove] };
    case "klaraForErbjudande":
      return { primary: [createOffer], menu: [newApp, unpublish] };
    case "erbjudna":
      return { primary: [viewOffer], menu: [unpublish] };
    case "historik":
      return { primary: [], menu: [viewAd] };
  }
}

export function HousingRowActions({ housing, tab, variant = "row", hidePrimary = false }: HousingRowActionsProps) {
  const navigate = useNavigate();
  const { markEarlyUnpublished } = useHousingOffers();
  const [editOpen, setEditOpen] = useState(false);
  const [newAppOpen, setNewAppOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmSpec | null>(null);
  const [pending, setPending] = useState(false);
  const [cancelRentalOpen, setCancelRentalOpen] = useState(false);
  const [earlyUnpublishOpen, setEarlyUnpublishOpen] = useState(false);
  const [earlyUnpublishPending, setEarlyUnpublishPending] = useState(false);

  const seekers = (housing as HousingSpace).seekers ?? 0;

  const stop = (e: React.MouseEvent | React.SyntheticEvent) => e.stopPropagation();
  const goDetail = () =>
    navigate(`/rentals/housing/${housing.id}`, { state: { activeHousingTab: tab } });

  const runConfirm = async () => {
    if (!confirm) return;
    setPending(true);
    await new Promise((r) => setTimeout(r, 500));
    toast({ title: confirm.successTitle, description: housing.address });
    setPending(false);
    setConfirm(null);
  };

  const runEarlyUnpublish = async () => {
    setEarlyUnpublishPending(true);
    await new Promise((r) => setTimeout(r, 400));
    markEarlyUnpublished(housing.id);
    toast({
      title: "Annons flyttad till Klara för erbjudande",
      description: housing.address,
    });
    setEarlyUnpublishPending(false);
    setEarlyUnpublishOpen(false);
  };

  const handleMenu = (a: ActionDef) => {
    if (a.kind === "edit") setEditOpen(true);
    else if (a.kind === "navigate") goDetail();
    else if (a.kind === "early-unpublish") {
      if (a.disabled) return;
      setEarlyUnpublishOpen(true);
    }
    else if (a.kind === "confirm") {
      if (a.key === "unpublish" && seekers > 0) {
        setCancelRentalOpen(true);
      } else {
        setConfirm(a.confirm);
      }
    }
    else if (a.kind === "new-app") setNewAppOpen(true);
  };

  const { menu } = getActions(tab, housing.address, seekers);

  const containerClass =
    variant === "row"
      ? "flex items-center justify-end gap-2"
      : variant === "detail"
        ? "flex items-center gap-2 flex-wrap"
        : "flex items-center justify-end gap-2 mt-3";

  return (
    <>
      <div className={containerClass} onClick={stop}>
        {variant === "detail" ? (
          menu.map((item) => {
            const isDestructive = item.kind === "confirm" && item.destructive;
            const isDisabled = item.kind === "early-unpublish" && item.disabled;
            return (
              <Button
                key={item.key}
                variant={isDestructive ? "destructive" : "outline"}
                disabled={isDisabled}
                onClick={(e) => {
                  stop(e);
                  handleMenu(item);
                }}
              >
                {item.label}
              </Button>
            );
          })
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" onClick={stop} aria-label="Fler åtgärder">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={stop}>
              {menu.map((item, idx) => {
                const isDestructive = item.kind === "confirm" && item.destructive;
                const prevDestructive =
                  idx > 0 && menu[idx - 1].kind === "confirm" && (menu[idx - 1] as any).destructive;
                const showSeparator = isDestructive && !prevDestructive && idx > 0;
                const isDisabled = item.kind === "early-unpublish" && item.disabled;
                return (
                  <div key={item.key}>
                    {showSeparator && <DropdownMenuSeparator />}
                    <DropdownMenuItem
                      className={isDestructive ? "text-destructive focus:text-destructive" : ""}
                      disabled={isDisabled}
                      onSelect={(e) => {
                        e.preventDefault();
                        handleMenu(item);
                      }}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  </div>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

      </div>

      <EditHousingDialog
        housingSpace={housing as UnpublishedHousingSpace}
        open={editOpen}
        onOpenChange={setEditOpen}
        hideTrigger
      />

      <CreateHousingApplicationDialog
        housingSpace={housing as HousingSpace}
        open={newAppOpen}
        onOpenChange={setNewAppOpen}
        hideTrigger
      />

      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(v) => !v && setConfirm(null)}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.confirmLabel}
        pendingLabel={confirm?.pendingLabel}
        variant={confirm?.destructive ? "destructive" : "default"}
        isPending={pending}
        onConfirm={runConfirm}
      />

      <CancelRentalDialog
        subject={{ id: housing.id, address: housing.address, seekers }}
        kind="housing"
        open={cancelRentalOpen}
        onOpenChange={setCancelRentalOpen}
      />

      <ConfirmDialog
        open={earlyUnpublishOpen}
        onOpenChange={(v) => !v && setEarlyUnpublishOpen(false)}
        title="Tidigarelägg avpublicering"
        description={`Vill du avsluta publiceringen av ${housing.address} i förtid? Annonsen flyttas till "Klara för erbjudande" och nya intresseanmälningar kan inte längre lämnas.`}
        confirmLabel="Tidigarelägg avpublicering"
        pendingLabel="Avpublicerar..."
        isPending={earlyUnpublishPending}
        onConfirm={runEarlyUnpublish}
      />
    </>
  );
}
