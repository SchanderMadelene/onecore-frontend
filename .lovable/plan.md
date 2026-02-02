
# Städningsplan: Ta bort dubbletter i src/components/

## Status: ✅ GENOMFÖRD

Städningen av re-export-filer i `src/components/` är slutförd.

### Raderade mappar/filer:
- `src/components/orders/` - Hela mappen raderad (~15 filer)
- `src/components/tenants/` - Alla re-exports raderade (~20 filer)
- `src/components/residence/` - Alla filer raderade (~40 filer)
- `src/components/shared/` - Alla re-exports raderade (6 filer)
- `src/components/navigation/` - Breadcrumb.tsx raderad
- `src/components/treeview/` - index.ts raderad

### Uppdaterade imports:
- `@/components/orders/*` → `@/features/orders`
- `@/components/tenants/*` → `@/features/tenants`
- `@/components/residence/*` → `@/features/residences/components/*`
- `@/components/shared/*` → `@/components/common`
- `@/components/navigation/*` → `@/components/common`

### Kvarvarande mappar i src/components/:
- `common/` - Riktig delad kod (Notes, Breadcrumb, ComponentCard, etc.)
- `ui/` - shadcn-komponenter
- `design-system/` - Showcase-komponenter
- `settings/` - Inställningssidan
- `strofaktura/` - Riktig kod
- `properties/tabs/` - Riktig kod (PropertyMaintenanceUnitsTab, PropertyOrdersTab)
- `rentals/` - Riktig kod i edit-housing/, tabs/, types/
