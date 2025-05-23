
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";

type TenantInfoSectionProps = {
  tenant: any | any[]; // Updated to accept either a single tenant or an array of tenants
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  // Always render a single TenantInformationCard and let it handle both single tenants and arrays
  return <TenantInformationCard tenant={tenant} />;
}
