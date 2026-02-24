

# Fix: Ta bort full-width stretching pa badges

## Problem

Att lagga till `className="flex items-center gap-1"` pa Badge-komponenten overskriver dess default `inline-flex` fran badgeVariants, vilket gor att badgen tar upp hela radens bredd.

## Losning

Byt `className="flex items-center gap-1"` till bara `className="gap-1"`. Badge har redan `inline-flex items-center` i sin CVA-definition, sa vi behover bara lagga till `gap-1` for att fa mellanrum mellan text och ikon.

## Tekniska detaljer

### Andrad fil

| Fil | Andring |
|-----|---------|
| `src/features/ekonomi/components/ledger/InvoicesTable.tsx` | Byt `className="flex items-center gap-1"` till `className="gap-1"` pa bada stallen |

### Andringar

1. **Mobilvy (rad 91)**: Andra fran:
```tsx
<Badge variant={...} className="flex items-center gap-1">
```
till:
```tsx
<Badge variant={...} className="gap-1">
```

2. **Desktopvy (rad 397)**: Samma andring.

Badge-komponenten har redan `inline-flex items-center` i sin CVA-bas, sa vi behover inte upprepa det.

