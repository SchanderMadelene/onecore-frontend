import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeOff, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";
import { EditHousingDialog } from "./EditHousingDialog";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { PublishActionBar } from "@/shared/ui/publish-action-bar";
import { ConfirmDialog } from "@/shared/common/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";

export function UnpublishedHousingTable() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [items, setItems] = useState(unpublishedHousingSpaces);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [confirmPublish, setConfirmPublish] = useState<{ ids: string[]; open: boolean }>({ ids: [], open: false });

  const handlePublishConfirm = () => {
    const count = confirmPublish.ids.length;
    setItems(prev => prev.filter(item => !confirmPublish.ids.includes(item.id)));
    setSelectedKeys(prev => prev.filter(k => !confirmPublish.ids.includes(k)));
    setConfirmPublish({ ids: [], open: false });
    toast({
      title: count === 1 ? "Annons publicerad" : `${count} annonser publicerade`,
    });
  };

  const renderActions = (s: UnpublishedHousingSpace) => (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={(e) => { e.stopPropagation(); setConfirmPublish({ ids: [s.id], open: true }); }}
      >
        <Send className="h-4 w-4 mr-1" />
        Publicera
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
          <DropdownMenuItem onClick={() => {}}>
            <Eye className="h-4 w-4 mr-2" />
            Visa
          </DropdownMenuItem>
          <div onClick={(e) => e.stopPropagation()}>
            <EditHousingDialog housingSpace={s} />
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Ta bort
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const columns = [
    { key: "address", label: "Adress", render: (s: any) => <span className="font-medium">{s.address}</span> },
    { key: "area", label: "Område", render: (s: any) => s.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (s: any) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: any) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: any) => s.rent },
    { key: "lastModified", label: "Senast ändrad", render: (s: any) => s.lastModified, hideOnMobile: true },
    { key: "createdBy", label: "Skapad av", render: (s: any) => s.createdBy, hideOnMobile: true },
    {
      key: "actions",
      label: "",
      className: "text-right",
      render: (s: any) => renderActions(s),
    },
  ];

  const mobileCardRenderer = (space: any) => (
    <div>
      <div className="font-medium">{space.address}</div>
      <div className="text-sm text-muted-foreground">{space.area}</div>
      <div className="text-sm text-muted-foreground mt-1">{space.rent}</div>
      <div className="flex items-center gap-2 mt-3">
        {renderActions(space)}
      </div>
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={items}
        columns={columns}
        keyExtractor={(s) => s.id}
        emptyMessage="Inga opublicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        selectable
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        onRowClick={(s) => navigate(`/rentals/housing/${s.id}`, { state: { activeHousingTab: "behovAvPublicering" } })}
      />

      <PublishActionBar
        selectedCount={selectedKeys.length}
        onPublish={() => setConfirmPublish({ ids: selectedKeys, open: true })}
        onClear={() => setSelectedKeys([])}
      />

      <ConfirmDialog
        open={confirmPublish.open}
        onOpenChange={(open) => !open && setConfirmPublish({ ids: [], open: false })}
        title="Publicera annons"
        description={
          confirmPublish.ids.length === 1
            ? "Är du säker på att du vill publicera denna annons?"
            : `Är du säker på att du vill publicera ${confirmPublish.ids.length} annonser?`
        }
        confirmLabel="Publicera"
        onConfirm={handlePublishConfirm}
      />
    </>
  );
}
