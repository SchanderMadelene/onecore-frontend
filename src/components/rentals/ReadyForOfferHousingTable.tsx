import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { publishedHousingSpaces } from "@/data/published-housing";
import { useHousingStatus } from "@/hooks/useHousingStatus";

export function ReadyForOfferHousingTable() {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  const handleRowClick = (housingId: string) => {
    navigate(`/rentals/housing/${housingId}`);
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}