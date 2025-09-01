import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";
import { ContactSearch } from "./residence-profile/ContactSearch";
import { CompactProfileForm } from "./residence-profile/CompactProfileForm";
import type { ContactSearchData } from "./residence-profile/types";

export function ApplicantProfileModal() {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSearchData | null>(null);

  const handleContactSelect = (contact: ContactSearchData | null) => {
    setSelectedContact(contact);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Sökandeprofil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sökandeprofil</DialogTitle>
          <DialogDescription>
            Sök upp en kund och hantera deras sökandeprofil
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <ContactSearch
            selectedContact={selectedContact}
            onSelectContact={handleContactSelect}
          />
          
          {selectedContact && (
            <div className="border-t pt-4">
              <CompactProfileForm applicantId={selectedContact.contactCode || selectedContact.fullName} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}