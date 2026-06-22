## Problem
"Publicerade nu" (inaktiv tabb) ser fortfarande blek ut mot den ljusgrå bakgrunden. Förra ändringen satte `text-foreground/60` vilket inte räcker.

## Lösning
Öka kontrasten på inaktiva tabbar i `src/shared/ui/tabs.tsx`:
- Byt `text-foreground/60` → `text-foreground/85` (nästan full svärta, men fortfarande visuellt urskiljbar från aktiv tabb som har vit bakgrund + skugga).
- Lägg till hover-state `hover:text-foreground` för tydlig affordance.

Den aktiva tabben skiljs då primärt via bakgrund/skugga (vit kapsel), inte via textfärg — vilket matchar mönstret i referensbilden där "Publicerade nu" är fullt läsbar.

Ingen ändring i `TabCount` eller övriga tabbsidor.

### Fil
- `src/shared/ui/tabs.tsx` — uppdatera `TabsTrigger`-klasser.
