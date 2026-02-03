

# Plan: Kolumnväljare för Förvaltningsområden

## Sammanfattning
Lägg till en knapp "Kolumner" som öppnar en dropdown där användaren kan bocka i/av vilka kolumner som ska visas i tabellen. Detta gör det möjligt att visa all detaljerad information (lokaler, garage, p-platser, ytor etc.) utan att tabellen alltid är överfull.

## Hur det fungerar

**Knapp i filter-raden:** En knapp med ikon (Settings2 eller Columns) och texten "Kolumner"

**Dropdown med checkboxar:** När man klickar öppnas en lista med alla tillgängliga kolumner:
- K-ställe ✓ (alltid på, kan inte stängas av)
- Kvartersvärd ✓
- Ref.nr
- Fastighet ✓
- Adress ✓
- Typ
- Antal bostäder ✓
- Antal lokaler
- Antal garage
- Antal p-platser
- Yta bostad
- Yta lokal
- Yta garage
- Trappuppgångar

**Standardkolumner (de som visas från början):**
- K-ställe, Kvartersvärd, Fastighet, Adress, Typ, Bostäder, Yta

**Sparas inte mellan sessioner** (kan läggas till senare med localStorage om önskat)

## Teknisk implementation

### Ändringar

**1. PropertyAreasPage.tsx**
- Lägg till state: `visibleColumns: string[]` med standardvärden
- Lägg till "Kolumner"-knapp i filter-raden
- Skicka `visibleColumns` som prop till `PropertyAreasTable`

**2. PropertyAreasTable.tsx**
- Ta emot `visibleColumns` prop
- Definiera alla möjliga kolumner (inte bara de som visas nu)
- Filtrera kolumnerna baserat på `visibleColumns`

**3. Ny komponent: ColumnSelector.tsx** (i features/property-areas/components/)
- Dropdown med checkboxar för varje kolumn
- Props: `columns`, `visibleColumns`, `onVisibilityChange`

### Alla kolumner som blir valbara

| Kolumn-key | Label | Standard |
|------------|-------|----------|
| costCenter | K-ställe | ✓ (låst) |
| stewardName | Kvartersvärd | ✓ |
| stewardRefNr | Ref.nr | |
| propertyName | Fastighet | ✓ |
| address | Adress | ✓ |
| buildingType | Typ | ✓ |
| residenceCount | Antal bostäder | ✓ |
| commercialCount | Antal lokaler | |
| garageCount | Antal garage | |
| parkingCount | Antal p-platser | |
| otherCount | Antal övrigt | |
| residenceArea | Yta bostad | ✓ |
| commercialArea | Yta lokal | |
| garageArea | Yta garage | |
| entranceCount | Trappuppgångar | |

### Kodexempel

```tsx
// State i PropertyAreasPage
const [visibleColumns, setVisibleColumns] = useState<string[]>([
  "costCenter", "stewardName", "propertyName", "address", 
  "buildingType", "residenceCount", "residenceArea"
]);

// Kolumnväljare i filter-raden
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" size="sm" className="gap-2">
      <Settings2 className="h-4 w-4" />
      Kolumner
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>Visa kolumner</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {ALL_COLUMNS.map(col => (
      <DropdownMenuCheckboxItem
        key={col.key}
        checked={visibleColumns.includes(col.key)}
        onCheckedChange={(checked) => toggleColumn(col.key, checked)}
        disabled={col.key === "costCenter"} // Kan inte stänga av
      >
        {col.label}
      </DropdownMenuCheckboxItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>
```

## Filer som ändras

| Fil | Ändring |
|-----|---------|
| `src/features/property-areas/components/PropertyAreasTable.tsx` | Ta emot `visibleColumns` prop, definiera alla kolumner, filtrera |
| `src/pages/property-areas/PropertyAreasPage.tsx` | Lägg till state och kolumnväljare-dropdown |

## UI-placering

Kolumnväljaren placeras i filterraden, till vänster om Export-knappen:

```text
[Kostnadställe ▼] [Kvartersvärd ▼] [Byggnadstyp ▼] [Rensa]  [Kolumner ▼] [Exportera]
```

## Mobilvy

På mobil döljs kolumnväljaren eftersom mobilkortet alltid visar samma information (den anpassade mobilkortvyn påverkas inte).

