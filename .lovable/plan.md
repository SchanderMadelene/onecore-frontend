
# Städningsplan: Ta bort dubbletter i src/components/

## Sammanfattning
Majoriteten av filerna i `src/components/` är nu enbart re-export-filer som pekar till `src/features/` eller `src/components/common/`. Dessa kan raderas och de få konsumerande filerna uppdateras att importera direkt från rätt källa.

---

## Analys

### Mappar som är **helt tomma re-exports** (kan raderas helt):
| Mapp | Status |
|------|--------|
| `barriers/` | 4 filer, alla re-exports → @/features/barriers |
| `buildings/` | ~8 filer, alla re-exports → @/features/buildings |
| `communication/` | 3 filer, alla re-exports → @/features/communication |
| `favorites/` | 2 filer, alla re-exports → @/features/favorites |
| `orders/` | ~12 filer, alla re-exports → @/features/orders |
| `turnover/` | 6 filer, alla re-exports → @/features/turnover |
| `search/` | 4 filer, alla re-exports → @/features/search |
| `layout/` | 1 fil, re-export → @/layouts |
| `treeview/` | ~6 filer, alla re-exports → @/layouts/treeview |

### Mappar med **blandad kod** (rensa re-exports, behåll riktig kod):
| Mapp | Status |
|------|--------|
| `properties/` | Re-exports + tabs/ har riktig kod - uppdatera imports |
| `rentals/` | Mestadels re-exports, men `edit-housing/`, `tabs/`, `types/` etc har riktig kod |
| `residence/` | Alla re-exports utom `tabs/FeatureGatedContent` och `RoomOrientation.ts` |
| `tenants/` | Mestadels re-exports, men några har riktig kod |
| `shared/` | 5 filer är re-exports, `Notes/` är helt en re-export, `ComponentCard` re-export |
| `navigation/` | 1 fil Breadcrumb.tsx som är re-export |

### Mappar som **behålls som de är**:
| Mapp | Anledning |
|------|-----------|
| `common/` | Riktig kod – Notes, Breadcrumb, ComponentCard etc |
| `ui/` | shadcn-komponenter |
| `design-system/` | Showcase-komponenter |
| `settings/` | Riktig kod för inställningssidan |
| `strofaktura/` | Riktig kod (ej re-exports) |

---

## Plan

### Fas 1: Radera tomma re-export-mappar
Ta bort följande mappar helt (de innehåller endast re-exports):

1. `src/components/barriers/` (4 filer)
2. `src/components/buildings/` (8+ filer)
3. `src/components/communication/` (3 filer)
4. `src/components/favorites/` (2 filer)
5. `src/components/orders/` (12+ filer)
6. `src/components/turnover/` (6 filer)
7. `src/components/search/` (4 filer)
8. `src/components/layout/` (1 fil)
9. `src/components/treeview/` (6+ filer)

**Innan radering**: Uppdatera alla imports i konsumerande filer att peka direkt till `@/features/...`

### Fas 2: Uppdatera imports för borttagna mappar

| Gammal import | Ny import |
|---------------|-----------|
| `@/components/barriers` | `@/features/barriers` |
| `@/components/buildings` | `@/features/buildings` |
| `@/components/orders` | `@/features/orders` |
| `@/components/turnover` | `@/features/turnover` |
| `@/components/search` | `@/features/search` |
| `@/components/layout` | `@/layouts` |
| `@/components/treeview` | `@/layouts/treeview` |

### Fas 3: Rensa shared/-mappen
Ta bort re-exports i `shared/`:
- `Notes/` → använd `@/components/common/Notes`
- `ComponentCard.tsx` → använd `@/components/common/ComponentCard`
- `PhotoAnalyzeModal.tsx` → använd `@/components/common/PhotoAnalyzeModal`
- `SaveAsFavoriteButton.tsx` → använd `@/components/common/SaveAsFavoriteButton`
- `UpdateFavoriteDialog.tsx` → använd `@/components/common/UpdateFavoriteDialog`
- `ActiveFavoriteIndicator.tsx` → använd `@/components/common/ActiveFavoriteIndicator`

### Fas 4: Rensa navigation/-mappen
Ta bort `navigation/Breadcrumb.tsx` → använd `@/components/common/Breadcrumb`

### Fas 5: Städa properties/, rentals/, residence/, tenants/
- Ta bort alla re-export-filer i dessa mappar
- Behåll filer med riktig kod
- Uppdatera imports

---

## Filer som påverkas (import-uppdateringar)

| Fil | Ändring |
|-----|---------|
| `src/pages/barriers/components/BarriersHeader.tsx` | `@/components/barriers` → `@/features/barriers` |
| `src/components/design-system/showcase/orders/OrdersShowcase.tsx` | `@/components/orders` → `@/features/orders` |
| `src/components/properties/tabs/*.tsx` | `@/components/properties` → `@/features/properties` |
| `src/features/properties/components/tabs/*.tsx` | `@/components/properties` → `@/features/properties` |
| `src/features/residences/components/OrdersManagement.tsx` | `@/components/orders` → `@/features/orders` |
| `src/layouts/NavigationBar.tsx` | `@/components/search` → `@/features/search` |
| `src/features/buildings/components/*.tsx` | `@/components/navigation` → `@/components/common` |
| `src/features/residences/components/ResidenceContent.tsx` | `@/components/navigation` → `@/components/common` |
| + ~30 filer med `@/components/shared` → `@/components/common` |

---

## Sammanfattning av radering

**Mappar att radera helt:**
- 9 mappar (barriers, buildings, communication, favorites, orders, turnover, search, layout, treeview)
- ~50 re-export-filer

**Filer att radera i kvarvarande mappar:**
- shared/Notes/ (hela mappen)
- shared/*.tsx (5 re-export-filer)
- navigation/Breadcrumb.tsx
- properties/ (flertalet re-exports)
- rentals/ (flertalet re-exports)
- residence/ (flertalet re-exports)
- tenants/ (flertalet re-exports)

---

## Tidsuppskattning
~30-40 minuter (stort antal filer att uppdatera och radera)
