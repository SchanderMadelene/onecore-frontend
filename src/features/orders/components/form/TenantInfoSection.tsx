import { TenantInformationCard } from "@/features/tenants";

type TenantInfoSectionProps = {
  tenant: any | any[];
};

export function TenantInfoSection({ tenant }: TenantInfoSectionProps) {
  return <TenantInformationCard tenant={tenant} displayMode="compact" />;
}
