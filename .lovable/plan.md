

## Plan: Uthyrning Förråd (speglar bilplats)

Skapa en komplett förrådsuthyrningsmodul som följer exakt samma mönster som bilplats — samma 6 faser, samma komponentstruktur, samma cross-domain-logik. Befintlig stub i `RentalsPage.tsx` (statiska siffror) ersätts med fullt flöde.

### Faser (identiska med bilplats)

```text
1. Behov av     2. Publicerade   3. Klara för    4. Erbjudna   5. Kontrakt   6. Historik
   publicering →                    erbjudande  →             →             →
```

### Domänspecifika egenskaper för förråd

- **Förrådstyper:** Källarförråd, Vindsförråd, Lägenhetsförråd, Externt förråd
- **Storlek:** m² eller m³ (t.ex. "3 m²", "2,5 m²") — visas som metadata
- **Hyresnivå:** Lägre än bilplats (typiskt 80–250 kr/mån)
- **Kötyper:** Intern / Extern / Poängfri (samma som bilplats)
- **Anmälningstyp:** Byte vs Hyra flera (samma logik som bilplats — många hyresgäster har redan ett förråd)
- **Synk:** Automatisk synk av interna förråd från fastighetssystemet

### Filer som skapas

**Types & data**
- `src/features/rentals/types/storage.ts` — `StorageSpace`, `StorageApplication` interfaces
- `src/features/rentals/components/types/storage.ts` — komponentlokal typ med `offer?`-fält
- `src/features/rentals/data/mockStorageApplicants.ts` — anonymiserad mockdata

**Hooks** (speglar `useParkingSpace*`)
- `src/features/rentals/hooks/useStorageSpaceListing.ts`
- `src/features/rentals/hooks/useStorageSpaceListings.ts`
- `src/features/rentals/hooks/useStorageSpaceListingsByType.ts`
- `src/features/rentals/hooks/useStorageSpaceActions.ts` — close, delete, syncInternal

**Tab-komponenter** (i ny mapp `components/tabs-storage/` för tydlig separation)
- `PublishedStorageTab.tsx`
- `ReadyForOfferStorageTab.tsx`
- `OfferedStorageTab.tsx`
- `HistoryStorageTab.tsx`
- `NeedsRepublishStorageTab.tsx`

**Tabell- och radkomponenter**
- `StorageSpacesTable.tsx` — wrapper med MobileTabs (5 flikar)
- `StorageRowActions.tsx` — speglar `ParkingRowActions`
- `StorageApplicationDialog.tsx` — wrapper kring `CreateInterestApplicationDialog`
- `StorageSpaceDetail.tsx` — detaljvy med action-paritet
- `PublishStorageSpacesDialog.tsx`
- `SyncStorageSpacesDialog.tsx`

**Pages**
- `src/pages/rentals/StorageSpaceDetailPage.tsx`

**Header**
- `src/pages/rentals/components/StorageSpaceHeader.tsx` — speglar ParkingSpaceHeader med semantisk `variant="info"` status-badge

### Filer som ändras

**`src/pages/rentals/RentalsPage.tsx`**
Ersätt den statiska Card-stubben i `TabsContent value="forrad"` med:
```tsx
<TabsContent value="forrad">
  <StorageSpacesTable />
</TabsContent>
```

**`src/features/rentals/components/index.ts`** — exportera nya komponenter
**`src/features/rentals/hooks/index.ts`** — exportera nya hooks
**`src/features/rentals/types/index.ts`** — exportera storage-typer
**`src/features/rentals/index.ts`** — top-level exports
**`src/App.tsx`** (eller routerfilen) — ny route `/rentals/storage/:id` → `StorageSpaceDetailPage`

**`src/features/rentals/components/CreateInterestApplicationDialog.tsx`** — generaliseras till att acceptera både `parkingSpace` och `storageSpace` (eller en gemensam `subject`-prop med `kind: "parking" | "storage"`). Återanvänder validering (`useTenantValidation`) — samma "Byte vs Hyra flera"-logik.

**`src/shared/contexts/HousingOffersContext.tsx`** — alternativt: extrahera en gemensam `OffersContext` som hanterar både parking och storage. **Förslag:** behåll separat `StorageOffersContext` initialt för minsta blast-radius; konsolidering kan göras senare.

### Återanvändning (cross-domain logic reuse)

Följer befintlig princip — dessa komponenter används som-de-är utan ny variant:
- `CancelRentalDialog` (har redan `kind`-prop, lägg till `"storage"`)
- `ConfirmDialog`, `BulkActionBar`, `Notes`, `ResponsiveTable`
- `SendHousingOfferDialog`-mönster (kan generaliseras eller dupliceras minimalt)
- `getOfferStatus`, `createMockSpace` i `pages/rentals/utils/` — generaliseras

### Mockdata-strategi

8–12 anonymiserade förråd fördelade på faserna:
- 3 publicerade (olika kötyper)
- 2 klara för erbjudande
- 2 erbjudna
- 1 i kontraktsfas
- 2 i historik
- 2 i behov av publicering

### Feature toggle

`showRentalsStorage` finns redan och används i `RentalsPage.tsx` — ingen ändring krävs där. Innehållet i fliken aktiveras automatiskt när togglen är på.

### Konsekvens & UX

- Status-badge i `StorageSpaceHeader`: semantisk `variant="info"` (matchar #4-fixen)
- Mobile cards följer standardmönstret (rubrik fet, metadata-grid, actions)
- Tabellåtgärder: `variant="outline"` ikonknappar
- Inga ikoner på primära textknappar
- Action-paritet mellan radens ⋯-meny och detaljsidans header

### Out of scope (för senare iterationer)
- Erbjudandeomgångar (hålls för det tidigare diskuterade arbetet)
- Konsolidering av Parking/Storage offer-contexts till en gemensam abstraktion
- Sammanslagning av `tabs/` och `tabs-storage/` till generisk komponent

### Påverkan
- ~20 nya filer, ~6 ändrade filer
- Ingen påverkan på bostads- eller bilplatsflödet
- Aktiveras endast när `showRentalsStorage` är på

