## Mål
Byt kolumnetikett från "Önskad avflyttning" till **"Ev. tillgänglig"** för att matcha formulärfältet "Eventuellt tillgänglig från" (datum då sittande hyresgäst ev. flyttar tidigare).

## Ändringar
Byt `label: "Önskad avflyttning"` → `label: "Ev. tillgänglig"` i sex tabellkomponenter:

- `src/features/rentals/components/UnpublishedHousingTable.tsx`
- `src/features/rentals/components/ReadyForOfferHousingTable.tsx`
- `src/features/rentals/components/PublishedHousingTable.tsx`
- `src/features/rentals/components/OfferedHousingTable.tsx`
- `src/features/rentals/components/ContractHousingTable.tsx`
- `src/features/rentals/components/HistoryHousingTable.tsx`

Ingen ändring av datafält (`preferredMoveOutDate` behålls som teknisk nyckel) eller formulärlabels.

## Påverkan
Endast presentationsändring. Inga datamodeller, hooks eller business-logik berörs.
