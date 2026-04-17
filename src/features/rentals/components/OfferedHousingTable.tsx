import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { publishedHousingSpaces } from "../data/published-housing";
import { useHousingStatus } from "../hooks/useHousingStatus";
import { ResponsiveTable } from "@/shared/ui/responsive-table";

export function OfferedHousingTable() {
  const navigate = useNavigate();
  const { offers } = useHousingOffers();
  const { filterHousingByStatus } = useHousingStatus();

  const offeredHousings = filterHousingByStatus(publishedHousingSpaces, 'offered');

  const columns = [
    { key: "address", label: "Adress", render: (h: any) => <span className="font-medium">{h.address}</span> },
    { key: "area", label: "Område", render: (h: any) => h.area, hideOnMobile: true },
    { key: "rooms", label: "Rum", render: (h: any) => h.rooms, hideOnMobile: true },
    { key: "size", label: "Yta", render: (h: any) => h.size, hideOnMobile: true },
    { key: "rent", label: "Hyra", render: (h: any) => h.rent },
    { 
      key: "offered", 
      label: "Erbjudna", 
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        return `${offer?.selectedApplicants.length || 0} st`;
      }
    },
    {
      key: "accepted",
      label: "Tackat ja",
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        const total = offer?.selectedApplicants.length || 0;
        // Mock: deterministisk andel som tackat ja baserat på listing-id
        const seed = h.id.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0);
        const accepted = total === 0 ? 0 : seed % (total + 1);
        return `${accepted} st`;
      }
    },
    { 
      key: "status", 
      label: "Status", 
      render: () => (
        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
          Väntar på svar
        </Badge>
      )
    },
    { 
      key: "sentAt", 
      label: "Skickat", 
      render: (h: any) => {
        const offer = offers.find(o => o.listingId === h.id);
        return offer?.sentAt ? new Date(offer.sentAt).toLocaleDateString('sv-SE') : '-';
      },
      hideOnMobile: true 
    },
  ];

  const mobileCardRenderer = (housing: any) => {
    const offer = offers.find(o => o.listingId === housing.id);
    return (
      <div>
        <div className="font-medium">{housing.address}</div>
        <div className="text-sm text-muted-foreground">{housing.area}</div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Väntar på svar
          </Badge>
          <span className="text-sm text-muted-foreground">{offer?.selectedApplicants.length || 0} erbjudna</span>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveTable
      data={offeredHousings}
      columns={columns}
      keyExtractor={(h) => h.id}
      emptyMessage="Inga erbjudanden skickade"
      mobileCardRenderer={mobileCardRenderer}
      onRowClick={(h) => navigate(`/rentals/housing/${h.id}`, { state: { activeHousingTab: "erbjudna" } })}
    />
  );
}
