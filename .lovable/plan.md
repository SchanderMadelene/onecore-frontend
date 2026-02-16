
# Baka in kommunikationsloggen i handelsloggen

## Sammanfattning
Istallet for att visa "Skickade meddelanden (senaste 48h)" som en separat komponent ovanfor tabbarna, integreras SMS- och e-postmeddelanden som handelser i den befintliga handelsloggen. Den separata `TenantCommunicationLog`-sektionen tas bort fran sidan.

## Andringar

### 1. Utoka TenantEvent-typen (`src/features/tenants/data/tenant-events.ts`)
- Lagg till `'communication'` som ny typ i `TenantEvent['type']`
- Skapa en hjalpfunktion `getCommunicationEvents(personalNumber)` som konverterar `SentMessage`-data till `TenantEvent`-objekt med typ `'communication'`, titel "SMS skickat"/"E-post skickad", mottagare och forhandsvisning i description, och metadata (recipient, messagePreview, sentBy)
- Uppdatera `getTenantEvents()` sa den mergar vanliga handelser med kommunikationshardelser och sorterar allt kronologiskt

### 2. Uppdatera TenantEventLog-komponenten (`src/features/tenants/components/TenantEventLog.tsx`)
- Lagg till `'communication'` i typfiltrets Select-dropdown med texten "Kommunikation"
- Lagg till `getEventTypeName`-mapping: `'communication'` -> `'Kommunikation'`
- Ge kommunikationshardelser en distinkt badge-styling (bla for SMS, lila for e-post) baserat pa metadata, liknande den nuvarande kommunikationsloggens badges

### 3. Ta bort kommunikationsloggen fran TenantDetailPage (`src/pages/tenants/TenantDetailPage.tsx`)
- Ta bort `<TenantCommunicationLog>`-sektionen som ligger mellan TenantCard och tabbarna
- Importraden for `TenantCommunicationLog` kan tas bort

### 4. Uppdatera TenantMobileAccordion (`src/features/tenants/components/TenantMobileAccordion.tsx`)
- Handelslogg-accordionen ska rendera `TenantEventLog` (med personalNumber) istallet for placeholder-text, sa att kommunikationshardelserna syns aven pa mobil

### Vad som inte andras
- Filerna `TenantCommunicationLog.tsx` och `communication-log.ts` behalls i kodbasen (kan rensas senare) men anvands inte langre pa sidan
- Desktop-tabben "Handelslogg" behaller sin befintliga layout, filter och expanderbara kort — den far bara nya rader av typen "Kommunikation"
