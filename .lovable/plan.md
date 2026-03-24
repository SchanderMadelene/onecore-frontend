

## Plan: Ändra rumskomponenter i besiktningen

### Vad ändras

Nuvarande komponenter per rum: Vägg 1, Vägg 2, Vägg 3, Vägg 4, Golv, Tak, Detaljer

Nya komponenter per rum: **Väggar** (en samlad), **Golv**, **Tak**, **Vitvaror**, **Köksluckor**

### Tekniska ändringar

**1. Uppdatera datamodellen** (`types.ts`)
- Ta bort `wall2`, `wall3`, `wall4` från alla objekt (conditions, actions, componentNotes, componentPhotos, costResponsibility)
- Byt namn på `wall1` → `walls`
- Byt `details` → `appliances` (vitvaror) och lägg till `kitchenDoors` (köksluckor)

**2. Uppdatera initial data** (`form/initialData.ts`)
- Spegla den nya strukturen med `walls`, `floor`, `ceiling`, `appliances`, `kitchenDoors`

**3. Uppdatera komponentlistan** (`mobile/RoomInspectionMobile.tsx`)
- Ändra COMPONENTS-arrayen till de 5 nya komponenterna med rätt labels och typer

**4. Uppdatera labels och utils** (`inspection-utils.ts`)
- Uppdatera `COMPONENT_LABELS` med nya nycklar och svenska namn

**5. Uppdatera ActionChecklist** (`ActionChecklist.tsx`)
- Lägg till actiontyper för `appliances` (Reparation, Byte, Justering) och `kitchenDoors` (Reparation, Byte, Justering, Målning)

**6. Uppdatera ConditionSelect** (`ConditionSelect.tsx`)
- Lägg till `appliances` och `kitchenDoors` som giltiga typer

**7. Uppdatera alla övriga filer som refererar gamla nycklar:**
- `InspectionRoom.tsx` — uppdatera completion-check
- `InspectionAccordion.tsx` — uppdatera accordion-sektioner
- `RoomCard.tsx` — uppdatera default-data
- `pdf/generateInspectionPdf.ts` och `pdf/types.ts` — uppdatera komponentlistor och labels
- Mockdata som refererar `wall1`–`wall4` eller `details`

**8. Rensa localStorage** — Befintliga sparade besiktningar med gammal struktur kommer inte matcha. Vi lägger till en versionscheck eller rensar vid inkompatibilitet.

