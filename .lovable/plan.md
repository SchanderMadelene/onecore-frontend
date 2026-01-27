# Migrationsplan: Feature-First Arkitektur

## Sammanfattning

**Fas 2 KLAR!** Alla 13 domäner är nu migrerade till feature-first arkitektur.

---

## Migrationsstatus ✅ KOMPLETT

| Domän | Status | Komponenter | Hooks | Data/Types |
|-------|--------|-------------|-------|------------|
| **ekonomi** | ✅ KLAR | CustomerLedger, StrofakturaForm | - | invoices.ts |
| **tenants** | ✅ KLAR | 17+ komponenter | useTenantValidation | tenants.ts, tenant-events.ts |
| **properties** | ✅ KLAR | 18+ komponenter | usePropertyDetail, usePropertyFilters | properties.ts |
| **buildings** | ✅ KLAR | 8+ komponenter | useBuildingDetail | buildings.ts |
| **residences** | ✅ KLAR | 13+ komponenter + inspection/ | useResidenceData, useInspectionForm | residences.ts, rooms.ts |
| **rentals** | ✅ KLAR | 30+ komponenter | 8 hooks | published-housing.ts, unpublished-housing.ts |
| **orders** | ✅ KLAR | OrderCard, OrderForm, CreateOrderDialog | useOrdersService, useOrderForm | orders.ts |
| **inspections** | ✅ KLAR | 4 page-komponenter | useInspectionFilters, useInspectionSorting | inspections.ts |
| **barriers** | ✅ KLAR | 4 komponenter | - | barriers.ts |
| **turnover** | ✅ KLAR | 6 komponenter | useTurnoverCases | turnover.ts |
| **favorites** | ✅ KLAR | 2 komponenter | useFavorites | - |
| **search** | ✅ KLAR | 4 komponenter | useGlobalSearch | search.ts, searchData.ts |
| **communication** | ✅ KLAR | 3 komponenter | - | messageTemplates.ts |

---

## Fas 3: Rensning ⏳

1. ⏳ Ta bort tomma mappar i `src/components/`
2. ⏳ Verifiera alla backward-compatibility exports fungerar
3. ⏳ Kör TypeScript-kontroll för trasiga importer

---

## Hooks som förblir globala i src/hooks/

- `use-mobile.tsx`
- `use-toast.ts`
- `useDebounce.ts`

---

## Genomförandeordning

| Steg | Fas | Beskrivning | Status |
|------|-----|-------------|--------|
| 1 | 1.1-1.3 | Strukturella ändringar (layouts, common) | ✅ KLAR |
| 2 | 2.1-2.12 | Migrera alla domäner | ✅ KLAR |
| 3 | 3 | Rensning och verifiering | ⏳ |
