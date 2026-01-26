

# Uppdaterad Struktur: Flat Pages & Layout på Root-nivå

## Strukturella ändringar

### 1. Flat pages-struktur
Alla sidkomponenter ligger direkt under `/pages/` utan undermappar:

```text
/src/pages/
├── AllInspectionsPage.tsx
├── AllPropertiesPage.tsx
├── AllTenantsPage.tsx
├── BarriersPage.tsx
├── BuildingDetailPage.tsx
├── CreateHousingAdPage.tsx
├── DesignSystemPage.tsx
├── FavoritesPage.tsx
├── HousingDetailPage.tsx
├── Index.tsx
├── LeaseContractsPage.tsx
├── NotFound.tsx
├── ParkingSpaceDetailPage.tsx
├── PropertyDetailPage.tsx
├── RentalsPage.tsx
├── ResidencePage.tsx
├── ResidenceProfilePage.tsx
├── SettingsPage.tsx
├── StrofakturaUnderlagPage.tsx
├── TenantDetailPage.tsx
└── TurnoverPage.tsx
```

### 2. Layout på root-nivå
Flytta layout ut från components:

```text
/src/
├── layout/
│   └── PageLayout.tsx
├── features/
├── pages/
├── components/
│   ├── ui/
│   └── shared/
└── ...
```

## Åtgärder

### Steg 1: Skapa /src/layout/
- Flytta `src/components/layout/PageLayout.tsx` → `src/layout/PageLayout.tsx`
- Uppdatera alla importer från `@/components/layout/PageLayout` till `@/layout/PageLayout`
- Ta bort `/src/components/layout/`

### Steg 2: Flytta pages till flat struktur
Filer att flytta:

| Från | Till |
|------|------|
| `pages/barriers/BarriersPage.tsx` | `pages/BarriersPage.tsx` |
| `pages/inspections/AllInspectionsPage.tsx` | `pages/AllInspectionsPage.tsx` |
| `pages/lease-contracts/LeaseContractsPage.tsx` | `pages/LeaseContractsPage.tsx` |
| `pages/turnover/TurnoverPage.tsx` | `pages/TurnoverPage.tsx` |
| `pages/tenants/AllTenantsPage.tsx` | `pages/AllTenantsPage.tsx` |
| `pages/tenants/TenantDetailPage.tsx` | `pages/TenantDetailPage.tsx` |
| `pages/properties/AllPropertiesPage.tsx` | `pages/AllPropertiesPage.tsx` |
| `pages/properties/PropertyDetailPage.tsx` | `pages/PropertyDetailPage.tsx` |
| `pages/properties/BuildingDetailPage.tsx` | `pages/BuildingDetailPage.tsx` |
| `pages/properties/ResidencePage.tsx` | `pages/ResidencePage.tsx` |
| `pages/rentals/RentalsPage.tsx` | `pages/RentalsPage.tsx` |
| `pages/rentals/CreateHousingAdPage.tsx` | `pages/CreateHousingAdPage.tsx` |
| `pages/rentals/HousingDetailPage.tsx` | `pages/HousingDetailPage.tsx` |
| `pages/rentals/ParkingSpaceDetailPage.tsx` | `pages/ParkingSpaceDetailPage.tsx` |
| `pages/rentals/ResidenceProfilePage.tsx` | `pages/ResidenceProfilePage.tsx` |
| `pages/favorites/FavoritesPage.tsx` | `pages/FavoritesPage.tsx` |
| `pages/strofaktura/StrofakturaUnderlagPage.tsx` | `pages/StrofakturaUnderlagPage.tsx` |
| `pages/design-system/DesignSystemPage.tsx` | `pages/DesignSystemPage.tsx` |
| `pages/settings/SettingsPage.tsx` | `pages/SettingsPage.tsx` |

### Steg 3: Flytta page-specifika komponenter till features
Komponenter i `pages/*/components/` och `pages/*/utils/` ska flyttas till respektive feature:

| Från | Till |
|------|------|
| `pages/properties/components/*` | `features/properties/components/` |
| `pages/rentals/components/*` | `features/rentals/components/` |
| `pages/rentals/utils/*` | `features/rentals/utils/` |
| `pages/lease-contracts/components/*` | `features/lease-contracts/components/` |
| `pages/lease-contracts/hooks/*` | `features/lease-contracts/hooks/` |
| `pages/lease-contracts/data/*` | `features/lease-contracts/data/` |
| `pages/turnover/components/*` | `features/turnover/components/` |
| `pages/tenants/components/*` | `features/tenants/components/` |

### Steg 4: Uppdatera App.tsx
Alla page-importer uppdateras till flat struktur:

```tsx
// Före
import BarriersPage from "@/pages/barriers/BarriersPage";
import AllPropertiesPage from "./pages/properties/AllPropertiesPage";

// Efter
import BarriersPage from "@/pages/BarriersPage";
import AllPropertiesPage from "@/pages/AllPropertiesPage";
```

### Steg 5: Ta bort tomma mappar
Ta bort alla nu-tomma undermappar under `/pages/`:
- `pages/barriers/`
- `pages/inspections/`
- `pages/lease-contracts/`
- `pages/turnover/`
- `pages/tenants/`
- `pages/properties/`
- `pages/rentals/`
- `pages/favorites/`
- `pages/strofaktura/`
- `pages/design-system/`
- `pages/settings/`

## Uppdaterad målstruktur

```text
/src
├── /layout                      # Layout-komponenter
│   └── PageLayout.tsx
│
├── /features                    # Domänspecifik logik
│   ├── /barriers
│   ├── /inspections
│   ├── /lease-contracts
│   ├── /turnover
│   ├── /tenants
│   ├── /properties
│   │   ├── /buildings
│   │   └── /residences
│   ├── /rentals
│   ├── /strofaktura
│   ├── /favorites
│   └── /orders
│
├── /pages                       # Flat - alla pages direkt här
│   ├── AllInspectionsPage.tsx
│   ├── AllPropertiesPage.tsx
│   ├── AllTenantsPage.tsx
│   ├── BarriersPage.tsx
│   ├── BuildingDetailPage.tsx
│   ├── CreateHousingAdPage.tsx
│   ├── DesignSystemPage.tsx
│   ├── FavoritesPage.tsx
│   ├── HousingDetailPage.tsx
│   ├── Index.tsx
│   ├── LeaseContractsPage.tsx
│   ├── NotFound.tsx
│   ├── ParkingSpaceDetailPage.tsx
│   ├── PropertyDetailPage.tsx
│   ├── RentalsPage.tsx
│   ├── ResidencePage.tsx
│   ├── ResidenceProfilePage.tsx
│   ├── SettingsPage.tsx
│   ├── StrofakturaUnderlagPage.tsx
│   ├── TenantDetailPage.tsx
│   └── TurnoverPage.tsx
│
├── /components                  # Delade UI-komponenter
│   ├── /ui                      # shadcn
│   └── /shared                  # Delade affärskomponenter
│
├── /hooks                       # Globala hooks
├── /contexts                    # Globala contexts
├── /types                       # Delade typer
├── /utils                       # Generella utils
├── /data                        # Delad data
└── /services                    # Globala tjänster
```

## Implementeringsordning

1. **Först:** Flytta layout till `/src/layout/` och uppdatera importer
2. **Sen:** Migrera features enligt tidigare plan (Lease Contracts → Turnover → Tenants → etc.)
3. **Under varje feature-migration:** Flytta pages till flat struktur
4. **Sist:** Städa tomma mappar

