

## Plan: Primär publicera-knapp + dropdown för övriga åtgärder

### Vad ändras

Varje rad i "Behov av publicering" får en tydlig primär "Publicera"-knapp och en `MoreHorizontal`-ikonknapp som öppnar en dropdown med resterande åtgärder (Visa, Redigera, Ta bort).

### Ändringar

**`src/features/rentals/components/UnpublishedHousingTable.tsx`**

Desktop actions-kolumn:
- Primär `Button` (variant="default", size="sm") med Send-ikon + texten "Publicera"
- `DropdownMenu` med `MoreHorizontal`-trigger (variant="outline", size="sm") innehållande:
  - Visa (Eye-ikon)
  - Redigera (Pencil-ikon) — öppnar `EditHousingDialog`
  - Separator
  - Ta bort (Trash2-ikon, destructive styling)

Mobilkort: samma mönster — primär publicera-knapp + dropdown.

### Tekniska detaljer

- Importerar `DropdownMenu`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuTrigger` från `@/components/ui/dropdown-menu`
- Importerar `MoreHorizontal` från `lucide-react`
- Alla dropdown-triggers använder `variant="outline"` per standard
- `e.stopPropagation()` på triggers och items för att inte trigga `onRowClick`

