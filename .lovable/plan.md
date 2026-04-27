## Manuella erbjudandeomgångar för bostad

Bostadsuthyrning skiljer sig från bilplats: omgångar startas **manuellt** av handläggaren, inte automatiskt. En ny omgång startas typiskt när alla i föregående omgång nekat eller ingen uppfyllde kraven. Vi återanvänder visuella mönstret från bilplats (tabbar "Omgång 1/2/3"), men logiken bakom är manuell.

### Affärsregler

- En bostadsannons kan ha **flera omgångar** (`offers[]`), inte bara en
- Endast **en omgång aktiv åt gången** — handläggaren kan inte starta omgång 2 medan omgång 1 fortfarande har sökande som väntar på svar
- Handläggaren kan **manuellt avbryta** en pågående omgång (t.ex. om alla utvalda är otillgängliga) för att starta en ny
- Vid val av sökande till ny omgång visas **alla återstående sökande i samma lista**, men de som **redan fått erbjudande tidigare markeras visuellt** (badge/indikator) så handläggaren ser det. De är fortfarande valbara.
- Statusar för omgång: `Active` | `AllDeclined` | `Expired` | `Cancelled` | `Accepted`

### UI-flöde

1. **Innan första omgången** (status `Klar för erbjudande`): tabell med checkboxar, topp-10 förvalda → "Skicka erbjudande" → omgång 1 skapas
2. **Pågående omgång** (status `Erbjudande pågår – omgång N`): Tabbar visar omgångarna. Aktiv tab visar de utvalda + deras svar. Knapp "Avbryt omgång" tillgänglig.
3. **Efter avslutad omgång utan vinnare** (status `Klar för ny omgång`): "Starta ny omgång"-knapp aktiveras. Klick öppnar urvalsläget igen (samma `HousingApplicantsTable` med checkboxar).
4. **Vid accepterat erbjudande** (status `Tilldelad`): övergång till kontraktsläge (befintlig flik).

### Headerstatus

Utöka `getHousingStatus` (eller lägg till `getOfferRoundStatus`):
- `Publicerad` — ingen omgång startad, period pågår
- `Klar för erbjudande` — period slut, ingen omgång startad
- `Erbjudande pågår — omgång N` — aktiv omgång finns, väntar svar
- `Klar för ny omgång` — senaste omgång `AllDeclined`/`Expired`/`Cancelled`
- `Tilldelad` — någon har tackat ja
- `Historik` — avslutad/kontrakterad

### Datamodelländringar

`HousingOffersContext.tsx`:
```ts
interface HousingOfferRound {
  id: number;
  roundNumber: number;
  selectedApplicants: number[];
  sentAt: string;
  status: 'Active' | 'AllDeclined' | 'Expired' | 'Cancelled' | 'Accepted';
  expiresAt: string;
  responses: Array<{ applicantId: number; response: 'accepted' | 'declined'; respondedAt: string }>;
}

// Per listing: HousingOfferRound[] istället för en HousingOffer
offersByListing: Record<string, HousingOfferRound[]>;
```

Nya metoder:
- `getRoundsForListing(listingId): HousingOfferRound[]`
- `getActiveRound(listingId): HousingOfferRound | undefined`
- `canStartNewRound(listingId): boolean` (true om ingen aktiv omgång)
- `startNewRound(listingId, selectedApplicants[])`
- `cancelActiveRound(listingId)`
- `getApplicantsWhoReceivedOffer(listingId): Set<number>` (för att flagga i tabellen)

Behåll `createOffer` som backwards-kompatibel wrapper som anropar `startNewRound`.

### Filer som ändras

**Datalager:**
- `src/shared/contexts/HousingOffersContext.tsx` — ändra `HousingOffer` → `HousingOfferRound[]`, lägg till nya metoder
- `src/features/rentals/hooks/useHousingStatus.ts` — utöka statusar med `cancelled`/`all_declined`/`assigned`

**UI:**
- `src/pages/rentals/HousingDetailPage.tsx` — ersätt single-offer-rendering med `Tabs`-mönster (kopiera från `ParkingSpaceDetailPage`), hantera "Starta ny omgång" och "Avbryt omgång"
- `src/pages/rentals/components/HousingHeader.tsx` — visa `Omgång N`-badge i statusen, knapp "Starta ny omgång" / "Avbryt omgång" beroende på state
- `src/pages/rentals/components/HousingApplicantsTable.tsx` — lägg till visuell markering (badge "Erbjudande omgång 1") på sökande som fått tidigare erbjudande, så handläggaren ser det vid urval till ny omgång

**Utility (ny):**
- `src/pages/rentals/utils/housingOfferUtils.ts` — `getHousingOfferStatus(rounds)` (analogt med `parkingSpaceUtils.ts`)

### Mockdata

Uppdatera befintlig `MOCK_OFFERS` i `HousingOffersContext` så att minst en bostad har **flera omgångar** för att kunna demonstrera tabbarna direkt:
- En annons med omgång 1 (alla nekade) + omgång 2 (aktiv)
- En annons med omgång 1 (avbruten) + omgång 2 (en accepterat)
- En annons med endast omgång 1 (pågående)

### Vad som INTE ändras nu

- `SendHousingOfferDialog` — befintlig dialog återanvänds som-är för bekräftelse
- `HousingApplicantsTable` selection-logik (auto-select topp-10) — fungerar som idag, även för omgång 2+
- Kontraktskoppling (linkContract) — orört
- Bilplatsens flöde — orört

### Acceptanskriterier

1. Bostadsannons utan omgångar visar sökandelistan med checkboxar (som idag)
2. Efter "Skicka erbjudande" skapas omgång 1, tabbar dyker upp, knappen "Skicka erbjudande" försvinner
3. Header visar "Erbjudande pågår — omgång 1"
4. Om alla i omgång 1 nekar → status "Klar för ny omgång", knapp "Starta ny omgång" aktiveras
5. Klick på "Starta ny omgång" → samma sökandelista visas, men de från omgång 1 är märkta med badge ("Fick omgång 1") och fortfarande valbara
6. Knapp "Avbryt omgång" finns på aktiv omgång; bekräftelsedialog → omgång markeras `Cancelled`, ny omgång kan startas
7. Tabbar "Omgång 1, Omgång 2..." fungerar identiskt med bilplats
8. När någon tackat ja → header byter till "Tilldelad", inga fler omgångar kan startas
