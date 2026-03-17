
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ResponsiveTable } from "@/shared/ui/responsive-table";
import { getAllCustomers } from "../data/tenants";

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

export function TenantsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.property.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const columns = [
    {
      key: "name",
      label: "Namn",
      render: (customer: any) => (
        <span className="font-medium">{customer.firstName} {customer.lastName}</span>
      ),
    },
    {
      key: "personalNumber",
      label: "Personnummer",
      render: (customer: any) => customer.id,
      hideOnMobile: true,
    },
    {
      key: "type",
      label: "Typ",
      render: (customer: any) => (
        <Badge variant={customer.customerType === "tenant" ? "default" : "secondary"}>
          {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
        </Badge>
      ),
    },
    {
      key: "property",
      label: "Fastighet",
      render: (customer: any) => customer.property,
      hideOnMobile: true,
    },
  ];

  const mobileCardRenderer = (customer: any) => (
    <div>
      <div className="font-medium">{customer.firstName} {customer.lastName}</div>
      <div className="text-sm text-muted-foreground">{customer.id}</div>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant={customer.customerType === "tenant" ? "default" : "secondary"}>
          {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
        </Badge>
        <span className="text-sm text-muted-foreground">{customer.property}</span>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kundlista</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Input
              placeholder="Sök på namn, ID eller fastighet..."
              className="pl-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ResponsiveTable
          data={filteredCustomers}
          columns={columns}
          keyExtractor={(customer) => customer.id}
          emptyMessage="Inga kunder hittades med angivna sökkriterier"
          mobileCardRenderer={mobileCardRenderer}
          onRowClick={(customer) => navigate(`/tenants/detail/${customer.id}`)}
        />
      </CardContent>
    </Card>
  );
}
