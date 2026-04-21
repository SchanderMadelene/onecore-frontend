---
name: Button hover states & subtle variant
description: Universal rule for icon-button hover states. Never use ghost on tinted surfaces — use subtle variant.
type: design
---

## Regel
Ikon-knappar (X-knapp, rensa, inline-actions) som ligger på tonade ytor (`bg-muted/30`, `bg-card`, kort, paneler, dialoger med bakgrund) får **ALDRIG** använda `variant="ghost"` med default hover. `ghost` har `hover:bg-accent` vilket blir mörkt/mättat och bryter den lågmälda känslan.

## Lösning
Använd `variant="subtle"` på `Button` (definierad i `src/shared/ui/button.tsx`):
```
subtle: "text-muted-foreground hover:bg-muted hover:text-foreground"
```

## När använda vad
- **`subtle`** — ikon-knappar i kort/paneler/listor, stäng-knappar (X), rensa-knappar, små inline-actions, tabellradsåtgärder utan border.
- **`ghost`** — endast för knappar på ren `bg-background` där accent-hovern är önskad (t.ex. nav-länkar i sidebar).
- **`outline`** — tabellradsåtgärder med ikon (se memory `ui/table-action-button-standard`).

## Konsekvens-check
Innan du sätter `variant="ghost"` på en ikon-knapp: ligger den på något annat än ren `bg-background`? Använd `subtle`.
