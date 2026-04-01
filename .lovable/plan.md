

## Plan: Ta bort statusbadges från "Behov av publicering"

### Vad ändras

Ta bort status-kolumnen, `getStatusBadge`-funktionen och Badge-importen från `UnpublishedHousingTable.tsx`. Ta även bort statusbadgen från mobilkortet och visa hyra direkt istället.

### Ändringar

**`src/features/rentals/components/UnpublishedHousingTable.tsx`**
- Ta bort `Badge`-import och `getStatusBadge`-funktionen (rad 2, 10-21)
- Ta bort status-kolumnen från `columns` (rad 32)
- I mobilkortet: ta bort `getStatusBadge(space.status)` och visa bara hyra (rad 59-61)

Ingen ändring av typer eller data i detta steg — bara rensning av badges från UI:t.

