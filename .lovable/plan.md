

## Plan: Overlay-knappar vid hover istället för reserverat utrymme

### Problem
Knapparna (lägenhetskort, kundkort, telefon) tar upp horisontellt utrymme i tabellen även när de är dolda med `opacity-0` — de är fortfarande i dokumentflödet och breddberäkningen.

### Lösning
Ändra knapparna från inline-flow till **absolut positionerade overlays** som visas ovanpå cellinnehållet vid hover. Cellen behåller `position: relative` och knapparna placeras med `absolute` så de inte påverkar tabellbredden.

### Teknisk implementation

**Fil: `CombinedTurnoverTable.tsx`**

1. **Adress-cellen (lägenhetskort)**: Ta bort `<span>`-wrappern med opacity. Lägg istället en absolut-positionerad knapp som visas vid hover ovanpå adresstexten:
```tsx
<TableCell className="relative">
  <span className="text-sm">{row.address}</span>
  {getResidenceUrl(row) && (
    <span className="absolute inset-y-0 left-1 flex items-center opacity-0 group-hover/row:opacity-100 transition-opacity">
      <Button variant="outline" size="icon" className="h-6 w-6 bg-background" asChild>
        <a href={...}><ExternalLink /></a>
      </Button>
    </span>
  )}
</TableCell>
```

2. **Hyresgästcellen (kundkort + telefon)**: Samma mönster — knapparna positioneras absolut till vänster om/ovanpå namnets yta med en `bg-background` för att täcka texten under:
```tsx
<TableCell className="border-l-2 border-border relative">
  <div className="flex items-center gap-1.5">
    <span className="text-sm">{row.moveOut.tenantName}</span>
    <SecurityWarningIcon ... />
  </div>
  <span className="absolute inset-y-0 left-2 flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
    <span className="flex items-center gap-1 bg-background pr-1">
      {/* kundkort + telefon-knappar */}
    </span>
  </span>
</TableCell>
```

3. Knapparna får `bg-background` så de täcker texten bakom sig rent visuellt.

4. Samma mönster appliceras på **både utflytt- och inflytthyresgästen**.

### Resultat
- **Utan hover**: Tabellen visar bara text — adress, namn, statusar. Inga knappar tar plats.
- **Vid hover**: Knappar glider in ovanpå texten med en bakgrundsfärg som döljer det under.
- Tabellen blir smalare och kräver mindre/ingen horisontell scroll.

### Avgränsning
- Mobil: oförändrad (inga hover-effekter)
- Penna-knapp, noter-ikon: oförändrade (alltid synliga, i egna smala kolumner)

