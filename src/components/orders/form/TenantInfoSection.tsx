
import { TenantInformationCard } from "@/components/tenants/TenantInformationCard";

type TenantInfoSectionProps = {
  tenant: any;
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  return <TenantInformationCard tenant={tenant} />;
}
