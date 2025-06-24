
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import type { ContactSearchData } from "../types";

interface CustomerInfoProps {
  contact: ContactSearchData;
}

export function CustomerInfo({ contact }: CustomerInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Kundinformation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Namn</dt>
              <dd className="text-sm">{contact.fullName}</dd>
            </div>
            {contact.nationalRegistrationNumber && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Personnummer</dt>
                <dd className="text-sm">{contact.nationalRegistrationNumber}</dd>
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Kundnummer</dt>
              <dd className="text-sm">{contact.contactCode}</dd>
            </div>
            {contact.phoneNumber && (
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Telefonnummer</dt>
                <dd className="text-sm">{contact.phoneNumber}</dd>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
