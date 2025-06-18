
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, User } from "lucide-react";
import { searchCustomers } from "@/data/customers";
import type { Customer } from "../types/parking";

interface CustomerSearchProps {
  onCustomerSelect: (customer: Customer) => void;
  selectedCustomer: Customer | null;
}

export const CustomerSearch = ({ onCustomerSelect, selectedCustomer }: CustomerSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchCustomers(searchQuery);
  const showResults = searchQuery.length >= 2 && searchResults.length > 0 && !selectedCustomer;

  const handleCustomerSelect = (customer: Customer) => {
    onCustomerSelect(customer);
    setSearchQuery(`${customer.firstName} ${customer.lastName}`);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (!value.trim()) {
      onCustomerSelect(null);
    }
  };

  return (
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
                  className="p-4 hover:bg-accent/50 cursor-pointer border-b last:border-b-0 transition-colors"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-base">{customer.firstName} {customer.lastName}</p>
                        <p className="text-sm text-muted-foreground">
                          {customer.customerNumber} | {customer.personalNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {customer.phone} | {customer.email}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={customer.customerType === "tenant" ? "default" : "secondary"}
                      className="shrink-0"
                    >
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
  );
};
