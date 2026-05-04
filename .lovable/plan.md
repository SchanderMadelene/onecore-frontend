## Plan: Återskapa Förråd som spegling av Bilplats

Förråd ska följa exakt samma mönster som Bilplats (samma 6 faser, samma flikar, samma detaljvy, samma actions) — utan att duplicera hela kodbasen. Vi inför en `assetType: "parking" | "storage"` som propageras genom befintliga parking-komponenter och styr terminologi, ikon, mock-data och navigationsvägar.

### 1. Datalager (nya filer)

- `src/features/rentals/types/storage.ts` — `StorageSpace` (samma fält som ParkingSpace, fältet `type` håller "Förråd inomhus" / "Förråd utomhus" / "Källarförråd" / "Vindsförråd")
- `src/features/rentals/hooks/useStorageSpaceListingsByType.ts` — speglar parking-hooken med egen mock-data; anonymiserade svenska adresser; kötyper enligt memory `queue-types-model` (Intern + Extern, ingen "Poängfri")
- `src/features/rentals/hooks/useStorageSpaceListing.ts` — speglar `useParkingSpaceListing` för detaljvy

### 2. Konfigurations-modul (ny fil)

`src/features/rentals/utils/asset-config.ts`:

```ts
export type AssetType = "parking" | "storage";
export const ASSET_CONFIG = {
  parking: {
    noun: "bilplats", nounPlural: "bilplatser", capitalized: "Bilplats",
    routeSegment: "parking", icon: "car",
    detailRoute: (id) => `/rentals/parking/${id}`,
  },
  storage: {
    noun: "förråd", nounPlural: "förråd", capitalized: "Förråd",
    routeSegment: "storage", icon: "archive",
    detailRoute: (id) => `/rentals/storage/${id}`,
  },
};
```

### 3. Generalisera komponenter (lägga till `assetType`-prop)

Följande filer får en `assetType`-prop som default `"parking"` (för bakåtkompatibilitet) och slår upp terminologi/route via `ASSET_CONFIG`:

- `ParkingSpacesTable.tsx` → propagera till alla flikar
- `tabs/PublishedParkingTab.tsx`, `ReadyForOfferTab.tsx`, `OfferedTab.tsx`, `HistoryTab.tsx`, `NeedsRepublishTab.tsx` — välja rätt hook (parking vs storage), rätt etiketter ("bilplats"/"förråd"), rätt navigationspath
- `ParkingRowActions.tsx` — `goDetail` använder rätt route, dialog-texter blir generiska
- `ParkingSpaceDetail.tsx` + `ParkingSpaceInfo.tsx` + `ParkingSpaceHeader.tsx` — etiketter, ikon
- `PublishParkingSpacesDialog.tsx`, `SyncParkingSpacesDialog.tsx`, `ParkingApplicationDialog.tsx` — texter
- `CancelRentalDialog.tsx` — utöka `kind` till `"parking" | "housing" | "storage"` (noun = "förråd")

Filerna behåller sina parking-namn för att inte bryta refs; bara internt logik blir generisk.

### 4. Routing & sida

- `src/pages/rentals/RentalsPage.tsx` — för `type === "forrad"` rendera `<ParkingSpacesTable assetType="storage" />` istället för dagens stub-card
- `src/App.tsx` — lägga till route `/rentals/storage/:storageSpaceId` som renderar `ParkingSpaceDetailPage` med `assetType="storage"` (alternativt en tunn wrapper-page)
- `ParkingSpaceDetailPage.tsx` — läsa `assetType` från route-kontext, välja rätt hook + etiketter

### 5. Översiktssidan (`RentalsOverview.tsx`)

Ersätt `storageMetrics`-stubben med riktiga värden via `useStorageSpaceListingsByType` så Förråd-kortet visar samma KPI-siffror som Bilplats.

### 6. Memory

Uppdatera `mem://features/rentals/cross-domain-logic-reuse` med detaljerna: parking-komponenter accepterar `assetType`-prop, storage återanvänder dem fullt ut.

### Teknisk anteckning (för utvecklare)

- Inga komponenter byter namn, för att undvika större refactor av imports
- Mock-data för storage hålls separat i hook-filen
- URL-segment förblir engelska (`/rentals/storage/...`), label på svenska (Förråd)
- Default `assetType="parking"` säkerställer att inga befintliga anrop bryts

### Inte med i denna plan

- Ingen ny design — visuellt identiskt med Bilplats
- Inget nytt feature-toggle (`showRentalsStorage` finns redan)
- Ingen ändring av Bostads-flödet