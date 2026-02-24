import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangeFilter } from "@/components/common/DateRangeFilter";
import { X } from "lucide-react";

export type InvoiceDateField = "" | "invoiceDate" | "dueDate" | "paymentDate";

interface InvoiceFiltersProps {
  typeFilter: string;
  onTypeFilterChange: (value: string) => void;
  dateField: InvoiceDateField;
  onDateFieldChange: (value: InvoiceDateField) => void;
  fromDate: Date | undefined;
  toDate: Date | undefined;
  onFromDateChange: (date: Date | undefined) => void;
  onToDateChange: (date: Date | undefined) => void;
}

const dateFieldLabels: Record<string, string> = {
  invoiceDate: "Fakturadatum",
  dueDate: "Förfallodatum",
  paymentDate: "Betalningsdatum",
};

export function InvoiceFilters({
  typeFilter,
  onTypeFilterChange,
  dateField,
  onDateFieldChange,
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
}: InvoiceFiltersProps) {
  const hasActiveFilters = typeFilter || dateField || fromDate || toDate;

  const clearAll = () => {
    onTypeFilterChange("");
    onDateFieldChange("" as InvoiceDateField);
    onFromDateChange(undefined);
    onToDateChange(undefined);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={typeFilter || "all"} onValueChange={(v) => onTypeFilterChange(v === "all" ? "" : v)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Alla fakturatyper" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Alla fakturatyper</SelectItem>
          <SelectItem value="Avi">Avi</SelectItem>
          <SelectItem value="Ströfaktura">Ströfaktura</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateField || "none"} onValueChange={(v) => onDateFieldChange(v === "none" ? "" as InvoiceDateField : v as InvoiceDateField)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Välj datumtyp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Välj datumtyp</SelectItem>
          <SelectItem value="invoiceDate">Fakturadatum</SelectItem>
          <SelectItem value="dueDate">Förfallodatum</SelectItem>
          <SelectItem value="paymentDate">Betalningsdatum</SelectItem>
        </SelectContent>
      </Select>

      <DateRangeFilter
        label={dateField ? dateFieldLabels[dateField] : "Välj datumtyp först"}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={onFromDateChange}
        onToDateChange={onToDateChange}
        disabled={!dateField}
      />

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
          <X className="h-4 w-4" />
          Rensa filter
        </Button>
      )}
    </div>
  );
}
