
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { BulkActionBar } from "@/components/ui/bulk-action-bar";
import { BulkSmsModal } from "@/components/communication/BulkSmsModal";
import { BulkEmailModal } from "@/components/communication/BulkEmailModal";
import { X, Search } from "lucide-react";
import { TenantsHeader } from "./components/TenantsHeader";
import { TenantSelectionFilters } from "@/components/tenants/TenantSelectionFilters";
import { getAllCustomers } from "@/data/tenants";
import { mockProperties } from "@/data/properties";
import { useToast } from "@/hooks/use-toast";

// Get property info for tenant
function getPropertyForTenant(personalNumber: string): { name: string; district: string } {
  const propertyMap: Record<string, { name: string; district: string }> = {
    "19850101-1234": { name: "Älgen 1", district: "Västerås Centrum" },
    "19760315-5678": { name: "Björnen 4", district: "Västerås Nord" },
    "19911122-9012": { name: "Lindaren 2", district: "Västerås Centrum" },
    "19820812-3456": { name: "Pipan 1", district: "Västerås Nord" },
    "19900228-7890": { name: "Oskaria 1", district: "Västerås Syd" },
    "19750515-2345": { name: "Styrhylsan 9", district: "Västerås Syd" },
  };
  return propertyMap[personalNumber] || { name: "Okänd fastighet", district: "Okänt distrikt" };
}

