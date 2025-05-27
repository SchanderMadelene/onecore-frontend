
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractInfo } from "./tenant/ContractInfo";
import { TenantCard } from "./tenant/TenantCard";
import { TenantContracts } from "@/components/tenants/TenantContracts";
import { getMockContractsForTenant } from "@/data/contracts";
import type { Tenant } from "./tenant/types";

interface TenantInformationProps {
  tenant: Tenant | Tenant[];
}

export function TenantInformation({ tenant }: TenantInformationProps) {
  // Convert to array if it's a single tenant
  const tenants = Array.isArray(tenant) ? tenant : [tenant];
  const primaryTenant = tenants.find(t => t.isPrimaryTenant) || tenants[0];
  const additionalTenants = tenants.filter(t => t !== primaryTenant);
  
  // Determine relationship type
  const isSecondaryRental = tenants.some(t => t.relationshipType === "secondaryTenant");
  
  // Find secondary contract number if it exists
  const secondaryTenant = tenants.find(t => t.relationshipType === "secondaryTenant");
  const secondaryContractNumber = secondaryTenant?.contractNumber;

  // Get contracts for the primary tenant
  const allContracts = getMockContractsForTenant(primaryTenant.personalNumber);
  const activeContracts = allContracts.filter(contract => contract.status === "active");
  const historicalContracts = allContracts.filter(contract => contract.status === "terminated");

  return (
    <div className="space-y-6">
      {/* Contract information at the top */}
      <ContractInfo
        primaryContractNumber={primaryTenant.contractNumber}
        secondaryContractNumber={secondaryContractNumber}
        isSecondaryRental={isSecondaryRental}
      />
      
      {/* Contract tabs directly under ContractInfo */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 bg-slate-100/70 p-1 rounded-lg">
          <TabsTrigger value="active">
            Aktivt kontrakt
          </TabsTrigger>
          <TabsTrigger value="historical">
            Historiska kontrakt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <TenantContracts contracts={activeContracts} />
        </TabsContent>

        <TabsContent value="historical">
          <TenantContracts contracts={historicalContracts} />
        </TabsContent>
      </Tabs>
      
      <Separator />
      
      <div className="space-y-6">
        {/* Primary tenant */}
        <TenantCard
          firstName={primaryTenant.firstName}
          lastName={primaryTenant.lastName}
          phone={primaryTenant.phone}
          email={primaryTenant.email}
          moveInDate={primaryTenant.moveInDate}
          moveOutDate={primaryTenant.moveOutDate}
          personalNumber={primaryTenant.personalNumber}
          relationshipType={primaryTenant.relationshipType}
          isPrimaryContractHolder={primaryTenant.isPrimaryContractHolder || primaryTenant.isPrimaryTenant}
        />
        
        {/* Additional tenants if any */}
        {additionalTenants.length > 0 && (
          <>
            <Separator />
            {additionalTenants.map((additionalTenant) => (
              <TenantCard
                key={additionalTenant.personalNumber}
                firstName={additionalTenant.firstName}
                lastName={additionalTenant.lastName}
                phone={additionalTenant.phone}
                email={additionalTenant.email}
                moveInDate={additionalTenant.moveInDate}
                moveOutDate={additionalTenant.moveOutDate}
                personalNumber={additionalTenant.personalNumber}
                relationshipType={additionalTenant.relationshipType}
                isSecondaryTenant={additionalTenant.relationshipType === "secondaryTenant"}
                isPrimaryContractHolder={additionalTenant.isPrimaryContractHolder}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
