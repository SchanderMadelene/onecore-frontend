
import { Notes } from "@/components/shared/Notes";
import { TabLayout } from "@/components/ui/tab-layout";
import { StickyNote } from "lucide-react";

export function TenantNotes() {
  return (
    <TabLayout 
      title="Noteringar" 
      icon={StickyNote}
      showCard={true}
    >
      <Notes
        entityType="tenant"
        entityId="current-tenant" // This would be dynamic based on the tenant being viewed
        placeholder="Skriv din notering här..."
        emptyMessage="Inga noteringar har lagts till för denna hyresgäst ännu."
      />
    </TabLayout>
  );
}
