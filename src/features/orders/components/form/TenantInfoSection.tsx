
import { TenantInformationCard } from "@/features/tenants/components/TenantInformationCard";

type TenantInfoSectionProps = {
  tenant: any | any[];
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  return <TenantInformationCard tenant={tenant} displayMode="compact" />;
}
