# Migrationsplan: Feature-First Arkitektur

## Sammanfattning

Projektet migreras från nuvarande struktur till den nya feature-first arkitekturen. **8 av 12 domäner är nu migrerade.**

---

## Migrationsstatus

| Domän | Status | Komponenter | Hooks | Data/Types |
|-------|--------|-------------|-------|------------|
| **ekonomi** | ✅ KLAR | CustomerLedger, StrofakturaForm, etc. | - | invoices.ts |
| **tenants** | ✅ KLAR | 17+ komponenter | useTenantValidation | tenants.ts, tenant-events.ts |
| **properties** | ✅ KLAR | 18+ komponenter | usePropertyDetail, usePropertyFilters | properties.ts |
| **buildings** | ✅ KLAR | 8+ komponenter | useBuildingDetail | buildings.ts |
| **residences** | ✅ KLAR | 13+ komponenter + inspection/ | useResidenceData, useInspectionForm | residences.ts, rooms.ts |
| **rentals** | ✅ KLAR | 30+ komponenter | 8 hooks | published-housing.ts, unpublished-housing.ts |
| **orders** | ✅ KLAR | OrderCard, OrderForm, CreateOrderDialog | useOrdersService, useOrderForm | orders.ts |
| **inspections** | ✅ KLAR | 4 page-komponenter | useInspectionFilters, useInspectionSorting | inspections.ts |
| **barriers** | ⏳ Kvar | 4 filer | 0 | barriers.ts |
| **turnover** | ⏳ Kvar | 6 filer | 1 | turnover.ts |
| **favorites** | ⏳ Kvar | 3 filer | 1 | - |
| **search** | ⏳ Kvar | 4 filer | 1 | search.ts, searchData.ts |
| **communication** | ⏳ Kvar | 3 filer | 0 | messageTemplates.ts |

---

## Nuvarande struktur

```text
src/
├── components/
│   ├── barriers/          ⏳ ska till features/
│   ├── buildings/         ✅ re-export → features/buildings/
│   ├── communication/     ⏳ ska till features/
│   ├── favorites/         ⏳ ska till features/
│   ├── layout/            ✅ re-export → layouts/
│   ├── navigation/        ✅ re-export → common/
│   ├── orders/            ✅ re-export → features/orders/
│   ├── properties/        ✅ re-export → features/properties/
│   ├── rentals/           ✅ re-export → features/rentals/
│   ├── residence/         ✅ re-export → features/residences/
│   ├── search/            ⏳ ska till features/
│   ├── shared/            ✅ re-export → common/
│   ├── tenants/           ✅ re-export → features/tenants/
│   ├── turnover/          ⏳ ska till features/
│   ├── ui/                ✅ BEHÅLL (shadcn)
│   └── common/            ✅ KLAR
├── layouts/               ✅ KLAR
├── features/
│   ├── ekonomi/           ✅ KLAR
│   ├── tenants/           ✅ KLAR
│   ├── properties/        ✅ KLAR
│   ├── buildings/         ✅ KLAR
│   ├── residences/        ✅ KLAR
│   ├── rentals/           ✅ KLAR
│   ├── orders/            ✅ KLAR
│   └── inspections/       ✅ KLAR
├── hooks/                 ✅ Delade hooks + re-exports
├── services/              ✅ Behålls
└── pages/                 ✅ Behålls
```

---

## Fas 1: Strukturella ändringar ✅ KLAR

- `src/layouts/` skapad med main-layout, NavigationBar, TreeView
- `src/components/common/` skapad från shared/
- Backward-compatibility re-exports på plats

---

## Fas 2: Domänmigrationer

### 2.1 Tenants ✅ KLAR
```text
src/features/tenants/
├── components/ (TenantCard, TenantContracts, TenantsList, tabs/, parking-interest/)
├── hooks/ (useTenantValidation)
├── data/ (tenants.ts, tenant-events.ts)
└── index.ts
```

