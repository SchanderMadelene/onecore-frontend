

# Steg 5: Infor entities/ och widgets/ i FSD-strukturen

## Bakgrund

FSD (Feature-Sliced Design) har foljande lager:
- **shared/** - Ateranbara primitiver (klar)
- **entities/** - Karndomanobjekt: typer, data, grundlaggande UI (kort, listor)
- **features/** - Anvandningsfall som komponerar entities (inspektioner, sok, uthyrning)
- **widgets/** - Sammansatta UI-block som kombinerar flera entities/features (navigation, tabblayout)
- **pages/** - Routeniva (klar)

Idag ligger allt domanspecifikt i `features/`. Vi ska separera ut "passiva" domanmodeller till `entities/` och sammansatta navigations-/layoutblock till `widgets/`.

## Vad ar en entity vs en feature?

- **Entity**: Representerar en sak i systemet - dess typer, mockdata och enkel display-komponent (kort, rad). Har ingen komplex anvandningslogik.
- **Feature**: Representerar en handling eller ett flode - sok, filtrera, skapa, inspektera.

## Nya entities

### entities/property/
- **types**: `Property`, `PropertyDetail`, `PropertyMap`, `BuildingLocation`, `MaintenanceUnit` (fran `shared/types/api.ts`)
- **data**: `mockProperties`, `mockPropertyDetails` (fran `features/properties/data/`)
- **ui**: `PropertyBasicInfo`, `PropertyHeader`, `PropertyBuildingCard` (grundlaggande displaykomponenter)

### entities/building/
- **types**: `Building`, `BuildingSpace`, `SpaceType`, `SpaceComponent`, `Entrance`, `EntranceAddress` (fran `shared/types/api.ts`)
- **data**: `mockBuildings` (fran `features/buildings/data/`)
- **ui**: `BuildingBasicInfo`, `BuildingInfo`, `BuildingHeader`

### entities/residence/
- **types**: `Residence`, `Room`, `RoomComponent`, `ApartmentType` (fran `shared/types/api.ts`)
- **data**: `mockResidenceData`, `mockRooms` (fran `features/residences/data/`)
- **ui**: `ResidenceBasicInfo`, `ResidenceInfo`

### entities/tenant/
- **types**: Tenant-relaterade typer
- **data**: `mockTenant`, `mockTenants`, `customers` (fran `features/tenants/data/`)
- **ui**: `TenantCard`, `TenantInformationCard`

### entities/barrier/
- **types**: `Barrier`, `AvailableHousing`, etc. (fran `features/barriers/types/`)
- **data**: `mockBarriers` och hjalp-funktioner (fran `features/barriers/data/`)

## Nytt widget-lager

### widgets/navigation/
- `NavigationBar.tsx` (fran `layouts/NavigationBar.tsx`)
- `TreeView.tsx` (fran `layouts/TreeView.tsx`)
- `treeview/` data och typer (fran `layouts/treeview/`)

### widgets/property-detail/
- `PropertyDetailTabs.tsx` och `PropertyDetailTabsMobile.tsx` (kombinerar flera flikar/features)

### widgets/building-detail/
- `BuildingDetailTabs.tsx` och `BuildingDetailTabsMobile.tsx`

## Vad som behalls i features/

Features behaller sina use-case-specifika komponenter, hooks och logik:
- `features/properties/` - Sok, filtrering, tabbar (PropertySearch, PropertySelectionFilters, etc.)
- `features/buildings/` - Tabs (BuildingPartsTab, BuildingInstallationsTab, etc.)
- `features/residences/` - Inspektion, dokument, ordrar
- `features/tenants/` - Kommunikation, kontrakt, kohantering
- `features/inspections/`, `features/rentals/`, `features/orders/`, etc. - oforandrade

## Hantering av shared/types/api.ts

Filen `shared/types/api.ts` innehaller typer for alla domanentiteter. Dessa splittras:
- `APIResponse` och `Company` stannar i `shared/types/`
- Property-typer flyttas till `entities/property/types/`
- Building-typer flyttas till `entities/building/types/`
- Residence/Room-typer flyttas till `entities/residence/types/`
- Re-exports fran `shared/types/api.ts` bibehalls for bakatkompatibilitet

## Importstrategi

Precis som i steg 5 anvands Vite-alias for bakatkompatibilitet:
- `@/features/properties/data` -> `@/entities/property/data` (for dataexporter)
- `@/features/buildings/data` -> `@/entities/building/data`
- Befintliga importer fortsatter fungera via re-exports fran features-mapparna

## Genomforande i ordning

1. Skapa `src/entities/` med undermappar: property, building, residence, tenant, barrier
2. Flytta typer fran `shared/types/api.ts` till respektive entity
3. Flytta data fran `features/*/data/` till `entities/*/data/`
4. Flytta grundlaggande UI-komponenter till `entities/*/ui/`
5. Uppdatera barrel-exports i features/ sa de re-exporterar fran entities/
6. Skapa `src/widgets/` med navigation och detail-tabs
7. Flytta layout-komponenter till widgets/
8. Uppdatera alla importer (eller anvand alias for bakatkompatibilitet)

## Risker

- Manga filer importerar fran `@/types/api` (som redan pekar pa `shared/types/api.ts`). Re-exports behover bibehallas.
- Features-barrel-exports (`features/properties/index.ts`) maste fortsatta fungera for befintliga konsumenter.
- Stegvis migration rekommenderas: borja med entities, verifiera, sedan widgets.

