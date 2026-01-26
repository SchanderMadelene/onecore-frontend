
# Migrationsplan: Feature-baserad mappstruktur

## Nulägesanalys

### Nuvarande struktur
```text
/src
├── /components     # Blandat: domänspecifika + delade UI-komponenter
│   ├── barriers/
│   ├── buildings/
│   ├── rentals/
│   ├── residence/
│   ├── tenants/
│   ├── turnover/
│   ├── ui/         # shadcn-komponenter
│   └── shared/
├── /pages          # Sidkomponenter med viss feature-logik
│   ├── barriers/   # Har egna components/, hooks/
│   ├── inspections/  # Har egna components/, hooks/, data/
│   ├── lease-contracts/  # Har egna components/, hooks/, data/
│   └── ...
├── /hooks          # Alla hooks blandat
├── /data           # All mockdata blandat
├── /types          # Alla typer blandat
├── /services       # Få tjänster
├── /contexts       # Globala contexts
└── /utils          # Hjälpfunktioner
```

### Identifierade problem
1. **Splittrad logik**: Kod för samma feature finns i `/components/barriers/`, `/pages/barriers/components/` och `/hooks/`
2. **Svårt att hitta**: För att förstå "barriers"-featuren måste man leta på 3-4 ställen
3. **Inkonsekvent struktur**: Vissa pages har egna hooks/data, andra inte
4. **Skalbarhetsproblem**: `/hooks` och `/data` växer okontrollerat

---

## Målstruktur (2025-rekommendationer)

```text
/src
├── /features                    # Domänspecifik kod
│   ├── /barriers
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── types/
│   │   └── pages/
│   ├── /inspections
│   ├── /lease-contracts
│   ├── /properties
│   ├── /rentals
│   ├── /tenants
│   └── /turnover
├── /components                  # Enbart återanvändbara UI-komponenter
│   ├── /ui                      # shadcn (oförändrad)
│   └── /shared                  # Delade affärskomponenter
├── /hooks                       # Endast globalt återanvändbara hooks
├── /types                       # Globala/delade typer
├── /utils                       # Generella hjälpfunktioner
├── /services                    # Globala tjänster
├── /contexts                    # Globala contexts
└── /data                        # Endast delad mockdata
```

---

## Migrationsplan i 4 faser

### Fas 1: Förberedelse och pilotfeature (Barriers)
**Mål**: Skapa grundstrukturen och migrera en komplett feature som mall

**Steg:**
1. Skapa `/src/features/`-katalogen
2. Skapa `/src/features/barriers/` med underkataloger:
   - `components/` - UI-komponenter specifika för barriers
   - `hooks/` - Hooks för barriers
   - `data/` - Mockdata för barriers
   - `types/` - TypeScript-typer för barriers
   - `pages/` - Sidkomponenter
3. Flytta befintlig kod:
   - `/components/barriers/*` → `/features/barriers/components/`
   - `/pages/barriers/BarriersPage.tsx` → `/features/barriers/pages/`
   - `/pages/barriers/components/*` → `/features/barriers/components/`
   - Extrahera barrier-typer från `/types/api.ts` → `/features/barriers/types/`
   - Extrahera barrier-data från `/data/barriers.ts` → `/features/barriers/data/`
4. Skapa `index.ts` barrel-exports för varje underkatalog
5. Uppdatera importer i `App.tsx` och eventuella andra beroenden
6. Testa att allt fungerar

**Filer att flytta (Barriers):**
- `src/components/barriers/BarriersTable.tsx`
- `src/components/barriers/CreateBarrierDialog.tsx`
- `src/components/barriers/DeleteBarrierDialog.tsx`
- `src/components/barriers/EditBarrierDialog.tsx`
- `src/pages/barriers/BarriersPage.tsx`
- `src/pages/barriers/components/*`
- `src/data/barriers.ts`

---

### Fas 2: Migrera features med befintlig pages-struktur
**Mål**: Migrera features som redan har delvis strukturerad kod i `/pages/`

**Features att migrera:**
1. **Inspections** (har redan components/, hooks/, data/ i pages/)
2. **Lease Contracts** (har redan components/, hooks/, data/ i pages/)
3. **Turnover** (har components/ i pages/ och i /components/)

**Steg per feature:**
1. Skapa `/features/{feature}/` med standardstruktur
2. Flytta all kod från `/pages/{feature}/` till `/features/{feature}/`
3. Flytta relaterad kod från `/components/{feature}/` till `/features/{feature}/components/`
4. Flytta relaterade hooks från `/hooks/` till `/features/{feature}/hooks/`
5. Flytta relaterade data från `/data/` till `/features/{feature}/data/`
6. Uppdatera importer

**Mappning:**
| Nuvarande | Ny plats |
|-----------|----------|
| `/pages/inspections/*` | `/features/inspections/` |
| `/hooks/useInspectionForm.ts` | `/features/inspections/hooks/` |
| `/hooks/useInspectionProgress.ts` | `/features/inspections/hooks/` |
| `/pages/lease-contracts/*` | `/features/lease-contracts/` |
| `/types/leaseContract.ts` | `/features/lease-contracts/types/` |
| `/pages/turnover/*` | `/features/turnover/` |
| `/components/turnover/*` | `/features/turnover/components/` |
| `/hooks/useTurnoverCases.ts` | `/features/turnover/hooks/` |
| `/data/turnover.ts` | `/features/turnover/data/` |

---

### Fas 3: Migrera större features
**Mål**: Hantera de större och mer komplexa features

