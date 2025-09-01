import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useHousingOffers } from "@/contexts/HousingOffersContext";
import { publishedHousingSpaces } from "@/data/published-housing";
import { useHousingStatus } from "@/hooks/useHousingStatus";

export function OfferedHousingTable() {
  const navigate = useNavigate();
  const { offers } = useHousingOffers();
  const { filterHousingByStatus } = useHousingStatus();

  const handleRowClick = (housingId: string) => {
    navigate(`/rentals/housing/${housingId}`, {
      state: { from: "?tab=erbjudna" }
    });
  };

  const offeredHousings = filterHousingByStatus(publishedHousingSpaces, 'offered');

  if (offeredHousings.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <p>Inga erbjudanden skickade</p>
          <p className="text-sm">Erbjudanden du skickar kommer att visas här</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent bg-secondary">
            <TableHead className="whitespace-nowrap font-semibold">Adress</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Område</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Rum</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Yta</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Hyra</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Erbjudna</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Status</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Skickat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offeredHousings.map((housing) => {
            const offer = offers.find(o => o.listingId === housing.id);
            return (
              <TableRow 
                key={housing.id} 
                className="hover:bg-secondary/50 cursor-pointer"
                onClick={() => handleRowClick(housing.id)}
              >
                <TableCell className="font-medium">{housing.address}</TableCell>
                <TableCell>{housing.area}</TableCell>
                <TableCell>{housing.rooms}</TableCell>
                <TableCell>{housing.size}</TableCell>
                <TableCell>{housing.rent}</TableCell>
                <TableCell>{offer?.selectedApplicants.length || 0} st</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Väntar på svar
                  </Badge>
                </TableCell>
                <TableCell>
                  {offer?.sentAt ? new Date(offer.sentAt).toLocaleDateString('sv-SE') : '-'}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}