
# Plan: Ändra områdesadministration till KVV-baserad struktur

## Sammanfattning
Ändra administrationsvyn så att kolumnerna representerar **KVV-områden** (t.ex. 61118) istället för kvartersvärdar. När man byter ansvarig kvartersvärd för ett område ändras endast kolumnens rubrik - fastigheterna stannar kvar i samma kolumn.

## Vad som ändras

### Före (nuvarande)
- Kolumner = Kvartersvärdar
- Byta ansvarig = Flytta alla fastigheter till en annan kolumn
- Varje ändring registreras som en fastighetsflytt

### Efter (nytt)
- Kolumner = KVV-områden (61118, 61119, etc.)
- Byta ansvarig = Ändra vem som står i kolumnrubriken
- Fastigheterna rör sig inte - de tillhör området
- Ändringar registreras som "områdesomtilldelningar"

## Användarupplevelse

När användaren klickar på penn-ikonen för område 61118:
1. Dialog öppnas: "Byt ansvarig för område 61118"
2. Användaren väljer en ny kvartersvärd
3. Kolumnrubriken uppdateras med den nya kvartersvärdens namn
4. Fastigheterna i kolumnen påverkas inte visuellt
5. Ändringen visas i panelen för väntande ändringar

---

## Tekniska ändringar

### 1. Nya typer (`admin-types.ts`)
```typescript
// Lägg till ny typ för områdesomtilldelning
export interface AreaReassignment {
  kvvArea: string;
  fromSteward: { refNr: string; name: string };
  toSteward: { refNr: string; name: string };
  timestamp: Date;
}
```

### 2. Ny hook-logik (`useStewardAdmin.ts`)

**Ändra datastrukturen:**
- Gruppera fastigheter efter **kvvArea** istället för stewardRefNr
- Skapa en `Map<kvvArea, stewardRefNr>` för att spåra vilken kvartersvärd som är ansvarig för varje område
- `reassignArea` uppdaterar mappningen, inte individuella fastigheter

**Ny state:**
```typescript
// Ersätt fastighetsbaserade assignments med områdesbaserade
const [areaAssignments, setAreaAssignments] = useState<Map<string, string>>(); // kvvArea -> stewardRefNr

// Ny typ av pending changes
const [pendingAreaChanges, setPendingAreaChanges] = useState<AreaReassignment[]>([]);
```

**Nytt beräkningsflöde:**
```
1. Hämta unika KVV-områden från datan
2. Bestäm initial kvartersvärd för varje område (från kvv-mapping.ts)
3. Gruppera fastigheter per KVV-område (inte per steward)
4. Vid reassignArea: uppdatera areaAssignments, inte flytta fastigheter
```

### 3. Uppdatera `StewardColumn.tsx`
- Ta emot `kvvArea` som identifierare istället för `steward`
- Hämta aktuell kvartersvärd från `areaAssignments`
- Behåll drag-and-drop för enskilda fastigheter (valfritt att ta bort)

### 4. Uppdatera `PendingChangesPanel.tsx`
- Visa områdesändringar istället för fastighetsändringar
- Exempel: "Område 61118: Christopher Dahlback → Anna Andersson"

### 5. Uppdatera `StewardAssignmentDialog.tsx`
- Bättre beskrivning: "Välj ny ansvarig kvartersvärd för området"
- Tydliggör att fastigheterna inte flyttas

---

## Flödesdiagram

```text
┌─────────────────────────────────────────────────────────────┐
│                    KVV-OMRÅDESBASERAD VY                    │
├─────────────┬─────────────┬─────────────┬─────────────────┤
│   61116     │   61117     │   61118     │   61119          │
│ Madelen L.  │ Ulrica H.   │ Chris D. ✎ │ Emil S.          │
│ YY2523      │ YY2489      │ YY2522      │ YY2531           │
├─────────────┼─────────────┼─────────────┼─────────────────┤
│ [Fastighet] │ [Fastighet] │ [JULIUS 10] │ [Fastighet]      │
│ [Fastighet] │ [Fastighet] │ [GUDE 1]    │ [Fastighet]      │
│             │             │ [LUDOLF 1]  │                  │
└─────────────┴─────────────┴─────────────┴─────────────────┘

         ↓ Klicka på ✎ för 61118

┌─────────────────────────────────────────┐
│ Byt ansvarig för område 61118           │
│                                         │
│ Nuvarande: Christopher Dahlback         │
│                                         │
│ Ny kvartersvärd: [Dropdown ▾]           │
│   > Thomas Sweijer                      │
│   > Maria Sevedsson                     │
│   > etc.                                │
│                                         │
│ [Avbryt]                    [Spara]     │
└─────────────────────────────────────────┘

         ↓ Väljer ny kvartersvärd

┌─────────────────────────────────────────────────────────────┐
│ VÄNTANDE ÄNDRINGAR                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Område 61118: Christopher Dahlback → Thomas Sweijer [↩]│ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Filer som ändras

| Fil | Åtgärd |
|-----|--------|
| `src/features/property-areas/types/admin-types.ts` | Lägg till `AreaReassignment` |
| `src/features/property-areas/hooks/useStewardAdmin.ts` | Skriv om till KVV-baserad struktur |
| `src/features/property-areas/components/admin/StewardColumn.tsx` | Anpassa props och visning |
| `src/features/property-areas/components/admin/PendingChangesPanel.tsx` | Visa områdesändringar |
| `src/features/property-areas/components/admin/StewardAdminMobile.tsx` | Samma anpassning för mobil |
| `src/pages/property-areas/StewardAdminPage.tsx` | Uppdatera hook-användning |

---

## Bakåtkompatibilitet

- Drag-and-drop för enskilda fastigheter kan behållas om det finns behov av att flytta enstaka fastigheter mellan områden
- Om inte, kan drag-and-drop tas bort helt för att förenkla gränssnittet

## Fråga

**Ska drag-and-drop för enskilda fastigheter behållas?** Det skulle innebära att man kan:
1. Byta ansvarig för hela området (via penn-knappen)
2. OCH flytta enskilda fastigheter till andra områden (via drag-and-drop)

Om ja, behöver vi två typer av ändringar i pending changes. Om nej, kan vi förenkla och ta bort drag-and-drop helt.
