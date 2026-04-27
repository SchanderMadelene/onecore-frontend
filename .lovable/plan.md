## Mål

Ändra logiken så att **"Starta ny erbjudandeomgång"** är en additiv åtgärd som **inte avbryter** pågående omgångar. Flera omgångar kan vara aktiva samtidigt. "Avbryt omgång" finns kvar som separat sekundär åtgärd per omgång.

---

## Ändringar i flödet

### Före
- Max **en aktiv omgång** åt gången.
- Knappen "Starta ny omgång" visades **endast** när föregående omgång var klar (alla nekat / utgått / avbruten).
- "Avbryt omgång" var en förutsättning för att kunna starta en ny medan en pågick.

### Efter
- **Flera aktiva omgångar** tillåts samtidigt.
- "Starta ny erbjudandeomgång" är **alltid tillgänglig** så länge ingen omgång har status `Accepted` (annonsen är tilldelad).
- Pågående omgångar fortsätter löpa parallellt — sökande kan fortfarande svara.
- "Avbryt omgång" finns kvar som **sekundär action per omgång** (visas inne i respektive omgångs tab, inte i page-headern).

---

## UI-ändringar

### `HousingHeader.tsx`
- Byt huvudknappens text från "Starta ny omgång" → **"Starta ny erbjudandeomgång"**.
- Ta bort "Avbryt omgång"-knappen från headern (flyttas till tab-nivå).
- Visa knappen så snart `rounds.length > 0` och annonsen inte är `Accepted` (inte längre beroende av `canStartNewRound`).
- Statusbadge i headern:
  - Om exakt **1 aktiv omgång** → "Erbjudande pågår — omgång N" (som idag).
  - Om **flera aktiva omgångar** → "Erbjudande pågår — N omgångar aktiva".
  - Om alla aktiva är klara/nekade → "Klar för ny omgång".

### `HousingDetailPage.tsx`
- Inne i varje omgångs `TabsContent` (när omgången har status `Active`): visa en diskret sekundärknapp **"Avbryt denna omgång"** högst upp till höger som öppnar `ConfirmDialog`.
- Bekräftelsedialogen blir per omgång (inte global): "Avbryt omgång N? Sökande i denna omgång kommer inte längre kunna svara. Övriga aktiva omgångar påverkas inte."

### `HousingApplicantsTable.tsx` — badges för urvalsläge
- Behåll "Fick omgång N"-badge för avslutade omgångar.
- Lägg till variant **"Aktivt erbjudande i omgång N"** (annan färg) när sökanden har ett aktivt, ej besvarat erbjudande från en annan omgång — så handläggaren ser att personen redan blivit tillfrågad och fortfarande kan svara.

---

## Logik-ändringar (`HousingOffersContext.tsx`)

- `canStartNewRound(listingId)`: returnerar `true` om ingen omgång har status `Accepted` (oavsett om det finns aktiva omgångar).
- `cancelActiveRound(listingId)` → byt namn till **`cancelRound(listingId, roundId)`** (avbryter en specifik omgång, inte "den aktiva").
- `getActiveRound` (singular) → komplettera med **`getActiveRounds`** (plural) för header-statuslogik.
- `startNewRound`: oförändrad — skapar en ny omgång utan att röra befintliga.

### `housingOfferUtils.ts`
- `getHousingOfferStatus(rounds)` uppdateras:
  - Räkna antal omgångar med status `Active`.
  - 1 aktiv → `{ status: "Erbjudande pågår", roundNumber: N }`.
  - 2+ aktiva → `{ status: "Erbjudande pågår", activeCount: M, roundNumber: undefined }` (header byter format).
  - 0 aktiva, ingen accepterad → `"Klar för ny omgång"`.
  - Någon `Accepted` → `"Tilldelad"`.

### `useHousingStatus.ts`
- Återspegla samma logik så att tab-fördelning på listsidan fungerar.

---

## Mock-data
- Uppdatera `MOCK_ROUNDS` så minst en annons har **två parallella aktiva omgångar** för att verifiera UI:t.

---

## Memory
- Uppdatera `mem://features/rentals/housing-offer-rounds.md` med de nya reglerna:
  - Flera aktiva omgångar tillåts.
  - "Starta ny" avbryter inte föregående.
  - "Avbryt" lever per omgång på tab-nivå.

---

## Filer som påverkas
- `src/shared/contexts/HousingOffersContext.tsx`
- `src/pages/rentals/utils/housingOfferUtils.ts`
- `src/pages/rentals/HousingDetailPage.tsx`
- `src/pages/rentals/components/HousingHeader.tsx`
- `src/pages/rentals/components/HousingApplicantsTable.tsx`
- `src/features/rentals/hooks/useHousingStatus.ts`
- `mem://features/rentals/housing-offer-rounds.md`