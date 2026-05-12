## Mål

Gör fastighetskorten i kanban på `/property-areas` dragbara mellan KVV-kolumner. När ett kort släpps i en annan kolumn flyttas fastigheten till den KVV:n (och därmed dess kvartersvärd).

## Ändringar

### 1. `useStewardAdmin.ts`
- Lägg till state `propertyOverrides: Map<propertyId, kvvArea>` som åsidosätter ursprunglig KVV-tillhörighet.
- Använd overriden i `propertiesByKvvArea`-grupperingen och i räknarna i `kvvAreaList` (propertyCount/residenceCount/parkingCount/entranceCount).
- Ny funktion `reassignProperty(propertyId, toKvvArea)` som uppdaterar overriden.
- Nollställ overrides när `selectedCostCenter` byts.

### 2. `PropertyCard.tsx`
- Wrappa kortet med `useSortable({ id: property.id })` från `@dnd-kit/sortable`.
- Koppla `attributes`/`listeners` till den befintliga `GripVertical`-ikonen (drag-handle).
- Sätt transform/transition/opacity-style på rotelementet.

### 3. `StewardColumn.tsx`
- Gör kolumnen till en droppable container via `useDroppable({ id: kvvArea })` (utöver befintlig `useSortable` på själva kolumnen).
- Wrappa property-listan i `SortableContext` med `verticalListSortingStrategy` och property-id:n.
- Visuell hover-feedback när något dras över (t.ex. `ring-2 ring-primary/40`).

### 4. `PropertyAreasPage.tsx`
- Dela upp DnD-hanteringen så att samma `DndContext` hanterar både kolumn-omsortering och kort-flytt.
- I `handleDragEnd`: om `active.id` är ett property-id → anropa `reassignProperty(active.id, targetKvvArea)`. Om det är ett kvvArea-id → behåll nuvarande kolumn-omsorteringslogik.
- Targetkolumnen härleds från `over.data.current` (kolumn-id om släppt på tom yta, annars det andra kortets kolumn).
- Visa toast: "Fastigheten X flyttades till KVV Y (kvartersvärd Z)".

## Tekniska detaljer

- ID-kollisioner undviks genom att kolumn-id är `kvvArea`-strängen och property-id är UUID — men för säkerhets skull lägger vi `data: { type: 'column' | 'property', kvvArea }` på sortables/droppables och dispatcher i `handleDragEnd` på `type`.
- `closestCorners` passar bättre än `closestCenter` när vi mixar kolumner och kort — byt collision-detector.
- Mobilvyn (`StewardAdminMobile`) berörs inte i denna iteration.

## Frågetecken (kan justeras)

- **Persistens:** flytten är bara i lokal state (samma som dagens reassignArea). Säg till om du vill ha en pending-changes-panel + Spara-knapp för kort-flyttar också.
- **Visuell drop-zone:** ska tomma kolumner ha en tydlig "släpp här"-yta? Föreslår ja, en streckad placeholder när drag pågår.
