## Mål
Ta bort badgen "Klar för tilldelning" / "Väntar svar" från Erbjudna-fliken. Svarskolumnerna (Tackat ja / Tackat nej / Väntar) räcker som information per rad.

## Ändringar

**`src/features/rentals/components/OfferedHousingTable.tsx`**
- Desktop-tabellen: ta bort badge-renderingen på rad ~62–68 (cellen som visar "Klar för tilldelning" eller inget).
- Mobilkortet: ta bort badge-renderingen på rad ~119–125 (visade antingen "Klar för tilldelning" eller "Väntar svar").
- Rensa oanvända imports (`Badge`) och hjälp-anrop (`aggregateFor`) om de blir oanvända efter borttagningen — annars behåll.

## Påverkan
- Inga andra filer berörs.
- Ingen ändring av domänlogik eller status-härledning.
- Signalen om vilka annonser som är redo för tilldelning kommer i Step 3 via knappar/actions, inte via badges.
