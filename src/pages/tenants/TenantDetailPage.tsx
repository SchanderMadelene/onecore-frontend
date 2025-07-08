
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { TenantCard } from "@/components/tenants/TenantCard";
import { getTenantById } from "@/data/tenants";
import { getMockContractsForTenant } from "@/data/contracts";
import { TriangleAlert } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { TenantDetailTabs } from "@/components/tenants/tabs/TenantDetailTabs";
import { TenantDetailTabsContent } from "@/components/tenants/tabs/TenantDetailTabsContent";
import { TenantMobileAccordion } from "@/components/tenants/TenantMobileAccordion";

const TenantDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const tenant = getTenantById(id || "");
  const contracts = getMockContractsForTenant(id || "");
  
  // This would typically come from API data
  const hasActiveCases = true;
  
  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <TooltipProvider>
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-bold">
              {tenant.firstName} {tenant.lastName}
            </h1>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full border border-amber-200 cursor-help">
                  <TriangleAlert className="h-4 w-4 text-amber-600" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Åk aldrig ensam till kund. Ta alltid med dig en kollega vid hembesök.</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <TenantCard tenant={tenant} />
        </div>

        {isMobile ? (
          <TenantMobileAccordion 
            contracts={contracts}
            hasActiveCases={hasActiveCases}
          />
        ) : (
          <TenantDetailTabs defaultValue="contracts" hasActiveCases={hasActiveCases}>
            <TenantDetailTabsContent contracts={contracts} personalNumber={tenant.personalNumber} />
          </TenantDetailTabs>
        )}
      </div>
    </PageLayout>
  );
};

export default TenantDetailPage;
