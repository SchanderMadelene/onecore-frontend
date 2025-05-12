
import { Separator } from "@/components/ui/separator";
import { ContractInfo } from "./tenant/ContractInfo";
import { TenantCard } from "./tenant/TenantCard";
import type { Tenant } from "./tenant/types";

interface TenantInformationProps {
  tenant: Tenant | Tenant[];
}

export function TenantInformation({ tenant }: TenantInformationProps) {
  // Konvertera till en array om det bara är en hyresgäst
  const tenants = Array.isArray(tenant) ? tenant : [tenant];
  const primaryTenant = tenants.find(t => t.isPrimaryTenant) || tenants[0];
  const additionalTenants = tenants.filter(t => t !== primaryTenant);
  
  // Avgör vilken typ av kontraktsrelation vi har
  const isSecondaryRental = tenants.some(t => t.relationshipType === "secondaryTenant");
  
  // Hitta andrahandskontraktnummer om det finns
  const secondaryTenant = tenants.find(t => t.relationshipType === "secondaryTenant");
  const secondaryContractNumber = secondaryTenant?.contractNumber;

  return (
    <div className="space-y-6">
      {/* Kontraktsinformation överst */}
      <ContractInfo
        primaryContractNumber={primaryTenant.contractNumber}
        secondaryContractNumber={secondaryContractNumber}
        isSecondaryRental={isSecondaryRental}
      />
      
      <div className="space-y-6">
        {/* Primär hyresgäst */}
        <TenantCard
          firstName={primaryTenant.firstName}
          lastName={primaryTenant.lastName}
          phone={primaryTenant.phone}
          email={primaryTenant.email}
          moveInDate={primaryTenant.moveInDate}
          moveOutDate={primaryTenant.moveOutDate}
          personalNumber={primaryTenant.personalNumber}
          relationshipType={primaryTenant.relationshipType}
        />
        
        {/* Ytterligare hyresgäster om det finns några */}
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
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
