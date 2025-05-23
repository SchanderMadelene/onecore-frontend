
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";

type TenantInfoSectionProps = {
  tenant: any | any[]; // Updated to accept either a single tenant or an array of tenants
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  // Check if tenant is an array
  if (Array.isArray(tenant)) {
    // If it's an array, render a TenantInformationCard for each tenant
    return (
      <div className="space-y-4">
        {tenant.map((tenantItem, index) => (
          <TenantInformationCard 
            key={tenantItem.personalNumber || `tenant-${index}`} 
            tenant={tenantItem} 
          />
        ))}
      </div>
    );
  }
  
  // If it's a single tenant, render a single TenantInformationCard
  return <TenantInformationCard tenant={tenant} />;
}
