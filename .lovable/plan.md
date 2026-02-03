

# Plan: Uppdatera Förvaltningsområden med detaljerad data från flik 2

## Sammanfattning
Uppdatera Property Areas-funktionen med all detaljerad information från Excel-filens andra flik, inklusive telefonnummer, fastighetstyp, antal enheter och ytor.

## Nuvarande situation
Den befintliga implementationen har endast enkel data från flik 1:
- Kostnadställe, Kvartersvärd, Ref.nr, Fastighet, Adress

## Ny data från flik 2 som ska läggas till

| Fält | Beskrivning | Exempel |
|------|-------------|---------|
| `stewardPhone` | Telefonnummer | "021397246" |
| `buildingType` | Typ av boende | STD, BLOCK, 55PLUS, STUD, TRYGG, CO-LIVING |
| `residenceCount` | Antal bostäder | 143 |
| `commercialCount` | Antal lokaler | 10 |
| `garageCount` | Antal garage | 62 |
| `parkingCount` | Antal p-platser | 71 |
| `otherCount` | Antal övrigt | 1 |
| `residenceArea` | Yta bostad (kvm) | 11076 |
| `commercialArea` | Yta lokal (kvm) | 352.5 |
| `garageArea` | Yta garage (kvm) | 744 |
| `entranceCount` | Antal trappuppgångar | 21 |

Dessutom lägga till distriktsnamn:
- 61110 = "Mimer Mitt"
- 61120 = "Mimer Norr" 
- 61130 = "Mimer Öst"
- 61140 = "Mimer Väst"
- 61150 = "Mimer Student"

## Ändringar

### 1. Uppdatera typdefinitioner

**Fil:** `src/features/property-areas/types/property-area.ts`

Lägg till de fält som redan är definierade men inte används, plus `entranceCount`:

```typescript
interface PropertyAreaEntry {
  id: string;
  costCenter: string;
  stewardName: string;
  stewardRefNr: string;
  stewardPhone?: string;        // NY
  propertyCode: string;
  propertyName: string;
  address: string;
  buildingType?: string;        // NY (STD, BLOCK, 55PLUS, etc.)
  residenceCount?: number;      // NY
  commercialCount?: number;     // NY
  garageCount?: number;         // NY
  parkingCount?: number;        // NY
  otherCount?: number;          // NY
  residenceArea?: number;       // NY
  commercialArea?: number;      // NY
  garageArea?: number;          // NY
  entranceCount?: number;       // NY
}
```

Uppdatera `COST_CENTER_NAMES`:
```typescript
export const COST_CENTER_NAMES: Record<string, string> = {
  "61110": "Mimer Mitt",
  "61120": "Mimer Norr",
  "61130": "Mimer Öst",
  "61140": "Mimer Väst",
  "61150": "Mimer Student"
};
```

### 2. Uppdatera mockdata med detaljerad information

**Fil:** `src/features/property-areas/data/property-areas.ts`

Ersätt alla ~350 poster med den nya datan från flik 2 (ca 400 poster).

Exempelformat:
```typescript
{
  id: "pa-001",
  costCenter: "61110",
  stewardName: "Ulrica Hallgren",
  stewardPhone: "021391959",
  stewardRefNr: "YY2489",
  propertyCode: "04101",
  propertyName: "JOSEF 7",
  address: "ALLÉSTIGEN 7-11",
  buildingType: "STD",
  residenceCount: 26,
  commercialCount: 4,
  residenceArea: 1561,
  commercialArea: 56.5,
  entranceCount: 5
}
```

### 3. Uppdatera tabellkomponenten

**Fil:** `src/features/property-areas/components/PropertyAreasTable.tsx`

Lägg till nya kolumner för desktop:
- Typ (buildingType)
- Bostäder (residenceCount)
- Lokaler (commercialCount)
- Yta (residenceArea)

Uppdatera mobilkort för att visa sammanfattad statistik.

### 4. Lägg till filter för byggnadstyp

**Fil:** `src/pages/property-areas/PropertyAreasPage.tsx`

Lägg till dropdown-filter för `buildingType` (STD, BLOCK, 55PLUS, STUD, etc.)

### 5. Uppdatera Excel-export

Inkludera alla nya fält i exporten.

## Filer som ändras

| Fil | Ändring |
|-----|---------|
| `src/features/property-areas/types/property-area.ts` | Lägg till nya fält i interface |
| `src/features/property-areas/data/property-areas.ts` | Ersätt med detaljerad data från flik 2 |
| `src/features/property-areas/data/index.ts` | Lägg till hjälpfunktion för byggnadstyper |
| `src/features/property-areas/components/PropertyAreasTable.tsx` | Lägg till nya kolumner |
| `src/pages/property-areas/PropertyAreasPage.tsx` | Lägg till filter för byggnadstyp, uppdatera export |

## Visuella ändringar

Tabellen på desktop får fler kolumner:
```
K-ställe | Kvartersvärd | Telefon | Fastighet | Adress | Typ | Bostäder | Yta
```

Mobilkortet visar:
- Fastighetsnamn och adress
- Kostnadställe-badge och typ-badge
- Kvartersvärd med telefon
- Kort statistikrad: "26 bostäder • 1561 kvm"

