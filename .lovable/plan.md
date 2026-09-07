## Mål
Byta objektstypen för alla poängfria bostadsannonser så att den visas som "Poängfri" i stället för "Lägenhet", "Tvåa" eller "Korridorrum".

## Var
- `src/features/rentals/data/poangfri-housing.ts` – mockdatan för poängfria annonser.
- `src/pages/rentals/PoangfriHousingDetailPage.tsx` – detaljvyn som renderar `listing.type` i sidhuvudet och skickar vidare till `HousingInfo`.

## Vad
1. Ändra fältet `type` på varje `PoangfriListing` i `poangfri-housing.ts` till `"Poängfri"`.
2. Låta övriga fält (address, area, rooms, size, floor, rent) vara oförändrade så informationen om antal rum och yta fortfarande syns.
3. Verifiera att sidhuvudet och `HousingInfo` visar "Poängfri" utan att layout eller andra värden påverkas negativt.

## Påverkade filer
- `src/features/rentals/data/poangfri-housing.ts`
- `src/pages/rentals/PoangfriHousingDetailPage.tsx` (endast visuell kontroll, ingen kodändring planerad)
