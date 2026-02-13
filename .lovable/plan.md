
# Ta bort dubbel-wrapping i accordion-innehall

## Problem
Nar innehall visas i en MobileAccordion far det dubbla ramar, dubbla titlar och onodigt djup. Accordionen har redan card-liknande styling (bg-white, border, shadow), men innehallet (TenantOrders, TenantNotes, OrdersManagement, TenantContracts, etc.) wrappar sig ocksa i egna Card-komponenter. Resultatet ar en "card-i-card"-effekt som ser rörigt ut.

## Losning
Ge innehallskomponenterna en "compact mode" sa de inte renderar sin egen Card-wrapper nar de ligger i en accordion. Tva alternativ:

**Alternativ A (rekommenderat)**: Lagg till en `compact`-prop pa de komponenter som anvands i accordions. Nar `compact=true` renderas innehallet utan Card/TabLayout-wrapper och utan dubblerad rubrik.

Komponenter som behover andras:
- **TenantOrders** — ta bort Card-wrappern nar compact
- **OrdersManagement** — skicka `showCard=false` till TabLayout nar compact
- **TenantNotes** — skicka `showCard=false` till TabLayout nar compact
- **TenantContracts** — ta bort Card-wrappern nar compact
- **TenantMobileAccordion** — skicka `compact={true}` till alla innehallskomponenter

Samma princip appliceras pa `ResidenceMobileAccordion` for residences-vyn.

## Tekniska andringar

### 1. TenantOrders.tsx
Lagg till `compact?: boolean` prop. Om `compact` ar true, rendera bara `OrdersManagement` direkt utan Card-wrapper.

### 2. OrdersManagement.tsx
Lagg till `compact?: boolean` prop. Om `compact` ar true, anvand `showCard={false}` och `showHeader={false}` pa TabLayout.

### 3. TenantNotes.tsx
Lagg till `compact?: boolean` prop. Om `compact` ar true, skicka `showCard={false}` och `showHeader={false}` till TabLayout.

### 4. TenantContracts.tsx
Lagg till `compact?: boolean` prop. Om `compact` ar true, rendera Table direkt utan Card-wrapper.

### 5. TenantMobileAccordion.tsx
Skicka `compact={true}` till TenantOrders, TenantNotes, TenantContracts nar de anvands som accordion-innehall.

### 6. ResidenceMobileAccordion (src/features/residences/components/MobileAccordion.tsx)
Samma princip — skicka compact-props till OrdersManagement och Notes nar de anvands i accordions.

## Resultat
Innehallet i accordions renderas utan extra ramar, skuggor och dubblerade rubriker. Samma komponenter fungerar fortfarande som vanligt i desktop-flikar dar de behover sin Card-wrapper.
