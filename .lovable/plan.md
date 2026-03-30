

## Plan: Uppdatera ikoner för fastighetshierarkin enligt produktion

### Bakgrund
Ikonerna ska matcha produktionssystemet. Nuvarande mappning är felaktig -- flera nivåer delar samma ikon.

### Ny ikonmappning

| Nivå | Ikon-namn i data | Lucide-komponent | Nuvarande |
|------|------------------|-----------------|-----------|
| Företag | `"landmark"` | `Landmark` | Finns ej ännu |
| Fastighet | `"building2"` | `Building2` | `"building"` → `Building` |
| Byggnad | `"hotel"` | `Hotel` | `"building"` → `Building` |
| Uppgång | `"home"` | `Home` | `"door-open"` → `DoorOpen` |
| Lägenhet | `"door-open"` | `DoorOpen` | `"home"` → `Home` |

Uppgång och Lägenhet byter alltså ikon med varandra, och Fastighet/Byggnad får nya unika ikoner.

### Ändringar

**1. `treeViewUtils.tsx`** -- Lägg till `"hotel"` och `"landmark"` i switch-satsen med rätt Lucide-import (`Hotel`, `Landmark`).

**2. Träddata-filer** -- Uppdatera `icon`-värden:
- `properties/index.ts`: Rotnoden "Fastigheter" behåller `"building"` eller uppdateras
- Varje fastighet (Älgen 1, Lindaren 2, etc.): `icon: "building2"`
- Varje byggnad (Bellmansgatan, Kontorsbyggnad, etc.): `icon: "hotel"`
- Varje uppgång: `icon: "home"` (var `"door-open"`)
- Varje lägenhet: `icon: "door-open"` (var `"home"`)

Berörda filer:
- `algen1.ts`, `lindaren2.ts`, `bjornen4.ts`, `otherProperties.ts`, `properties/index.ts`

**3. `BetaSettings.tsx`** -- Uppdatera ikoner i toggle-sektionerna så de matchar (t.ex. Uppgångar-sektionen bör använda `Home` istället för `DoorOpen`).

### Filer som ändras
- `src/widgets/navigation/treeview/treeViewUtils.tsx`
- `src/widgets/navigation/treeview/data/properties/algen1.ts`
- `src/widgets/navigation/treeview/data/properties/lindaren2.ts`
- `src/widgets/navigation/treeview/data/properties/bjornen4.ts`
- `src/widgets/navigation/treeview/data/properties/otherProperties.ts`
- `src/widgets/navigation/treeview/data/properties/index.ts`
- `src/features/settings/components/BetaSettings.tsx`

