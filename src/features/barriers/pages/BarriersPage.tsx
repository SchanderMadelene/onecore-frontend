import React, { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BarriersTable, BarriersHeader } from "../components";
import { getAllBarriers } from "../data";
import type { Barrier } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ExportButton } from "@/components/ui/export-button";
import { Search, X } from "lucide-react";
import { exportToExcel, formatDateForExcel, ExcelColumn } from "@/utils/excelExport";
import { useToast } from "@/hooks/use-toast";

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

  const allBarriers = getAllBarriers();

  const hasActiveFilters = searchQuery !== "" || typeFilter !== "all" || statusFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setStatusFilter("all");
  };

  const filteredBarriers = useMemo(() => {
    return allBarriers.filter(barrier => {
      const matchesSearch = searchQuery === "" ||
        barrier.object.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barrier.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        barrier.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "all" || barrier.type === typeFilter;
      const matchesStatus = statusFilter === "all" || barrier.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [allBarriers, searchQuery, typeFilter, statusFilter]);

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
      { key: "startDate", header: "Startdatum", getValue: (item) => formatDateForExcel(item.startDate) },
      { key: "endDate", header: "Slutdatum", getValue: (item) => formatDateForExcel(item.endDate) },
      { key: "status", header: "Status", getValue: (item) => STATUS_LABELS[item.status] || item.status },
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
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

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
