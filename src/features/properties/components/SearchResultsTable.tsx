import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
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
    <ResponsiveTable
      data={results}
      columns={[
        {
          key: "name",
          label: "Namn",
          render: (result) => <span className="font-medium">{result.name}</span>,
        },
        {
          key: "type",
          label: "Typ",
          render: (result) => (
            <Badge variant="outline" className={getTypeColorClass(result.type)}>
              {getTypeDisplay(result.type)}
            </Badge>
          ),
        },
        {
          key: "address",
          label: "Adress",
          render: (result) => result.address,
          hideOnMobile: true,
        },
        {
          key: "status",
          label: "Status",
          render: (result) => (
            <>
              {result.type === "apartment" && (
                <Badge variant="outline" className={
                  result.tenant ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }>
                  {result.tenant ? "Uthyrd" : "Vakant"}
                </Badge>
              )}
              {result.type !== "apartment" && "-"}
            </>
          ),
          hideOnMobile: true,
        },
        {
          key: "action",
          label: "Åtgärd",
          render: (result) => (
            <Button asChild variant="link" size="sm">
              <Link to={result.path}>
                Visa detaljer
              </Link>
            </Button>
          ),
          className: "text-right",
        },
      ]}
      keyExtractor={(result) => `${result.type}-${result.id}`}
      emptyMessage="Inga resultat hittades med angivna sökkriterier"
      mobileCardRenderer={(result) => (
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{result.name}</div>
              <div className="text-sm text-muted-foreground">{result.address}</div>
            </div>
            <Badge variant="outline" className={getTypeColorClass(result.type)}>
              {getTypeDisplay(result.type)}
            </Badge>
          </div>
          {result.type === "apartment" && (
            <Badge variant="outline" className={
              result.tenant ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
            }>
              {result.tenant ? "Uthyrd" : "Vakant"}
            </Badge>
          )}
          <div className="flex justify-end">
            <Button asChild variant="link" size="sm">
              <Link to={result.path}>
                Visa detaljer
              </Link>
            </Button>
          </div>
        </div>
      )}
    />
  );
};
