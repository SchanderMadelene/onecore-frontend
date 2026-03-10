import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { DateRangeFilter } from "@/shared/common/DateRangeFilter";
import { DatePicker } from "@/shared/common/DatePicker";
import { FilterContent } from "@/shared/ui/filter-content";
import { SearchableMultiSelect } from "@/shared/ui/searchable-multi-select";
import { ComponentViewer } from "./viewer";
import { filterChipDefinition } from "./definitions";

// --- Search Field Demo ---
const SearchFieldDemo = () => {
  const [query, setQuery] = useState("");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sökfält</CardTitle>
        <CardDescription>
          Input med sökikon. Används som primärt sökfält på samlingssidor. Fullt responsivt (w-full).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök på beteckning, kod, byggnad, lägenhet..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Select Filter Demo ---
const SelectFilterDemo = () => {
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Select-filter</CardTitle>
        <CardDescription>
          Standard Select med <code className="text-xs bg-muted px-1 rounded">w-full sm:w-[180px]</code>. Placeholder fungerar som etikett. Första alternativet är alltid "Alla …".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla statusar</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="pending">Väntande</SelectItem>
              <SelectItem value="closed">Avslutad</SelectItem>
            </SelectContent>
          </Select>

          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla typer</SelectItem>
              <SelectItem value="apartment">Lägenhet</SelectItem>
              <SelectItem value="parking">Parkering</SelectItem>
              <SelectItem value="storage">Förråd</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

// --- DatePicker (single date) Demo ---
const DatePickerDemo = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">DatePicker</CardTitle>
        <CardDescription>
          Kalender-popover för enstaka datum. Wrappar Calendar + Popover-mönstret i en delad komponent.
          Stöder anpassat format, locale och <code className="text-xs bg-muted px-1 rounded">disabled</code>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <DatePicker value={date} onChange={setDate} className="sm:w-[240px]" />
        {date && (
          <p className="text-sm text-muted-foreground">
            Valt datum: <span className="font-medium text-foreground">{date.toLocaleDateString("sv-SE")}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// --- DateRangeFilter Demo ---
const DateRangeFilterDemo = () => {
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">DateRangeFilter</CardTitle>
        <CardDescription>
          Kalender-popover för datumintervall. Visar valt intervall i knappen och stödjer rensa-funktion. Stöder <code className="text-xs bg-muted px-1 rounded">disabled</code>-läge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DateRangeFilter
          label="Datumintervall"
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
      </CardContent>
    </Card>
  );
};

// --- FilterContent (Column Filter) Demo ---
const FilterContentDemo = () => {
  const [filterValue, setFilterValue] = useState("");
  const options = ["Västerås", "Bäckby", "Skiljebo", "Centrum", "Hammarby"];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Kolumnfilter (FilterContent)</CardTitle>
        <CardDescription>
          Inline-filter i tabellhuvuden. Visas vid hover och öppnar en sökbar Command-popover. Aktivt filter markeras med primärfärg.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md inline-block px-4 py-2">
          <FilterContent
            onFilter={setFilterValue}
            filterValue={filterValue}
            filterOptions={options}
            placeholder="Sök område..."
          >
            Område
          </FilterContent>
        </div>
        {filterValue && (
          <p className="text-sm text-muted-foreground mt-2">
            Aktivt filter: <span className="font-medium text-foreground">{filterValue}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// --- Date Field Selector Demo ---
const DateFieldSelectorDemo = () => {
  const [dateField, setDateField] = useState("");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const dateFieldLabels: Record<string, string> = {
    created: "Skapad",
    updated: "Uppdaterad",
    closed: "Avslutad",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Datumfältsväljare</CardTitle>
        <CardDescription>
          Select som styr vilken datumtyp som filtreras. DateRangeFilter är <code className="text-xs bg-muted px-1 rounded">disabled</code> tills en datumtyp valts. Används t.ex. i kundreskontran.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start">
          <Select value={dateField || "none"} onValueChange={(v) => {
            setDateField(v === "none" ? "" : v);
            if (v === "none") {
              setFromDate(undefined);
              setToDate(undefined);
            }
          }}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Välj datumtyp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Välj datumtyp</SelectItem>
              <SelectItem value="created">Skapad</SelectItem>
              <SelectItem value="updated">Uppdaterad</SelectItem>
              <SelectItem value="closed">Avslutad</SelectItem>
            </SelectContent>
          </Select>

          <DateRangeFilter
            label={dateField ? dateFieldLabels[dateField] : "Välj datumtyp först"}
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
            disabled={!dateField}
          />
        </div>
      </CardContent>
    </Card>
  );
};

// --- Searchable MultiSelect Demo ---
const SearchableMultiSelectDemo = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const addresses = [
    "Kopparbergsvägen 1", "Kopparbergsvägen 3", "Sigurdsgatan 25",
    "Erikslund 12", "Vasagatan 4", "Björnövägen 8", "Stallhagen 15",
    "Oxbacksgatan 2", "Pilgatan 10", "Skallbergsvägen 7",
    "Vallbyleden 22", "Hässlögatan 14", "Cityringen 5",
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sökbar multiselect</CardTitle>
        <CardDescription>
          Inline dropdown med sök och flerval. Byggd på Popover + Command. Visar valda som badges i triggern (max 2 + räknare). Lämplig för stora listor som adresser, områden etc.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <SearchableMultiSelect
          options={addresses}
          selected={selected}
          onSelectionChange={setSelected}
          placeholder="Välj adresser..."
          searchPlaceholder="Sök adress..."
        />
        {selected.length > 0 && (
          <p className="text-sm text-muted-foreground">
            Valda: <span className="font-medium text-foreground">{selected.join(", ")}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// --- Composite Pattern Demo ---
const CompositePatternDemo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();

  const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || areaFilter !== "all" || fromDate || toDate || searchQuery;

  const clearAll = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setAreaFilter("all");
    setFromDate(undefined);
    setToDate(undefined);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Sammansatt filtermönster</CardTitle>
        <CardDescription>
          Standardlayout för samlingssidor: sökfält (fullbredd) + flex-wrap rad av Select-filter + DateRangeFilter + rensa-knapp.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök på beteckning, kod, byggnad..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filters row */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-start">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla statusar</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="pending">Väntande</SelectItem>
              <SelectItem value="closed">Avslutad</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Typ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla typer</SelectItem>
              <SelectItem value="apartment">Lägenhet</SelectItem>
              <SelectItem value="parking">Parkering</SelectItem>
            </SelectContent>
          </Select>

          <Select value={areaFilter} onValueChange={setAreaFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Område" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alla områden</SelectItem>
              <SelectItem value="centrum">Centrum</SelectItem>
              <SelectItem value="backby">Bäckby</SelectItem>
            </SelectContent>
          </Select>

          <DateRangeFilter
            label="Datum"
            fromDate={fromDate}
            toDate={toDate}
            onFromDateChange={setFromDate}
            onToDateChange={setToDate}
          />

          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="gap-1">
              <X className="h-4 w-4" />
              Rensa filter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// --- Main Export ---
export const FilterSearchShowcase = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Filter & Sök</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Komponenter för filtrering och sökning på samlingssidor. Används i kombination med tabeller.
        </p>
      </div>

      <SearchFieldDemo />
      <SelectFilterDemo />

      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-1">Datumkomponenter</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Två delade datumkomponenter: <strong>DatePicker</strong> för enstaka datum och <strong>DateRangeFilter</strong> för datumintervall.
          Datumfältsväljaren är ett sammansatt mönster som kombinerar en Select med DateRangeFilter.
        </p>
        <div className="space-y-6">
          <DatePickerDemo />
          <DateRangeFilterDemo />
          <DateFieldSelectorDemo />
        </div>
      </div>

      <FilterContentDemo />
      <SearchableMultiSelectDemo />
      <ComponentViewer definition={filterChipDefinition} />

      <div className="pt-4 border-t">
        <h3 className="text-lg font-semibold mb-4">Standardmönster</h3>
        <CompositePatternDemo />
      </div>
    </div>
  );
};
