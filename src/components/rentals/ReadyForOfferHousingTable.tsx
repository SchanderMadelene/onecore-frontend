import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { publishedHousingSpaces } from "@/data/published-housing";
import { useHousingStatus } from "@/hooks/useHousingStatus";
import { Send } from "lucide-react";

export function ReadyForOfferHousingTable() {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  const handleRowClick = (housingId: string) => {
    navigate(`/rentals/housing/${housingId}`);
  };

  const handleSendOffer = (e: React.MouseEvent, housingId: string) => {
    e.stopPropagation(); // Prevent row click
    navigate(`/rentals/housing/${housingId}`, { 
      state: { showCreateOffer: true } 
    });
  };

  const readyForOfferHousings = filterHousingByStatus(publishedHousingSpaces, 'ready_for_offer');

  if (readyForOfferHousings.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px] text-muted-foreground border rounded-md">
        <div className="text-center">
          <p>Inga bostäder klara för erbjudande</p>
          <p className="text-sm">Bostäder som passerat publiceringsdatum visas här</p>
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
            <TableHead className="whitespace-nowrap font-semibold">Sökande</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Publicerad till</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Status</TableHead>
            <TableHead className="whitespace-nowrap font-semibold">Åtgärd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {readyForOfferHousings.map((housing) => (
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
              <TableCell>{housing.seekers}</TableCell>
              <TableCell>{new Date(housing.publishedTo).toLocaleDateString('sv-SE')}</TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  Klar för erbjudande
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={(e) => handleSendOffer(e, housing.id)}
                  className="flex items-center gap-1"
                >
                  <Send className="h-3 w-3" />
                  Skicka erbjudande
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}