// Get all customers with property info
const customers = getAllCustomers().map(customer => {
  const propertyInfo = customer.customerType === "tenant" 
    ? getPropertyForTenant(customer.personalNumber) 
    : { name: "Ingen bostad", district: "" };
  return {
    ...customer,
    id: customer.personalNumber,
    property: propertyInfo.name,
    district: propertyInfo.district,
    customerRoles: (customer as any).customerRoles || [customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"],
    displayRoles: (customer as any).customerRoles?.join(", ") || (customer.customerType === "tenant" ? "Hyresgäst" : "Sökande")
  };
});

const AllTenantsPage = () => {
  const { toast } = useToast();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contractStatusFilter, setContractStatusFilter] = useState("all");
  const [contractTypeFilter, setContractTypeFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [buildingFilter, setBuildingFilter] = useState("all");
  const [districtFilter, setDistrictFilter] = useState("all");
  
  // Selection state
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (contractStatusFilter !== "all") count++;
    if (contractTypeFilter !== "all") count++;
    if (customerTypeFilter !== "all") count++;
    if (propertyFilter !== "all") count++;
    if (buildingFilter !== "all") count++;
    if (districtFilter !== "all") count++;
    return count;
  }, [contractStatusFilter, contractTypeFilter, customerTypeFilter, propertyFilter, buildingFilter, districtFilter]);
  
  const clearAllFilters = () => {
    setContractStatusFilter("all");
    setContractTypeFilter("all");
    setCustomerTypeFilter("all");
    setPropertyFilter("all");
    setBuildingFilter("all");
    setDistrictFilter("all");
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      // Search filter
      const matchesSearch = (
        customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.property.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Customer type filter
      const matchesCustomerType = customerTypeFilter === "all" || 
        (customer.customerRoles && customer.customerRoles.includes(customerTypeFilter));

      // Property filter
      const matchesProperty = propertyFilter === "all" || customer.property === propertyFilter;

      // District filter
      const matchesDistrict = districtFilter === "all" || customer.district === districtFilter;

      // Contract status filter (placeholder)
      const matchesContractStatus = contractStatusFilter === "all" || true;

      // Contract type filter (placeholder)
      const matchesContractType = contractTypeFilter === "all" || true;

      return matchesSearch && matchesCustomerType && matchesProperty && matchesDistrict && matchesContractStatus && matchesContractType;
    });
  }, [searchQuery, customerTypeFilter, contractStatusFilter, contractTypeFilter, propertyFilter, districtFilter]);

  // Get selected customers for modals
  const selectedCustomers = useMemo(() => {
    return customers.filter(c => selectedCustomerIds.includes(c.id));
  }, [selectedCustomerIds]);

  const recipients = useMemo(() => {
    return selectedCustomers.map(c => ({
      id: c.id,
      name: `${c.firstName} ${c.lastName}`,
      phone: c.phone,
      email: c.email
    }));
  }, [selectedCustomers]);

  const handleSendSms = (message: string, recipients: any[]) => {
    console.log("Sending SMS:", { message, recipients });
    toast({
      title: "SMS skickat",
      description: `SMS skickat till ${recipients.length} mottagare`,
    });
    setSelectedCustomerIds([]);
  };

  const handleSendEmail = (subject: string, message: string, recipients: any[]) => {
    console.log("Sending Email:", { subject, message, recipients });
    toast({
      title: "Mejl skickat",
      description: `Mejl skickat till ${recipients.length} mottagare`,
    });
    setSelectedCustomerIds([]);
  };

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full pb-20 space-y-6">
        <TenantsHeader />

        {/* Sökfält - full bredd */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Sök på namn, personnummer eller fastighet..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter - egen rad */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap items-end">
          <TenantSelectionFilters
            contractStatusFilter={contractStatusFilter}
            setContractStatusFilter={setContractStatusFilter}
            contractTypeFilter={contractTypeFilter}
            setContractTypeFilter={setContractTypeFilter}
            customerTypeFilter={customerTypeFilter}
            setCustomerTypeFilter={setCustomerTypeFilter}
            propertyFilter={propertyFilter}
            setPropertyFilter={setPropertyFilter}
            buildingFilter={buildingFilter}
            setBuildingFilter={setBuildingFilter}
            districtFilter={districtFilter}
            setDistrictFilter={setDistrictFilter}
          />
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="gap-1">
              <X className="h-4 w-4" />
              Rensa filter
            </Button>
          )}
        </div>

        <ResponsiveTable
          data={filteredCustomers}
          columns={[
              {
                key: "name",
                label: "Namn",
                render: (customer) => (
                  <span className="font-medium">
                    {customer.firstName} {customer.lastName}
                  </span>
                ),
              },
              {
                key: "id",
                label: "Personnummer",
                render: (customer) => customer.id,
                hideOnMobile: true,
              },
              {
                key: "type",
                label: "Typ",
                render: (customer) => (
                  <span>
                    {customer.displayRoles}
                  </span>
                ),
              },
              {
                key: "property",
                label: "Fastighet",
                render: (customer) => customer.property,
                hideOnMobile: true,
              },
              {
                key: "action",
                label: "Åtgärd",
                render: (customer) => (
                  <Button asChild variant="link" size="sm">
                    <Link to={`/tenants/detail/${customer.id}`}>
                      Visa detaljer
                    </Link>
                  </Button>
                ),
                className: "text-right",
              },
            ]}
            keyExtractor={(customer) => customer.id}
            emptyMessage="Inga kunder hittades med angivna sökkriterier"
            selectable
            selectedKeys={selectedCustomerIds}
            onSelectionChange={setSelectedCustomerIds}
            mobileCardRenderer={(customer) => (
              <div className="space-y-2 w-full">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">
                      {customer.firstName} {customer.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground">{customer.id}</div>
                  </div>
                  <span className="text-sm">
                    {customer.displayRoles}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{customer.property}</span>
                  <Button asChild variant="link" size="sm">
                    <Link to={`/tenants/detail/${customer.id}`}>
                      Visa detaljer
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          />

        <BulkActionBar
          selectedCount={selectedCustomerIds.length}
          onSendSms={() => setShowSmsModal(true)}
          onSendEmail={() => setShowEmailModal(true)}
          onClear={() => setSelectedCustomerIds([])}
        />

        <BulkSmsModal
          open={showSmsModal}
          onOpenChange={setShowSmsModal}
          recipients={recipients}
          onSend={handleSendSms}
        />

        <BulkEmailModal
          open={showEmailModal}
          onOpenChange={setShowEmailModal}
          recipients={recipients}
          onSend={handleSendEmail}
        />
      </div>
    </PageLayout>
  );
};

export default AllTenantsPage;
