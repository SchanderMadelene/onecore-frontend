
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Search, User, AlertTriangle } from "lucide-react";
import { searchCustomers } from "@/data/customers";
import { getMockContractsForTenant } from "@/data/contracts";
import { useTenantValidation } from "@/hooks/useTenantValidation";
import { useCreateInterestApplication } from "@/hooks/useCreateInterestApplication";
import { CustomerInfoLoading } from "./CustomerInfoLoading";
import { useToast } from "@/hooks/use-toast";
import type { ParkingSpace, Customer } from "./types/parking";

interface CreateInterestApplicationDialogProps {
  parkingSpace: ParkingSpace;
}

export const CreateInterestApplicationDialog = ({ parkingSpace }: CreateInterestApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [applicationType, setApplicationType] = useState<"Replace" | "Additional">("Additional");
  const [notes, setNotes] = useState("");

  const { toast } = useToast();
  const createApplication = useCreateInterestApplication();
  
  const tenantValidation = useTenantValidation(
    selectedCustomer?.customerNumber,
    "CENTRUM", // Mock district code
    parkingSpace.id
  );

  const searchResults = searchCustomers(searchQuery);
  const showResults = searchQuery.length >= 2 && searchResults.length > 0 && !selectedCustomer;

  // Get contracts for selected customer
  const customerContracts = selectedCustomer ? getMockContractsForTenant(selectedCustomer.personalNumber) : [];

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setSelectedCustomer(null);
    }
  };

  const handleSubmit = () => {
    if (!selectedCustomer) return;

    createApplication.mutate({
      parkingSpaceId: parkingSpace.id,
      customerNumber: selectedCustomer.customerNumber,
      applicationType,
      notes
    }, {
      onSuccess: () => {
        toast({
          title: "Intresseanmälan skapad",
          description: `Anmälan för ${selectedCustomer.firstName} ${selectedCustomer.lastName} har skapats`,
        });
        resetForm();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Fel",
          description: error.message || "Kunde inte skapa intresseanmälan",
          variant: "destructive",
        });
      }
    });
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setApplicationType("Additional");
    setNotes("");
  };

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

  const getValidationMessage = (result: string) => {
    switch (result) {
      case 'has-at-least-one-parking-space':
        return 'Kunden har redan bilplats. Välj "Byte" eller "Hyra flera"';
      case 'needs-replace-by-property':
        return 'Kunden måste byta bilplats eftersom denna bilplats ligger i ett begränsat område eller fastighet.';
      case 'needs-replace-by-residential-area':
        return 'Kunden måste byta bilplats eftersom denna bilplats ligger i ett begränsat område eller fastighet.';
      case 'no-contract':
        return 'Kunden saknar giltigt bostadskontrakt. Det går endast att söka bilplats med gällande och kommande bostadskontrakt';
      default:
        return '';
    }
  };

  const hasValidationIssues = tenantValidation.data?.validationResult !== 'ok';
  const canSubmit = selectedCustomer && tenantValidation.data?.validationResult !== 'no-contract' && !createApplication.isPending;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Ny anmälan</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ny intresseanmälan, {parkingSpace.address}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Objektsinformation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Objektsinformation</h3>
            <Card>
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Adress</Label>
                    <p className="font-medium">{parkingSpace.address}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Objekts-ID</Label>
                    <p className="font-medium">{parkingSpace.id}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Område</Label>
                    <p className="font-medium">{parkingSpace.area}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Bilplatstyp</Label>
                    <p className="font-medium">{parkingSpace.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Hyra</Label>
                    <p className="font-medium text-green-600">{parkingSpace.rent}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Kötyp</Label>
                    <p className="font-medium">{parkingSpace.queueType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kundsökning */}
          <div className="space-y-3">
            <div className="relative">
              <Label htmlFor="customer-search">Kundinformation</Label>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="customer-search"
                  placeholder="Skriv kundnummer eller personnummer..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {/* Sökresultat */}
              {showResults && (
                <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {searchResults.map((customer) => (
                    <div
                      key={customer.customerNumber}
                      className="p-3 hover:bg-accent cursor-pointer border-b last:border-b-0"
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{customer.firstName} {customer.lastName}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.customerNumber} | {customer.personalNumber}
                          </p>
                        </div>
                        <Badge variant={customer.customerType === "tenant" ? "default" : "secondary"}>
                          {customer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vald kund med flikar */}
          {selectedCustomer && (
            <>
              {tenantValidation.isLoading && <CustomerInfoLoading />}
              
              {tenantValidation.data && (
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
                            <p className="font-medium">{selectedCustomer.firstName} {selectedCustomer.lastName}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedCustomer.customerNumber} | {selectedCustomer.personalNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {selectedCustomer.phone} | {selectedCustomer.email}
                            </p>
                            <p className="text-sm font-medium text-primary">
                              Köpoäng: {tenantValidation.data.queuePoints}
                            </p>
                          </div>
                          <Badge variant={selectedCustomer.customerType === "tenant" ? "default" : "secondary"}>
                            {selectedCustomer.customerType === "tenant" ? "Hyresgäst" : "Sökande"}
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
              )}
            </>
          )}

          {/* Validationsfelmeddelanden */}
          {tenantValidation.data && hasValidationIssues && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {getValidationMessage(tenantValidation.data.validationResult)}
              </AlertDescription>
            </Alert>
          )}

          {/* Områdesvarning */}
          {tenantValidation.data && !tenantValidation.data.hasValidContract && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Observera att kunden saknar boendekontrakt i området för parkeringsplatsen
              </AlertDescription>
            </Alert>
          )}

          {/* Ärendetyp - endast synlig när kund är vald och har valideringsproblem */}
          {tenantValidation.data && hasValidationIssues && tenantValidation.data.validationResult !== 'no-contract' && (
            <div className="space-y-3">
              <Label>Ärendetyp</Label>
              <RadioGroup 
                value={applicationType} 
                onValueChange={(value: "Replace" | "Additional") => setApplicationType(value)}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Replace" id="replace" />
                  <Label htmlFor="replace">Byte</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Additional" id="additional" />
                  <Label htmlFor="additional">Hyra flera</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Anteckningar - endast synlig när kund är vald */}
          {selectedCustomer && (
            <div className="space-y-2">
              <Label htmlFor="notes">Anteckningar (valfritt)</Label>
              <textarea
                id="notes"
                placeholder="Lägg till eventuella anteckningar..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-3 border rounded-md min-h-[80px] resize-none"
              />
            </div>
          )}

          {/* Åtgärder */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={createApplication.isPending}
            >
              Avbryt
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-primary hover:bg-primary/90"
            >
              {createApplication.isPending ? "Skapar..." : "Lägg till"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
