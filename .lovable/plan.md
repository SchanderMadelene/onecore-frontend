
## Säkerhetsvarning i ut- & inflyttslistan

Lägga till samma varningsikon (amber triangel) som finns på kundkortet, bredvid hyresgästnamnet i turnover-tabellen -- for both utflyttande och inflyttande hyresgäster.

### Vad som ändras

**1. Typ-definition** (`move-in-list-types.ts`)
- Lägg till `hasSecurityWarning?: boolean` på `MoveInListEntry`

**2. Mock-data** (`mock-move-in-list.ts`)
- Sätt `hasSecurityWarning: true` på 2-3 poster (t.ex. "Skyddad Identitet" på utflytt och en inflyttande hyresgäst) för att kunna se ikonen i listan

**3. Desktop-tabell** (`CombinedTurnoverTable.tsx`)
- I hyresgästkolumnerna (utflytt och inflytt): visa en liten amber `TriangleAlert`-ikon bredvid hyresgästnamnet med en `Tooltip` ("Åk aldrig ensam till kund...")
- Samma stil som på kundkortet: amber cirkel med triangel-ikon, men i en mindre storlek (w-5 h-5 cirkel, h-3 w-3 ikon) för att passa i tabellcellen

**4. Mobilvy** (`CombinedTurnoverTable.tsx`)
- Samma ikon bredvid hyresgästnamnet i accordion-vyns utflytt- och inflytt-sektioner

**5. Separata tabeller** (`MoveOutSection.tsx`, `MoveInSection.tsx`)
- Samma ikon bredvid hyresgästnamnet i dessa vyer också, for konsistens

### Teknisk detalj

Ikonen renderas inline bredvid namnet:
```text
<div className="flex items-center gap-1.5">
  <span>{tenantName}</span>
  {hasSecurityWarning && (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center justify-center w-5 h-5 bg-amber-100 rounded-full border border-amber-200">
            <TriangleAlert className="h-3 w-3 text-amber-600" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          Åk aldrig ensam till kund. Ta alltid med dig en kollega vid hembesök.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )}
</div>
```

Inga nya filer skapas -- bara befintliga filer uppdateras med den etablerade varningsikonen.