**Features att migrera:**
1. **Properties** - Inkluderar buildings och residences
2. **Tenants**
3. **Rentals** - Inkluderar housing och parking

**Steg för Properties:**
1. Skapa `/features/properties/` med:
   - `components/` - PropertySearch, PropertyBasicInfo, etc.
   - `hooks/` - usePropertyDetail, usePropertyFilters, usePropertyFromBuilding
   - `pages/` - AllPropertiesPage, PropertyDetailPage
   - `data/` - Mockdata för properties
   - `types/` - Property-relaterade typer
2. Skapa subfolder för buildings: `/features/properties/buildings/`
3. Skapa subfolder för residences: `/features/properties/residences/`

**Mappning för Properties:**
| Nuvarande | Ny plats |
|-----------|----------|
| `/pages/properties/*` | `/features/properties/pages/` |
| `/components/properties/*` | `/features/properties/components/` |
| `/components/buildings/*` | `/features/properties/buildings/components/` |
| `/components/residence/*` | `/features/properties/residences/components/` |
| `/hooks/usePropertyDetail.ts` | `/features/properties/hooks/` |
| `/hooks/useBuildingDetail.ts` | `/features/properties/buildings/hooks/` |
| `/hooks/useResidenceData.ts` | `/features/properties/residences/hooks/` |
| `/data/properties.ts` | `/features/properties/data/` |
| `/data/buildings.ts` | `/features/properties/buildings/data/` |
| `/data/residences.ts` | `/features/properties/residences/data/` |

---

### Fas 4: Städning och optimering
**Mål**: Finslipa strukturen och säkerställa konsistens

**Steg:**
1. **Rensa tomma kataloger**: Ta bort gamla `/components/{feature}/` som nu är tomma
2. **Konsolidera `/hooks/`**: Behåll endast globalt återanvändbara hooks
   - Behåll: `use-mobile.tsx`, `use-toast.ts`, `useDebounce.ts`, `useFavorites.ts`, `useGlobalSearch.ts`
   - Flytta resterande till respektive feature
3. **Konsolidera `/data/`**: Behåll endast delad data
   - Behåll: `companies.ts`, `search.ts`, `searchData.ts`
   - Flytta resterande till respektive feature
4. **Uppdatera path aliases** i `vite.config.ts`:
   ```ts
   alias: {
     "@/features": path.resolve(__dirname, "src/features"),
     // befintliga aliases...
   }
   ```
5. **Skapa index-filer** för varje feature för enkel import
6. **Uppdatera dokumentation** och custom knowledge

---

## Slutresultat efter migration

```text
/src
├── /features
│   ├── /barriers
│   │   ├── components/
│   │   │   ├── BarriersTable.tsx
│   │   │   ├── CreateBarrierDialog.tsx
│   │   │   ├── DeleteBarrierDialog.tsx
│   │   │   ├── EditBarrierDialog.tsx
│   │   │   └── index.ts
│   │   ├── data/
│   │   │   ├── barriers.ts
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── BarriersPage.tsx
│   │   │   └── index.ts
│   │   ├── types/
│   │   │   ├── barrier.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   │
│   ├── /inspections
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── pages/
│   │   └── types/
│   │
│   ├── /lease-contracts
│   │   └── ...
│   │
│   ├── /properties
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── /buildings
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── data/
│   │   └── /residences
│   │       ├── components/
│   │       ├── hooks/
│   │       └── data/
│   │
│   ├── /rentals
│   │   └── ...
│   │
│   ├── /tenants
│   │   └── ...
│   │
│   └── /turnover
│       └── ...
│
├── /components
│   ├── /ui              # shadcn - oförändrad
│   └── /shared          # Delade komponenter (Notes, layout, etc.)
│
├── /hooks               # Endast globala: use-mobile, useDebounce, etc.
├── /contexts            # Globala contexts (oförändrad)
├── /types               # Delade typer: api.ts, search.ts
├── /utils               # Generella utils: excelExport, breadcrumbUtils
├── /services            # Globala tjänster
└── /data                # Delad data: companies, search
```

---

## Tekniska detaljer

### Import-exempel efter migration
```tsx
// Före
import { BarriersTable } from "@/components/barriers/BarriersTable";
import { useInspectionForm } from "@/hooks/useInspectionForm";
import { mockBarriers } from "@/data/barriers";

// Efter
import { BarriersTable } from "@/features/barriers/components";
import { useInspectionForm } from "@/features/inspections/hooks";
import { mockBarriers } from "@/features/barriers/data";
```

### Barrel exports (index.ts)
```ts
// features/barriers/index.ts
export * from "./components";
export * from "./pages";
export * from "./types";
export * from "./data";
```

### App.tsx uppdatering
```tsx
// Uppdaterade importer
import BarriersPage from "@/features/barriers/pages/BarriersPage";
import AllInspectionsPage from "@/features/inspections/pages/AllInspectionsPage";
// etc.
```

---

## Tidsuppskattning och rekommendationer

| Fas | Uppskattad tid | Prioritet |
|-----|----------------|-----------|
| Fas 1: Barriers | 1 session | Hög |
| Fas 2: Inspections, Lease Contracts, Turnover | 2-3 sessioner | Hög |
| Fas 3: Properties, Tenants, Rentals | 3-4 sessioner | Medium |
| Fas 4: Städning | 1 session | Låg |

**Rekommendationer:**
- Migrera en feature åt gången och testa noggrant innan nästa
- Börja med enklare features (Barriers, Turnover) för att etablera mönstret
- Behåll gamla filer tills alla beroenden är uppdaterade
- Uppdatera custom knowledge efter varje fas
