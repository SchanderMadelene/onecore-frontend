

## Vad vi vet om ärendeflödet

Systemet har redan stöd för att skapa ärenden från tre kontexttyper: `"tenant"`, `"residence"` och `"building"`. Flödet fungerar så:

1. **OrdersManagement** — Wrapper som visar ärendelista + "Skapa ärende"-knapp. Tar `contextType` och `residenceId` (används som generellt ID oavsett kontext).
2. **CreateOrderDialog** — Dialog med formulär. Skickar `contextType` vidare till OrderForm.
3. **OrderForm** — Visar/döljer sektioner baserat på `contextType`. T.ex. rum- och komponentval visas bara för `"residence"`.
4. **useOrdersService** — Filtrerar och skapar ärenden baserat på `residenceId`.
5. **Order-typen** — Har `residenceId` som koppling. Saknar `entranceId`.

Befintliga implementationer:
- **Byggnad**: `BuildingOrdersTab` → `OrdersManagement` med `contextType="building"`
- **Fastighet**: `PropertyOrdersTab` → `OrdersManagement` med `contextType="residence"`
- **Lägenhet**: Direkt i ResidenceContent via tabs

## Plan: Lägg till ärendefunktion för uppgång

### 1. Utöka contextType med "entrance"
Uppdatera `OrdersManagement`, `CreateOrderDialog`, `OrderForm` och `useOrderForm` så att `contextType` accepterar `"entrance"` som värde. Formuläret för entrance-kontext visar samma fält som building (titel, beskrivning, prioritet, huvudnyckel, datum) — **utan** rum/komponentval.

### 2. Lägg till `entranceId` på Order-typen
Lägg till ett valfritt `entranceId?: string` fält i `Order`-typen så ärenden kan kopplas till en specifik uppgång.

### 3. Skapa EntranceOrdersSection-komponent
En ny komponent i `src/features/orders/components/` (eller direkt i EntranceDetailPage) som renderar `OrdersManagement` med `contextType="entrance"` och uppgångens ID. Följer samma mönster som `BuildingOrdersTab`.

### 4. Integrera i EntranceDetailPage
Lägg till ärendesektionen som ett Card nedanför lägenhetslistan på uppgångssidan, med rubrik "Ärenden" och antal.

### Tekniska filer som ändras
- `src/features/orders/types/order.ts` — lägg till `entranceId`
- `src/features/residences/components/OrdersManagement.tsx` — acceptera `"entrance"` i contextType
- `src/features/orders/components/CreateOrderDialog.tsx` — samma
- `src/features/orders/components/OrderForm.tsx` — samma, ingen rum/komponent-sektion för entrance
- `src/features/orders/hooks/useOrderForm.ts` — acceptera entrance
- `src/pages/properties/EntranceDetailPage.tsx` — integrera OrdersManagement

