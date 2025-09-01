import { publishedHousingSpaces } from "@/data/published-housing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useHousingStatus } from "@/hooks/useHousingStatus";

export function PublishedHousingTable() {
  const navigate = useNavigate();
  const { filterHousingByStatus } = useHousingStatus();

  const handleRowClick = (housingId: string) => {
    navigate(`/rentals/housing/${housingId}`, {
      state: { fromTab: "publicerade" }
    });
  };

  const publishedHousings = filterHousingByStatus(publishedHousingSpaces, 'published');

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
            <TableHead className="whitespace-nowrap font-semibold">Ledig från</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publishedHousings.map((housing) => (
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
              <TableCell>{new Date(housing.availableFrom).toLocaleDateString('sv-SE')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}