
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantsList } from "@/components/tenants/TenantsList";
import { TenantsHeader } from "./components/TenantsHeader";

const AllTenantsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <TenantsHeader />
        <TenantsList />
      </div>
    </PageLayout>
  );
};

export default AllTenantsPage;
