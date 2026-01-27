
import { Notes } from "@/components/common/Notes";
import { TabLayout } from "@/components/ui/tab-layout";

export function TenantNotes() {
  return (
    <TabLayout 
      title="Noteringar" 
      showCard={true}
      showHeader={true}
    >
      <Notes
        entityType="tenant"
        entityId="current-tenant"
        placeholder="Skriv din notering här..."
        emptyMessage="Inga noteringar har lagts till för denna hyresgäst ännu."
      />
    </TabLayout>
  );
}
