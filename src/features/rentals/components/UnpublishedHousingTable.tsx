import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";
import { EditHousingDialog } from "./EditHousingDialog";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { getDistrictByArea } from "../utils/area-district";

const getStatusBadge = (status: UnpublishedHousingSpace["status"]) => {
  switch (status) {
    case "draft":
      return <Badge variant="secondary">Utkast</Badge>;
    case "needs_review":
      return <Badge variant="outline">Behöver granskning</Badge>;
    case "ready_to_publish":
      return <Badge variant="default">Redo att publicera</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export function UnpublishedHousingTable() {
  const navigate = useNavigate();

  const columns = [
    { key: "address", label: "Adress", render: (s: any) => <span className="font-medium">{s.address}</span> },
    { key: "area", label: "Område", render: (s: any) => s.area, hideOnMobile: true },
    { key: "district", label: "Distrikt", render: (s: any) => getDistrictByArea(s.area), hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (s: any) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: any) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: any) => s.rent },
    { key: "status", label: "Status", render: (s: any) => getStatusBadge(s.status) },
    { key: "lastModified", label: "Senast ändrad", render: (s: any) => s.lastModified, hideOnMobile: true },
    { key: "createdBy", label: "Skapad av", render: (s: any) => s.createdBy, hideOnMobile: true },
    { 
      key: "actions", 
      label: "", 
      className: "text-right",
      render: (s: any) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
            <Eye className="h-4 w-4" />
          </Button>
          <div onClick={(e) => e.stopPropagation()}>
            <EditHousingDialog housingSpace={s} />
          </div>
          <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  ];

  const mobileCardRenderer = (space: any) => (
    <div>
      <div className="font-medium">{space.address}</div>
      <div className="text-sm text-muted-foreground">{space.area}</div>
      <div className="flex items-center gap-2 mt-2">
        {getStatusBadge(space.status)}
        <span className="text-sm text-muted-foreground">{space.rent}</span>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
          <Eye className="h-4 w-4" />
        </Button>
        <div onClick={(e) => e.stopPropagation()}>
          <EditHousingDialog housingSpace={space} />
        </div>
        <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <ResponsiveTable
        data={unpublishedHousingSpaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        emptyMessage="Inga opublicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(s) => navigate(`/rentals/housing/${s.id}`, { state: { activeHousingTab: "behovAvPublicering" } })}
      />
      <p className="text-sm text-muted-foreground mt-3">{unpublishedHousingSpaces.length} annonser</p>
    </>
  );
}
