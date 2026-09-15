# Varför "Tidigarelägg avpublicering" är avstängd

## Orsak

Åtgärden är avstängd när annonsen visar 0 sökande.

Listan "Publicerat nu" hämtar sina annonser från den uppdaterade listan där nypublicerade annonser får sökande. Detaljsidan för en annons gör inte det — den läser fortfarande ursprungsdatan, där annonsen du testar med (Skomakargatan/234-234-234-0201) har 0 sökande. Därför ser detaljsidan annonsen som tom och stänger av knappen, trots att listan visar sökande.

## Åtgärd

Låt detaljsidan använda samma uppdaterade annonsdata som listan, så att en nyss publicerad annons får rätt uppgifter: sökandeantal, publiceringsperiod och att den räknas som publicerad.

Effekt:
- "Tidigarelägg avpublicering" blir klickbar på nypublicerade annonser.
- Antal sökande på detaljsidan stämmer med listan.
- Status/etikett högst upp på detaljsidan visar "Publicerat nu" i stället för publiceringsläget.

## Teknisk detalj

`src/features/rentals/hooks/useHousingListing.ts` slår upp id:t i de statiska arrayerna `publishedHousingSpaces`, `unpublishedHousingSpaces` och `historyHousingSpaces`. Nypublicerade annonser ligger i `publishedExtra` i `src/features/rentals/data/unpublished-housing-store.ts` och nås bara via `usePublishedSpaces()`.

Ändring: låt hooken läsa den publicerade snapshoten från storen (nytt icke-reaktivt getter, t.ex. `getPublishedSpaces()`) före de statiska listorna, och lägg storens publiceringsläge i react-query-nyckeln så att detaljsidan uppdateras efter publicering. Inga ändringar i `HousingRowActions` — spärren `disabled: seekers === 0` behålls som den är.
