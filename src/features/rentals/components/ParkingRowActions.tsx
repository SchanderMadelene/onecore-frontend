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
import { ParkingApplicationDialog } from "./ParkingApplicationDialog";
import { useCloseParkingSpaceListing } from "../hooks/useParkingSpaceActions";
import type { ParkingSpace } from "./types/parking";

export type ParkingActionTab =
  | "publicerade"
  | "klaraForErbjudande"
  | "erbjudna"
  | "historik"
  | "behovAvPublicering";

interface ParkingRowActionsProps {
  parkingSpace: ParkingSpace;
  tab: ParkingActionTab;
  variant?: "row" | "mobile";
}

const TAB_TO_QUERY: Record<ParkingActionTab, string> = {
  publicerade: "?tab=publicerade",
  klaraForErbjudande: "?tab=klaraForErbjudande",
  erbjudna: "?tab=erbjudna",
  historik: "?tab=historik",
  behovAvPublicering: "?tab=behovAvPublicering",
};

export function ParkingRowActions({ parkingSpace, tab, variant = "row" }: ParkingRowActionsProps) {
  const navigate = useNavigate();
  const closeListing = useCloseParkingSpaceListing();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const [newAppOpen, setNewAppOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const stop = (e: React.MouseEvent | React.SyntheticEvent) => e.stopPropagation();
  const goDetail = () =>
    navigate(`/rentals/parking/${parkingSpace.id}`, { state: { from: TAB_TO_QUERY[tab] } });

  const handleDelete = async () => {
    setPending(true);
    await new Promise((r) => setTimeout(r, 600));
    toast({ title: "Bilplatsannons borttagen", description: parkingSpace.address });
    setPending(false);
    setConfirmDelete(false);
  };

  const handleClose = () => {
    closeListing.mutate(parkingSpace.id);
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
                  onSelect={(e) => { e.preventDefault(); setConfirmDelete(true); }}
                >
                  Ta bort
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <ParkingApplicationDialog
        parkingSpace={parkingSpace}
        open={newAppOpen}
        onOpenChange={setNewAppOpen}
        hideTrigger
      />

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Ta bort bilplatsannons"
        description={`Vill du ta bort bilplatsannons ${parkingSpace.address} med hyresid ${parkingSpace.id}?`}
        onConfirm={handleDelete}
        variant="destructive"
        confirmLabel="Ta bort"
        pendingLabel="Tar bort..."
        isPending={pending}
      />

      <ConfirmDialog
        open={confirmClose}
        onOpenChange={setConfirmClose}
        title="Stäng listning"
        description={`Vill du stänga listningen för ${parkingSpace.address}?`}
        onConfirm={handleClose}
        variant="destructive"
        confirmLabel="Stäng listning"
        pendingLabel="Stänger..."
        isPending={closeListing.isPending}
      />
    </>
  );
}
