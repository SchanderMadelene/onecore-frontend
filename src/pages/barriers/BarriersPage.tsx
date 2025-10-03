import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldX, Home, Car, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { getAllBarriers, getBarriersByType, Barrier } from "@/data/barriers";
import { BarriersHeader } from "./components/BarriersHeader";

const BarriersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showHistorical, setShowHistorical] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filterBarriers = (barriers: Barrier[]) => {
    const active = barriers.filter(b => b.status === 'active' || b.status === 'inactive');
    const historical = barriers.filter(b => b.status === 'expired');
    
    let filtered = showHistorical ? [...active, ...historical] : active;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.object.toLowerCase().includes(query) ||
        b.address.toLowerCase().includes(query) ||
        b.reason.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const allBarriers = filterBarriers(getAllBarriers());
  const housingBarriers = filterBarriers(getBarriersByType('housing'));
  const parkingBarriers = filterBarriers(getBarriersByType('parking'));
  const storageBarriers = filterBarriers(getBarriersByType('storage'));
  const commercialBarriers = filterBarriers(getBarriersByType('commercial'));

  const handleBarrierCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök på objekt, adress eller orsak..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Switch 
              id="show-historical" 
              checked={showHistorical}
              onCheckedChange={setShowHistorical}
            />
            <Label htmlFor="show-historical" className="cursor-pointer">
              Visa historiska spärrar
            </Label>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Alla spärrar</TabsTrigger>
            <TabsTrigger value="housing">Bostäder</TabsTrigger>
            <TabsTrigger value="parking">Bilplatser</TabsTrigger>
            <TabsTrigger value="storage">Förråd</TabsTrigger>
            <TabsTrigger value="commercial">Lokaler</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <BarriersTable barriers={allBarriers} />
          </TabsContent>

          <TabsContent value="housing" className="mt-8">
            <BarriersTable barriers={housingBarriers} />
          </TabsContent>

          <TabsContent value="parking" className="mt-8">
            <BarriersTable barriers={parkingBarriers} />
          </TabsContent>

          <TabsContent value="storage" className="mt-8">
            <BarriersTable barriers={storageBarriers} />
          </TabsContent>

          <TabsContent value="commercial" className="mt-8">
            <BarriersTable barriers={commercialBarriers} />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default BarriersPage;