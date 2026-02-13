
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Contract } from "../data/contracts";

interface TenantContractsProps {
  contracts: Contract[];
  compact?: boolean;
}

export function TenantContracts({ contracts, compact = false }: TenantContractsProps) {
  if (!contracts.length) {
    return null;
  }

  const getContractTypeName = (type: Contract["type"]) => {
    switch (type) {
      case "housing": return "Bostad";
      case "parking": return "Bilplats";
      case "storage": return "Förråd";
      default: return "Övrigt";
    }
  };

  const getContractCategory = (type: Contract["type"]) => {
    switch (type) {
      case "housing": return "Korttid";
      case "parking": return "Poängfri";
      default: return "";
    }
  };

  const getStatusBadge = (status: Contract["status"]) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50 border-green-200">Aktiv</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200">Kommande</Badge>;
      case "terminated":
        return <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-50 border-red-200">Uppsagt</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('sv-SE');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('sv-SE', { 
      style: 'currency', 
      currency: 'SEK',
      maximumFractionDigits: 0 
    }).format(amount);
  };

  const columns = [
    {
      key: "type",
      label: "Typ",
      render: (contract: Contract) => getContractTypeName(contract.type),
    },
    {
      key: "id",
      label: "Kontraktsnummer",
      render: (contract: Contract) => contract.id,
    },
    {
      key: "objectName",
      label: "Objekt",
      render: (contract: Contract) => contract.objectName,
    },
    {
      key: "startDate",
      label: "Startdatum",
      render: (contract: Contract) => formatDate(contract.startDate),
    },
    {
      key: "endDate",
      label: "Slutdatum",
      render: (contract: Contract) => contract.endDate ? formatDate(contract.endDate) : "",
      hideOnMobile: true,
    },
    {
      key: "rent",
      label: "Månadshyra",
      render: (contract: Contract) => formatCurrency(contract.rent),
    },
    {
      key: "category",
      label: "Kontrakttyp",
      render: (contract: Contract) => getContractCategory(contract.type),
      hideOnMobile: true,
    },
    {
      key: "status",
      label: "Status",
      render: (contract: Contract) => getStatusBadge(contract.status),
    },
    {
      key: "action",
      label: "",
      render: () => (
        <Button variant="outline" size="sm">
          Visa kontrakt
        </Button>
      ),
    },
  ];

  const tableContent = (
    <ResponsiveTable
      data={contracts}
      columns={columns}
      keyExtractor={(contract) => contract.id}
      mobileCardRenderer={(contract: Contract) => (
        <div className="space-y-2 w-full">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{getContractTypeName(contract.type)} — {contract.objectName}</div>
              <div className="text-sm text-muted-foreground">{contract.id}</div>
            </div>
            {getStatusBadge(contract.status)}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">{formatCurrency(contract.rent)}/mån</span>
            <Button variant="outline" size="sm">
              Visa kontrakt
            </Button>
          </div>
        </div>
      )}
    />
  );

  if (compact) {
    return tableContent;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontrakt</CardTitle>
      </CardHeader>
      <CardContent>
        {tableContent}
      </CardContent>
    </Card>
  );
}
