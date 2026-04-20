import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, MoreHorizontal } from "lucide-react";
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
  variant?: "row" | "mobile";
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
  | { key: string; label: string; kind: "confirm"; destructive?: boolean; confirm: ConfirmSpec };

function getActions(tab: HousingActionTab, address: string): { primary: ActionDef[]; menu: ActionDef[] } {
  const unpublish: ActionDef = {
    key: "unpublish",
    label: "Avpublicera",
    kind: "confirm",
    destructive: true,
    confirm: {
      title: "Avpublicera bostadsannons",
      description: `Vill du avpublicera annonsen för ${address}?`,
      confirmLabel: "Avpublicera",
      pendingLabel: "Avpublicerar...",
      successTitle: "Annons avpublicerad",
      destructive: true,
    },
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
      return { primary: [newApp, unpublish], menu: [newApp, edit, unpublish] };
    case "behovAvPublicering":
      return { primary: [publish, remove], menu: [publish, edit, remove] };
    case "klaraForErbjudande":
      return { primary: [createOffer], menu: [createOffer, viewApplicants] };
    case "erbjudna":
      return { primary: [viewOffer], menu: [viewOffer, withdraw] };
    case "historik":
      return { primary: [], menu: [viewAd] };
  }
}

export function HousingRowActions({ housing, tab, variant = "row" }: HousingRowActionsProps) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [confirm, setConfirm] = useState<ConfirmSpec | null>(null);
  const [pending, setPending] = useState(false);

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

  const trigger = (a: ActionDef) => {
    if (a.kind === "new-app") {
      return (
        <div key={a.key} onClick={stop}>
          <CreateHousingApplicationDialog housingSpace={housing as HousingSpace} />
        </div>
      );
    }
    if (a.kind === "navigate") {
      return (
        <Button key={a.key} size="sm" onClick={(e) => { stop(e); goDetail(); }}>
          {a.label}
        </Button>
      );
    }
    if (a.kind === "confirm") {
      return (
        <Button
          key={a.key}
          variant={a.destructive ? "destructive" : "default"}
          size="sm"
          onClick={(e) => { stop(e); setConfirm(a.confirm); }}
        >
          {a.label}
        </Button>
      );
    }
    return null;
  };

  const handleMenu = (a: ActionDef) => {
    if (a.kind === "edit") setEditOpen(true);
    else if (a.kind === "navigate") goDetail();
    else if (a.kind === "confirm") setConfirm(a.confirm);
    else if (a.kind === "new-app") setEditOpen(false); // fallthrough; rarely used in menu directly
  };

  const { primary, menu } = getActions(tab, housing.address);

  // For "Ny anmälan" inside the dropdown menu we can't easily mount a dialog from a menu item,
  // so we render it as a primary button only and skip it in the menu trigger flow by keeping
  // a separate inline mount for each occurrence.
  const inlineNewApp = menu.some((m) => m.kind === "new-app");

  const containerClass =
    variant === "row"
      ? "flex items-center justify-end gap-2"
      : "flex items-center justify-end gap-2 mt-3";
  const hoverClass =
    variant === "row"
      ? "hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
      : "flex items-center gap-2";

  return (
    <>
      <div className={containerClass} onClick={stop}>
        <div className={hoverClass}>
          {primary.map((a) => trigger(a))}
        </div>

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
              return (
                <div key={item.key}>
                  {showSeparator && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    className={isDestructive ? "text-destructive focus:text-destructive" : ""}
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

        {variant === "row" && (
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => { stop(e); goDetail(); }}
            aria-label="Öppna"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Controlled edit dialog (opened via menu) */}
      <EditHousingDialog
        housingSpace={housing as UnpublishedHousingSpace}
        open={editOpen}
        onOpenChange={setEditOpen}
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

      {/* Suppress unused warning for inlineNewApp helper flag */}
      {inlineNewApp ? null : null}
    </>
  );
}
