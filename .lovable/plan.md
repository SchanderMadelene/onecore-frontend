

## Mål
Återanvänd parking-tabellernas åtgärdsmönster på bostadstabellerna och utöka det med en "more-menu" som rymmer samtliga rad-åtgärder. Hover-knappar finns kvar för snabb åtkomst, men allt finns även samlat i menyn.

## Etablerat mönster (parking → bostad)
Idag på bilplatsrader (hover på rad):
- "Ta bort" (DeleteListingDialog – soptunna)
- "Ny intresseanmälan" (ParkingApplicationDialog – PlusCircle)
- ChevronRight → detaljsida

Nytt på bostadsraderna – samma upplägg + en `MoreHorizontal`-meny med samma åtgärder bakade som menyposter:

```text
[Hover-knappar synliga vid hover]              [Alltid synliga]
[Ny anmälan] [Avpublicera/Ta bort]   [⋯ More]  [›]
```

## Åtgärder per flik (bostad)

| Flik | Hover-knappar | More-menu (alla åtgärder) |
|---|---|---|
| Publicerade | Ny anmälan, Avpublicera | Ny anmälan · Redigera annons · Avpublicera |
| Behov av publicering | Publicera, Ta bort | Publicera · Redigera annons · Ta bort |
| Klara för erbjudande | Skapa erbjudande | Skapa erbjudande · Visa sökande |
| Erbjudna | Visa erbjudande | Visa erbjudande · Återkalla erbjudande |
| Historik | – | Visa annons |

Samma åtgärder återspeglas i mobilkortens nedre actions-rad.

## Ny återanvändbar komponent
`src/features/rentals/components/HousingRowActions.tsx`
- Props: `housing`, `tab`, valfri `onAction`
- Renderar hover-gruppen (`opacity-0 group-hover:opacity-100`) + `DropdownMenu` med `MoreHorizontal` (`variant="outline"`, `size="icon"`) + `ChevronRight`-länk
- Återanvänder befintliga dialoger: `CreateHousingApplicationDialog`, `EditHousingDialog`, `DeleteListingDialog` (parameteriseras för housing eller görs generisk)
- Alla klick: `e.stopPropagation()` för att inte trigga `onRowClick`

För symmetri uppdateras även parking-tabellerna (`PublishedParkingTab`, `ReadyForOfferTab`, m.fl.) med samma `MoreHorizontal`-meny som speglar de befintliga hover-knapparna.

## Filer som ändras
- Ny: `src/features/rentals/components/HousingRowActions.tsx`
- Ny: `src/features/rentals/components/ParkingRowActions.tsx` (refaktor av befintlig actions-cell)
- `PublishedHousingTable.tsx`, `UnpublishedHousingTable.tsx`, `ReadyForOfferHousingTable.tsx`, `OfferedHousingTable.tsx`, `HistoryHousingTable.tsx`: lägg till `actions`-kolumn + uppdatera mobilkort
- `tabs/PublishedParkingTab.tsx`, `ReadyForOfferTab.tsx`, `OfferedTab.tsx`, `HistoryTab.tsx`, `NeedsRepublishTab.tsx`: byt actions-cellen till `ParkingRowActions`

## Designregler som följs
- More-knapp och chevron: `Button variant="outline" size="icon"` (table-action standard)
- Inga ikoner i text-CTA:er (t.ex. "Ny anmälan")
- Hover-gruppen behåller `opacity-0 group-hover:opacity-100 transition-opacity`
- More-menyn är alltid synlig (även utan hover) så åtgärder är nåbara på touch och utan hover
- Destruktiva poster (Ta bort, Avpublicera, Återkalla) får `text-destructive` i menyn

