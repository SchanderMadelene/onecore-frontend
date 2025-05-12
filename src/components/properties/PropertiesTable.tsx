
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Property } from "@/types/api";

/**
 * Helper function to generate property detail URL path
 */
const getPropertyPath = (property: Property) => {
  return `/properties/${property.id}`;
};

interface PropertiesTableProps {
  properties: Property[];
}

export const PropertiesTable = ({ properties }: PropertiesTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Beteckning</TableHead>
            <TableHead>Typ</TableHead>
            <TableHead>Användning</TableHead>
            <TableHead>Distrikt</TableHead>
            <TableHead>Kvartersvärdsområde</TableHead>
            <TableHead>Byggnader</TableHead>
            <TableHead className="text-right">Åtgärd</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties?.length ? properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">
                {property.designation}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-100">
                  {property.buildingType}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-slate-100">
                  {property.purpose}
                </Badge>
              </TableCell>
              <TableCell>{property.district}</TableCell>
              <TableCell>{property.propertyManagerArea}</TableCell>
              <TableCell>
                <div>
                  <span>{property.buildingCount}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild variant="link" size="sm">
                  <Link to={getPropertyPath(property)}>
                    Visa detaljer
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Inga fastigheter hittades med angivna sökkriterier
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
