
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, User } from "lucide-react";
import type { ContactSearchData } from "./types";

// Mock data - i verkligheten skulle detta komma från API
const mockContacts: ContactSearchData[] = [
  {
    contactCode: "12345",
    fullName: "Anna Andersson",
    nationalRegistrationNumber: "19850315-1234",
    phoneNumber: "070-123 45 67"
  },
  {
    contactCode: "67890", 
    fullName: "Erik Eriksson",
    nationalRegistrationNumber: "19920710-5678",
    phoneNumber: "070-987 65 43"
  },
  {
    contactCode: "11111",
    fullName: "Maria Svensson", 
    nationalRegistrationNumber: "19780922-9876",
    phoneNumber: "070-555 12 34"
  }
];

interface ContactSearchProps {
  selectedContact: ContactSearchData | null;
  onSelectContact: (contact: ContactSearchData | null) => void;
}

export function ContactSearch({ selectedContact, onSelectContact }: ContactSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ContactSearchData[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debug effect for rendering
  useEffect(() => {
    console.log("ContactSearch rendering - searchTerm:", searchTerm, "showResults:", showResults, "selectedContact:", selectedContact);
  });

  useEffect(() => {
    console.log("Focus effect running");
    if (searchInputRef.current) {
      console.log("Focusing input");
      searchInputRef.current.focus();
    } else {
      console.log("No input ref found");
    }
  }, []);

  useEffect(() => {
    console.log("SearchTerm changed:", searchTerm, "Length:", searchTerm.length);
    if (searchTerm.length >= 2) {
      const filtered = mockContacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactCode.includes(searchTerm) ||
        (contact.nationalRegistrationNumber && contact.nationalRegistrationNumber.includes(searchTerm))
      );
      console.log("Filtered results:", filtered);
      console.log("Available contacts:", mockContacts);
      setSearchResults(filtered);
      setShowResults(true);
      console.log("Should show results:", true, "Results count:", filtered.length);
    } else {
      setSearchResults([]);
      setShowResults(false);
      console.log("Should show results:", false);
    }
  }, [searchTerm]);

  const handleSelectContact = (contact: ContactSearchData) => {
    onSelectContact(contact);
    setSearchTerm(contact.fullName);
    setShowResults(false);
  };

  const handleClearSelection = () => {
    onSelectContact(null);
    setSearchTerm("");
    setShowResults(false);
    searchInputRef.current?.focus();
  };

  return (
    <div className="space-y-4">
      <div className="relative" style={{ position: 'relative', zIndex: 1 }}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Sök på person eller kundnummer"
            value={searchTerm}
            onChange={(e) => {
              console.log("Input change:", e.target.value);
              setSearchTerm(e.target.value);
            }}
            className="pl-9"
          />
        </div>

        {showResults && searchResults.length > 0 && (
          <div 
            className="w-full mt-2 border rounded-md shadow-lg"
            style={{ 
              backgroundColor: '#ffffff',
              border: '2px solid #000000',
              zIndex: 10000,
              position: 'relative'
            }}
          >
            <div className="p-2 bg-white">
              <div className="text-sm font-medium text-gray-900 mb-2">Sökresultat:</div>
              {searchResults.map((contact) => (
                <div
                  key={contact.contactCode}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b last:border-b-0"
                  onClick={() => handleSelectContact(contact)}
                  style={{ backgroundColor: '#f9f9f9', margin: '2px 0' }}
                >
                  <div className="font-medium text-gray-900">{contact.fullName}</div>
                  <div className="text-sm text-gray-600">
                    {contact.contactCode} • {contact.nationalRegistrationNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedContact && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{selectedContact.fullName}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedContact.contactCode} • {selectedContact.nationalRegistrationNumber}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleClearSelection}>
                Ändra
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
