---
name: Detail page action parity
description: Alla actions i radens more-meny måste också finnas som primärknappar på motsvarande detaljsida (annonssida)
type: preference
---
För uthyrningsdomänen (bostad och bilplats) gäller regeln att alla åtgärder
som finns i en radens more-ikon (DropdownMenu) också måste finnas som
primärknappar på själva annons-/detaljsidan. Detta säkerställer att inga
funktioner är gömda enbart på listvyn.

**Implementation:** `HousingRowActions` har en `variant="detail"` som renderar
samma menyalternativ som outline-knappar (destructive-knapp för destruktiva
åtgärder). `HousingHeader` använder denna variant och mappar `offerStatus`
till motsvarande `HousingActionTab`.

Selection-beroende åtgärder (t.ex. "Skicka erbjudande" som kräver markerade
sökande) ligger kvar som separata primärknappar utöver detail-actions.
