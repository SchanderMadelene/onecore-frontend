
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { mockTenant } from "@/data/tenants";

const TenantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">
          {mockTenant.firstName} {mockTenant.lastName}
        </h1>
        <p className="text-muted-foreground mb-6">
          Kundkort för hyresgäst med personnummer {id || mockTenant.personalNumber}
        </p>

        <div className="grid grid-cols-1 gap-6">
          <TenantCard tenant={mockTenant} />
        </div>
      </div>
    </PageLayout>
  );
};

export default TenantDetailPage;
