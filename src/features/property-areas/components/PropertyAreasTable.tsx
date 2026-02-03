import React from "react";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { PropertyAreaEntry, COST_CENTER_NAMES, BUILDING_TYPES } from "../types";
import { Badge } from "@/components/ui/badge";

interface PropertyAreasTableProps {
  entries: PropertyAreaEntry[];
}

export function PropertyAreasTable({ entries }: PropertyAreasTableProps) {
  const formatNumber = (num?: number) => {
    if (num === undefined || num === null) return "-";
    return num.toLocaleString('sv-SE');
  };

  const formatArea = (area?: number) => {
    if (area === undefined || area === null) return "-";
    return `${area.toLocaleString('sv-SE')} kvm`;
  };

  return (
    <ResponsiveTable
      data={entries}
      columns={[
        {
          key: "costCenter",
          label: "K-ställe",
          render: (entry) => (
            <div className="flex flex-col">
              <span className="font-medium">{entry.costCenter}</span>
              <span className="text-xs text-muted-foreground">
                {COST_CENTER_NAMES[entry.costCenter] || entry.costCenter}
              </span>
            </div>
          ),
        },
        {
          key: "stewardName",
          label: "Kvartersvärd",
          render: (entry) => (
            <div className="flex flex-col">
              <span>{entry.stewardName}</span>
              {entry.stewardPhone && (
                <span className="text-xs text-muted-foreground">{entry.stewardPhone}</span>
              )}
            </div>
          ),
        },
        {
          key: "stewardRefNr",
          label: "Ref.nr",
          render: (entry) => entry.stewardRefNr,
          hideOnMobile: true,
        },
        {
          key: "propertyName",
          label: "Fastighet",
          render: (entry) => (
            <div className="flex flex-col">
              <span className="font-medium">{entry.propertyName}</span>
              <span className="text-xs text-muted-foreground">{entry.propertyCode}</span>
            </div>
          ),
        },
        {
          key: "address",
          label: "Adress",
          render: (entry) => entry.address,
        },
        {
          key: "buildingType",
          label: "Typ",
          render: (entry) => entry.buildingType ? (
            <Badge variant="outline" className="text-xs">
              {BUILDING_TYPES[entry.buildingType] || entry.buildingType}
            </Badge>
          ) : "-",
          hideOnMobile: true,
        },
        {
          key: "residenceCount",
          label: "Bostäder",
          render: (entry) => formatNumber(entry.residenceCount),
          hideOnMobile: true,
        },
        {
          key: "residenceArea",
          label: "Yta",
          render: (entry) => entry.residenceArea ? `${formatNumber(entry.residenceArea)}` : "-",
          hideOnMobile: true,
        },
      ]}
      keyExtractor={(entry) => entry.id}
      emptyMessage="Inga områden hittades"
      mobileCardRenderer={(entry) => (
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="font-medium truncate">{entry.propertyName}</div>
              <div className="text-sm text-muted-foreground truncate">{entry.address}</div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
                {entry.costCenter}
              </span>
              {entry.buildingType && (
                <Badge variant="outline" className="text-xs">
                  {BUILDING_TYPES[entry.buildingType] || entry.buildingType}
                </Badge>
              )}
            </div>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Kvartersvärd: </span>
            <span>{entry.stewardName}</span>
            {entry.stewardPhone && (
              <span className="text-muted-foreground ml-1">({entry.stewardPhone})</span>
            )}
          </div>
          {(entry.residenceCount || entry.residenceArea) && (
            <div className="text-sm text-muted-foreground">
              {entry.residenceCount && <span>{entry.residenceCount} bostäder</span>}
              {entry.residenceCount && entry.residenceArea && <span> • </span>}
              {entry.residenceArea && <span>{formatNumber(entry.residenceArea)} kvm</span>}
            </div>
          )}
          <div className="flex justify-between text-xs text-muted-foreground pt-1">
            <span>Ref: {entry.stewardRefNr}</span>
            <span>Fnr: {entry.propertyCode}</span>
          </div>
        </div>
      )}
    />
  );
}
