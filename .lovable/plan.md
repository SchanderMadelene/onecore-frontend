

# Rensa upp Badge-varianter till generiska, återanvändbara namn

## Problemet

Varianterna har use-case-specifika namn (`priority-low`, `status-info`) som borde vara generiska färgvarianter. En lila variant saknas helt och hårdkodas i `WelcomeHomeCell`.

## Ny variantstruktur i `badge.tsx`

Ersätt alla `priority-*` och `status-*` varianter med:

```text
Behåll som de är:
  default     (mörk/primary)
  secondary   (ljusgrå)
  destructive (röd)
  success     (grön -- redan finns)
  outline     (transparent med border)

Byt namn:
  status-neutral  →  muted       (bg-muted text-muted-foreground)
  status-info     →  info        (bg-sky-100 text-sky-800)
  status-warning  →  warning     (bg-amber-100 text-amber-800)
  status-success  →  (tas bort, "success" finns redan -- konsolidera till emerald-färg)
  priority-low    →  (tas bort, ersätts av "info")
  priority-medium →  (tas bort, ersätts av "warning")
  priority-high   →  (tas bort, ersätts av "destructive")

Lägg till:
  purple      (bg-violet-100 text-violet-800)
```

Slutresultat -- 8 varianter:
- `default` -- primärfärg, fyllda knappar/taggar
- `secondary` -- ljusgrå, subtil
- `destructive` -- röd, fel/kritiskt
- `success` -- grön (ändra till emerald-100/800 för konsistens med övriga pasteller)
- `outline` -- transparent med kant
- `muted` -- grå, inaktivt/ej påbörjat
- `info` -- blå, information/pågående
- `warning` -- gul/amber, varning/uppmärksamhet
- `purple` -- lila, specialstatus

## Filer som uppdateras

1. **`src/shared/ui/badge.tsx`** -- Ny variantlista enligt ovan
2. **`CleaningStatusBadge.tsx`** -- `status-neutral` → `muted`, `status-info` → `info`, `status-success` → `success`, `status-warning` → `warning`
3. **`ContactStatusBadge.tsx`** -- Samma mappning
4. **`KeysHandledBadge.tsx`** -- `status-success` → `success`, `status-neutral` → `muted`
5. **`CleaningCheckCell.tsx`** -- Samma mappning + uppdatera type-annotations
6. **`ContactStatusCell.tsx`** -- Samma mappning
7. **`WelcomeHomeCell.tsx`** -- Byt `status-info` + `extraClass` override till `purple` variant för "Manuell", `info` för "Digital", `muted` för "none"
8. **`OrderCard.tsx`** -- `priority-low` → `info`, `priority-medium` → `warning`, `priority-high` → `destructive`
9. **`BadgeShowcase.tsx`** -- Visa alla varianter med generiska etiketter (inte "Omkontroll"/"Bokad" utan t.ex. "Info", "Warning", "Success")

## Showcasen efteråt

Två sektioner:
- **Grundvarianter**: Default, Secondary, Outline, Destructive, Success
- **Statusfärger**: Muted, Info, Warning, Purple

Generiska etiketter som visar färgen/syftet, inte domänspecifika ord.

