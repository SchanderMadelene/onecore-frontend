## Mål

På sidan **Administrera förvaltningsområden** (`/property-areas/admin`) ska distriktschef och biträdande distriktschef visas för det valda kostnadsstället, i direkt anslutning till "Kostnadställe:"-dropdownen.

## Datamodell

I `src/features/property-areas/types/property-area.ts`:

- Lägg till en ny struktur `COST_CENTER_MANAGERS` (vid sidan av `COST_CENTER_NAMES`) som mappar kostnadsställe-kod → `{ districtManager: string; assistantDistrictManager: string }`.
- Fyll med fiktiva, anonymiserade svenska namn för alla fem kostnadsställen (61110–61150) enligt projektets anonymiseringspolicy.
- Lägg till hjälpfunktionen `getCostCenterManagers(code)` i `src/features/property-areas/data/index.ts` och exportera den från feature-index.

## UI

I `src/pages/property-areas/StewardAdminPage.tsx`, kortet med "Kostnadställe:"-dropdownen:

- Behåll dropdownen som primärt element (rad 110–124).
- Lägg till en sektion till höger om dropdownen (eller på ny rad om det inte får plats) som visar två kolumner:
  - **Distriktschef** — namn under en liten label
  - **Biträdande distriktschef** — namn under en liten label
- Layout: `flex-wrap gap-x-8 gap-y-3` så det wrappar snyggt på smala skärmar. Labels i `text-xs text-muted-foreground`, namnen i `text-sm font-medium`.
- Ingen ikon (enligt projektets ikon-policy för text-baserade element).
- Värdena uppdateras reaktivt när `selectedCostCenter` ändras via `getCostCenterManagers(selectedCostCenter)`.

## Filer som ändras

- `src/features/property-areas/types/property-area.ts` — ny `COST_CENTER_MANAGERS`-konstant
- `src/features/property-areas/data/index.ts` — ny `getCostCenterManagers`-funktion
- `src/features/property-areas/index.ts` — exportera `getCostCenterManagers`
- `src/pages/property-areas/StewardAdminPage.tsx` — visa namnen i kortet

## Avgränsningar

- Endast på `StewardAdminPage` (där användaren är just nu). Om du vill visa samma info på `PropertyAreasPage` (huvudsidan) eller i admin-mobilvyn säger du till så lägger jag till det i ett eget steg.
- Namnen blir fiktiv mockdata. När riktig data finns kan vi koppla källan senare.
