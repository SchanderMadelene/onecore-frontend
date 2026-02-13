
import { Notes } from "@/components/common/Notes";
import { TabLayout } from "@/components/ui/tab-layout";

interface TenantNotesProps {
  compact?: boolean;
}

export function TenantNotes({ compact = false }: TenantNotesProps) {
  return (
    <TabLayout 
      title="Noteringar" 
      showCard={!compact}
      showHeader={!compact}
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
