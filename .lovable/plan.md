
# Plan: Administrationspanel med drag-and-drop för kvartersvärdar

## Sammanfattning
Skapa en separat administrationspanel som nås via en "Administrera"-knapp på Förvaltningsområden-sidan. Panelen visar kvartersvärdar som kolumner där man kan dra och släppa fastigheter mellan dem. Detta ger en tydlig överblick och ett intuitivt sätt att flytta ansvar.

## Användarflöde

```text
┌─────────────────────────────────────────────────────────────────┐
│  Förvaltningsområden                          [Administrera]   │
│  ─────────────────────────────────────────────────────────────  │
│  Sök...                                                         │
│  [Filter: Kostnadställe] [Kvartersvärd] [Typ]    [Kolumner ▼]  │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ K-ställe │ Kvartersvärd │ Fastighet │ Adress │ Typ │ ...   ││
│  │──────────┼──────────────┼───────────┼────────┼─────┼───────││
│  │ 61110    │ U. Hallgren  │ JOSEF 7   │ ...    │ STD │       ││
│  └─────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼ Klicka "Administrera"
                            
┌─────────────────────────────────────────────────────────────────┐
│  ← Tillbaka          Administrera förvaltningsområden           │
│  ─────────────────────────────────────────────────────────────  │
│  [Kostnadställe: 61110 - Mimer Mitt ▼]         [Spara] [Avbryt] │
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ U. Hallgren  │ │ C. Dahlback  │ │ M. Sevedsson │ ...        │
│  │ YY2489       │ │ YY2522       │ │ YY1473       │            │
│  │ 021391959    │ │ 021397052    │ │ 021397177    │            │
│  │ ───────────  │ │ ───────────  │ │ ───────────  │            │
│  │ ☰ JOSEF 7    │ │ ☰ JULIUS 10  │ │ ☰ JOHAN 4    │            │
│  │   Alléstigen │ │   Östermalmsg│ │   Badhusg 1  │            │
│  │              │ │              │ │              │            │
│  │ ☰ JOSEF 8    │ │ ☰ GUDE 1     │ │ ☰ JOHANNES 1 │            │
│  │   Östermalmsg│ │   S Allégatan│ │   Badhusg 2  │            │
│  │              │ │              │ │              │            │
│  │ ☰ KÅRE 5     │ │ ☰ LUDOLF 1   │ │ ☰ JOAKIM 1   │            │
│  │   Timmermans.│ │   Stora gatan│ │   Badhusg 3  │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│        ↑                  ↓                                     │
│        └──── Dra fastighet mellan kvartersvärdar ───┘          │
└─────────────────────────────────────────────────────────────────┘
```

## Funktioner

**Vy-uppdelning:**
- Filtrera på kostnadställe (ett i taget för att begränsa antal kolumner)
- Varje kvartersvärd visas som en vertikal kolumn med sitt namn, ref.nr och telefon
- Fastigheterna visas som kort under respektive kvartersvärd

**Drag-and-drop:**
- Dra ett fastighetskort till en annan kvartersvärd-kolumn
- Visuell feedback när man drar (kort lyfts, dropzon markeras)
- Bekräftelse innan ändring sparas

**Spara/Avbryt:**
- Ändringar sparas inte förrän man klickar "Spara"
- "Avbryt" återställer alla ändringar
- Möjlighet att se en lista på gjorda ändringar innan man sparar

**Mobilvy:**
- På mobil: Använd accordion-vy istället för kolumner
- Varje kvartersvärd som expanderbar sektion
- Flytta via "Flytta till..."-knapp istället för drag-and-drop

## Nya komponenter

| Komponent | Beskrivning |
|-----------|-------------|
| `StewardAdminPage.tsx` | Ny sida under `/property-areas/admin` |
| `StewardColumn.tsx` | En kolumn för en kvartersvärd med droppable-zon |
| `PropertyCard.tsx` | Draggbart kort för en fastighet |
| `PendingChangesPanel.tsx` | Visar väntande ändringar innan sparning |
| `StewardAdminMobile.tsx` | Mobilanpassad accordion-version |

## Datamodell för ändringar

```typescript
// Ny typ för att spåra ändringar
interface PropertyReassignment {
  propertyId: string;
  propertyName: string;
  fromSteward: {
    refNr: string;
    name: string;
  };
  toSteward: {
    refNr: string;
    name: string;
  };
  timestamp: Date;
}

// State i admin-sidan
interface AdminState {
  assignments: Map<string, string>; // propertyId -> stewardRefNr
  pendingChanges: PropertyReassignment[];
  isDirty: boolean;
}
```

## Teknisk implementation

### Fas 1: Grundstruktur (utan drag-and-drop)

