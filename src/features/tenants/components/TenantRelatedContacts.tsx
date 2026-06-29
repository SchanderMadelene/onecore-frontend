import { Link } from "react-router-dom";
import { TabLayout } from "@/components/ui/tab-layout";

export interface RelatedContact {
  relation: string;
  name: string;
  customerNumber: string;
  customerId?: string;
}

interface TenantRelatedContactsProps {
  contacts?: RelatedContact[];
}

// Mock data — visas alltid tills datakälla finns
const DEFAULT_CONTACTS: RelatedContact[] = [
  {
    relation: "God man för",
    name: "Skogsberg Sven-Erik",
    customerNumber: "P007623",
  },
  {
    relation: "Annan fakturamottagare för",
    name: "Skogsberg Sven-Erik",
    customerNumber: "P007623",
  },
];

export function TenantRelatedContacts({ contacts = DEFAULT_CONTACTS }: TenantRelatedContactsProps) {
  if (contacts.length === 0) {
    return (
      <TabLayout title="Relaterade kontakter" showCard={true}>
        <p className="text-sm text-muted-foreground">
          Inga relaterade kontakter registrerade för denna kund.
        </p>
      </TabLayout>
    );
  }

  return (
    <TabLayout title="Relaterade kontakter" showCard={true}>
      <div className="space-y-6">
        {contacts.map((contact, index) => {
          const NameTag: any = contact.customerId ? Link : "div";
          const nameProps = contact.customerId
            ? { to: `/tenants/${contact.customerId}`, className: "font-medium hover:underline" }
            : { className: "font-medium" };

          return (
            <div key={`${contact.relation}-${index}`} className="space-y-1">
              <p className="text-sm text-muted-foreground">{contact.relation}</p>
              <NameTag {...nameProps}>{contact.name}</NameTag>
              <p className="text-xs text-muted-foreground">{contact.customerNumber}</p>
            </div>
          );
        })}
      </div>
    </TabLayout>
  );
}
