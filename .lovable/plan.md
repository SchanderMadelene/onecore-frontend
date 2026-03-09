

## Sökbar multiselect — inline dropdown (Popover)

### Komponent: `src/shared/ui/searchable-multi-select.tsx`

Bygger på **Popover + Command** (samma mönster som `FilterContent`) — inte Dialog/modal.

- **Trigger**: `PopoverTrigger` med `Button variant="outline"`, visar valda som Badge-chips (max 2 + "+N till"), eller placeholder
- **Dropdown**: `PopoverContent` med `Command` inuti — `CommandInput` för sökning, `CommandList` med checkmarks för toggle
- Klick på alternativ togglear val utan att stänga dropdown
- "Rensa alla"-länk vid aktiva val
- `w-full sm:w-[280px]` på triggern

### Demo i `FilterSearchShowcase.tsx`

Nytt demo-kort "Sökbar multiselect" med 10-15 exempeladresser (Kopparbergsvägen 1, Sigurdsgatan 25, etc). Placeras före det sammansatta mönstret.

### Filer

1. **Ny** `src/shared/ui/searchable-multi-select.tsx`
2. **Uppdatera** `src/shared/design-system/FilterSearchShowcase.tsx` — lägg till demo

