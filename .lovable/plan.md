## Mål

På Visning-tabben (aktiv erbjudandeomgång) ska den flytande **BulkActionBar** alltid vara synlig med knappen **"Ändra/uppdatera erbjudande"**. Markerar man sökande tillkommer SMS/Mejl-knapparna och antalet visas. Knappen öppnar `SendHousingOfferDialog` i edit-läge — visningsdatum/tid, visningsvärd och meddelande går att redigera; mottagare och kanal är låsta.

## Ändringar

### 1. `src/pages/rentals/components/RoundSummaryBar.tsx`
- Ta bort `onEditOffer`-prop och edit-knappen som ligger där nu. Behåll endast "Avbryt denna omgång".

### 2. `src/shared/ui/bulk-action-bar.tsx`
- Stöd "alltid synlig"-läge:
  - Ny prop `alwaysVisible?: boolean` — när `true` renderas baren även om `selectedCount === 0`.
  - När `selectedCount === 0`: dölj "X kund(er) vald" + "Rensa"-knappen samt SMS/Mejl-knapparna. Visa endast `onEditOffer`-knappen (om angiven) och en kontextlabel (skickas via ny prop `contextLabel?: string`, t.ex. "Omgång 2 · 8 sökande").
  - När `selectedCount > 0`: visa antal, Rensa, SMS, Mejl och edit-knappen som idag.
- Edit-knappen behåller sin nuvarande styling (`variant="outline"` med Pencil-ikon).

### 3. `src/pages/rentals/HousingDetailPage.tsx`
- I omgångs-vyn (`showRoundsView`): identifiera den för tillfället visade omgången (`activeRoundTab`). Om dess status är `Active` (ingen accepterad), aktivera bulk-bar i "alltid synlig"-läge.
- Skicka till `BulkActionBar`:
  - `alwaysVisible` när villkoret ovan är uppfyllt.
  - `contextLabel`, t.ex. `"Omgång {n} · {antal} sökande"`.
  - `onEditOffer` som öppnar `SendHousingOfferDialog` i `mode="edit"` för den aktiva omgången (kopplingen finns redan).
- Aktivera urvalskolumn på sökandetabellen även i aktiv omgång (`showSelectionColumn={true}`, `onSelectionChange={setSelectedApplicants}`) så att SMS/Mejl-knapparna kan användas vid behov. Urvalet påverkar inte vilka som får erbjudandet.
- Rensa `selectedApplicants` när användaren byter mellan omgångsflikar för att inte bära över urval mellan omgångar.

## Beteende

```text
Visning-tabben → välj en aktiv omgång
  → BulkActionBar alltid synlig:
       "Omgång 2 · 8 sökande"      [Ändra/uppdatera erbjudande]
  → Bocka i en eller flera sökande:
       "3 kunder valda"  [Rensa]    [Ändra/uppdatera] [SMS] [Mejl]
  → Klick på "Ändra/uppdatera erbjudande" öppnar modalen i edit-läge.
```

Avbruten/accepterad omgång → ingen baren (samma som idag).

## Notering

Om edit-knappen senare ska gå att nå även från Erbjud-kontrakt-tabben eller från Historik kan samma `alwaysVisible`-mönster återanvändas — denna plan begränsar sig till Visning-tabben med aktiv omgång.
