

## Plan: Återanvänd bilplatsens erbjudande-mönster för bostadsuthyrning

### Problem
Bostadssidan har en egen lösning för erbjudandesvar (inline Ja/Nej-knappar + `HousingOffersContext.setOfferResponse`) medan bilplatssidan redan har ett etablerat mönster med:
- **`OfferActions`** — dropdown-meny med "Tacka ja"/"Tacka nej" + `ConfirmDialog`
- **`useAcceptOffer` / `useDenyOffer`** — React Query mutations i `useOfferActions.ts`
- **`ConfirmDialog`** — delad komponent i `shared/common`

### Vad ändras

**1. `HousingApplicantsTable.tsx`**
- Ta bort inline Ja/Nej-knapparna i "Svar på erbjudande"-kolumnen
- Återanvänd `OfferActions`-komponenten i åtgärdskolumnen för sökande med status "Väntar på svar" (de som har ett aktivt erbjudande men inte svarat)
- Behåll `CreateContractDialog` för sökande med accepterat svar
- Ta bort `Check`/`X`-ikoner och relaterad inline-logik

**2. `HousingOffersContext.tsx`**
- Ta bort `setOfferResponse`, `getOfferResponseOverride` och `offerResponseOverrides` — denna logik hanteras bättre via React Query mutations som bilplatssidan gör
- Behåll `markApplicantAssigned` och `isApplicantAssigned` (kontraktskoppling)

**3. `useOfferActions.ts`**
- Mutations är redan generiska (tar `offerId` + `listingId`) — kan användas direkt av bostadssidan utan ändringar. Query key invalidering behöver ev. utökas till att även invalidera housing-listings.

### Resultat
- Samma UX-mönster: dropdown → bekräftelsedialog → toast
- Samma hooks och komponenter återanvänds
- Mindre kod, enklare underhåll

### Filer som ändras
- `src/pages/rentals/components/HousingApplicantsTable.tsx` — byt till `OfferActions`
- `src/shared/contexts/HousingOffersContext.tsx` — rensa bort offer response-logik

