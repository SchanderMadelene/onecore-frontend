

## Plan: Lägg till skräddarsydda komponenter i Design System Showcase

### Komponenter att lägga till

**Grupp 1 — Enkla (interactive props via ComponentViewer):**
- **Tag** — bg, color, children
- **FilterChip** — selected, children
- **Badge (utökade varianter)** — redan i showcase men behöver uppdateras med alla varianter (success, info, warning, purple, muted)

**Grupp 2 — Komplexa/responsiva (statisk demo, ej ComponentViewer):**
- **ResponsiveTable** — tabell på desktop, kort på mobil
- **MobileAccordion** — accordion med primärfärgad vänsterkant
- **MobileTabs** — tabs på desktop, select-dropdown på mobil
- **CollapsibleInfoCard** — card på desktop, collapsible på mobil
- **EmptyState** — ikon + titel + beskrivning
- **TabLayout** — card-wrapper med titel/count
- **BulkActionBar** — fixed bottom bar vid selektion

### Hantering av responsiva komponenter

Komponenter som `ResponsiveTable`, `MobileTabs`, `MobileAccordion` och `CollapsibleInfoCard` använder `useIsMobile()` internt och renderar helt olika UI beroende på viewport. Dessa kan **inte** drivas av `ComponentViewer` med props-kontroller på ett meningsfullt sätt.

**Lösning:** Skapa en ny **`StaticShowcase`**-komponent som visar dessa med:
- En kort beskrivning av komponenten
- En live-rendererad instans med exempeldata (användaren ser desktop- eller mobilversionen beroende på sin viewport)
- En text-notis som förklarar att komponenten beter sig annorlunda på mobil/desktop, med uppmaning att testa i preview-lägets viewport-switcher
- Kodexempel i en `CodeBlock`

### Tekniska ändringar

1. **Uppdatera `badgeDefinition.ts`** — Lägg till varianterna `success`, `info`, `warning`, `purple`, `muted` i options-arrayen.

2. **Skapa `tagDefinition.ts`** — ComponentDefinition med props: `bg` (select med vanliga Tailwind-färger), `color` (select), `children` (text).

3. **Skapa `filterChipDefinition.ts`** — ComponentDefinition med props: `selected` (boolean), `children` (text).

4. **Skapa `emptyStateDefinition.tsx`** — Wrapper-komponent som mappar en string-prop till en Lucide-ikon, plus title/description som text-kontroller.

5. **Skapa `src/shared/design-system/ResponsiveShowcase.tsx`** — Ny showcase-sektion med statiska demos för:
   - `ResponsiveTable` (med 3-4 rader exempeldata + mobileCardRenderer)
   - `MobileAccordion` (med 2-3 items)
   - `MobileTabs` (med 2-3 tabs)
   - `CollapsibleInfoCard` (med preview + expanderat innehåll)
   - `TabLayout` (med titel och count)
   - `BulkActionBar` (renderad inline, ej fixed, via className-override)

   Varje demo wrappas i ett Card med titel, beskrivning, en info-badge "Responsiv — testa i mobil/desktop-vy", live-rendering, och kodexempel.

6. **Uppdatera `InteractiveShowcase.tsx`** — Importera och lägg till `tagDefinition`, `filterChipDefinition`, `emptyStateDefinition`.

7. **Uppdatera `DesignSystemPage.tsx`** — Lägg till en ny tab "Responsiva" med `ResponsiveShowcase`.

8. **Uppdatera barrel-exports** i `definitions/index.ts` och `design-system/index.tsx`.

### Filstruktur

```text
src/shared/design-system/
├── definitions/
│   ├── index.ts           (uppdatera)
│   ├── badgeDefinition.ts (uppdatera)
│   ├── tagDefinition.ts   (ny)
│   ├── filterChipDefinition.ts (ny)
│   └── emptyStateDefinition.tsx (ny)
├── InteractiveShowcase.tsx (uppdatera)
├── ResponsiveShowcase.tsx  (ny)
└── index.tsx               (uppdatera)

src/pages/design-system/DesignSystemPage.tsx (uppdatera — ny tab)
```

