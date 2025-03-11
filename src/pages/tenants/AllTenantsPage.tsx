
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantsList } from "@/components/tenants/TenantsList";

const AllTenantsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-2">Alla kunder</h1>
        <p className="text-muted-foreground mb-6">
          Sammanställning av alla kunder i systemet, både privatpersoner och företag.
        </p>

        <TenantsList />
      </div>
    </PageLayout>
  );
};

export default AllTenantsPage;
