import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, EyeOff, MoreHorizontal, Trash2, UserPlus } from "lucide-react";
import { publishedHousingSpaces } from "../data/published-housing";
import { useNavigate } from "react-router-dom";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { ConfirmDialog } from "@/shared/common/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function PublishedHousingTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { filterHousingByStatus } = useHousingStatus();

  const [items, setItems] = useState(() => filterHousingByStatus(publishedHousingSpaces, 'published'));
  const [confirmUnpublish, setConfirmUnpublish] = useState<{ id: string; open: boolean }>({ id: "", open: false });
  const [confirmDelete, setConfirmDelete] = useState<{ id: string; open: boolean }>({ id: "", open: false });

  const handleUnpublishConfirm = () => {
    setItems(prev => prev.filter(item => item.id !== confirmUnpublish.id));
    setConfirmUnpublish({ id: "", open: false });
    toast({ title: "Annons avpublicerad" });
  };

  const handleDeleteConfirm = () => {
    setItems(prev => prev.filter(item => item.id !== confirmDelete.id));
    setConfirmDelete({ id: "", open: false });
    toast({ title: "Annons borttagen" });
  };

  const renderActions = (h: any) => (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={(e) => { e.stopPropagation(); toast({ title: "Intresseanmälan", description: "Funktionen kommer snart" }); }}
      >
        <UserPlus className="h-4 w-4 mr-1" />
        Ny anmälan
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => setConfirmUnpublish({ id: h.id, open: true })}>
            <EyeOff className="h-4 w-4 mr-2" />
            Avpublicera
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setConfirmDelete({ id: h.id, open: true })}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="sm"
        onClick={(e) => { e.stopPropagation(); navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "publicerade" } }); }}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    { key: "seekers", label: "Sökande", render: (h: any) => h.seekers },
    { key: "publishedTo", label: "Publicerad till", render: (h: any) => new Date(h.publishedTo).toLocaleDateString('sv-SE'), hideOnMobile: true },
    { key: "availableFrom", label: "Ledig från", render: (h: any) => new Date(h.availableFrom).toLocaleDateString('sv-SE'), hideOnMobile: true },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (h: any) => renderActions(h),
    },
  ];

  const mobileCardRenderer = (housing: any) => (
    <div>
      <div className="font-medium">{housing.address}</div>
      <div className="text-sm text-muted-foreground">{housing.area}</div>
      <div className="grid grid-cols-[auto_auto] gap-x-4 gap-y-1 mt-2 justify-start">
        <span className="text-sm text-muted-foreground">Rum:</span>
        <span className="text-sm">{housing.rooms}</span>
        <span className="text-sm text-muted-foreground">Hyra:</span>
        <span className="text-sm">{housing.rent}</span>
        <span className="text-sm text-muted-foreground">Sökande:</span>
        <span className="text-sm">{housing.seekers}</span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        {renderActions(housing)}
      </div>
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={items}
        columns={columns}
        keyExtractor={(h) => h.id}
        emptyMessage="Inga publicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "publicerade" } })}
      />

      <ConfirmDialog
        open={confirmUnpublish.open}
        onOpenChange={(open) => !open && setConfirmUnpublish({ id: "", open: false })}
        title="Avpublicera annons"
        description="Är du säker på att du vill avpublicera denna annons?"
        confirmLabel="Avpublicera"
        onConfirm={handleUnpublishConfirm}
      />

      <ConfirmDialog
        open={confirmDelete.open}
        onOpenChange={(open) => !open && setConfirmDelete({ id: "", open: false })}
        title="Ta bort annons"
        description="Är du säker på att du vill ta bort denna annons? Detta kan inte ångras."
        confirmLabel="Ta bort"
        variant="destructive"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
