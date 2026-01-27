import { useState, useEffect } from "react";
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

interface ApplicantProfileModalProps {
  customerNumber?: string;
  customerName?: string;
  personalNumber?: string;
}

export function ApplicantProfileModal({ 
  customerNumber, 
  customerName,
  personalNumber 
}: ApplicantProfileModalProps = {}) {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactSearchData | null>(null);
  
  // Auto-select customer when modal opens if customer info is provided
  useEffect(() => {
    if (open && customerNumber && customerName) {
      setSelectedContact({
        contactCode: customerNumber,
        fullName: customerName,
        nationalRegistrationNumber: personalNumber,
      });
    }
  }, [open, customerNumber, customerName, personalNumber]);

  const handleContactSelect = (contact: ContactSearchData | null) => {
    setSelectedContact(contact);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedContact(null);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        handleClose();
      } else {
        setOpen(isOpen);
      }
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Sökandeprofil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-visible" style={{ overflow: 'visible' }}>
        <DialogHeader>
          <DialogTitle>Sökandeprofil</DialogTitle>
          <DialogDescription>
            {selectedContact 
              ? `Hantera sökandeprofil för ${selectedContact.fullName}`
              : "Sök upp en kund och hantera deras sökandeprofil"
            }
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 overflow-y-auto max-h-[60vh]">
          {!customerNumber && (
            <ContactSearch
              selectedContact={selectedContact}
              onSelectContact={handleContactSelect}
            />
          )}
          
          {selectedContact && (
            <div className={customerNumber ? "" : "border-t pt-4"}>
              <CompactProfileForm applicantId={selectedContact.contactCode || selectedContact.fullName} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}