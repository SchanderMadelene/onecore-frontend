import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { ShieldX, Home, Car, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { getAllBarriers, getBarriersByType } from "@/data/barriers";
import { BarriersHeader } from "./components/BarriersHeader";

const BarriersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const allBarriers = getAllBarriers();
  const housingBarriers = getBarriersByType('housing');
  const parkingBarriers = getBarriersByType('parking');

  const handleBarrierCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Sök efter spärrar..." 
              className="pl-10" 
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Alla spärrar</TabsTrigger>
            <TabsTrigger value="housing">Bostäder</TabsTrigger>
            <TabsTrigger value="parking">Bilplatser</TabsTrigger>
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
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default BarriersPage;