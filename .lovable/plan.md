

# Konsolidera alla statusfärger till Badge-komponenten

## Problemet

Statusfärger (emerald, sky, amber, muted) är hårdkodade i minst 6 olika komponenter:
- `CleaningStatusBadge.tsx`
- `ContactStatusBadge.tsx`
- `KeysHandledBadge.tsx`
- `CleaningCheckCell.tsx`
- `ContactStatusCell.tsx`
- `WelcomeHomeCell.tsx`

Alla använder samma färgpalett men kopierar klasserna lokalt. Badge-komponenten i `shared/ui/badge.tsx` vet inte om dessa färger.

## Lösning

### 1. Lägg till statusvarianter i Badge-komponenten

**Fil:** `src/shared/ui/badge.tsx`

Lägg till fyra nya varianter som matchar det etablerade mönstret:

```text
status-neutral:  bg-muted text-muted-foreground (ej påbörjad / ej kontaktad)
status-info:     bg-sky-100 text-sky-800         (bokad / pågående)
status-warning:  bg-amber-100 text-amber-800     (omkontroll / ej nådd)
status-success:  bg-emerald-100 text-emerald-800 (godkänd / genomfört / ja)
```

Justera även bas-klasserna så att padding och font-weight matchar det som feature-komponenterna redan använder (`px-2.5 py-1 text-xs font-medium`). De befintliga varianterna (`default`, `secondary`, etc.) behåller sin nuvarande styling.

### 2. Refaktorera CleaningStatusBadge

Byt ut `<span>` mot `<Badge>` med rätt variant-mappning:
- `not_done` -> `status-neutral`
- `booked` -> `status-info`
- `approved` -> `status-success`
- `reinspection` -> `status-warning`

### 3. Refaktorera ContactStatusBadge

Samma mönster:
- `not_contacted` -> `status-neutral`
- `not_reached` -> `status-warning`
- `visit_booked` -> `status-info`
- `visit_done` -> `status-success`

### 4. Refaktorera KeysHandledBadge

Byt ut `<span>` mot `<Badge>`:
- `handled: true` -> `status-success`
- `handled: false` -> `status-neutral`

### 5. Refaktorera CleaningCheckCell och ContactStatusCell

Samma mappning som ovan. Dessa har även `border-*` klasser -- de kan läggas via `className`-prop om de behövs för cellkontexten.

### 6. Uppdatera BadgeShowcase

Lägg till en sektion "Statusbadges" med alla fyra nya varianter så att designsystemet dokumenterar dem.

## Resultat

- **En källa till sanning** för statusfärger: `badge.tsx`
- Alla feature-komponenter använder `<Badge variant="status-success">` istället för hårdkodade Tailwind-klasser
- Nya features som behöver statusbadges importerar Badge direkt -- inga fler one-off-komponenter med kopierade färger
