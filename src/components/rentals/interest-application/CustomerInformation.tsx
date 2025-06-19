
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "lucide-react";
import { getMockContractsForTenant } from "@/data/contracts";
import type { Customer } from "../types/parking";
import type { TenantValidation } from "@/hooks/useTenantValidation";

interface CustomerInformationProps {
  customer: Customer;
  tenantValidation: TenantValidation;
}

export const CustomerInformation = ({ customer, tenantValidation }: CustomerInformationProps) => {
  const customerContracts = getMockContractsForTenant(customer.personalNumber);

  const getContractTypeName = (type: string) => {
    switch (type) {
      case "housing":
        return "Bostad";
      case "parking":
        return "Bilplats";
      case "storage":
        return "Förråd";
      default:
        return "Övrigt";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Aktiv</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200">Pågående</Badge>;
      case "terminated":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Uppsagt</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', { 
      style: 'currency', 
      currency: 'SEK',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  return (
    <Tabs defaultValue="kundinformation" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="kundinformation">
          Kundinformation
        </TabsTrigger>
        <TabsTrigger value="kontrakt">
          Kontrakt ({customerContracts.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="kundinformation">
        <Card className="bg-accent/50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                <p className="text-sm text-muted-foreground">
                  {customer.customerNumber} | {customer.personalNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer.phone} | {customer.email}
                </p>
                <p className="text-sm font-medium text-primary">
                  Köpoäng: {tenantValidation.queuePoints}
                </p>
              </div>
              <Badge variant={customer.customerType === "tenant" ? "default" : "secondary"}>
                {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="kontrakt">
        {customerContracts.length > 0 ? (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Typ</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Adress</TableHead>
                  <TableHead>Hyra</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell>{getContractTypeName(contract.type)}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell>{contract.objectName}</TableCell>
                    <TableCell>{formatCurrency(contract.rent)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Inga kontrakt hittades för denna kund</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
