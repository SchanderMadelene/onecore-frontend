

## Plan: Publicera bostadsannonser — enskilt och i bulk

### Vad byggs

Möjlighet att publicera bostadsannonser från "Behov av publicering"-fliken, antingen en i taget via en knapp per rad, eller flera samtidigt via checkboxar och en bulk-bar i botten.

### Ändringar

**1. `src/features/rentals/components/UnpublishedHousingTable.tsx`**
- Lägg till `useState` för `selectedKeys` (string[])
- Aktivera `selectable` på `ResponsiveTable` med `selectedKeys` och `onSelectionChange`
- Lägg till en "Publicera"-knapp (Send/Upload-ikon) per rad i actions-kolumnen
- Klick på enskild "Publicera" öppnar `ConfirmDialog` med bekräftelse
- Visa en bulk-bar i botten (ny komponent, se nedan) när `selectedKeys.length > 0`
- Mock-publicering: visa toast vid bekräftelse, ta bort från listan (lokal state)

**2. `src/shared/ui/publish-action-bar.tsx`** — Ny komponent
- Återanvänder layoutmönstret från `BulkActionBar` (fixed bottom, responsiv med `useIsMobile`)
- Props: `selectedCount`, `onPublish`, `onClear`
- Visar "{N} annons(er) valda", "Rensa"-knapp, "Publicera"-knapp
- Generisk nog att kunna användas även för bilplatser framöver

**3. Mobilkort i `UnpublishedHousingTable.tsx`**
- Lägg till "Publicera"-knapp i mobilkortet

### Tekniska detaljer

- `ConfirmDialog` (redan finns i `src/shared/common/`) används för bekräftelse vid enskild och bulk-publicering
- Toast via `useToast` vid lyckad publicering
- Lokal state-hantering med `useState` för mockad data (filtrera bort publicerade från listan)
- `ResponsiveTable` har redan inbyggt stöd för `selectable`, `selectedKeys`, `onSelectionChange`

