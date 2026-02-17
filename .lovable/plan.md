

# Kombinerad vy for Ut- och inflytt

## Sammanfattning

Ersatt de tva separata tabellerna (MoveOutSection + MoveInSection) med en enda kombinerad tabell dar varje rad representerar en bostad. Raden visar bade den utflyttande och inflyttande hyresgasten, med respektive checklistor. Bostader som bara har utflytt eller bara inflytt visas ocksa, med tom kolumn for den saknade parten.

## Datamodell

**Ny typ: `TurnoverRow`**

Varje rad matchas pa `address + residenceCode`. Resultat:

```text
+----------+--------------------+--------------+--------------------+-----------+
| Uppgang  | Utflyttande        | Stadkontroll | Inflyttande        | Samtal ...|
+----------+--------------------+--------------+--------------------+-----------+
| Vallj 12 | Lindberg Maria     |    [x]       | Khalil Mohammed    |  [x]  ... |
| Karla 5  | Westin Tomas       |    [ ]       | Al Hendi Sara      |  [x]  ... |
| Rubingat | Axelsson Andre     |    [x]       | —                  |   —       |
+----------+--------------------+--------------+--------------------+-----------+
```

## Steg

### 1. Ny typ `TurnoverRow` i `move-in-list-types.ts`

```typescript
export interface TurnoverRow {
  residenceKey: string; // address + residenceCode
  address: string;
  residenceCode: string;
  kvvArea: string;
  apartmentType: string;
  moveOut?: MoveInListEntry;
  moveIn?: MoveInListEntry;
}
```

### 2. Uppdatera `useMoveInList.ts`

Lagg till en `combinedEntries`-lista som:
- Grupperar filtrerade entries pa `address + residenceCode`
- Skapar en `TurnoverRow` per unik bostad
- Sorterar pa utflyttdatum (tidigast forst)

Exportera `combinedEntries` utover befintliga `moveOutEntries` / `moveInEntries` (behall for bakatkompatibilitet).

### 3. Ny komponent `CombinedTurnoverTable.tsx`

En enda tabell med kolumner:

**Desktop-kolumner:**
| Kolumn | Innehall |
|--------|----------|
| Uppgang | address |
| Typ | apartmentType |
| Utflyttande | tenantName + telefon |
| Sista deb. | utflyttdatum |
| Stadkontroll | checkbox |
| Inflyttande | tenantName + telefon |
| Kontraktstid | inflyttdatum |
| Samtal | checkbox |
| Besok | checkbox |
| Namn/Port | checkbox |

**Mobil:** MobileAccordion-kort per bostad med bade ut- och inflyttinfo grupperat.

### 4. Uppdatera `TurnoverPage.tsx`

Ersatt `<MoveOutSection>` + `<MoveInSection>` med `<CombinedTurnoverTable>`.

### 5. Behall gamla komponenter

`MoveOutSection` och `MoveInSection` tas inte bort, men anvands inte langre fran TurnoverPage. De kan finnas kvar for eventuell ateranvandning.

---

## Tekniska detaljer

**Matchningslogik i hooken:**
```typescript
const combinedEntries = useMemo(() => {
  const map = new Map<string, TurnoverRow>();
  filteredEntries.forEach(entry => {
    const key = `${entry.address}|${entry.residenceCode}`;
    if (!map.has(key)) {
      map.set(key, {
        residenceKey: key,
        address: entry.address,
        residenceCode: entry.residenceCode,
        kvvArea: entry.kvvArea,
        apartmentType: entry.apartmentType,
      });
    }
    const row = map.get(key)!;
    if (entry.type === 'move_out') row.moveOut = entry;
    else row.moveIn = entry;
  });
  return [...map.values()].sort(/*...*/);
}, [filteredEntries]);
```

**Visuell separering i tabellen:**
- Utflyttkolumner far en subtil rosatonad bakgrund
- Inflyttkolumner far en subtil grontonad bakgrund
- Tomma celler visar ett streck (–)

**Filer som andras:**
- `src/features/turnover/types/move-in-list-types.ts` — ny typ
- `src/features/turnover/hooks/useMoveInList.ts` — ny kombinerad lista
- `src/features/turnover/components/CombinedTurnoverTable.tsx` — ny komponent
- `src/pages/turnover/TurnoverPage.tsx` — byt till kombinerad vy
- `src/features/turnover/index.ts` — exportera nya delar
