import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, X } from "lucide-react";
import { searchStrofakturaCustomers, getCustomerByNumber } from "@/data/strofakturaCustomers";
import { CustomerSearchResult } from "@/types/strofaktura";
import { cn } from "@/lib/utils";

interface CustomerSearchSectionProps {
  value: string;
  customerName: string;
  onCustomerSelect: (customer: CustomerSearchResult | null) => void;
  error?: string;
}

export function CustomerSearchSection({
  value,
  customerName,
  onCustomerSelect,
  error
}: CustomerSearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState(value);
  const [searchResults, setSearchResults] = useState<CustomerSearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerSearchResult | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value && !selectedCustomer) {
      const customer = getCustomerByNumber(value);
      if (customer) {
        setSelectedCustomer(customer);
        setSearchQuery(`${customer.customerNumber} • ${customer.personalNumber}`);
      }
    }
  }, [value, selectedCustomer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length >= 2) {
      const results = searchStrofakturaCustomers(query);
      setSearchResults(results);
      setIsOpen(true);
    } else {
      setSearchResults([]);
      setIsOpen(false);
    }
  };

  const handleSelectCustomer = (customer: CustomerSearchResult) => {
    setSelectedCustomer(customer);
    setSearchQuery(`${customer.customerNumber} • ${customer.personalNumber}`);
    setIsOpen(false);
    onCustomerSelect(customer);
  };

  const handleClear = () => {
    setSelectedCustomer(null);
    setSearchQuery("");
    setSearchResults([]);
    onCustomerSelect(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2" ref={containerRef}>
        <Label htmlFor="kundnummer">Kundnr/Personnr</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="kundnummer"
            placeholder="Sök på kundnr eller personnr..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (searchQuery.length >= 2) {
                const results = searchStrofakturaCustomers(searchQuery);
                setSearchResults(results);
                setIsOpen(true);
              }
            }}
            className={cn("pl-10 pr-10", error && "border-destructive")}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {isOpen && searchResults.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((customer) => (
                <button
                  key={customer.customerNumber}
                  type="button"
                  onClick={() => handleSelectCustomer(customer)}
                  className="w-full px-3 py-2 text-left hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{customer.fullName}</div>
                  <div className="text-sm text-muted-foreground">
                    {customer.customerNumber} • {customer.personalNumber}
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {isOpen && searchQuery.length >= 2 && searchResults.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg p-3">
              <p className="text-sm text-muted-foreground">Ingen kund hittades</p>
            </div>
          )}
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kundnamn">Kundnamn</Label>
        <Input
          id="kundnamn"
          value={customerName}
          readOnly
          disabled
          placeholder="Fylls i automatiskt"
          className="bg-muted"
        />
      </div>
    </div>
  );
}
