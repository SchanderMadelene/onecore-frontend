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

/**
 * Unified action cell for housing tables.
 * - Hover-shown primary buttons on desktop
 * - Always-visible "more menu" containing all actions
 * - Always-visible chevron link to the detail page
 */
export function HousingRowActions({ housing, tab, variant = "row" }: HousingRowActionsProps) {
  const navigate = useNavigate();
  const [editOpen, setEditOpen] = useState(false);
  const [confirm, setConfirm] = useState<null | {
    title: string;
    description: string;
    label: string;
    pendingLabel: string;
    successTitle: string;
    destructive?: boolean;
  }>(null);
  const [pending, setPending] = useState(false);

  const stop = (e: React.MouseEvent | React.SyntheticEvent) => e.stopPropagation();

  const goDetail = () =>
    navigate(`/rentals/housing/${housing.id}`, { state: { activeHousingTab: tab } });

  const runConfirm = async () => {
    if (!confirm) return;
    setPending(true);
    await new Promise((r) => setTimeout(r, 600));
    toast({ title: confirm.successTitle, description: housing.address });
    setPending(false);
    setConfirm(null);
  };

  // Action definitions per tab
  const actions = (() => {
    switch (tab) {
      case "publicerade":
        return {
          primary: [
            { key: "new-app", label: "Ny anmälan", kind: "new-app" as const },
            {
              key: "unpublish",
              label: "Avpublicera",
              kind: "confirm" as const,
              destructive: true,
              confirm: {
                title: "Avpublicera bostadsannons",
                description: `Vill du avpublicera annonsen för ${housing.address}?`,
                label: "Avpublicera",
                pendingLabel: "Avpublicerar...",
                successTitle: "Annons avpublicerad",
                destructive: true,
              },
            },
          ],
          menu: [
            { key: "new-app", label: "Ny anmälan", kind: "new-app" as const },
            { key: "edit", label: "Redigera annons", kind: "edit" as const },
            {
              key: "unpublish",
              label: "Avpublicera",
              kind: "confirm" as const,
              destructive: true,
              confirm: {
                title: "Avpublicera bostadsannons",
                description: `Vill du avpublicera annonsen för ${housing.address}?`,
                label: "Avpublicera",
                pendingLabel: "Avpublicerar...",
                successTitle: "Annons avpublicerad",
                destructive: true,
              },
            },
          ],
        };
      case "behovAvPublicering":
        return {
          primary: [
            {
              key: "publish",
              label: "Publicera",
              kind: "confirm" as const,
              confirm: {
                title: "Publicera bostadsannons",
                description: `Vill du publicera annonsen för ${housing.address}?`,
                label: "Publicera",
                pendingLabel: "Publicerar...",
                successTitle: "Annons publicerad",
              },
            },
            {
              key: "delete",
              label: "Ta bort",
              kind: "confirm" as const,
              destructive: true,
              confirm: {
                title: "Ta bort bostadsannons",
                description: `Vill du ta bort annonsen för ${housing.address}?`,
                label: "Ta bort",
                pendingLabel: "Tar bort...",
                successTitle: "Annons borttagen",
                destructive: true,
              },
            },
          ],
          menu: [
            {
              key: "publish",
              label: "Publicera",
              kind: "confirm" as const,
              confirm: {
                title: "Publicera bostadsannons",
                description: `Vill du publicera annonsen för ${housing.address}?`,
                label: "Publicera",
                pendingLabel: "Publicerar...",
                successTitle: "Annons publicerad",
              },
            },
            { key: "edit", label: "Redigera annons", kind: "edit" as const },
            {
              key: "delete",
              label: "Ta bort",
              kind: "confirm" as const,
              destructive: true,
              confirm: {
                title: "Ta bort bostadsannons",
                description: `Vill du ta bort annonsen för ${housing.address}?`,
                label: "Ta bort",
                pendingLabel: "Tar bort...",
                successTitle: "Annons borttagen",
                destructive: true,
              },
            },
          ],
        };
      case "klaraForErbjudande":
        return {
          primary: [
            { key: "create-offer", label: "Skapa erbjudande", kind: "navigate" as const },
          ],
          menu: [
            { key: "create-offer", label: "Skapa erbjudande", kind: "navigate" as const },
            { key: "view-applicants", label: "Visa sökande", kind: "navigate" as const },
          ],
        };
      case "erbjudna":
        return {
          primary: [
            { key: "view-offer", label: "Visa erbjudande", kind: "navigate" as const },
          ],
          menu: [
            { key: "view-offer", label: "Visa erbjudande", kind: "navigate" as const },
            {
              key: "withdraw",
              label: "Återkalla erbjudande",
              kind: "confirm" as const,
              destructive: true,
              confirm: {
                title: "Återkalla erbjudande",
                description: `Vill du återkalla erbjudandet för ${housing.address}?`,
                label: "Återkalla",
                pendingLabel: "Återkallar...",
                successTitle: "Erbjudande återkallat",
                destructive: true,
              },
            },
          ],
        };
      case "historik":
        return {
          primary: [],
          menu: [{ key: "view", label: "Visa annons", kind: "navigate" as const }],
        };
    }
  })();

  const renderTrigger = (a: (typeof actions.primary)[number]) => {
    if (a.kind === "new-app") {
      return (
        <div key={a.key} onClick={stop}>
          <CreateHousingApplicationDialog housingSpace={housing as HousingSpace} />
        </div>
      );
    }
    return (
      <Button
        key={a.key}
        variant={a.kind === "confirm" && a.destructive ? "destructive" : "default"}
        size="sm"
        onClick={(e) => {
          stop(e);
          if (a.kind === "navigate") {
            goDetail();
          } else if (a.kind === "confirm") {
            setConfirm(a.confirm);
          }
        }}
      >
        {a.label}
      </Button>
    );
  };

  const handleMenuItem = (item: (typeof actions.menu)[number]) => {
    if (item.kind === "edit") {
      setEditOpen(true);
    } else if (item.kind === "navigate") {
      goDetail();
    } else if (item.kind === "confirm") {
      setConfirm(item.confirm);
    }
  };

  const containerClass =
    variant === "row"
      ? "flex items-center justify-end gap-2"
      : "flex items-center justify-end gap-2 mt-3";

  const hoverGroupClass =
    variant === "row"
      ? "hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
      : "hidden";

  return (
    <>
      <div className={containerClass} onClick={stop}>
        <div className={hoverGroupClass}>
          {actions.primary.map((a) =>
            a.kind === "new-app" ? (
              renderTrigger(a)
            ) : (
              <Button
                key={a.key}
                variant={a.kind === "confirm" && (a as any).destructive ? "destructive" : "default"}
                size="sm"
                onClick={(e) => {
                  stop(e);
                  if (a.kind === "navigate") goDetail();
                  else if (a.kind === "confirm") setConfirm((a as any).confirm);
                }}
              >
                {a.label}
              </Button>
            )
          )}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" onClick={stop} aria-label="Fler åtgärder">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={stop}>
            {actions.menu.map((item, idx) => {
              const isDestructive = item.kind === "confirm" && (item as any).destructive;
              return (
                <div key={item.key}>
                  {idx > 0 && isDestructive && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    className={isDestructive ? "text-destructive focus:text-destructive" : ""}
                    onSelect={(e) => {
                      e.preventDefault();
                      handleMenuItem(item);
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
          <Button variant="outline" size="icon" onClick={(e) => { stop(e); goDetail(); }} aria-label="Öppna">
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Hidden mounted EditHousingDialog – we open it programmatically via state */}
      {editOpen && (
        <HiddenEditHousing
          housing={housing}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(v) => !v && setConfirm(null)}
        title={confirm?.title ?? ""}
        description={confirm?.description ?? ""}
        confirmLabel={confirm?.label}
        pendingLabel={confirm?.pendingLabel}
        variant={confirm?.destructive ? "destructive" : "default"}
        isPending={pending}
        onConfirm={runConfirm}
      />
    </>
  );
}

/**
 * Wrapper that mounts EditHousingDialog with controlled open state.
 * EditHousingDialog uses its own DialogTrigger so we render it hidden and
 * rely on its internal state via a ref-less approach: we just mount it open=true.
 */
function HiddenEditHousing({
  housing,
  open,
  onOpenChange,
}: {
  housing: HousingSpace | UnpublishedHousingSpace;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  // EditHousingDialog manages its own open state via DialogTrigger.
  // To open it from a menu, we render an invisible trigger and click it.
  const ref = (node: HTMLButtonElement | null) => {
    if (node && open) {
      node.click();
      // Reset external open state once we've triggered it
      setTimeout(() => onOpenChange(false), 0);
    }
  };
  return (
    <div className="hidden">
      <EditHousingDialogAutoOpen housingSpace={housing as UnpublishedHousingSpace} triggerRef={ref} />
    </div>
  );
}

/**
 * Wraps EditHousingDialog so we can grab its trigger button.
 */
function EditHousingDialogAutoOpen({
  housingSpace,
  triggerRef,
}: {
  housingSpace: UnpublishedHousingSpace;
  triggerRef: (node: HTMLButtonElement | null) => void;
}) {
  return (
    <span ref={(el) => {
      const btn = el?.querySelector("button");
      triggerRef(btn as HTMLButtonElement | null);
    }}>
      <EditHousingDialog housingSpace={housingSpace} />
    </span>
  );
}
