import React from "react";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { PropertyAreaEntry, COST_CENTER_NAMES } from "../types";

interface PropertyAreasTableProps {
  entries: PropertyAreaEntry[];
}

export function PropertyAreasTable({ entries }: PropertyAreasTableProps) {
  return (
    <ResponsiveTable
      data={entries}
      columns={[
        {
          key: "costCenter",
          label: "K-ställe",
          render: (entry) => (
            <span className="font-medium">{entry.costCenter}</span>
          ),
        },
        {
          key: "stewardName",
          label: "Kvartersvärd",
          render: (entry) => entry.stewardName,
        },
        {
          key: "stewardRefNr",
          label: "Ref.nr",
          render: (entry) => entry.stewardRefNr,
          hideOnMobile: true,
        },
        {
          key: "propertyCode",
          label: "Fastighetsnr",
          render: (entry) => entry.propertyCode,
          hideOnMobile: true,
        },
        {
          key: "propertyName",
          label: "Fastighet",
          render: (entry) => entry.propertyName,
        },
        {
          key: "address",
          label: "Adress",
          render: (entry) => entry.address,
        },
      ]}
      keyExtractor={(entry) => entry.id}
      emptyMessage="Inga områden hittades"
      mobileCardRenderer={(entry) => (
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{entry.propertyName}</div>
              <div className="text-sm text-muted-foreground">{entry.address}</div>
            </div>
            <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
              {entry.costCenter}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Kvartersvärd: </span>
            <span>{entry.stewardName}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Ref: {entry.stewardRefNr}</span>
            <span>Fnr: {entry.propertyCode}</span>
          </div>
        </div>
      )}
    />
  );
}
