
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, X } from "lucide-react";
import { TenantsHeader } from "./components/TenantsHeader";
import { TenantSelectionFilters } from "@/components/tenants/TenantSelectionFilters";
import { getAllCustomers } from "@/data/tenants";

// Get all customers (tenants and applicants) and create display data
const customers = getAllCustomers().map(customer => ({
  ...customer,
  id: customer.personalNumber,
  property: customer.customerType === "tenant" ? getPropertyForTenant(customer.personalNumber) : "Ingen bostad"
}));

function getPropertyForTenant(personalNumber: string) {
  switch(personalNumber) {
    case "19850101-1234": return "Älgen 1";
    case "19760315-5678": return "Björnen 4";
    case "19911122-9012": return "Lindaren 2";
    case "19820812-3456": return "Ekoxen 3";
    case "19900228-7890": return "Granen 5";
    case "19750515-2345": return "Vildsvinet 7";
    default: return "Okänd fastighet";
  }
}

const AllTenantsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contractStatusFilter, setContractStatusFilter] = useState("all");
  const [contractTypeFilter, setContractTypeFilter] = useState("all");
  const [customerTypeFilter, setCustomerTypeFilter] = useState("all");

  // Count active filters
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (contractStatusFilter !== "all") count++;
    if (contractTypeFilter !== "all") count++;
    if (customerTypeFilter !== "all") count++;
    return count;
  }, [contractStatusFilter, contractTypeFilter, customerTypeFilter]);
  
  const clearAllFilters = () => {
    setContractStatusFilter("all");
    setContractTypeFilter("all");
    setCustomerTypeFilter("all");
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
      const matchesCustomerType = customerTypeFilter === "all" || customer.customerType === customerTypeFilter;

      // Contract status filter (mock data - in real app would come from contract data)
      const matchesContractStatus = contractStatusFilter === "all" || true; // Placeholder for real implementation

      // Contract type filter (mock data - in real app would come from contract data)
      const matchesContractType = contractTypeFilter === "all" || true; // Placeholder for real implementation

      return matchesSearch && matchesCustomerType && matchesContractStatus && matchesContractType;
    });
  }, [searchQuery, customerTypeFilter, contractStatusFilter, contractTypeFilter]);

  return (
    <PageLayout isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}>
      <div className="w-full">
        <TenantsHeader />

        <Card>
          <CardHeader>
            <CardTitle>Sök i kundbasen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Sök på namn, personnummer eller fastighet..."
                    className="pl-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 items-start">
                <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen} className="border rounded-lg flex-1">
                  <div className="flex items-center justify-between px-4 py-3">
                    <CollapsibleTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="flex-1 justify-between px-0 hover:bg-transparent"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Filter</span>
                          {activeFilterCount > 0 && (
                            <Badge variant="secondary" className="h-5 min-w-5 px-1.5">
                              {activeFilterCount}
                            </Badge>
                          )}
                        </div>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    {activeFilterCount > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          clearAllFilters();
                        }}
                        className="h-8 px-2 text-xs ml-2"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Rensa alla
                      </Button>
                    )}
                  </div>
                  <CollapsibleContent className="px-4 pb-4">
                    <TenantSelectionFilters
                      contractStatusFilter={contractStatusFilter}
                      setContractStatusFilter={setContractStatusFilter}
                      contractTypeFilter={contractTypeFilter}
                      setContractTypeFilter={setContractTypeFilter}
                      customerTypeFilter={customerTypeFilter}
                      setCustomerTypeFilter={setCustomerTypeFilter}
                    />
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Namn</TableHead>
                    <TableHead>Personnummer</TableHead>
                    <TableHead>Typ</TableHead>
                    <TableHead>Fastighet</TableHead>
                    <TableHead className="text-right">Åtgärd</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.firstName} {customer.lastName}
                      </TableCell>
                      <TableCell>{customer.id}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={customer.customerType === "tenant" ? "default" : "secondary"}
                        >
                          {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
                        </Badge>
                      </TableCell>
                      <TableCell>{customer.property}</TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="link" size="sm">
                          <Link to={`/tenants/detail/${customer.id}`}>
                            Visa detaljer
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredCustomers.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8">
                        Inga kunder hittades med angivna sökkriterier
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default AllTenantsPage;
