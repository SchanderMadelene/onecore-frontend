
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { mockTenant } from "@/data/tenants";
import { getMockContractsForTenant } from "@/data/contracts";

const TenantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const tenantId = id || mockTenant.personalNumber;
  const contracts = getMockContractsForTenant(tenantId);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">
          {mockTenant.firstName} {mockTenant.lastName}
        </h1>
        <p className="text-muted-foreground mb-6">
          Kundkort för hyresgäst med personnummer {tenantId}
        </p>

        <div className="grid grid-cols-1 gap-6">
          <TenantCard tenant={mockTenant} />
          <TenantContracts contracts={contracts} />
        </div>
      </div>
    </PageLayout>
  );
};

export default TenantDetailPage;
