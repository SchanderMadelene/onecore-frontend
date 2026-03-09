

## Plan: Inbyggt filterstöd i ResponsiveTable

### Idé

Istället för att `FilterableTableHead` är en separat komponent som kopplas via `headerRender`, byggs filtrering in direkt i `ResponsiveTableColumn`-interfacet. Varje kolumn som har `filterOptions` får automatiskt en filterikon i headern.

### Nytt kolumn-API

```typescript
interface ResponsiveTableColumn {
  key: string;
  label: string;
  render: (item: any) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
  headerRender?: () => ReactNode;       // behålls för andra custom headers
  // NYA props:
  filterOptions?: string[];             // aktiverar filter på kolumnen
  filterValue?: string;                 // aktuellt filtervärde
  onFilter?: (value: string) => void;   // callback vid filterändring
  filterPlaceholder?: string;           // placeholder i sökfältet
}
```

### Ändringar

1. **`responsive-table.tsx`** — Importera `FilterContent` från `FilterableTableHead`. I header-renderingen: om kolumnen har `filterOptions`, wrappa labeln i `FilterContent` automatiskt. Prioritetsordning: `headerRender` > `filterOptions` > plain label.

2. **Flytta `FilterContent`** från `features/rentals/` till `shared/ui/` (eller exportera den) så att `ResponsiveTable` kan använda den utan att importera från en feature-mapp.

3. **Uppdatera befintliga tabeller** (PublishedParkingTab, ReadyForOfferTab) — ta bort `headerRender` + `FilterableTableHead inline`, använd istället de nya kolumn-propsen direkt.

4. **Showcase** — Lägg till en demo "Table / Filterable" i `ResponsiveShowcase.tsx` som visar en `ResponsiveTable` med `filterOptions` på en kolumn, med generisk mockdata.

### Filstruktur

- `FilterableTableHead.tsx` behålls i `features/rentals/` för bakåtkompatibilitet men `FilterContent` exporteras även från `shared/ui/` (eller flyttas dit helt)
- Alternativt: flytta hela filterlogiken till `responsive-table.tsx` internt, så att det inte behövs någon extern import alls

### Avgränsning

- `headerRender` behålls för andra custom headers (t.ex. ikoner, tooltips)
- Filterstöd gäller bara desktop-tabellvyn (på mobil visas kort utan kolumnheaders)

