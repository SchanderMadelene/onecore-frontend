
# Migrationsplan: Ekonomi-domänen till Feature-First Struktur

## Sammanfattning
Ekonomi-domänen ska migreras från den nuvarande spridda strukturen till `src/features/ekonomi/` enligt feature-first arkitekturen. Detta omfattar kundreskontra (ledger), fakturor och ströfaktura-funktionalitet.

## Nuvarande struktur (före migration)

```text
src/
├── components/
│   ├── tenants/
│   │   ├── TenantLedger.tsx          ← Kundreskontra-vy
│   │   └── InvoicesTable.tsx         ← Fakturatabell (627 rader)
│   └── strofaktura/
│       ├── StrofakturaForm.tsx       ← Huvudformulär
│       ├── CustomerSearchSection.tsx  ← Kundsökning
│       ├── LeaseContractSection.tsx   ← Kontraktsväljare
│       ├── ArticleSection.tsx         ← Artikelsektion
│       └── AdditionalInfoSection.tsx  ← Övrig info
├── types/
│   ├── invoice.ts                    ← Fakturatyper
│   ├── ledger.ts                     ← Reskontratyper
│   └── strofaktura.ts                ← Ströfakturatyper
├── data/
│   ├── invoices.ts                   ← Mock-fakturadata
│   ├── ledger.ts                     ← Mock-reskontradata
│   ├── strofakturaArticles.ts        ← Artikelkatalog
│   └── strofakturaCustomers.ts       ← Mock-kunddata
└── pages/strofaktura/
    └── StrofakturaUnderlagPage.tsx   ← Sidkomponent
```

## Målstruktur (efter migration)

```text
src/features/ekonomi/
├── components/
│   ├── ledger/
│   │   ├── CustomerLedger.tsx        ← Omdöpt från TenantLedger
│   │   └── InvoicesTable.tsx
│   ├── strofaktura/
│   │   ├── StrofakturaForm.tsx
│   │   ├── CustomerSearchSection.tsx
│   │   ├── LeaseContractSection.tsx
│   │   ├── ArticleSection.tsx
│   │   └── AdditionalInfoSection.tsx
│   └── index.ts                      ← Barrel-export
├── types/
│   ├── invoice.ts
│   ├── ledger.ts
│   ├── strofaktura.ts
│   └── index.ts
├── data/
│   ├── invoices.ts
│   ├── ledger.ts
│   ├── strofakturaArticles.ts
│   ├── strofakturaCustomers.ts
│   └── index.ts
└── index.ts                          ← Huvud-export för domänen
```

## Implementationssteg

### Steg 1: Skapa katalogstruktur
Skapa följande mappar:
- `src/features/ekonomi/`
- `src/features/ekonomi/components/ledger/`
- `src/features/ekonomi/components/strofaktura/`
- `src/features/ekonomi/types/`
- `src/features/ekonomi/data/`

### Steg 2: Migrera typer
Flytta typfiler till ekonomi-domänen:

| Från | Till |
|------|------|
| `src/types/invoice.ts` | `src/features/ekonomi/types/invoice.ts` |
| `src/types/ledger.ts` | `src/features/ekonomi/types/ledger.ts` |
| `src/types/strofaktura.ts` | `src/features/ekonomi/types/strofaktura.ts` |

Skapa `src/features/ekonomi/types/index.ts` med re-exports.

### Steg 3: Migrera data
Flytta datafiler:

| Från | Till |
|------|------|
| `src/data/invoices.ts` | `src/features/ekonomi/data/invoices.ts` |
| `src/data/ledger.ts` | `src/features/ekonomi/data/ledger.ts` |
| `src/data/strofakturaArticles.ts` | `src/features/ekonomi/data/strofakturaArticles.ts` |
| `src/data/strofakturaCustomers.ts` | `src/features/ekonomi/data/strofakturaCustomers.ts` |

Uppdatera interna importer för att använda relativa sökvägar inom ekonomi-domänen.

### Steg 4: Migrera komponenter

#### Ledger-komponenter
- Flytta `src/components/tenants/TenantLedger.tsx` → `src/features/ekonomi/components/ledger/CustomerLedger.tsx`
  - Byt namn från `TenantLedger` till `CustomerLedger` för klarare domänspråk
