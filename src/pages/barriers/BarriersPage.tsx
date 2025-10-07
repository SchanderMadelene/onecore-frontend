import React, { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { getAllBarriers } from "@/data/barriers";
import { BarriersHeader } from "./components/BarriersHeader";

const BarriersPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const allBarriers = getAllBarriers();

  const handleBarrierCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <BarriersHeader onBarrierCreated={handleBarrierCreated} />

        <BarriersTable 
          barriers={allBarriers} 
          onBarrierUpdated={handleBarrierCreated}
        />
      </div>
    </PageLayout>
  );
};

export default BarriersPage;