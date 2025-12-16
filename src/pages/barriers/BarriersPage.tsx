import React, { useState, useMemo } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { getAllBarriers } from "@/data/barriers";
import { BarriersHeader } from "./components/BarriersHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

const BarriersPage = () => {
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

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sök på objekt, adress eller orsak..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
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
        </div>

        <BarriersTable 
          barriers={filteredBarriers} 
          onBarrierUpdated={handleBarrierCreated}
        />
      </div>
    </PageLayout>
  );
};

export default BarriersPage;