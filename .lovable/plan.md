

## Plan: Skapa delad ConfirmDialog och refaktorera

### Ny komponent: `src/shared/common/ConfirmDialog.tsx`

```text
Props:
  - open: boolean
  - onOpenChange: (open: boolean) => void
  - title: string
  - description: ReactNode
  - onConfirm: () => void
  - confirmLabel?: string (default "Bekräfta")
  - cancelLabel?: string (default "Avbryt")
  - variant?: "default" | "destructive" (default "default")
  - isPending?: boolean
  - pendingLabel?: string (default "Bekräftar...")
  - error?: string | null
  - className?: string (på AlertDialogContent)
```

### Refaktoreringar

**1. `OfferActions.tsx`** — ersätt 2 inline AlertDialog-block med `<ConfirmDialog />`

**2. `ApplicantActions.tsx`** — ersätt 1 inline AlertDialog med `<ConfirmDialog variant="destructive" />`

**3. `DeleteListingDialog.tsx`** — ersätt inner AlertDialog med `<ConfirmDialog variant="destructive" error={error} />`. Behåller trigger-knappen (Trash2) utanför.

**4. `DeleteBarrierDialog.tsx`** — ersätt de 2 enkla AlertDialog-fallen (bekräfta radering + inaktiv spärr) med `<ConfirmDialog variant="destructive" />`. Den aktiva-spärr-dialogen har 3 knappar och behålls som custom AlertDialog.

**5. `StewardAdminPage.tsx`** — ersätt 2 inline AlertDialog-block (avbryt/spara) med `<ConfirmDialog />`

### Designsystem

Lägg till en ConfirmDialog-demo i `FilterSearchShowcase.tsx` (eller lämplig showcase-fil) med default- och destructive-varianter.

### Export

Lägg till `ConfirmDialog` i `src/shared/common/index.ts`.

### Påverkan
- 1 ny delad komponent
- 5 filer förenklas, ~8 inline AlertDialog-mönster ersätts
- DeleteBarrierDialog:s aktiva-spärr-dialog (3 knappar) behålls som den är

