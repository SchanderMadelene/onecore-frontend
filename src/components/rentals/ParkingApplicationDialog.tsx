
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Search, User } from "lucide-react";
import { searchCustomers, getCustomerById } from "@/data/customers";
import { getMockContractsForTenant } from "@/data/contracts";
import type { ParkingSpace, Customer } from "./types/parking";

interface ParkingApplicationDialogProps {
  parkingSpace: ParkingSpace;
}

export const ParkingApplicationDialog = ({ parkingSpace }: ParkingApplicationDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [applicationType, setApplicationType] = useState<"Byte" | "Hyra flera">("Hyra flera");
  const [notes, setNotes] = useState("");

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

    console.log("Anmälan skickad:", {
      parkingSpace: parkingSpace.id,
      customer: selectedCustomer.customerNumber,
      applicationType,
      notes
    });

    // Reset form
    setSelectedCustomer(null);
    setSearchQuery("");
    setApplicationType("Hyra flera");
    setNotes("");
    setOpen(false);
  };

  const resetForm = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setApplicationType("Hyra flera");
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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Anmäl hyresgäst för bilplats</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Objektsinformation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Objektsinformation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
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

          {/* Kundsökning */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Välj kund</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="relative">
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
            </CardContent>
          </Card>

          {/* Vald kund med flikar */}
          {selectedCustomer && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kundinformation</CardTitle>
              </CardHeader>
              <CardContent>
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
                              <TableHead>Typ</TableHead>
                              <TableHead>Hyra</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {customerContracts.map((contract) => (
                              <TableRow key={contract.id}>
                                <TableCell>{getContractTypeName(contract.type)}</TableCell>
                                <TableCell>{getStatusBadge(contract.status)}</TableCell>
                                <TableCell>{contract.objectName}</TableCell>
                                <TableCell>
                                  {contract.type === "housing" && "Korttid"}
                                  {contract.type === "parking" && "Poängfri"}
                                </TableCell>
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
              </CardContent>
            </Card>
          )}

          {/* Ärendetyp - endast synlig när kund är vald */}
          {selectedCustomer && (
            <div className="space-y-2">
              <Label htmlFor="application-type">Ärendetyp</Label>
              <Select value={applicationType} onValueChange={(value: "Byte" | "Hyra flera") => setApplicationType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hyra flera">Hyra flera</SelectItem>
                  <SelectItem value="Byte">Byte</SelectItem>
                </SelectContent>
              </Select>
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
            >
              Avbryt
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!selectedCustomer}
              className="bg-primary hover:bg-primary/90"
            >
              Skicka anmälan
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
