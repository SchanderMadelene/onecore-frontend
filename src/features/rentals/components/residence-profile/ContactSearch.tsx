
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
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
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = searchTerm.length >= 2 
    ? mockContacts.filter(contact =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.contactCode.includes(searchTerm) ||
        (contact.nationalRegistrationNumber && contact.nationalRegistrationNumber.includes(searchTerm))
      )
    : [];

  const handleSelectContact = (contact: ContactSearchData) => {
    onSelectContact(contact);
    setSearchTerm(contact.fullName);
    setOpen(false);
  };

  const handleClearSelection = () => {
    onSelectContact(null);
    setSearchTerm("");
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Sök på person eller kundnummer"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setOpen(e.target.value.length >= 2);
              }}
              className="pl-9"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandList>
              {filteredContacts.length === 0 ? (
                <CommandEmpty>Inga kontakter hittades.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredContacts.map((contact) => (
                    <CommandItem
                      key={contact.contactCode}
                      value={contact.fullName}
                      onSelect={() => handleSelectContact(contact)}
                      className="cursor-pointer"
                    >
                      <User className="h-4 w-4 mr-3" />
                      <div className="flex flex-col">
                        <span className="font-medium">{contact.fullName}</span>
                        <span className="text-sm text-muted-foreground">
                          {contact.contactCode} • {contact.nationalRegistrationNumber}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

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
