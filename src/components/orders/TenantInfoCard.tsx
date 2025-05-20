
import { TenantCard as InspectionTenantCard } from "@/components/residence/inspection/form/tenant/TenantCard";
import { mockTenant } from "@/data/tenants";

type TenantInfoCardProps = {
  contextType: "tenant" | "residence";
};

export function TenantInfoCard({ contextType }: TenantInfoCardProps) {
  // Only show for tenant context
  if (contextType !== "tenant") {
    return null;
  }

  return (
    <div className="mb-6 border rounded-md p-4 bg-slate-50">
      <InspectionTenantCard
        firstName={mockTenant.firstName}
        lastName={mockTenant.lastName}
        phone={mockTenant.phone}
        email={mockTenant.email}
        moveInDate={mockTenant.moveInDate}
        moveOutDate={mockTenant.moveOutDate}
        personalNumber={mockTenant.personalNumber}
        isPrimaryContractHolder={mockTenant.isPrimaryTenant}
      />
    </div>
  );
}
