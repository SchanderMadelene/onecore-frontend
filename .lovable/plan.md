
# Plan: Förvaltnings- och kvartersvärdsområden

## Sammanfattning
Skapa en ny sida för att visa en överblick över kostnadställen, kvartersvärdar och deras respektive fastighetsområden baserat på Excel-datan.

## Datastruktur från Excel

Datan innehåller två huvudvyer:
1. **Enkel vy (Sida 1)**: Kostnadställe, Kvartersvärd, Ref.nr, Fastighetsnummer, Fastighetsnamn, Adress
2. **Detaljerad vy (Sida 2)**: Samma plus Typ, Antal Bostäder/Lokaler/Garage/P-platser, Yta etc.

Kostnadställen i datan:
- 61110 - Mimer Mitt
- 61120 - (annat område)
- 61130 - (annat område)  
- 61140 - (annat område)
- 61150 - (annat område)

## Vad som skapas

### 1. Feature-mapp: `src/features/property-areas/`

```text
src/features/property-areas/
├── types/
│   ├── index.ts
│   └── property-area.ts
├── data/
│   ├── index.ts
│   └── property-areas.ts      # All Excel-data som TypeScript-objekt
├── components/
│   ├── index.ts
│   ├── PropertyAreasTable.tsx # Huvudtabell med ResponsiveTable
│   └── PropertyAreasHeader.tsx
└── index.ts
```

### 2. Sidkomponent: `src/pages/property-areas/`

```text
src/pages/property-areas/
├── PropertyAreasPage.tsx
└── components/
    └── PropertyAreasHeader.tsx
```

### 3. Typdefinitioner

```typescript
interface PropertyAreaEntry {
  id: string;
  costCenter: string;           // k-ställe (61110, 61120, etc)
  stewardName: string;          // Kvartersvärd
  stewardRefNr: string;         // Ref.nr (YY2489, etc)
  stewardPhone?: string;        // Telefonnummer (från sida 2)
  propertyCode: string;         // Fastighetsnummer (04101, etc)
  propertyName: string;         // Fastighet (JOSEF 7, etc)
  address: string;              // Adress
  buildingType?: string;        // Typ (STD, BLOCK)
  residenceCount?: number;      // Antal Bostad
  commercialCount?: number;     // Antal Lokal
  garageCount?: number;         // Antal Garage
  parkingCount?: number;        // Antal p-plats
  otherCount?: number;          // Antal Övrigt
  residenceArea?: number;       // YTA Bostad
  commercialArea?: number;      // YTA Lokal
  garageArea?: number;          // YTA Garage
}

interface Steward {
  id: string;
  name: string;
  refNr: string;
  phone?: string;
  costCenter: string;
  propertyCount: number;
}

interface CostCenter {
  code: string;
  name: string;
  stewardCount: number;
  propertyCount: number;
}
```

### 4. Sidans funktioner

- **Sök**: Fritext på kvartersvärd, adress, fastighetsnamn
- **Filter**: 
  - Kostnadställe (dropdown med 61110, 61120, etc.)
  - Kvartersvärd (dropdown med alla kvartersvärdar)
- **Tabell**: Visar alla rader med kolumner för k-ställe, kvartersvärd, fastighet, adress
- **Export**: Excel-export av filtrerad data
- **Responsiv**: Mobile-first med kortvy på mobil

### 5. Navigering och routing

- **Route**: `/property-areas`
- **Feature toggle**: `showPropertyAreas` (default: false)
- **Menypost**: "Förvaltningsområden" med ikon `map` eller `users`

---

## Teknisk implementation

### Filer som skapas

| Fil | Beskrivning |
|-----|-------------|
| `src/features/property-areas/types/property-area.ts` | Typdefinitioner |
| `src/features/property-areas/types/index.ts` | Export |
| `src/features/property-areas/data/property-areas.ts` | Mock-data från Excel (~350 rader) |
| `src/features/property-areas/data/index.ts` | Export + hjälpfunktioner |
| `src/features/property-areas/components/PropertyAreasTable.tsx` | Tabell med ResponsiveTable |
| `src/features/property-areas/components/index.ts` | Export |
| `src/features/property-areas/index.ts` | Huvud-export |
| `src/pages/property-areas/PropertyAreasPage.tsx` | Sidkomponent |
| `src/pages/property-areas/components/PropertyAreasHeader.tsx` | Header med titel |

### Filer som uppdateras

| Fil | Ändring |
|-----|---------|
| `src/contexts/FeatureTogglesContext.tsx` | Lägg till `showPropertyAreas: boolean` |
| `src/App.tsx` | Lägg till route `/property-areas` |
| `src/layouts/treeview/data/navigation.ts` | Lägg till menypost |
| `src/components/treeview/data/navigation.ts` | Samma menypost |

### Datakonvertering

Excel-datan (Januari 2026-kolumnerna) konverteras till TypeScript-objekt:

```typescript
export const propertyAreaEntries: PropertyAreaEntry[] = [
  {
    id: "pa-001",
    costCenter: "61110",
    stewardName: "Ulrica Hallgren",
    stewardRefNr: "YY2489",
    propertyCode: "04101",
    propertyName: "JOSEF 7",
    address: "ALLÉSTIGEN 7-11"
  },
  // ... ca 350 poster
];
```

### UI-design

Följer samma mönster som BarriersPage:
1. Card med sökfält (full bredd)
2. Card med filter-rad (kostnadställe, kvartersvärd-dropdown, rensa-knapp, export-knapp)
3. Card med tabell (p-0)

---

## Beroenden

Inga nya beroenden behövs - använder befintliga:
- `ResponsiveTable` för tabellvisning
- `ExportButton` för Excel-export
- `exportToExcel` utility
- shadcn/ui komponenter (Card, Select, Input, Button)
