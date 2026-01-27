

# Migrationsplan: Feature-First Arkitektur

## Sammanfattning

Projektet ska migreras från nuvarande struktur till den nya feature-first arkitekturen enligt knowledge-filen. **Ekonomi-domänen är redan migrerad** och tjänar som mall för övriga domäner.

---

## Nuvarande vs Målstruktur

### Nuvarande struktur
```text
src/
├── components/
│   ├── barriers/          ← ska till features/
│   ├── buildings/         ← ska till features/
│   ├── communication/     ← ska till features/
│   ├── favorites/         ← ska till features/
│   ├── layout/            ✅ KLAR (re-export till layouts/)
│   ├── navigation/        ✅ KLAR (Breadcrumb till common/)
│   ├── orders/            ← ska till features/
│   ├── properties/        ← ska till features/
│   ├── rentals/           ← ska till features/
│   ├── residence/         ← ska till features/
│   ├── search/            ← ska till features/
│   ├── shared/            ✅ KLAR (re-export till common/)
│   ├── tenants/           ← ska till features/
│   ├── turnover/          ← ska till features/
│   └── ui/                ← BEHÅLL (shadcn)
├── data/                  ← ska fördelas till features/
├── hooks/                 ← ska fördelas till features/
├── types/                 ← ska fördelas till features/
└── features/ekonomi/      ✅ KLAR
```

### Målstruktur
```text
src/
├── components/
│   ├── ui/                ← shadcn (behåll)
│   └── common/            ✅ KLAR (från shared/)
├── layouts/               ✅ KLAR
│   ├── main-layout.tsx
│   ├── NavigationBar.tsx
│   └── TreeView/
├── features/
│   ├── ekonomi/           ✅ KLAR
│   ├── tenants/
│   ├── properties/
│   ├── buildings/
│   ├── residences/
│   ├── rentals/
│   ├── orders/
│   ├── barriers/
│   ├── turnover/
│   ├── favorites/
│   ├── search/
│   ├── inspections/
│   └── communication/
├── hooks/                 ← endast delade hooks
├── services/              ← behåll
└── pages/                 ← behåll
```

---

## Domäner att migrera (prioritetsordning)

| Prioritet | Domän | Komplexitet | Komponenter | Hooks | Data/Types |
|-----------|-------|-------------|-------------|-------|------------|
| 1 | **tenants** | Hög | 17 filer | 1 | tenants.ts, tenant-events.ts |
| 2 | **properties** | Hög | 18 filer | 3 | properties/, properties.ts |
| 3 | **buildings** | Medel | 8 filer | 2 | buildings.ts |
| 4 | **residences** | Hög | 13 filer | 2 | residences.ts, rooms.ts |
| 5 | **rentals** | Mycket hög | 30+ filer | 8 | published-housing.ts, unpublished-housing.ts |
| 6 | **orders** | Medel | 8 filer | 3 | - |
| 7 | **barriers** | Låg | 4 filer | 0 | barriers.ts |
| 8 | **turnover** | Medel | 6 filer | 1 | turnover.ts |
| 9 | **favorites** | Låg | 3 filer | 1 | - |
| 10 | **search** | Medel | 4 filer | 1 | search.ts, searchData.ts |
| 11 | **inspections** | Medel | subfolder i residence | 2 | - |
| 12 | **communication** | Låg | 3 filer | 0 | messageTemplates.ts |

---

## Fas 1: Strukturella ändringar ✅ KLAR

### 1.1 Skapa src/layouts/ ✅
| Från | Till | Status |
|------|------|--------|
| `src/components/layout/PageLayout.tsx` | `src/layouts/main-layout.tsx` | ✅ |
| `src/components/NavigationBar.tsx` | `src/layouts/NavigationBar.tsx` | ✅ |
| `src/components/TreeView.tsx` | `src/layouts/TreeView.tsx` | ✅ |
| `src/components/treeview/` | `src/layouts/treeview/` | ✅ |

### 1.2 Flytta shared till common ✅
| Från | Till | Status |
|------|------|--------|
| `src/components/shared/*` | `src/components/common/*` | ✅ |
| `src/components/navigation/Breadcrumb.tsx` | `src/components/common/Breadcrumb.tsx` | ✅ |

### 1.3 Backward-compatibility re-exports ✅
Alla gamla importsökvägar fungerar via re-exports.

---

## Fas 2: Domänmigrationer

### Migrationsmall per domän

