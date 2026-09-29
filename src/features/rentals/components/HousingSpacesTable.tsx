
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { UnpublishedHousingTable } from "./UnpublishedHousingTable";
import { PublishedHousingTable } from "./PublishedHousingTable";
import { OfferedHousingTable } from "./OfferedHousingTable";
import { ContractHousingTable } from "./ContractHousingTable";
import { ReadyForOfferHousingTable } from "./ReadyForOfferHousingTable";
import { HistoryHousingTable } from "./HistoryHousingTable";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabCount } from "@/shared/ui/tab-count";
import { useState, useEffect, useMemo } from "react";
import { usePublishedSpaces, useUnpublishedSpaces } from "@/features/rentals/data/unpublished-housing-store";
import { useHousingStatus } from "@/features/rentals/hooks/useHousingStatus";
import { historyHousingSpaces } from "@/features/rentals/data/history-housing";
import { getDistrictByArea } from "@/features/rentals/utils/area-district";
import {
  applyHousingFilters,
  EMPTY_HOUSING_FILTERS,
  hasActiveHousingFilters,
  type HousingFiltersState,
} from "@/features/rentals/utils/housing-filters";
import { DateRangeFilter } from "@/shared/common/DateRangeFilter";
import { ClearFiltersButton } from "@/shared/common/ClearFiltersButton";

function HousingGlobalFilters({
  filters,
  onChange,
  areaOptions,
  districtOptions,
}: {
  filters: HousingFiltersState;
  onChange: (filters: HousingFiltersState) => void;
  areaOptions: string[];
  districtOptions: string[];
}) {
  const set = (patch: Partial<HousingFiltersState>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Sök bostad, objektsnummer eller område..."
          className="pl-9"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.area || "all"}
          onValueChange={(v) => set({ area: v === "all" ? "" : v, district: "" })}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Alla områden" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla områden</SelectItem>
            {areaOptions.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={filters.district || "all"}
          onValueChange={(v) => set({ district: v === "all" ? "" : v })}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Alla distrikt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla distrikt</SelectItem>
            {districtOptions.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DateRangeFilter
          label="Publicerad"
          fromDate={filters.publishedFrom}
          toDate={filters.publishedTo}
          onFromDateChange={(date) => set({ publishedFrom: date })}
          onToDateChange={(date) => set({ publishedTo: date })}
        />
        {hasActiveHousingFilters(filters) && (
          <ClearFiltersButton onClick={() => onChange(EMPTY_HOUSING_FILTERS)} />
        )}
      </div>
    </div>
  );
}

export function HousingSpacesTable() {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState("publicerade");
  const [filters, setFilters] = useState<HousingFiltersState>(EMPTY_HOUSING_FILTERS);

  // Handle navigation from offer creation
  useEffect(() => {
    if (location.state?.activeHousingTab) {
      setCurrentTab(location.state.activeHousingTab);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const { filterHousingByStatus } = useHousingStatus();
  const unpublishedHousingSpaces = useUnpublishedSpaces();
  const publishedHousingSpaces = usePublishedSpaces();

  const areaOptions = useMemo(() => {
    const all = [
      ...unpublishedHousingSpaces,
      ...publishedHousingSpaces,
      ...historyHousingSpaces,
    ].map((h) => h.area);
    return Array.from(new Set(all)).filter(Boolean).sort((a, b) => a.localeCompare(b, "sv"));
  }, [unpublishedHousingSpaces, publishedHousingSpaces]);

  const districtOptions = useMemo(() => {
    if (filters.area) return [getDistrictByArea(filters.area)];
    const districts = areaOptions.map((area) => getDistrictByArea(area));
    return Array.from(new Set(districts)).filter((d) => d !== "—").sort((a, b) => a.localeCompare(b, "sv"));
  }, [areaOptions, filters.area]);

  const counts = {
    behovAvPublicering: unpublishedHousingSpaces.length,
    publicerade: filterHousingByStatus(publishedHousingSpaces, "published").length,
    klaraForErbjudande: filterHousingByStatus(publishedHousingSpaces, "ready_for_offer").length,
    erbjudna: filterHousingByStatus(publishedHousingSpaces, "offered").length,
  };

  const tabs: { value: string; label: string; count?: number; content: JSX.Element }[] = [
    {
      value: "behovAvPublicering",
      label: "Publicera",
      count: counts.behovAvPublicering,
      content: <UnpublishedHousingTable filters={filters} />
    },
    {
      value: "publicerade",
      label: "Publicerat nu",
      count: counts.publicerade,
      content: <PublishedHousingTable filters={filters} />
    },
    {
      value: "klaraForErbjudande",
      label: "Erbjud visning",
      count: counts.klaraForErbjudande,
      content: <ReadyForOfferHousingTable filters={filters} />
    },
    {
      value: "erbjudna",
      label: "Visning",
      count: counts.erbjudna,
      content: <OfferedHousingTable filters={filters} />
    },
    {
      value: "kontrakt",
      label: "Erbjud kontrakt",
      content: <ContractHousingTable filters={filters} />
    },
    {
      value: "historik",
      label: "Historik",
      content: <HistoryHousingTable filters={filters} />
    }
  ];

  return (
    <div className="w-full space-y-8">
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <HousingGlobalFilters
          filters={filters}
          onChange={setFilters}
          areaOptions={areaOptions}
          districtOptions={districtOptions}
        />
        <TabsList className="grid mb-8 h-11" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="group h-full gap-2 px-2 text-xs sm:text-sm sm:px-3">
              {tab.label}
              {tab.count !== undefined && <TabCount count={tab.count} hideWhenZero={false} variant="neutral" />}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
