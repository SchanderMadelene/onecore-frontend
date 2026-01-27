
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contract } from "../data/contracts";

interface TenantContractsProps {
  contracts: Contract[];
}

export function TenantContracts({ contracts }: TenantContractsProps) {
  if (!contracts.length) {
    return null;
  }

  const getContractTypeName = (type: Contract["type"]) => {
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

  const getContractCategory = (type: Contract["type"]) => {
    switch (type) {
      case "housing":
        return "Korttid";
      case "parking":
        return "Poängfri";
      case "storage":
        return "";
      default:
        return "";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontrakt</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Typ</TableHead>
              <TableHead>Kontraktsnummer</TableHead>
              <TableHead>Objekt</TableHead>
              <TableHead>Startdatum</TableHead>
              <TableHead>Slutdatum</TableHead>
              <TableHead>Månadshyra</TableHead>
              <TableHead>Kontrakttyp</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>
                  <div className="flex items-center">
                    <span>{getContractTypeName(contract.type)}</span>
                  </div>
                </TableCell>
                <TableCell>{contract.id}</TableCell>
                <TableCell>{contract.objectName}</TableCell>
                <TableCell>
                  <div>
                    {formatDate(contract.startDate)}
                  </div>
                </TableCell>
                <TableCell>
                  {contract.endDate ? formatDate(contract.endDate) : ""}
                </TableCell>
                <TableCell>{formatCurrency(contract.rent)}</TableCell>
                <TableCell>{getContractCategory(contract.type)}</TableCell>
                <TableCell>{getStatusBadge(contract.status)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Visa kontrakt
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
