
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Property } from "@/types/api";

const getPropertyPath = (property: Property) => {
  return `/properties/${property.id}`;
};

interface PropertiesTableProps {
  properties: Property[];
}

export const PropertiesTable = ({ properties }: PropertiesTableProps) => {
  const columns = [
    {
      key: "designation",
      label: "Beteckning",
      render: (property: Property) => (
        <span className="font-medium">{property.designation}</span>
      )
    },
    {
      key: "buildingType",
      label: "Typ",
      render: (property: Property) => (
        <Badge variant="outline" className="bg-slate-100">
          {property.buildingType}
        </Badge>
      ),
      hideOnMobile: true
    },
    {
      key: "purpose",
      label: "Användning",
      render: (property: Property) => (
        <Badge variant="outline" className="bg-slate-100">
          {property.purpose}
        </Badge>
      ),
      hideOnMobile: true
    },
    {
      key: "district",
      label: "Distrikt",
      render: (property: Property) => property.district
    },
    {
      key: "propertyManagerArea",
      label: "Kvartersvärdsområde",
      render: (property: Property) => property.propertyManagerArea,
      hideOnMobile: true
    },
    {
      key: "buildingCount",
      label: "Byggnader",
      render: (property: Property) => property.buildingCount.toString()
    },
    {
      key: "actions",
      label: "Åtgärd",
      render: (property: Property) => (
        <Button asChild variant="link" size="sm">
          <Link to={getPropertyPath(property)}>
            Visa detaljer
          </Link>
        </Button>
      ),
      className: "text-right"
    }
  ];

  const mobileCardRenderer = (property: Property) => (
    <div className="space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-sm">{property.designation}</h3>
          <p className="text-xs text-muted-foreground">{property.district}</p>
        </div>
        <div className="flex gap-1">
          <Badge variant="outline" className="bg-slate-100 text-xs">
            {property.buildingType}
          </Badge>
        </div>
      </div>
      <div className="flex justify-between items-center pt-1">
        <span className="text-xs text-muted-foreground">
          {property.buildingCount} byggnader
        </span>
        <Button asChild variant="link" size="sm" className="h-auto p-0">
          <Link to={getPropertyPath(property)}>
            Visa detaljer
          </Link>
        </Button>
      </div>
    </div>
  );

  return (
    <ResponsiveTable
      data={properties}
      columns={columns}
      keyExtractor={(property) => property.id}
      emptyMessage="Inga fastigheter hittades med angivna sökkriterier"
      mobileCardRenderer={mobileCardRenderer}
    />
  );
};
