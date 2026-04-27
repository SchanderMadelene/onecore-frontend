## Problem

I sökandetabellen för en omgång visas Oskar Lundgren som nedtonad/disabled, trots att han ingår i omgång 2. Orsaken är att `hasPreviousOffer`-logiken i `HousingApplicantsTable` enbart kollar om sökanden finns i `previousRoundByApplicant` — den tar inte hänsyn till om sökanden också har ett erbjudande i den omgång som visas just nu.

En sökande som var med i omgång 1 OCH även är med i omgång 2 hamnar därför som "previous" och blir nedtonad i omgång 2:s tabell, fastän raden borde vara fullt aktiv.

## Lösning

Uppdatera `HousingApplicantsTable.tsx` så att `hasPreviousOffer` även exkluderar sökande som har ett erbjudande i den aktuella omgången (`offeredApplicantIds`).

```ts
const isOfferedThisRound = offeredApplicantIds.includes(applicant.id);
const hasPreviousOffer =
  !hasActiveOfferInRound &&
  !isOfferedThisRound &&
  previousRoundByApplicant?.[applicant.id] !== undefined;
```

Resultat:
- Omgång 2-tabellen: Oskar (med i både omgång 1 och 2) visas som vanlig rad överst med sitt "Väntar"-svar.
- Sökande som bara var med i omgång 1 (och inte 2) fortsätter vara nedtonade med "Nej · från omgång 1".

Inga andra ändringar behövs.

## Filer

- `src/pages/rentals/components/HousingApplicantsTable.tsx`
