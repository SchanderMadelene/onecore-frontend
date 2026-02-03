import React, { useState, useMemo } from "react";
import { PageLayout } from "@/layouts";
import { 
  PropertyAreasTable, 
  getAllPropertyAreas, 
  getUniqueCostCenters, 
  getUniqueStewards,
  getUniqueBuildingTypes,
  getCostCenterName,
  getBuildingTypeName,
  type PropertyAreaEntry 
} from "@/features/property-areas";
import { ColumnSelector, ALL_COLUMNS, DEFAULT_VISIBLE_COLUMNS } from "@/features/property-areas/components/ColumnSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportButton } from "@/components/ui/export-button";
import { Search, X } from "lucide-react";
import { exportToExcel, ExcelColumn } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const PropertyAreasPage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [costCenterFilter, setCostCenterFilter] = useState("all");
  const [stewardFilter, setStewardFilter] = useState("all");
  const [buildingTypeFilter, setBuildingTypeFilter] = useState("all");
  const [visibleColumns, setVisibleColumns] = useState<string[]>(DEFAULT_VISIBLE_COLUMNS);

  const allEntries = getAllPropertyAreas();
  const costCenters = getUniqueCostCenters();
  const stewards = getUniqueStewards();
  const buildingTypes = getUniqueBuildingTypes();

  const hasActiveFilters = searchQuery !== "" || costCenterFilter !== "all" || stewardFilter !== "all" || buildingTypeFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setCostCenterFilter("all");
    setStewardFilter("all");
    setBuildingTypeFilter("all");
  };

  const handleColumnVisibilityChange = (columnKey: string, visible: boolean) => {
    if (visible) {
      setVisibleColumns(prev => [...prev, columnKey]);
    } else {
      setVisibleColumns(prev => prev.filter(key => key !== columnKey));
    }
  };

  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      const matchesSearch = searchQuery === "" ||
        entry.stewardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.propertyCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (entry.stewardPhone && entry.stewardPhone.includes(searchQuery));

      const matchesCostCenter = costCenterFilter === "all" || entry.costCenter === costCenterFilter;
      const matchesSteward = stewardFilter === "all" || entry.stewardRefNr === stewardFilter;
      const matchesBuildingType = buildingTypeFilter === "all" || entry.buildingType === buildingTypeFilter;

      return matchesSearch && matchesCostCenter && matchesSteward && matchesBuildingType;
    });
  }, [allEntries, searchQuery, costCenterFilter, stewardFilter, buildingTypeFilter]);

  const handleExport = () => {
    const columns: ExcelColumn<PropertyAreaEntry>[] = [
      { key: "costCenter", header: "K-ställe" },
      { key: "stewardName", header: "Kvartersvärd" },
      { key: "stewardPhone", header: "Telefon" },
      { key: "stewardRefNr", header: "Ref.nr" },
      { key: "propertyCode", header: "Fastighetsnummer" },
      { key: "propertyName", header: "Fastighet" },
      { key: "address", header: "Adress" },
      { key: "buildingType", header: "Typ" },
      { key: "residenceCount", header: "Antal bostäder" },
      { key: "commercialCount", header: "Antal lokaler" },
      { key: "garageCount", header: "Antal garage" },
      { key: "parkingCount", header: "Antal p-platser" },
      { key: "otherCount", header: "Antal övrigt" },
      { key: "residenceArea", header: "Yta bostad (kvm)" },
      { key: "commercialArea", header: "Yta lokal (kvm)" },
      { key: "garageArea", header: "Yta garage (kvm)" },
      { key: "entranceCount", header: "Antal trappuppgångar" },
    ];

    const today = new Date().toISOString().split('T')[0];
    
    exportToExcel(filteredEntries, columns, {
      filename: `forvaltningsomraden-${today}`,
      sheetName: "Förvaltningsområden"
    });

    toast({
      title: "Export klar",
      description: `${filteredEntries.length} rader exporterades till Excel`,
    });
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Förvaltningsområden</h1>
            <p className="text-muted-foreground mt-1">
              Överblick över kostnadställen och kvartersvärdar
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Sökfält - full bredd */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sök på kvartersvärd, fastighet, adress, fastighetsnummer eller telefon..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter - egen rad */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-center">
              <Select value={costCenterFilter} onValueChange={setCostCenterFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Kostnadställe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kostnadställen</SelectItem>
                  {costCenters.map(cc => (
                    <SelectItem key={cc} value={cc}>
                      {cc} - {getCostCenterName(cc)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stewardFilter} onValueChange={setStewardFilter}>
                <SelectTrigger className="w-full sm:w-[220px]">
                  <SelectValue placeholder="Kvartersvärd" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kvartersvärdar</SelectItem>
                  {stewards.map(s => (
                    <SelectItem key={s.refNr} value={s.refNr}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={buildingTypeFilter} onValueChange={setBuildingTypeFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Byggnadstyp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla typer</SelectItem>
                  {buildingTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {getBuildingTypeName(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" />
                  Rensa filter
                </Button>
              )}

              <div className="sm:ml-auto flex gap-2">
                {!isMobile && (
                  <ColumnSelector
                    columns={ALL_COLUMNS}
                    visibleColumns={visibleColumns}
                    onVisibilityChange={handleColumnVisibilityChange}
                  />
                )}
                <ExportButton 
                  onExport={handleExport} 
                  count={filteredEntries.length}
                  disabled={filteredEntries.length === 0}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabell */}
        <Card>
          <CardContent className="p-0">
            <PropertyAreasTable entries={filteredEntries} visibleColumns={visibleColumns} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PropertyAreasPage;
