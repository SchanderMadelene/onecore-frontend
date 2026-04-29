# Återinför erbjudandeomgångar för bostad

Återskapar funktionaliteten som försvann (troligen via en revert/branch-byte). Specen är den som vi enades om 27 april — efter dina två justeringar:

1. **Omgång 1 skapas manuellt** via befintliga "Skicka erbjudande" från "Klara för erbjudande" (inte automatiskt).
2. **Parallella omgångar tillåts** — "Starta ny erbjudandeomgång" avbryter aldrig pågående omgångar, utan lägger till en ny parallell.

## Mål

På bostadsannonsens detaljsida ska handläggaren kunna:
- Skicka omgång 1 (som idag) → annons hamnar i "Erbjudna".
- Starta omgång 2, 3, … manuellt utifrån svarsstatus, med valfritt urval (sökande från tidigare omgångar är markerade men valbara).
- Köra flera omgångar parallellt; varje omgång kan avbrytas individuellt.
- Bläddra mellan omgångar via tabbar (samma mönster som bilplats).

## Datamodell

`src/shared/contexts/HousingOffersContext.tsx` byter från en `HousingOffer` per listing till en array av rounds:

```text
HousingOfferRound {
  id: number
  roundNumber: number          // 1, 2, 3...
  status: 'Active' | 'AllDeclined' | 'Expired' | 'Cancelled' | 'Accepted'
  selectedApplicants: number[]
  sentAt: string
  expiresAt: string            // sentAt + 7 dagar (default)
  responses: { applicantId, response: 'accepted'|'declined', respondedAt }[]
}
```

Intern lagring: `roundsByListing: Record<string, HousingOfferRound[]>`.

Nya/ändrade metoder i contexten:
- `startNewRound(listingId, applicantIds)` — skapar nästa rond, `roundNumber = max+1`.
- `cancelRound(listingId, roundId)` — sätter status `Cancelled` på en specifik rond (inte alla).
- `getRoundsForListing(listingId)` → `HousingOfferRound[]`.
- `getActiveRounds(listingId)` → rondar med status `Active`.
- `canStartNewRound(listingId)` → `false` bara om någon rond är `Accepted` (= tilldelad).
- `getRoundNumberForApplicant(listingId, applicantId)` → senaste rondnumret där sökanden ingick (för badge).
- Bakåtkompatibel `offers`-array deriveras (platt array av alla rondar) så `OfferedHousingTable` fortsätter fungera.
- Behåll `linkContract` / `unlinkContract` / `getLinkedContract` oförändrade.
- Behåll `markEarlyUnpublished` / `isEarlyUnpublished` oförändrade.
- Mock-data uppdateras: t.ex. listing `234-234-234-1013` får omgång 1 (alla nekade) + omgång 2 (aktiv) för att visa parallella/historiska scenarier direkt.

## Statusderivering

Ny utility `src/pages/rentals/utils/housingOfferUtils.ts`:
- `getListingOfferStatus(rounds)` → `'no_offers' | 'offering' | 'assigned'`.
- `getRoundTabLabel(round)` → `"Omgång 1"`, `"Omgång 2 (alla nekade)"`, `"Omgång 3 (avbruten)"` osv.

`useHousingStatus`-hooken uppdateras så att en listing med `rounds.length > 0` räknas som `offered` (= "Erbjudna"-fliken), och blir `assigned` när en rond är `Accepted`.

## UI

### `HousingHeader`
- Chip till höger: enskilt "Omgång N" eller "N omgångar aktiva" om >1.
- Primärknappar:
  - Inga rondar än → **"Skicka erbjudande"** (oförändrat — skapar omgång 1).
  - Minst en rond finns + `canStartNewRound` → **"Starta ny erbjudandeomgång"** (öppnar urvalsläge för nästa rond, **utan att avbryta** existerande aktiva).
  - I urvalsläge → **"Skicka erbjudande"** (disabled tills urval finns) + **"Avbryt urval"**.
- "Tilldelad" → inga primäraction-knappar för rondhantering.

### `HousingDetailPage`
- Tab-mönstret från `ParkingSpaceDetailPage` återanvänds.
- Tabs när rondar finns: en flik per rond (`getRoundTabLabel`) + extra "Ny omgång (urval)" när handläggaren startar nytt urval.
- Per rond-tab:
  - Visar `HousingApplicantsTable` med `offeredApplicantIds = round.selectedApplicants` (markerar deltagare överst).
  - `previousRoundByApplicant` = sökande i tidigare (lägre `roundNumber`) rondar — dimmas, men bara om de inte också är med i denna rond (logiken som finns i `HousingApplicantsTable` redan).
  - För `Active`-rondar: knapp **"Avbryt denna omgång"** (ConfirmDialog → `cancelRound(listingId, roundId)`). Påverkar inte andra parallella aktiva rondar.
- Urvalsvy ("Ny omgång"):
  - Rubrik: *"Välj sökande till omgång {nästa nummer}"*
  - `HousingApplicantsTable` med `showSelectionColumn={true}`, alla sökande synliga, badge "Fick omgång N" på dem som tidigare fått erbjudande (men fortsatt valbara).
  - Bekräftelse går via befintlig `SendHousingOfferDialog` → `startNewRound(...)`.

### `HousingApplicantsTable`
- Stödjer redan det mesta. Säkerställ att `previousRoundByApplicant`-prop finns och att "Fick omgång N"-badge visas i urvalsläge utan att blockera checkbox.

## Kontraktsläge & historik
- Oförändrat: `kontrakt`-fliken visar de som tackat ja (över alla rondar).
- `historik`-läget oförändrat (read-only).

## Filer som ändras

- `src/shared/contexts/HousingOffersContext.tsx` — refaktor till rounds-modell + nya metoder, härledd `offers` för bakåtkompatibilitet.
- `src/pages/rentals/utils/housingOfferUtils.ts` — ny fil (status + tab-label).
- `src/features/rentals/hooks/useHousingStatus.ts` — använd ny utility.
- `src/pages/rentals/HousingDetailPage.tsx` — tab-navigering, urvalsläge, "Starta ny omgång"-flöde.
- `src/pages/rentals/components/HousingHeader.tsx` — nya primärknappar + chip.
- `src/pages/rentals/components/HousingApplicantsTable.tsx` — säkerställ `previousRoundByApplicant`-stöd och "Fick omgång N"-badge.
- `mem://features/rentals/housing-offer-rounds.md` — återskapa memory-filen som indexet redan refererar till.

## Avgränsningar (out of scope)

- Inga ändringar i bilplats- eller förrådsflödet.
- Inga automatiska påminnelser, ingen automatisk förlängning av svarstid.
- Inga nya förbättringar utöver den ursprungliga implementationen (de 8 förslagen från 27 april #5830 hålls för en separat iteration).
- `HousingOffer`-typen i sin gamla form behålls inte — komponenter som läser från `offers` gör det via den deriverade arrayen.
