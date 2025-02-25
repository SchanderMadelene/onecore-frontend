
interface TenantInformationProps {
  tenant: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    contractStatus: "permanent" | "terminated";
  };
}

export function TenantInformation({ tenant }: TenantInformationProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-base">Hyresgäst</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-muted-foreground">Namn</p>
          <p className="font-medium">{tenant.firstName} {tenant.lastName}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Telefon</p>
          <p className="font-medium">{tenant.phone}</p>
        </div>
        <div>
          <p className="text-muted-foreground">E-post</p>
          <p className="font-medium">{tenant.email}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Kontraktsstatus</p>
          <p className="font-medium">
            {tenant.contractStatus === "permanent" ? "Tillsvidare" : "Uppsagt"}
          </p>
        </div>
      </div>
    </div>
  );
}