### 2.2 Properties ✅ KLAR
```text
src/features/properties/
├── components/ (PropertyHeader, PropertySearch, PropertiesTable, tabs/)
├── hooks/ (usePropertyDetail, usePropertyFilters)
├── data/ (properties.ts, properties/)
└── index.ts
```

### 2.3 Buildings ✅ KLAR
```text
src/features/buildings/
├── components/ (BuildingHeader, BuildingBasicInfo, tabs/)
├── hooks/ (useBuildingDetail)
├── data/ (buildings.ts)
└── index.ts
```

### 2.4 Residences ✅ KLAR
```text
src/features/residences/
├── components/ (ResidenceContent, MobileAccordion, inspection/, tabs/)
├── hooks/ (useResidenceData, useInspectionForm, useInspectionProgress)
├── data/ (residences.ts, rooms.ts)
└── index.ts
```

### 2.5 Rentals ✅ KLAR
```text
src/features/rentals/
├── components/ (30+ komponenter, tabs/, publish-dialog/, interest-application/)
├── hooks/ (useParkingSpaceListing, useHousingListing, useOfferActions, etc.)
├── types/ (housing.ts, parking.ts, unpublished-housing.ts)
├── data/ (published-housing.ts, unpublished-housing.ts)
└── index.ts
```

### 2.6 Orders ✅ KLAR
```text
src/features/orders/
├── components/ (OrderCard, OrdersTable, OrderForm, CreateOrderDialog, form/, form-rhf/)
├── hooks/ (useOrdersService, useOrderForm, useOrderFormValidation)
├── types/ (order.ts)
├── data/ (orders.ts)
└── index.ts
```

### 2.7 Inspections ✅ KLAR
```text
src/features/inspections/
├── components/ (InspectionsHeader, DateCell, InspectorCell, SortableHeader)
├── hooks/ (useInspectionFilters, useInspectionSorting)
├── types/ (inspection.ts - ExtendedInspection)
├── data/ (inspections.ts - getAllInspections, AVAILABLE_INSPECTORS)
└── index.ts
```

### 2.8-2.12 Kvarvarande domäner ⏳

| Domän | Komplexitet | Uppskattad tid |
|-------|-------------|----------------|
| barriers | Låg | 5 min |
| turnover | Medel | 10 min |
| favorites | Låg | 5 min |
| search | Medel | 10 min |
| communication | Låg | 5 min |

---

## Fas 3: Rensning ⏳

1. ⏳ Ta bort tomma mappar i `src/components/`
2. ⏳ Uppdatera `src/data/index.ts` och `src/types/index.ts` till endast re-exports
3. ⏳ Verifiera alla backward-compatibility exports fungerar
4. ⏳ Kör TypeScript-kontroll för trasiga importer

---

## Hooks som förblir globala i src/hooks/

- `use-mobile.tsx`
- `use-toast.ts`
- `useDebounce.ts`
- `useFavorites.ts`
- `useGlobalSearch.ts`

---

## Genomförandeordning

| Steg | Fas | Beskrivning | Status |
|------|-----|-------------|--------|
| 1 | 1.1-1.3 | Strukturella ändringar (layouts, common) | ✅ KLAR |
| 2 | 2.1 | Migrera tenants | ✅ KLAR |
| 3 | 2.2 | Migrera properties | ✅ KLAR |
| 4 | 2.3 | Migrera buildings | ✅ KLAR |
| 5 | 2.4 | Migrera residences | ✅ KLAR |
| 6 | 2.5 | Migrera rentals | ✅ KLAR |
| 7 | 2.6 | Migrera orders | ✅ KLAR |
| 8 | 2.7 | Migrera inspections | ✅ KLAR |
| 9 | 2.8-2.12 | Migrera övriga (barriers, turnover, favorites, search, communication) | ⏳ |
| 10 | 3 | Rensning och verifiering | ⏳ |
