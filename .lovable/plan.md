

## Flytta redigering till modaler -- read-only badges i tabellen

Tabellen visar idag interaktiva dropdowns, datumväljare och räknare inline. Vi ersätter dessa med **klickbara read-only statusbadges** som öppnar redigeringsmodaler. Noteringsfunktionen via more-menyn behålls som den är.

### Vad ändras

**Tabellen (desktop och mobil) visar bara read-only badges:**
- **Städkontr.** -- en färgad pill med statustext + ev. datum (ej klickbar dropdown, ej datumväljare)
- **Kontakt** -- en färgad pill med statustext + ev. "2 ggr" eller "15 mar 10:00"
- **Namn/Port** -- behålls som inline checkbox (snabbåtgärd, en enda toggle)
- **Välkommen hem** -- behålls som inline dropdown (enkel select, inget extra UI)

Badges blir **klickbara** och öppnar respektive modal direkt -- ingen omväg via more-menyn.

### Nya komponenter

**1. `CleaningStatusBadge.tsx`** (read-only, klickbar)
- Visar statusens pill-färg + label
- Vid "Bokad"/"Omkontroll": visar datum bredvid
- Vid "Godkänd": visar godkännandedatum
- `onClick` triggar modal

**2. `ContactStatusBadge.tsx`** (read-only, klickbar)
- Visar statusens pill-färg + label
- Vid "Ej nådd": visar "X ggr" bredvid
- Vid "Besök bokat": visar datum + tid
- `onClick` triggar modal

**3. `CleaningEditDialog.tsx`** (modal)
- Rubrik: "Städkontroll -- [hyresgästnamn]"
- Innehåll: Status-select, datumväljare (vid bokad/omkontroll), godkännandedatum (vid godkänd)
- Samma logik som nuvarande `CleaningCheckCell` men i dialog-layout
- Spara-knapp stänger modalen

**4. `ContactEditDialog.tsx`** (modal)
- Rubrik: "Kontakt -- [hyresgästnamn]"  
- Innehåll: Status-select (framåt-only), antal försök (vid ej nådd), datum + tid (vid besök bokat)
- Samma logik som nuvarande `ContactStatusCell` men i dialog-layout
- Spara-knapp stänger modalen

### Ändringar i befintliga filer

**`CombinedTurnoverTable.tsx`**
- Ersätt `CleaningCheckCell` med `CleaningStatusBadge` + lokal state för att öppna `CleaningEditDialog`
- Ersätt `ContactStatusCell` med `ContactStatusBadge` + lokal state för att öppna `ContactEditDialog`
- Samma i mobilvy (MobileAccordion)
- Props till tabellen behålls (callbacks för statusändringar), men de skickas vidare till dialog-komponenterna

**`CleaningCheckCell.tsx` och `ContactStatusCell.tsx`**
- Behålls men används inte längre direkt i tabellen (kan tas bort eller behållas som referens)

### Visuellt resultat (desktop)

```text
| Hyresgäst (ut) | Sista deb. | Städkontr.          | Hyresgäst (in)  | Kontrakt | Kontakt               | Namn/Port | Välkommen hem |
| Svensson Eva   | 31 mar     | [Bokad 20 mar] *    | Andersson Kalle | 1 apr    | [Besök bokat 15 mar]* |    [x]    |   [Digital]   |
```
*klickbar badge som öppnar modal*

### Teknisk approach

- Badges och dialogs är separata komponenter for att hålla koden ren
- Dialogs hanterar sin egen temporära state och committar via callback vid "Spara"
- `TurnoverRowActions` (more-menu) behålls oförändrad -- enbart för noteringar
- Inga ändringar i typer eller hooks -- bara i UI-lagret

