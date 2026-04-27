## Plan: Dölj breadcrumbs på Uthyrning

`PropertyBreadcrumb` renderas globalt i `src/layouts/main-layout.tsx` (rad 114). Villkora renderingen så den inte visas på rutter under `/rentals`.

### Ändring
**`src/layouts/main-layout.tsx`** rad 114:
```tsx
{!location.pathname.startsWith("/rentals") && <PropertyBreadcrumb />}
```

`location` finns redan i scope (rad 31). Inga andra filer berörs.

### Resultat
- `/rentals`, `/rentals/housing`, `/rentals/parking`, `/rentals/storage` och alla undersidor visar inte längre breadcrumbs
- Övriga sidor påverkas inte
- Den befintliga "← Uthyrning"-raden i `RentalsPage` behålls som lokal navigering