För varje domän:
1. Skapa `src/features/{domain}/` med undermappar
2. Flytta komponenter från `src/components/{domain}/`
3. Flytta relevanta typer från `src/types/`
4. Flytta relevanta data från `src/data/`
5. Flytta relevanta hooks från `src/hooks/`
6. Skapa barrel-export `index.ts`
7. Skapa backward-compatibility re-exports på gamla platser
8. Uppdatera konsumerande filer

### 2.1 Tenants-domänen
```text
src/features/tenants/
├── components/
│   ├── TenantCard.tsx
│   ├── TenantContracts.tsx
│   ├── TenantEventLog.tsx
│   ├── TenantInformationCard.tsx
│   ├── TenantMobileAccordion.tsx
│   ├── TenantsList.tsx
│   ├── parking-interest/
│   └── tabs/
├── hooks/
│   └── useTenantValidation.ts
├── types/
│   └── tenant-types.ts
├── data/
│   ├── tenants.ts
│   └── tenant-events.ts
└── index.ts
```

### 2.2 Properties-domänen
```text
src/features/properties/
├── components/
│   ├── PropertyBasicInfo.tsx
│   ├── PropertyBuildingCard.tsx
│   ├── PropertyHeader.tsx
│   ├── PropertySearch.tsx
│   ├── PropertiesTable.tsx
│   └── tabs/
├── hooks/
│   ├── usePropertyDetail.ts
│   └── usePropertyFilters.ts
├── data/
│   ├── properties.ts
│   └── properties/
└── index.ts
```

### 2.3 Buildings-domänen
```text
src/features/buildings/
├── components/
│   ├── BuildingBasicInfo.tsx
│   ├── BuildingHeader.tsx
│   └── tabs/
├── hooks/
│   └── useBuildingDetail.ts
├── data/
│   └── buildings.ts
└── index.ts
```

### 2.4 Residences-domänen
```text
src/features/residences/
├── components/
│   ├── ResidenceBasicInfo.tsx
│   ├── ResidenceContent.tsx
│   ├── MobileAccordion.tsx
│   ├── inspection/
│   └── tabs/
├── hooks/
│   ├── useResidenceData.ts
│   └── useInspectionForm.ts
├── data/
│   ├── residences.ts
│   └── rooms.ts
└── index.ts
```

### 2.5 Rentals-domänen (störst)
```text
src/features/rentals/
├── components/
│   ├── HousingSpacesTable.tsx
│   ├── ParkingSpacesTable.tsx
│   ├── housing-application/
│   ├── interest-application/
│   ├── publish-dialog/
│   └── tabs/
├── hooks/
│   ├── useHousingListing.ts
│   ├── useParkingSpaceActions.ts
│   └── useOfferActions.ts
├── types/
│   └── rentals-types.ts
├── data/
│   ├── published-housing.ts
│   └── unpublished-housing.ts
└── index.ts
```

### 2.6-2.12 Övriga domäner
Samma mönster för: **orders**, **barriers**, **turnover**, **favorites**, **search**, **inspections**, **communication**.

---

## Fas 3: Rensning

1. Ta bort tomma mappar i `src/components/`
2. Uppdatera `src/data/index.ts` och `src/types/index.ts` till endast re-exports
3. Verifiera alla backward-compatibility exports fungerar
4. Kör TypeScript-kontroll för trasiga importer

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
| 2 | 2.1 | Migrera tenants | ⏳ |
| 3 | 2.2 | Migrera properties | ⏳ |
| 4 | 2.3 | Migrera buildings | ⏳ |
| 5 | 2.4 | Migrera residences | ⏳ |
| 6 | 2.5 | Migrera rentals (2 omgångar) | ⏳ |
| 7 | 2.6-2.12 | Migrera övriga domäner | ⏳ |
| 8 | 3 | Rensning och verifiering | ⏳ |

---

## Filer per fas (teknisk detalj)

### Fas 1 - Nya/ändrade filer ✅
- `src/layouts/main-layout.tsx` ✅
- `src/layouts/NavigationBar.tsx` ✅
- `src/layouts/TreeView.tsx` ✅
- `src/layouts/treeview/` ✅
- `src/components/common/` ✅
- Backward-compatibility re-exports ✅

### Per domänmigration
- ~5-30 komponenter flyttas
- 0-3 hooks flyttas
- 1-3 datafiler flyttas
- 1 barrel-export skapas
- Backward-compatibility re-exports på ursprungsplatser
