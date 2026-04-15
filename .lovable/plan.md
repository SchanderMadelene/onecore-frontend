

## Plan: Högerställd overlay med gradient-fade

### Koncept
Vid hover glider en knappgrupp in från höger i varje sektion (utflytt / inflytt). En gradient-fade från transparent till radens bakgrundsfärg skapar en mjuk övergång där texten fadear ut under knapparna.

### Teknisk implementation

**Fil: `CombinedTurnoverTable.tsx`**

1. **Flytta overlay-knapparna** från `left-2` (ovanpå namn) till **höger** inom hyresgästcellen. Använd `absolute inset-y-0 right-0` istället.

2. **Gradient-bakgrund** istället för solid `bg-muted/50`:
```tsx
<span className="absolute inset-y-0 right-0 flex items-center gap-1 pr-1 
  opacity-0 group-hover/row:opacity-100 transition-opacity
  bg-gradient-to-l from-background via-background to-transparent">
```
Gradienten går från solid bakgrund (höger) till transparent (vänster), så texten fadear naturligt under.

3. **Samma mönster på tre ställen**:
   - Adresscellen (lägenhetskort-knapp) → overlay högerställd
   - Utflytthyresgäst-cellen (kundkort + telefon) → overlay högerställd  
   - Inflytthyresgäst-cellen (kundkort + telefon) → overlay högerställd

4. **Hover-state-anpassning**: Gradienten använder CSS-variabeln `from-background` som standard, men vid row-hover byter tabellraden till `hover:bg-muted/50`. Vi löser detta genom att använda `from-muted/50 via-muted/50` som gradient-färger, matchat med gruppens hover:
```tsx
className="... from-transparent to-transparent 
  group-hover/row:from-muted/50 group-hover/row:via-muted/50"
```
Eftersom overlayen bara syns vid hover behöver färgen bara matcha hover-statet.

### Resultat
- Utan hover: Ren text, inga knappar synliga, inget extra utrymme
- Vid hover: Knappar glider in snyggt från höger med en gradient som mjukt döljer texten under

### Avgränsning
- Mobil: oförändrad
- Penna-knapp, noter-ikon: oförändrade (egna kolumner)

