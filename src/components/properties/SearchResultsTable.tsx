
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SearchResult } from "@/data/search";

interface SearchResultsTableProps {
  results: SearchResult[];
}

export const SearchResultsTable = ({ results }: SearchResultsTableProps) => {
  const getTypeDisplay = (type: string) => {
    switch (type) {
      case "property": return "Fastighet";
      case "building": return "Byggnad";
      case "apartment": return "Lägenhet";
      case "tenant": return "Kund";
      default: return type;
    }
  };

  const getTypeColorClass = (type: string) => {
    switch (type) {
      case "property": return "bg-blue-100 text-blue-800";
      case "building": return "bg-purple-100 text-purple-800";
      case "apartment": return "bg-green-100 text-green-800";
      case "tenant": return "bg-slate-100";
      default: return "bg-slate-100";
    }
  };

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
                <Badge variant="outline" className={getTypeColorClass(result.type)}>
                  {getTypeDisplay(result.type)}
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
