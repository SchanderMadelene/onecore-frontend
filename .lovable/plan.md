

## Plan: Återskapa Uthyrning → Förråd

Förråd ska följa exakt samma mönster som Bilplats (per memory `cross-domain-logic-reuse` och `queue-types-model`). Inga visuella avvikelser från befintliga uthyrningsvyer.

### 1. Datalager för förråd
Skapa `src/features/rentals/data/storage-spaces.ts` med anonymiserad svensk mockdata för ~6–10 förråd (t.ex. "Källarförråd", "Vindsförråd", "Loftförråd") på adresser som redan finns i bostads-/bilplatsmocken. Fält matchar `ParkingSpace`-formen: `id` (F-001…), `address`, `area`, `type` (Källarförråd/Vindsförråd/Loft), `queueType` (Intern/Extern), `rent` (150–400 kr/mån), `seekers`, `publishedFrom`, `publishedTo`.

Lägg till typ `StorageSpace` i `src/features/rentals/types/storage.ts` (samma form som `ParkingSpace`).

### 2. Hook för listningar per status
Skapa `src/features/rentals/hooks/useStorageSpaceListingsByType.ts` som speglar `useParkingSpaceListingsByType` 1:1 (samma `ListingType`-union: `published | ready-for-offer | offered | history | needs-republish`). Returnerar mockdata uppdelat på status — ingen backend-fetch behövs (förråd finns inte i Tenfast än, samma fallback-mönster som parking).

### 3. Tabellkomponent + flikar
Skapa `src/features/rentals/components/StorageSpacesTable.tsx` som klonar `ParkingSpacesTable` strukturellt:
- Använder `MobileTabs` med samma fem flikar
- Återanvänder befintliga tab-komponenter (`PublishedParkingTab`, `ReadyForOfferTab`, `OfferedTab`, `HistoryTab`, `NeedsRepublishTab`) parametriserade via en ny prop `domain: "parking" | "storage"` så att de hämtar rätt hook och visar rätt rubrik. Detta undviker dubblerad UI-kod.

Alternativt (om tab-komponenterna är för tätt kopplade till parking): skapa tunna `Storage*Tab.tsx`-wrappers som anropar samma underliggande listkomponent med storage-hooken. Beslutas vid implementation efter att ha läst tab-filerna.

Exportera `StorageSpacesTable` från `src/features/rentals/components/index.ts` och `src/features/rentals/index.ts`.

### 4. Routing i `RentalsPage`
Ersätt placeholder-kortet ("Aktiva förrådskontrakt 89 / Lediga förråd 15") med `<StorageSpacesTable />` när `type === "forrad"`.

### 5. Overview-KPIer
I `RentalsOverview.tsx`: byt ut hårdkodade `storageMetrics` (`loss: 0`, KPIs `"—"`) mot riktiga värden via `useStorageSpaceListingsByType` — exakt samma beräkning som `parkingMetrics`. Då tänds Förråd-kortet med korrekt hyresbortfall, totalantal och KPI-räkningar.

### Tekniska detaljer
- Återanvänder `ParkingSpace`-typen där möjligt; ny `StorageSpace`-typ delar form
- Endast två kötyper: Intern, Extern (per memory)
- Mockdata följer anonymiseringspolicy: fiktiva adresser, 4-siffriga IDs, inga personnummer
- Inga ändringar i `App.tsx`, sidomeny, eller delade komponenter

### Filer

**Nya:**
- `src/features/rentals/types/storage.ts`
- `src/features/rentals/data/storage-spaces.ts`
- `src/features/rentals/hooks/useStorageSpaceListingsByType.ts`
- `src/features/rentals/components/StorageSpacesTable.tsx`

**Ändrade:**
- `src/features/rentals/components/tabs/*.tsx` (acceptera `domain`-prop) eller nya Storage-tab-wrappers
- `src/features/rentals/components/index.ts`, `src/features/rentals/index.ts`
- `src/pages/rentals/RentalsPage.tsx` (rendera `StorageSpacesTable`)
- `src/pages/rentals/RentalsOverview.tsx` (riktiga `storageMetrics`)

### Out of scope
- Detaljvy för enskilt förråd (`StorageDetailPage`) — tas i nästa iteration när tabellen är på plats
- Backend-koppling (Tenfast har inte förråd än)
- Erbjudande-/kontraktsflöde specifikt för förråd (återanvänder parkingens flöde tills behov uppstår)

