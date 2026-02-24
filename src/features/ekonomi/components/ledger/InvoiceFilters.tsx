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

export type InvoiceDateField = "invoiceDate" | "dueDate" | "paymentDate";

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

const dateFieldLabels: Record<InvoiceDateField, string> = {
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
  const hasActiveFilters = typeFilter || fromDate || toDate;

  const clearAll = () => {
    onTypeFilterChange("");
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

      <Select value={dateField} onValueChange={(v) => onDateFieldChange(v as InvoiceDateField)}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="invoiceDate">Fakturadatum</SelectItem>
          <SelectItem value="dueDate">Förfallodatum</SelectItem>
          <SelectItem value="paymentDate">Betalningsdatum</SelectItem>
        </SelectContent>
      </Select>

      <DateRangeFilter
        label={dateFieldLabels[dateField]}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={onFromDateChange}
        onToDateChange={onToDateChange}
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
