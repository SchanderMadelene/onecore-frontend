
# Plan: Förbättringar #1, #2 och #4 för erbjudandeomgångar

## #1 Smartare förval i ny omgång

Idag förvaljs ingenting när handläggaren startar omgång 2+. Lägg till automatiskt förval av top-N sökande baserat på köpoäng som **inte** redan har ett aktivt erbjudande och **inte** har tackat nej i tidigare omgång. Handläggaren kan justera fritt.

**Var:** `HousingApplicantsTable.tsx` — utöka `autoSelectTopApplicants`-logiken så den även exkluderar sökande med aktivt erbjudande (`activeRoundByApplicant`) och sökande som tackat nej tidigare. När detta gäller en ny omgång (omgång 2+), välj top 5 istället för top 10.

**Var:** `HousingDetailPage.tsx` — sätt `autoSelectTopApplicants={true}` även på `renderNewRoundSelectionView`, och skicka in info om vilka som tackat nej i tidigare omgångar (ny prop `declinedInPreviousRoundIds`).

## #2 Sammanfattning per omgång

Lägg till en kompakt statusrad överst i varje omgång-tab som visar:
```text
Skickat 15 apr · Går ut 22 apr (om 3 dagar)
10 sökande · 1 ja · 1 nej · 8 väntar
```

För avbruten/utgången/accepterad omgång visas relevant variant (t.ex. "Avbruten" / "Accepterad av Anna Andersson").

**Var:** Ny komponent `RoundSummaryBar.tsx` i `src/pages/rentals/components/`. Beräknar svar från `round.responses` + `round.selectedApplicants.length`. Använder `date-fns` för relativa datum (`formatDistanceToNow` med `sv` locale).

**Var:** `HousingDetailPage.tsx` — rendera `<RoundSummaryBar round={r} />` precis ovanför tabellen i varje `TabsContent`, och även "Avbryt denna omgång"-knappen flyttas in i denna rad till höger för bättre layout.

## #4 Bekräftelsedialog kontextualiserar omgångsnummer

`SendHousingOfferDialog` ska visa vilken omgång som skapas, och om det finns parallella aktiva omgångar.

**Var:** `SendHousingOfferDialog.tsx` — ny prop `roundNumber: number` och `parallelActiveRounds?: number`. `DialogTitle` blir t.ex. "Skicka erbjudande för omgång 2". `DialogDescription` utökas med en notering: *"Omgång 1 är fortfarande aktiv parallellt — sökande där påverkas inte."* när `parallelActiveRounds > 0`.

**Var:** `HousingDetailPage.tsx` — skicka in `roundNumber={rounds.length + 1}` och `parallelActiveRounds={activeRounds.length}` till dialogen.

## Tekniska detaljer

- Inga ändringar i datamodellen (`HousingOfferRound` räcker).
- Inga ändringar i `HousingOffersContext`.
- Allt är ren UI-logik på toppen av befintlig state.
- Använder befintliga shadcn-komponenter (Badge, Card-stil) och semantiska färger från designsystemet.
- Mobilresponsivt: `RoundSummaryBar` använder flex-wrap.

## Filer som kommer ändras

- `src/pages/rentals/components/HousingApplicantsTable.tsx` (smartare förval)
- `src/pages/rentals/components/RoundSummaryBar.tsx` (NY)
- `src/pages/rentals/HousingDetailPage.tsx` (binda ihop allt)
- `src/features/rentals/components/SendHousingOfferDialog.tsx` (kontextuell titel)
