
# Omstrukturering till FSD - Steg 1: Städa bort dubbletter och oanvända mappar

## Bakgrund
Projektet har idag en blandning av kod i `src/components/` och `src/features/`. Många mappar i `src/components/` innehåller antingen ren duplicerad kod eller re-exports till `src/features/`. Innan vi kan gå mot en FSD-struktur (Feature-Sliced Design) behöver vi rensa detta.

## Analys av nuläget

Mapparna i `src/components/` kan delas in i tre kategorier:

**Oanvända (inga importer hittas) - kan raderas direkt:**
- `barriers/` - dubbletter finns i `src/features/barriers/components/`
- `buildings/` - dubbletter finns i `src/features/buildings/components/`
- `communication/` - dubbletter finns i `src/features/communication/components/`
- `favorites/` - dubbletter finns i `src/features/favorites/components/`
- `layout/` - `PageLayout.tsx` importeras inte
- `shared/` - `Notes/` importeras inte harifran
- `treeview/` - importeras inte

**Har få kvarvarande importer - kan migreras:**
- `properties/` - re-exporterar fran `src/features/properties/components/`. Importeras av 8 filer (mest tabs-filer inom sig sjalv och features). Alla importer ska pekas om till `@/features/properties/components`.
- `search/` - `GlobalSearchBar` importeras av `src/layouts/NavigationBar.tsx`. Flytta till `src/features/search/components/`.
- `settings/` - importeras av `src/pages/settings/SettingsPage.tsx`. Flytta till `src/features/settings/components/`.
- `strofaktura/` - inga importer hittas, men koden kan behova vara i `src/features/ekonomi/`.

**Ska behallas:**
- `ui/` - shadcn-komponenter, dessa blir `shared/ui` i FSD
- `common/` - delade komponenter (Breadcrumb, ComponentCard, etc.)
- `design-system/` - dokumentation och showcases

## Vad gors i detta steg

### 1. Radera oanvanda dubblettmappar (6 mappar)
Ta bort foljande mappar fran `src/components/`:
- `barriers/`
- `buildings/`
- `communication/`
- `favorites/`
- `layout/`
- `shared/`
- `treeview/`

### 2. Migrera `properties/` tabs
Filerna i `src/components/properties/tabs/` verkar vara dubbletter av de som finns i `src/features/properties/components/tabs/`. Dubletterna raderas.

Uppdatera de 4 filerna i `src/features/properties/components/tabs/` som importerar fran `@/components/properties` till att importera fran `@/features/properties/components` istallet.

Radera hela `src/components/properties/`.

### 3. Flytta `search/`-komponenter
Flytta `GlobalSearchBar.tsx`, `SearchFavorites.tsx`, `SearchFilters.tsx`, `SearchResultsList.tsx` till `src/features/search/components/`.

Uppdatera importen i `src/layouts/NavigationBar.tsx`.

### 4. Skapa `src/features/settings/`
Flytta alla filer fran `src/components/settings/` till `src/features/settings/components/`.

Uppdatera importen i `src/pages/settings/SettingsPage.tsx`.

### 5. Flytta `strofaktura/` till features
Kontrollera om koden redan finns i `src/features/ekonomi/components/` (verkar sa baserat pa exports). Om det ar dubbletter, radera `src/components/strofaktura/`.

## Resultat efter steg 1
`src/components/` kommer bara innehalla:
- `ui/` - shadcn primitiver
- `common/` - delade komponenter
- `design-system/` - dokumentation

Alla domanspecifika komponenter kommer ligga i `src/features/`.

## Kommande steg (framtida iterationer)
- **Steg 2**: Flytta `src/types/` till respektive feature eller `shared/types`
- **Steg 3**: Flytta `src/data/` till respektive feature
- **Steg 4**: Flytta `src/services/` och `src/hooks/` till features eller `shared/`
- **Steg 5**: Infor FSD-lagren `entities/`, `widgets/`, `shared/` enligt GitHub-repots struktur

---

## Tekniska detaljer

### Filer som behover uppdaterade importer

| Fil | Andring |
|-----|---------|
| `src/features/properties/components/tabs/PropertyStatisticsTab.tsx` | `@/components/properties/...` -> `@/features/properties/components/...` |
| `src/features/properties/components/tabs/PropertyMapTab.tsx` | `@/components/properties` -> `@/features/properties/components` |
| `src/features/properties/components/tabs/PropertyBuildingsTab.tsx` | `@/components/properties` -> `@/features/properties/components` |
| `src/features/properties/components/tabs/PropertyInfoTab.tsx` | `@/components/properties/...` -> `@/features/properties/components/...` |
| `src/layouts/NavigationBar.tsx` | `@/components/search/...` -> `@/features/search/components/...` |
| `src/pages/settings/SettingsPage.tsx` | `@/components/settings/...` -> `@/features/settings/components/...` |

### Nya features-mappar
- `src/features/settings/` (ny)
- `src/features/settings/components/` (ny)

### Totalt antal filer att radera (dubbletter)
Ca 30-40 filer i `src/components/` som ar dubbletter av befintlig kod i `src/features/`.
