
import { Notes } from "@/components/shared/Notes";

export function TenantNotes() {
  return (
    <Notes
      entityType="tenant"
      entityId="current-tenant"
      placeholder="Skriv din notering här..."
      emptyMessage="Inga noteringar har lagts till för denna hyresgäst ännu."
    />
  );
}
