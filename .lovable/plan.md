
## Ändra alternativ för avisering

Just nu är "Pappersfaktura/Kivra" sammanslaget. Användaren vill ha fyra separata värden: **E-faktura**, **Autogiro**, **Pappersfaktura**, **Kivra**.

### Ändringar

**`src/features/ekonomi/types/ledger.ts`**
- Uppdatera `InvoiceMethod`-typen:
  ```ts
  export type InvoiceMethod = 'e-faktura' | 'autogiro' | 'pappersfaktura' | 'kivra';
  ```

**`src/features/ekonomi/components/ledger/CustomerLedger.tsx`**
- Uppdatera `getInvoiceMethodLabel()` så `'pappersfaktura'` → "Pappersfaktura" och `'kivra'` → "Kivra". Default ändras till `'pappersfaktura'`.

**`src/features/ekonomi/data/ledger.ts`**
- Byt default från `'pappersfaktura-kivra'` till `'pappersfaktura'`.
- Variera mock-datan så några kunder har `'kivra'` för att visa det nya värdet.

### Utanför scope
Ingen UI för att *välja* aviseringsmetod ändras — fältet är endast read-only i CustomerLedger idag. Säg till om du vill att jag lägger till en edit-funktion också.
