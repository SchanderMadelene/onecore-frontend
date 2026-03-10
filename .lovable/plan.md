

## Plan: Konsolidera datumkomponenter

### Nuläge
- **DateRangeFilter** — delad komponent i `shared/common/`, används på 3 ställen (LeaseContracts, Invoices, designsystem)
- **Inline Calendar+Popover** — samma mönster copy-pastat på 5 ställen utan delad komponent:
  - `StudentTurnoverFilters.tsx` (×2)
  - `orders/form/DateSelectionSection.tsx` (×2)
  - `orders/form-rhf/DateSelectionSection.tsx` (×2)
  - `CleaningEditDialog.tsx` (×1)
- **DateCell** — specialiserad datum+tid för besiktningar, behålls separat

### Steg 1: Skapa `DatePicker` i `src/shared/common/`
En enkel, återanvändbar single-date-komponent som wrappar Calendar+Popover-mönstret:

```text
Props:
  - value: Date | undefined
  - onChange: (date: Date | undefined) => void
  - placeholder?: string (default "Välj datum...")
  - format?: string (default "yyyy-MM-dd")
  - locale?: Locale
  - disabled?: boolean | ((date: Date) => boolean)
  - className?: string
```

### Steg 2: Refaktorera alla inline-användningar
Ersätt de 7 inline Calendar+Popover-instanserna med `<DatePicker />`:
- `StudentTurnoverFilters.tsx` — 2 st
- `orders/form/DateSelectionSection.tsx` — 2 st
- `orders/form-rhf/DateSelectionSection.tsx` — 2 st (med FormControl-wrapper)
- `CleaningEditDialog.tsx` — 1 st

### Steg 3: Uppdatera designsystemet
I `FilterSearchShowcase.tsx`:
- Slå ihop **DateRangeFilter** och **Datumfältsväljare** till en gemensam sektion med underrubriker (variant utan/med fältsväljare)
- Lägg till en ny demo-sektion för **DatePicker** (single date)

### Påverkan
- 4 feature-filer förenklas
- 1 ny delad komponent (`DatePicker`)
- Designsystemet får tydligare struktur med färre, men bättre dokumenterade datumkomponenter

