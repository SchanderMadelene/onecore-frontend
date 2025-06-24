
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { searchCustomers } from "@/data/customers";
import type { Customer } from "../types/parking";

interface CustomerSearchProps {
  searchQuery: string;
  selectedCustomer: Customer | null;
  onSearchChange: (value: string) => void;
  onCustomerSelect: (customer: Customer) => void;
}

export const CustomerSearch = ({ 
  searchQuery, 
  selectedCustomer, 
  onSearchChange, 
  onCustomerSelect 
}: CustomerSearchProps) => {
  const searchResults = searchCustomers(searchQuery);
  const showResults = searchQuery.length >= 2 && searchResults.length > 0 && !selectedCustomer;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Label htmlFor="customer-search">Kundinformation</Label>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="customer-search"
            placeholder="Skriv kundnummer eller personnummer..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {showResults && (
          <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg max-h-40 overflow-y-auto">
            {searchResults.map((customer) => (
              <div
                key={customer.customerNumber}
                className="p-3 hover:bg-muted/50 cursor-pointer border-b last:border-b-0 transition-colors"
                onClick={() => onCustomerSelect(customer)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{customer.firstName} {customer.lastName}</p>
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
  );
};
