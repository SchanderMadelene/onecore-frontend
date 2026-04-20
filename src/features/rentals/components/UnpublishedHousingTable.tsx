import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { unpublishedHousingSpaces } from "../data/unpublished-housing";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import type { UnpublishedHousingSpace } from "./types/unpublished-housing";
import { getDistrictByArea } from "../utils/area-district";
import { getRentalObjectType } from "../utils/rental-object-type";
import { BuildingTypeBadge } from "@/features/property-areas/components/BuildingTypeBadge";
import { HousingRowActions } from "./HousingRowActions";

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
    { key: "rentalType", label: "Hyresobjektstyp", render: (s: any) => <BuildingTypeBadge type={getRentalObjectType(s.id)} />, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (s: any) => s.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (s: any) => s.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (s: any) => s.rent },
    { key: "status", label: "Status", render: (s: any) => getStatusBadge(s.status) },
    { key: "lastModified", label: "Senast ändrad", render: (s: any) => s.lastModified, hideOnMobile: true },
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
        data={unpublishedHousingSpaces}
        columns={columns}
        keyExtractor={(s) => s.id}
        emptyMessage="Inga opublicerade bostäder"
        mobileCardRenderer={mobileCardRenderer}
        onRowClick={(s) => navigate(`/rentals/housing/${s.id}`, { state: { activeHousingTab: "behovAvPublicering" } })}
        rowClassName="group"
      />
      <p className="text-sm text-muted-foreground mt-3">{unpublishedHousingSpaces.length} annonser</p>
    </>
  );
}
