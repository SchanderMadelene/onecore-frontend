
import { NotesSimple } from "@/components/shared/Notes/NotesSimple";

export function TenantNotes() {
  return (
    <NotesSimple
      entityType="tenant"
      entityId="current-tenant" // This would be dynamic based on the tenant being viewed
      title="Noteringar"
      placeholder="Skriv din notering här..."
      emptyMessage="Inga noteringar har lagts till för denna hyresgäst ännu."
    />
  );
}
