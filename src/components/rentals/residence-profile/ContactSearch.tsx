
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

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = mockContacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactCode.includes(searchTerm) ||
        (contact.nationalRegistrationNumber && contact.nationalRegistrationNumber.includes(searchTerm))
      );
      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
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
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            ref={searchInputRef}
            placeholder="Sök på person eller kundnummer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {showResults && searchResults.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-10 mt-1">
            <CardContent className="p-2">
              {searchResults.map((contact) => (
                <Button
                  key={contact.contactCode}
                  variant="ghost"
                  className="w-full justify-start p-3 h-auto"
                  onClick={() => handleSelectContact(contact)}
                >
                  <User className="h-4 w-4 mr-3 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">{contact.fullName}</div>
                    <div className="text-sm text-muted-foreground">
                      {contact.contactCode} • {contact.nationalRegistrationNumber}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
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
