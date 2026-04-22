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
import { StorageApplicationDialog } from "./StorageApplicationDialog";
import { CancelRentalDialog } from "./CancelRentalDialog";
import { useCloseStorageSpaceListing } from "../hooks/useStorageSpaceActions";
import type { StorageSpace } from "./types/storage";

export type StorageActionTab =
  | "publicerade"
  | "klaraForErbjudande"
  | "erbjudna"
  | "historik"
  | "behovAvPublicering";

interface StorageRowActionsProps {
  storageSpace: StorageSpace;
  tab: StorageActionTab;
  variant?: "row" | "mobile";
}

const TAB_TO_QUERY: Record<StorageActionTab, string> = {
  publicerade: "?tab=publicerade",
  klaraForErbjudande: "?tab=klaraForErbjudande",
  erbjudna: "?tab=erbjudna",
  historik: "?tab=historik",
  behovAvPublicering: "?tab=behovAvPublicering",
};

export function StorageRowActions({ storageSpace, tab, variant = "row" }: StorageRowActionsProps) {
  const navigate = useNavigate();
  const closeListing = useCloseStorageSpaceListing();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [cancelRentalOpen, setCancelRentalOpen] = useState(false);
  const [newAppOpen, setNewAppOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const stop = (e: React.MouseEvent | React.SyntheticEvent) => e.stopPropagation();
  const goDetail = () =>
    navigate(`/rentals/storage/${storageSpace.id}`, { state: { from: TAB_TO_QUERY[tab] } });

  const handleCancelRental = async () => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 600));
    toast({ title: "Uthyrning avbruten", description: storageSpace.address });
    setPending(false);
    setConfirmDelete(false);
  };

  const handleCancelClick = () => {
    if (storageSpace.seekers > 0) {
      setCancelRentalOpen(true);
    } else {
      setConfirmDelete(true);
    }
  };

  const handleClose = () => {
    closeListing.mutate(storageSpace.id);
    setConfirmClose(false);
  };

  const containerClass =
    variant === "row"
      ? "flex items-center justify-end gap-2"
      : "flex items-center justify-end gap-2 mt-3";

  const isRepublish = tab === "behovAvPublicering";
  const isHistory = tab === "historik";

  return (
    <>
      <div className={containerClass} onClick={stop}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" onClick={stop} aria-label="Fler åtgärder">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={stop}>
            {!isRepublish && !isHistory && (
              <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setNewAppOpen(true); }}>
                Ny intresseanmälan
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); goDetail(); }}>
              Öppna detaljer
            </DropdownMenuItem>
            {isRepublish ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={(e) => { e.preventDefault(); setConfirmClose(true); }}
                >
                  Stäng listning
                </DropdownMenuItem>
              </>
            ) : !isHistory ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onSelect={(e) => { e.preventDefault(); handleCancelClick(); }}
                >
                  Avbryt uthyrning
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <StorageApplicationDialog
        storageSpace={storageSpace}
        open={newAppOpen}
        onOpenChange={setNewAppOpen}
        hideTrigger
      />

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Avbryt uthyrning"
        description={`Vill du avbryta uthyrningen av förråd ${storageSpace.address} (hyresid ${storageSpace.id})?`}
        onConfirm={handleCancelRental}
        variant="destructive"
        confirmLabel="Avbryt uthyrning"
        pendingLabel="Avbryter..."
        isPending={pending}
      />

      <CancelRentalDialog
        subject={storageSpace}
        kind="storage"
        open={cancelRentalOpen}
        onOpenChange={setCancelRentalOpen}
      />

      <ConfirmDialog
        open={confirmClose}
        onOpenChange={setConfirmClose}
        title="Avbryt uthyrning"
        description={`Vill du avbryta uthyrningen av ${storageSpace.address}?`}
        onConfirm={handleClose}
        variant="destructive"
        confirmLabel="Avbryt uthyrning"
        pendingLabel="Avbryter..."
        isPending={closeListing.isPending}
      />
    </>
  );
}
