import React, { useState, useMemo, useCallback } from "react";
import { PageLayout } from "@/layouts";
import { BarriersTable, getAllBarriers, type Barrier } from "@/features/barriers";
import { BarriersHeader } from "./components/BarriersHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportButton } from "@/components/ui/export-button";
import { Search, X } from "lucide-react";
import { exportToExcel, formatDateForExcel, ExcelColumn } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";
import { FavoriteParameters } from "@/features/favorites/types/favorite";
import { BARRIER_REASON_CATEGORY_LABELS, type BarrierReasonCategory } from "@/entities/barrier/types";

const TYPE_LABELS: Record<string, string> = {
  housing: "Bostad",
  parking: "Bilplats",
  storage: "Förråd",
  commercial: "Lokal"
};

const STATUS_LABELS: Record<string, string> = {
  active: "Aktiv",
  inactive: "Inaktiv",
  expired: "Utgången"
};

const BarriersPage = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [costCenterFilter, setCostCenterFilter] = useState("all");
  const [reasonCategoryFilter, setReasonCategoryFilter] = useState("all");

  const allBarriers = getAllBarriers();

  const hasActiveFilters = searchQuery !== "" || typeFilter !== "all" || statusFilter !== "all" 
    || districtFilter !== "all" || propertyFilter !== "all" || costCenterFilter !== "all" 
    || reasonCategoryFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
    setDistrictFilter("all");
    setPropertyFilter("all");
    setCostCenterFilter("all");
    setReasonCategoryFilter("all");
  };

  const getActiveFilters = useCallback((): FavoriteParameters => {
    const params: FavoriteParameters = {};
    if (typeFilter !== "all") params.type = typeFilter;
    if (statusFilter !== "all") params.status = statusFilter;
    if (districtFilter !== "all") params.district = districtFilter;
    if (propertyFilter !== "all") params.property = propertyFilter;
    if (costCenterFilter !== "all") params.costCenter = costCenterFilter;
    if (reasonCategoryFilter !== "all") params.reasonCategory = reasonCategoryFilter;
    if (searchQuery) params.search = searchQuery;
    return params;
  }, [typeFilter, statusFilter, districtFilter, propertyFilter, costCenterFilter, reasonCategoryFilter, searchQuery]);

  // Extract unique values for filters
  const uniqueDistricts = useMemo(() => {
    return [...new Set(allBarriers.map(b => b.district).filter(Boolean) as string[])].sort();
  }, [allBarriers]);

  const uniqueProperties = useMemo(() => {
    const map = new Map<string, string>();
    allBarriers.forEach(b => {
      if (b.propertyId && b.propertyName) map.set(b.propertyId, b.propertyName);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name));
  }, [allBarriers]);

  const uniqueCostCenters = useMemo(() => {
    return [...new Set(allBarriers.map(b => b.costCenter).filter(Boolean) as string[])].sort();
  }, [allBarriers]);

  const uniqueReasonCategories = useMemo(() => {
    return [...new Set(allBarriers.map(b => b.reasonCategory).filter(Boolean) as BarrierReasonCategory[])].sort();
  }, [allBarriers]);

  const filteredBarriers = useMemo(() => {
    return allBarriers.filter(barrier => {
      const matchesSearch = searchQuery === "" ||
        barrier.object.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barrier.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barrier.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" || barrier.type === typeFilter;
      const matchesStatus = statusFilter === "all" || barrier.status === statusFilter;
      const matchesDistrict = districtFilter === "all" || barrier.district === districtFilter;
      const matchesProperty = propertyFilter === "all" || barrier.propertyId === propertyFilter;
      const matchesCostCenter = costCenterFilter === "all" || barrier.costCenter === costCenterFilter;
      const matchesReasonCategory = reasonCategoryFilter === "all" || barrier.reasonCategory === reasonCategoryFilter;

      return matchesSearch && matchesType && matchesStatus && matchesDistrict && matchesProperty && matchesCostCenter && matchesReasonCategory;
    });
  }, [allBarriers, searchQuery, typeFilter, statusFilter, districtFilter, propertyFilter, costCenterFilter, reasonCategoryFilter]);

  const handleBarrierCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleExport = () => {
    const columns: ExcelColumn<Barrier>[] = [
      { key: "id", header: "ID" },
      { key: "type", header: "Typ", getValue: (item) => TYPE_LABELS[item.type] || item.type },
      { key: "object", header: "Objekt" },
      { key: "address", header: "Adress" },
      { key: "reason", header: "Orsak" },
      { key: "reasonCategory", header: "Orsakkategori", getValue: (item) => item.reasonCategory ? BARRIER_REASON_CATEGORY_LABELS[item.reasonCategory] : '' },
      { key: "startDate", header: "Startdatum", getValue: (item) => formatDateForExcel(item.startDate) },
      { key: "endDate", header: "Slutdatum", getValue: (item) => formatDateForExcel(item.endDate) },
      { key: "status", header: "Status", getValue: (item) => STATUS_LABELS[item.status] || item.status },
      { key: "district", header: "Distrikt" },
      { key: "propertyName", header: "Fastighet" },
      { key: "costCenter", header: "Kostnadsställe" },
      { key: "createdBy", header: "Skapad av" },
      { key: "createdDate", header: "Skapad datum", getValue: (item) => formatDateForExcel(item.createdDate) },
      { key: "notes", header: "Anteckningar" }
    ];

    const today = new Date().toISOString().split('T')[0];
    
    exportToExcel(filteredBarriers, columns, {
      filename: `sparrar-${today}`,
      sheetName: "Spärrar"
    });

    toast({
      title: "Export klar",
      description: `${filteredBarriers.length} spärrar exporterades till Excel`,
    });
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} getActiveFilters={getActiveFilters} />

        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Sökfält - full bredd */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Sök på objekt, adress eller orsak..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter - egen rad */}
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-center">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Typ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla typer</SelectItem>
                  <SelectItem value="housing">Bostad</SelectItem>
                  <SelectItem value="parking">Bilplats</SelectItem>
                  <SelectItem value="storage">Förråd</SelectItem>
                  <SelectItem value="commercial">Lokal</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="inactive">Inaktiv</SelectItem>
                  <SelectItem value="expired">Utgången</SelectItem>
                </SelectContent>
              </Select>

              {/* Reason Category Filter */}
              <Select value={reasonCategoryFilter} onValueChange={setReasonCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Orsakkategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla orsaker</SelectItem>
                  {uniqueReasonCategories.map((rc) => (
                    <SelectItem key={rc} value={rc}>
                      {BARRIER_REASON_CATEGORY_LABELS[rc]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* District Filter */}
              <Select value={districtFilter} onValueChange={setDistrictFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Distrikt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla distrikt</SelectItem>
                  {uniqueDistricts.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Property Filter */}
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Fastighet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla fastigheter</SelectItem>
                  {uniqueProperties.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Cost Center Filter */}
              <Select value={costCenterFilter} onValueChange={setCostCenterFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Kostnadsställe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla kostnadsställen</SelectItem>
                  {uniqueCostCenters.map((cc) => (
                    <SelectItem key={cc} value={cc}>{cc}</SelectItem>
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
                  count={filteredBarriers.length}
                  disabled={filteredBarriers.length === 0}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <BarriersTable 
              barriers={filteredBarriers} 
              onBarrierUpdated={handleBarrierCreated}
            />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default BarriersPage;