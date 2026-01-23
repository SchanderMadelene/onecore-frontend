import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { PageLayout } from "@/components/layout/PageLayout";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { LeaseContractsHeader } from "./components/LeaseContractsHeader";
import { LeaseContractsFilters } from "./components/LeaseContractsFilters";
import { LeaseContractActions } from "./components/LeaseContractActions";
import { LeaseContractsPagination } from "./components/LeaseContractsPagination";
import { useLeaseContractFilters } from "./hooks/useLeaseContractFilters";
import { mockLeaseContracts } from "./data/mockLeaseContracts";
import { 
  LeaseContract, 
  LEASE_STATUS_LABELS, 
  LEASE_STATUS_VARIANTS, 
  LEASE_TYPE_LABELS 
} from "@/types/leaseContract";

export default function LeaseContractsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contracts] = useState<LeaseContract[]>(mockLeaseContracts);

  const filterHook = useLeaseContractFilters(contracts);
  const filteredContracts = filterHook.filterContracts(contracts);
  const paginatedContracts = filterHook.getPaginatedContracts(filteredContracts);
  const totalPages = filterHook.totalPages(filteredContracts.length);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "yyyy-MM-dd", { locale: sv });
    } catch {
      return "-";
    }
  };

  const columns = [
    {
      key: "leaseId",
      label: "Kontrakt ID",
      render: (contract: LeaseContract) => (
        <span className="text-sm">{contract.leaseId}</span>
      )
    },
    {
      key: "type",
      label: "Typ",
      render: (contract: LeaseContract) => (
        <Badge variant="outline">
          {LEASE_TYPE_LABELS[contract.type]}
        </Badge>
      )
    },
    {
      key: "tenant",
      label: "Hyresgäst",
      render: (contract: LeaseContract) => (
        <div className="space-y-2">
          {contract.tenants.slice(0, 2).map((tenant, index) => (
            <div key={tenant.contactCode || index}>
              <span className="font-medium">{tenant.fullName}</span>
              <div className="text-sm text-muted-foreground">
                {tenant.contactCode}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: "contactInfo",
      label: "Kontaktuppgifter",
      hideOnMobile: true,
      render: (contract: LeaseContract) => {
        const tenant = contract.tenants[0];
        if (!tenant) return "-";
        
        const mainPhone = tenant.phoneNumbers?.find(p => p.isMainNumber === 1);
        
        return (
          <div className="space-y-1">
            {tenant.emailAddress && (
              <div className="text-sm">{tenant.emailAddress}</div>
            )}
            {mainPhone?.phoneNumber && (
              <div className="text-sm text-muted-foreground">{mainPhone.phoneNumber}</div>
            )}
          </div>
        );
      }
    },
    {
      key: "address",
      label: "Adress",
      hideOnMobile: true,
      render: (contract: LeaseContract) => {
        const address = contract.tenants[0]?.address;
        if (!address) return "-";
        return `${address.street} ${address.number}`.trim();
      }
    },
    {
      key: "startDate",
      label: "Startdatum",
      hideOnMobile: true,
      render: (contract: LeaseContract) => formatDate(contract.leaseStartDate)
    },
    {
      key: "endDate",
      label: "Slutdatum",
      hideOnMobile: true,
      render: (contract: LeaseContract) => formatDate(contract.leaseEndDate)
    },
    {
      key: "status",
      label: "Status",
      render: (contract: LeaseContract) => (
        <Badge variant={LEASE_STATUS_VARIANTS[contract.status]}>
          {LEASE_STATUS_LABELS[contract.status]}
        </Badge>
      )
    },
    {
      key: "actions",
      label: "Åtgärder",
      render: (contract: LeaseContract) => (
        <LeaseContractActions tenant={contract.tenants[0]} />
      )
    }
  ];

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="space-y-6">
        <LeaseContractsHeader />
        
        <LeaseContractsFilters {...filterHook} />

        {paginatedContracts.length > 0 ? (
          <>
            <ResponsiveTable
              data={paginatedContracts}
              columns={columns}
              keyExtractor={(contract: LeaseContract) => contract.leaseId}
              emptyMessage="Inga hyreskontrakt hittades"
            />
            
            {totalPages > 1 && (
              <LeaseContractsPagination
                currentPage={filterHook.page}
                totalPages={totalPages}
                totalItems={filteredContracts.length}
                itemsPerPage={filterHook.limit}
                onPageChange={filterHook.setPage}
              />
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Inga kontrakt matchar dina filter</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
