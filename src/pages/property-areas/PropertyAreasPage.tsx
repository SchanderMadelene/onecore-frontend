import React, { useState, useMemo } from "react";
import { PageLayout } from "@/layouts";
import { 
  PropertyAreasTable, 
  getAllPropertyAreas, 
  getUniqueCostCenters, 
  getUniqueStewards,
  getCostCenterName,
  type PropertyAreaEntry 
} from "@/features/property-areas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportButton } from "@/components/ui/export-button";
import { Search, X, MapPin } from "lucide-react";
import { exportToExcel, ExcelColumn } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";

const PropertyAreasPage = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [costCenterFilter, setCostCenterFilter] = useState("all");
  const [stewardFilter, setStewardFilter] = useState("all");

  const allEntries = getAllPropertyAreas();
  const costCenters = getUniqueCostCenters();
  const stewards = getUniqueStewards();

  const hasActiveFilters = searchQuery !== "" || costCenterFilter !== "all" || stewardFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setCostCenterFilter("all");
    setStewardFilter("all");
  };

  const filteredEntries = useMemo(() => {
    return allEntries.filter(entry => {
      const matchesSearch = searchQuery === "" ||
        entry.stewardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.propertyCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCostCenter = costCenterFilter === "all" || entry.costCenter === costCenterFilter;
      const matchesSteward = stewardFilter === "all" || entry.stewardRefNr === stewardFilter;

      return matchesSearch && matchesCostCenter && matchesSteward;
    });
  }, [allEntries, searchQuery, costCenterFilter, stewardFilter]);

  const handleExport = () => {
    const columns: ExcelColumn<PropertyAreaEntry>[] = [
      { key: "costCenter", header: "K-ställe" },
      { key: "stewardName", header: "Kvartersvärd" },
      { key: "stewardRefNr", header: "Ref.nr" },
      { key: "propertyCode", header: "Fastighetsnummer" },
      { key: "propertyName", header: "Fastighet" },
      { key: "address", header: "Adress" },
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
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Förvaltningsområden</h1>
            <p className="text-sm text-muted-foreground">
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
                placeholder="Sök på kvartersvärd, fastighet, adress eller fastighetsnummer..."
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
              
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1">
                  <X className="h-4 w-4" />
                  Rensa filter
                </Button>
              )}

              <div className="sm:ml-auto">
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
            <PropertyAreasTable entries={filteredEntries} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default PropertyAreasPage;
