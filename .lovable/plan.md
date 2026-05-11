# Återskapa publicerad version av Förvaltningsområden

## Vad som skiljer sig

Publicerad version (`core-symphony.lovable.app/property-areas`) visar **kanban-vyn** med KVV-kolumner som primärvy. Nuvarande preview har ersatt detta med en tabellvy och flyttat kanban till `/property-areas/admin`.

Konkreta avvikelser i preview:

1. `/property-areas` är en tabellvy — i publicerad är det kanban-vyn
2. Header visar inte distriktschef + biträdande distriktschef inline
3. Saknar drag-handle på KVV-kolumnerna (omsortering)
4. KVV-kolumnens header visar "X fastigheter"-badge (fanns inte i publicerad) men saknar aggregerade ikon-counters (fastigheter, bostäder, p-platser)
5. PropertyCard saknar bostads- och p-platsräknare per fastighet samt drag-handle
6. Pending changes-panel + Avbryt/Spara-knappar fanns inte i publicerad (auto-save / direkt sparflöde)
7. Sidomenyn pekar fortfarande på fel route

## Plan

### 1. Gör kanban till primärvy på `/property-areas`
- Flytta innehållet i `StewardAdminPage.tsx` till `PropertyAreasPage.tsx` som ny grund
- Ta bort `/property-areas/admin`-routen (eller låt den redirecta till `/property-areas`)
- Tabellvy + ColumnSelector + filterkort tas bort från denna sida (tabellen finns redan i andra delar av systemet vid behov)

### 2. Header & filterrad
- Titel: "Förvaltningsområden", subtitel: "Byt ansvarig kvartersvärd för KVV-områden"
- En rad: `Kostnadsställe` (Select) + textetiketter "Distriktschef" / "Biträdande distriktschef" med namn bredvid
- Distriktschef-data hämtas via befintlig kostnadsställe-info eller läggs till i `getCostCenterName`-modulen
- Ta bort Avbryt/Spara-knappar och `PendingChangesPanel` från denna sida — ändringar sker direkt via `StewardAssignmentDialog` (auto-save mot mock-state)

### 3. KVV-kolumn (StewardColumn)
- Lägg till drag-handle (GripVertical) i topp-vänster för att kunna ändra ordning på kolumner
- Ta bort "X fastigheter"-badge i headern
- Lägg till en ikon-rad: `Building` N (antal fastigheter), `DoorOpen` N (antal bostäder), `Car` N (antal p-platser) — aggregerat från properties
- Behåll edit-pencil för att byta kvartersvärd

### 4. PropertyCard
- Lägg till drag-handle (GripVertical) till vänster
- Lägg till en räknarrad under tag: `DoorOpen` N (bostäder), `Car` N (p-platser, visas bara om > 0)
- Datan finns redan på `PropertyForAdmin` (residenceCount, parkingCount) eller kan läggas till i typen

### 5. Sortering / drag & drop
- Ordning på kolumner sparas i lokal state (per kostnadsställe)
- Använd befintligt dnd-bibliotek om sådant redan finns i projektet, annars enkel hover-baserad reorder via `useState` + drag events (samma mönster som turnover/reorder om det finns)

### 6. Routing & navigation
- `/property-areas/admin` redirectar till `/property-areas`
- Sidomenyns "Förvaltningsområden"-länk pekar på `/property-areas`
- `StewardAdminPage.tsx` kan tas bort när allt flyttats

## Tekniska detaljer

- Filer som ändras: `src/pages/property-areas/PropertyAreasPage.tsx`, `src/features/property-areas/components/admin/StewardColumn.tsx`, `src/features/property-areas/components/admin/PropertyCard.tsx`, router-fil
- Filer som tas bort: `src/pages/property-areas/StewardAdminPage.tsx` (innehållet absorberas i PropertyAreasPage)
- Mock-data: distriktschef + biträdande per kostnadsställe läggs till i `features/property-areas/data` (anonymiserade svenska namn)
- Inga ikoner på primärknappar (memory-regel) — räknar-ikonerna är dekorativa stat-counters, ej knappar, så tillåtna
- Mobile-läge (`StewardAdminMobile`) behålls oförändrat

## Frågetecken (kan justeras vid implementation)

- Om publicerad version har ren auto-save eller om "Spara"-knappen finns någon annanstans — jag tar bort den helt på sidan; säg till om du vill ha tillbaka en sparflöde
- Tabellvyn (med ColumnSelector + Excel-export) — försvinner från `/property-areas`. Om du vill ha kvar den någonstans, säg vart (t.ex. egen route `/property-areas/lista`)