- Flytta `src/components/tenants/InvoicesTable.tsx` → `src/features/ekonomi/components/ledger/InvoicesTable.tsx`

#### Ströfaktura-komponenter
Flytta alla filer från `src/components/strofaktura/` till `src/features/ekonomi/components/strofaktura/`:
- `StrofakturaForm.tsx`
- `CustomerSearchSection.tsx`
- `LeaseContractSection.tsx`
- `ArticleSection.tsx`
- `AdditionalInfoSection.tsx`

### Steg 5: Uppdatera importer i komponenter
Uppdatera alla importsökvägar i de migrerade filerna:

```typescript
// Före
import type { Invoice } from "@/types/invoice";
import { getMockInvoicesForCustomer } from "@/data/invoices";

// Efter
import type { Invoice } from "@/features/ekonomi/types";
import { getMockInvoicesForCustomer } from "@/features/ekonomi/data";
```

### Steg 6: Skapa barrel-exports
Skapa `src/features/ekonomi/index.ts`:
```typescript
// Komponenter
export { CustomerLedger } from "./components/ledger/CustomerLedger";
export { InvoicesTable } from "./components/ledger/InvoicesTable";
export { StrofakturaForm } from "./components/strofaktura/StrofakturaForm";

// Typer
export * from "./types";

// Data
export * from "./data";
```

### Steg 7: Skapa backward-compatibility re-exports
För att inte bryta existerande kod, skapa re-exports på de gamla platserna:

**`src/components/tenants/TenantLedger.tsx`** (omvandla till re-export):
```typescript
export { CustomerLedger as TenantLedger } from "@/features/ekonomi";
```

**`src/components/strofaktura/index.ts`**:
```typescript
export { StrofakturaForm } from "@/features/ekonomi";
// etc.
```

### Steg 8: Uppdatera konsumenter
Uppdatera följande filer att använda nya importer:

| Fil | Ändring |
|-----|---------|
| `TenantDetailTabsContent.tsx` | Importera från `@/features/ekonomi` |
| `TenantMobileAccordion.tsx` | Importera från `@/features/ekonomi` |
| `StrofakturaUnderlagPage.tsx` | Importera från `@/features/ekonomi` |

### Steg 9: Rensa upp gamla filer
Efter verifiering att allt fungerar, ta bort originalfilerna och behåll endast re-exports för backward compatibility.

---

## Tekniska detaljer

### Filer som berörs av migrationen

**Nya filer (13 st):**
- `src/features/ekonomi/index.ts`
- `src/features/ekonomi/types/index.ts`
- `src/features/ekonomi/types/invoice.ts`
- `src/features/ekonomi/types/ledger.ts`
- `src/features/ekonomi/types/strofaktura.ts`
- `src/features/ekonomi/data/index.ts`
- `src/features/ekonomi/data/invoices.ts`
- `src/features/ekonomi/data/ledger.ts`
- `src/features/ekonomi/data/strofakturaArticles.ts`
- `src/features/ekonomi/data/strofakturaCustomers.ts`
- `src/features/ekonomi/components/ledger/CustomerLedger.tsx`
- `src/features/ekonomi/components/ledger/InvoicesTable.tsx`
- `src/features/ekonomi/components/strofaktura/` (5 filer)

**Filer som uppdateras:**
- `src/components/tenants/tabs/TenantDetailTabsContent.tsx`
- `src/components/tenants/TenantMobileAccordion.tsx`
- `src/pages/strofaktura/StrofakturaUnderlagPage.tsx`

### Namnändring
`TenantLedger` → `CustomerLedger` för att bättre reflektera att detta handlar om kundens ekonomiska vy, inte hyresgästen specifikt.

### Risker och åtgärder
- **Risk:** Trasiga importer → **Åtgärd:** Re-exports på gamla platser
- **Risk:** Typfel vid namnändring → **Åtgärd:** Alias-export (`TenantLedger` → `CustomerLedger`)
- **Risk:** Glömda uppdateringar → **Åtgärd:** Sök i codebase efter gamla sökvägar