1. **Ny rutt och sida**
   - Skapa `/property-areas/admin` rutt
   - `StewardAdminPage.tsx` med grundläggande layout
   - Tillbaka-knapp till `/property-areas`

2. **Kostnadställe-filter**
   - Select för att välja ett kostnadställe
   - Visa endast kvartersvärdar inom valt kostnadställe

3. **Kolumn-layout**
   - Horisontellt scrollbar med kvartersvärd-kolumner
   - ScrollArea för varje kolumn

4. **Fastighetskort**
   - Grundläggande kort med fastighetsnamn och adress
   - Styling med hover-effekt

### Fas 2: Drag-and-drop

5. **Installera @dnd-kit**
   - `@dnd-kit/core` och `@dnd-kit/sortable`
   - Wrap layout med `DndContext`

6. **Gör kort draggbara**
   - `useDraggable` på PropertyCard
   - Drag-handle med grip-ikon

7. **Gör kolumner droppable**
   - `useDroppable` på StewardColumn
   - Visuell feedback vid dragning över

8. **Hantera drop-event**
   - `onDragEnd` - uppdatera assignments
   - Lägg till i pendingChanges

### Fas 3: Spara och återställ

9. **PendingChangesPanel**
   - Lista över väntande ändringar
   - Möjlighet att ångra enskild ändring

10. **Spara-funktionalitet**
    - Bekräftelse-dialog
    - "Spara"-knapp (disabled om inga ändringar)
    - Toast-notifikation vid lyckad sparning

11. **Avbryt-funktionalitet**
    - Varning om osparade ändringar
    - Återställ till ursprungligt state

### Fas 4: Mobilanpassning

12. **StewardAdminMobile**
    - Accordion med kvartersvärdar
    - "Flytta till..."-knapp på varje fastighetskort
    - Select-dialog för att välja ny kvartersvärd

## Filer som skapas/ändras

| Fil | Typ | Beskrivning |
|-----|-----|-------------|
| `src/pages/property-areas/StewardAdminPage.tsx` | Ny | Huvudsida för administration |
| `src/features/property-areas/components/admin/StewardColumn.tsx` | Ny | Kolumn per kvartersvärd |
| `src/features/property-areas/components/admin/PropertyCard.tsx` | Ny | Draggbart fastighetskort |
| `src/features/property-areas/components/admin/PendingChangesPanel.tsx` | Ny | Panel för väntande ändringar |
| `src/features/property-areas/components/admin/StewardAdminMobile.tsx` | Ny | Mobilversion med accordion |
| `src/features/property-areas/components/admin/index.ts` | Ny | Barrel export |
| `src/features/property-areas/types/admin-types.ts` | Ny | Typer för admin-funktionalitet |
| `src/features/property-areas/hooks/useStewardAdmin.ts` | Ny | Hook för admin-state |
| `src/pages/property-areas/PropertyAreasPage.tsx` | Ändra | Lägg till "Administrera"-knapp |
| `src/App.tsx` | Ändra | Lägg till rutt för admin-sida |

## Nytt beroende

```json
"@dnd-kit/core": "^6.1.0",
"@dnd-kit/sortable": "^8.0.0"
```

## Användargränssnitt i detalj

**Kvartersvärd-kolumn:**
```text
┌────────────────────┐
│ Ulrica Hallgren    │ ← Namn (bold)
│ YY2489             │ ← Ref.nr (muted)
│ 021391959          │ ← Telefon (muted)
│ ─────────────────  │
│ 7 fastigheter      │ ← Antal (badge)
├────────────────────┤
│ ☰ JOSEF 7          │ ← Drag-handle + Namn
│   Alléstigen 7-11  │ ← Adress
│   [STD]            │ ← Byggnadstyp badge
│ ────────────────── │
│ ☰ JOSEF 8          │
│   Östermalmsg 6-14 │
│   [STD]            │
│ ────────────────── │
│ ...                │
└────────────────────┘
```

**Väntande ändringar-panel:**
```text
┌─────────────────────────────────────────────────────┐
│ 2 ändringar att spara                     [Minimera]│
├─────────────────────────────────────────────────────┤
│ • JOSEF 7: U. Hallgren → C. Dahlback       [Ångra] │
│ • LUDOLF 1: C. Dahlback → M. Sevedsson     [Ångra] │
└─────────────────────────────────────────────────────┘
```

## Framtida utbyggnad

Denna implementation lägger grunden för:
- Historik över ändringar (vem ändrade vad, när)
- Massflyttning av flera fastigheter samtidigt
- Byte av kostnadställe för en hel kvartersvärd
- Integration med backend-API för beständig lagring
