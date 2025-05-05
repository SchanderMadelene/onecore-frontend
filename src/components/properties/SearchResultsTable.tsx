
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchResult } from "@/data/search";

interface SearchResultsTableProps {
  results: SearchResult[];
}

export const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Namn</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Adress</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Åtgärd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.length > 0 ? results.map((result) => (
            <TableRow key={`${result.type}-${result.id}`}>
              <TableCell className="font-medium">
                {result.name}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={
                  result.type === "property" ? "bg-blue-100 text-blue-800" :
                  result.type === "building" ? "bg-purple-100 text-purple-800" : 
                  result.type === "apartment" ? "bg-green-100 text-green-800" :
                  "bg-slate-100"
                }>
                  {result.type === "property" ? "Fastighet" : 
                   result.type === "building" ? "Byggnad" : 
                   result.type === "apartment" ? "Lägenhet" : 
                   result.type === "tenant" ? "Kund" : ""}
                </Badge>
              </TableCell>
              <TableCell>{result.address}</TableCell>
              <TableCell>
                {result.type === "apartment" && (
                  <Badge variant="outline" className={
                    result.tenant ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }>
                    {result.tenant ? "Uthyrd" : "Vakant"}
                  </Badge>
                )}
                {result.type !== "apartment" && "-"}
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="link" size="sm">
                  <Link to={result.path}>
                    Visa detaljer
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Inga resultat hittades med angivna sökkriterier
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
