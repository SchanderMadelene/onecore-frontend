

# Harmonisera alla collapsible-stilar pa mobil

## Problem
Det finns fyra olika visuella stilar for kollapserbara sektioner pa mobilen:

1. **MobileAccordion** (standard) — vit bakgrund, subtil skugga, primar vansterborder nar oppen. Anvands pa: fastighet (tabs), byggnad (tabs), lagenhet (tabs), hyresgast (tabs).
2. **CollapsibleInfoCard** — vanlig Card utan skugga eller oppna-markering. Anvands pa: fastighet ("Grundlaggande information"), byggnad ("Grundlaggande information"), lagenhet ("Grundlaggande information").
3. **TenantCard** — vanlig Card med Collapsible, egen styling. Anvands pa: hyresgast ("Hyresgast").
4. **TenantCommunicationLog** — vanlig Card med Collapsible, gra titel. Anvands pa: hyresgast ("Skickade meddelanden").

Alla fyra bor se likadana ut nar de ar pa mobilen.

## Losning
Uppdatera de tre avvikande komponenterna (CollapsibleInfoCard, TenantCard, TenantCommunicationLog) sa att de matchar MobileAccordion-standarden pa mobilen:

- `rounded-lg border border-slate-200 bg-white shadow-sm`
- Nar oppen: `border-l-[3px] border-l-primary`
- Trigger padding: `px-4 py-3.5`
- Titel: `text-base font-medium` (svart, inte gra)
- Chevron-ikon konsekvent

## Tekniska andringar

### 1. `src/components/ui/collapsible-info-card.tsx`
Uppdatera mobilversionen sa Card far samma klasser som MobileAccordion-items:
- Card: lagg till `border-slate-200 bg-white shadow-sm` och villkorlig `border-l-[3px] border-l-primary` nar oppen
- Titel: `text-base font-medium` istallet for `text-lg`
- Behall preview-content och expanderat-content logiken som den ar

### 2. `src/features/tenants/components/TenantCard.tsx`
Uppdatera mobilversionen:
- Card: lagg till `border-slate-200 bg-white shadow-sm` och villkorlig `border-l-[3px] border-l-primary` nar oppen
- CardTitle: `text-base font-medium`
- Behall preview-info (adress, P-nummer, telefon) under titeln

### 3. `src/features/tenants/components/TenantCommunicationLog.tsx`
Uppdatera mobilversionen:
- Card: lagg till `border-slate-200 bg-white shadow-sm` och villkorlig `border-l-[3px] border-l-primary` nar oppen
- Titel: andra fran `text-sm font-medium text-muted-foreground` till `text-base font-medium` (svart text)

## Resultat
Alla kollapserbara sektioner pa samtliga detaljsidor (fastighet, byggnad, lagenhet, hyresgast) far exakt samma visuella stil. Inga andringar pa desktop.

