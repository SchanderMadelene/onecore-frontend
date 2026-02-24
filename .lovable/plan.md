

# Filtrering av fakturor i kundkortet

## Vad som goers

Laegger till filtreringsmoejligheter i "Fakturor"-sektionen i `CustomerLedger.tsx` saa att anvaendare kan filtrera paa:

1. **Fakturatyp** -- Avi eller Stroefaktura
2. **Datumintervall med vaelj parameter** -- Vaelj vilken datumtyp (fakturadatum, foerfallodatum, betalningsdatum) och ange fraan/till-datum

## Foerslag paa design

Filtren placeras direkt under "Fakturor"-rubriken i Card-headern, ovanfoer fakturatabellen. De foeljer systemets standardmoenstser: en flex-wrap rad med Select-komponenter (utan separata etiketter, 180px bredd paa desktop, fullbredd mobil).

```text
+-----------------------------------------------+
| Fakturor                                       |
|                                                |
| [Alla fakturatyper v] [Fakturadatum v] [Datum] |
|                                                |
| +-----------------------------------------+    |
| | Fakturanr | Datum | Foerfall | ...      |    |
| +-----------------------------------------+    |
+-----------------------------------------------+
```

- **Fakturatyp**: En Select med alternativen "Alla fakturatyper", "Avi", "Stroefaktura"
- **Datumparameter**: En Select med "Fakturadatum", "Foerfallodatum", "Betalningsdatum" -- styr vilken kolumn datumfiltret gaaeller foer
- **Datumintervall**: Aateranvaender den befintliga `DateRangeFilter`-komponenten (redan finns i `src/pages/lease-contracts/components/`)

Rensa-knappen visas bara om naagoet filter aer aktivt, precis som paa andra samlingssidor.

## Tekniska detaljer

### AEndrade filer

| Fil | AEndring |
|-----|---------|
| `src/features/ekonomi/components/ledger/CustomerLedger.tsx` | Flytta filtreringslogik och filter-UI till Fakturor-kortet, skicka filtrerade fakturor till `InvoicesTable` |
| `src/features/ekonomi/components/ledger/InvoiceFilters.tsx` | **Ny fil** -- Filterkomponent med fakturatyp-select, datumparameter-select och DateRangeFilter |

### Implementationsdetaljer

1. **Ny komponent `InvoiceFilters.tsx`** med:
   - `invoiceTypeFilter`: `'' | 'Avi' | 'Ströfaktura'`
   - `dateField`: `'invoiceDate' | 'dueDate' | 'paymentDate'` (standard: `invoiceDate`)
   - `fromDate` / `toDate`: `Date | undefined`
   - Aateranvaender `DateRangeFilter` fraan lease-contracts (flytta till delad plats eller importera direkt)

2. **Filtrering i `CustomerLedger.tsx`**:
   - `useMemo` foer att filtrera fakturalistan baserat paa de valda filtren
   - Typfilter jaemfoer mot `invoice.invoiceType`
   - Datumfilter jaemfoer valt datumfaelt mot fraan/till-intervallet

3. **DateRangeFilter aateranvaendning**: Komponenten finns idag under `src/pages/lease-contracts/components/`. Den flyttas till `src/components/common/DateRangeFilter.tsx` saa att den kan aateranvaendas fraan baade lease-contracts och ekonomi.

### Filtreringslogik (pseudokod)

```typescript
const filteredInvoices = useMemo(() => {
  return invoices.filter(inv => {
    if (typeFilter && inv.invoiceType !== typeFilter) return false;
    if (fromDate || toDate) {
      const dateValue = parseISO(inv[dateField]);
      if (fromDate && dateValue < fromDate) return false;
      if (toDate && dateValue > toDate) return false;
    }
    return true;
  });
}, [invoices, typeFilter, dateField, fromDate, toDate]);
```

