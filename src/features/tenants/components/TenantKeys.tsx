
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveTable } from "@/components/ui/responsive-table";

interface KeyData {
  id: string;
  keyType: string;
  keyName: string;
  flexNumber: string;
  rentalObject: string;
  keySystem: string;
  serialNumber: string;
  loanedDate: string;
}

const mockKeys: KeyData[] = [
  {
    id: "1",
    keyType: "Bostad",
    keyName: "Huvudnyckel",
    flexNumber: "FL-2024-001",
    rentalObject: "Björnen 4, Lägenhet 1201",
    keySystem: "Alliera",
    serialNumber: "ALR-89234",
    loanedDate: "2024-01-15",
  },
  {
    id: "2",
    keyType: "Drop/tagg",
    keyName: "Porttelefon",
    flexNumber: "FL-2024-002",
    rentalObject: "Björnen 4, Entré A",
    keySystem: "Alliera",
    serialNumber: "ALR-89235",
    loanedDate: "2024-01-15",
  },
  {
    id: "3",
    keyType: "Postbox",
    keyName: "Brevlådenyckel",
    flexNumber: "FL-2024-003",
    rentalObject: "Björnen 4, Box 1201",
    keySystem: "Alliera",
    serialNumber: "ALR-89236",
    loanedDate: "2024-01-15",
  },
  {
    id: "4",
    keyType: "Garage",
    keyName: "Garagenyckel",
    flexNumber: "FL-2024-004",
    rentalObject: "Björnen 4, Garage 45",
    keySystem: "Alliera",
    serialNumber: "ALR-89237",
    loanedDate: "2024-02-01",
  },
  {
    id: "5",
    keyType: "Förråd",
    keyName: "Förråd källare",
    flexNumber: "FL-2024-005",
    rentalObject: "Björnen 4, Förråd 12",
    keySystem: "Alliera",
    serialNumber: "ALR-89238",
    loanedDate: "2024-01-15",
  },
];

interface TenantKeysProps {
  compact?: boolean;
}

export const TenantKeys = ({ compact = false }: TenantKeysProps) => {
  const columns = [
    {
      key: "keyType",
      label: "Nyckeltyp",
      render: (key: KeyData) => key.keyType,
    },
    {
      key: "keyName",
      label: "Nyckelnamn",
      render: (key: KeyData) => <span className="font-medium">{key.keyName}</span>,
    },
    {
      key: "flexNumber",
      label: "Flexnummer",
      render: (key: KeyData) => key.flexNumber,
    },
    {
      key: "rentalObject",
      label: "Tillhör hyresobjekt",
      render: (key: KeyData) => key.rentalObject,
    },
    {
      key: "keySystem",
      label: "Nyckelsystem",
      render: (key: KeyData) => key.keySystem,
      hideOnMobile: true,
    },
    {
      key: "serialNumber",
      label: "Löpnummer",
      render: (key: KeyData) => key.serialNumber,
      hideOnMobile: true,
    },
    {
      key: "loanedDate",
      label: "Utlåningsdatum",
      render: (key: KeyData) => key.loanedDate,
    },
  ];

  const tableContent = (
    <ResponsiveTable
      data={mockKeys}
      columns={columns}
      keyExtractor={(key) => key.id}
      mobileCardRenderer={(key: KeyData) => (
        <div className="space-y-1 w-full">
          <div className="font-medium">{key.keyName} <span className="text-muted-foreground font-normal">({key.keyType})</span></div>
          <div className="text-sm text-muted-foreground">{key.rentalObject}</div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{key.flexNumber}</span>
            <span>{key.loanedDate}</span>
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
        <CardTitle>Nyckelknippa</CardTitle>
      </CardHeader>
      <CardContent>
        {tableContent}
      </CardContent>
    </Card>
  );
};
