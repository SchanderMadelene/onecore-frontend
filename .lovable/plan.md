## Mål
Implementera dokumentets 45 komponenter med rätt åtgärder kopplade. Fasta komponenter behåller sin plats per rum; allt övrigt blir valbart under "Detaljer".

## 1. Uppdatera åtgärder för befintliga fasta komponenter
I `ActionChecklist.tsx` – `ACTION_OPTIONS`:

| Nyckel | Åtgärder |
|---|---|
| `walls` | Helmålning, Målning väggar/tak, Målning väggar, Helmålning/Spärrmålning, Förbättringsmålning |
| `ceiling` | (behålls som idag – ärver väggens åtgärder) |
| `floor` | Slipning, Utbyte, Polering, Slipning/lagning |
| `kitchenDoors` | Utbyte, Målning, Reparation |
| `refrigerator`, `freezer` | Utbyte, Reparation |
| `washingMachine`, `tumbleDryer` | Utbyte, Reparation |

Generisk `APPLIANCE_ACTIONS`-fallback bantas till **Utbyte, Reparation** (dokumentets baseline).

## 2. Bygg ut "Detaljer" med dokumentets resterande komponenter
I `types.ts` – ersätt nuvarande `CUSTOM_COMPONENT_TYPES` med dokumentets lista (de som inte redan är fasta):

Kyl/frys, Spis, Häll, Ugn, Micro, Diskmaskin, Diskbänk, Arbetsbänk, Skåpstomme, Sparksockel, Köksblandare, Fläkt, Radiator, Eluttag, Strömbrytare, Armatur, Fönster, Badrumskåp, Väggspegel, Wc-stol, Duschset, Duschslang+munstycke, Badkar, Duschvägg, Kakel, Tvättställ, Vattenlås, Torkreda, Torkhiss, Handdukshängare, Elschema, Brandvarnare, Innedörr, Golvsockel, Hatthylla, Kombimaskin, Lägenhetsdörr, Altantrall.

Varje typ får sin egen åtgärdslista enligt dokumentet (bl.a. Häll = Utbyte/Reparation/Polering; Radiator = Utbyte/Kontroll; Eluttag/Strömbrytare = Utbyte/Justering; Armatur = Utbyte/Byte ljuskälla; **Lägenhetsdörr & Altantrall = endast Reparation**; en del singel-åtgärd-komponenter får bara Utbyte).

## 3. Utöka custom-komponenter med villkor + åtgärd
Idag har en custom-komponent bara anteckning + kostnadsansvar. För att åtgärdsmodellen ska fungera behöver vi:
- Lägga till `condition` (God/OK/Skadad) och `actions: string[]` på `CustomInspectionComponent`.
- I `CustomComponentsSection` återanvända samma UI som `ComponentInspectionCard` (skick-pills, åtgärdsdropdown, kostnadsansvar, auto-collapse vid OK/God).
- Använda ny hjälpare `getActionsForCustomType(type)` som speglar `getActionsForComponent`.

## 4. Konsekvenser
- Befintliga utkast med custom-komponenter får tomma `condition`/`actions` – ingen migrering behövs (mock-data).
- Kostnadssammanställningen plockar redan upp `costResponsibility` från custom-komponenter; inga ändringar där.

## Tekniska filer som berörs
- `src/features/residences/components/inspection/ActionChecklist.tsx`
- `src/features/residences/components/inspection/types.ts`
- `src/features/residences/components/inspection/CustomComponentsSection.tsx`
- `src/features/residences/hooks/useInspectionForm.ts` (handlers för custom condition/actions)

## Frågor som dykt upp under planeringen
- **Kyl/frys** finns både som fast (`refrigerator`+`freezer`) och som egen rad i dokumentet. Förslag: behåll de två fasta i kök, lägg `fridgeFreezer` som custom för lägenheter med kombiskåp.
- **Tak** behålls med väggens åtgärdsuppsättning (bekräftat).
