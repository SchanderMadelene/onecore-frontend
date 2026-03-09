

## Plan: Implementera Uppgift 1 (Studentboenden) och Uppgift 2 (Interaktiv Designsystem-vy)

### Uppgift 1: Studentboenden — redan implementerat

Alla filer för studentboenden finns redan i kodbasen:
- Typer (`StudentTurnoverEntry`, `StudentTurnoverRow`) i `move-in-list-types.ts`
- Mockdata i `mock-student-turnover.ts` (10 poster, Kata + Locus)
- Hook `useStudentTurnover.ts` med fastighets-, sök- och datumfilter
- `StudentTurnoverTable.tsx` med desktop-tabell (separerade kolumner) + mobilvy (MobileAccordion)
- `StudentEditDialog.tsx` med städkontroll + noteringar
- `StudentTurnoverFilters.tsx` med fastighetsval
- `TurnoverPage.tsx` med Tabs (Ut- & inflytt / Studentboenden)
- Alla barrel-exports uppdaterade

**Ingen ändring behövs för Uppgift 1.**

---

### Uppgift 2: Interaktiv Storybook-liknande designsystem-vy

Denna infrastruktur saknas helt i nuvarande kodbas. Behöver byggas från grunden.

#### Nya filer

**1. `src/shared/design-system/viewer/types.ts`**
Typdefinitioner:
- `ControlType`: `'select' | 'boolean' | 'text' | 'number' | 'radio'`
- `PropDefinition`: namn, typ, controlType, options, defaultValue, description, required
- `ComponentDefinition`: name, description, component (React.ComponentType), props (PropDefinition[]), defaultCode (string)
- `ViewMode`: `'canvas' | 'code' | 'props'`

**2. `src/shared/design-system/viewer/ControlsPanel.tsx`**
Renderar dynamiska kontroller baserat på `PropDefinition[]`:
- Select → `<Select>`, boolean → `<Switch>`, text → `<Input>`, number → `<Input type=number>`, radio → `<RadioGroup>`
- Tar emot `values` (Record) och `onChange`-callback

**3. `src/shared/design-system/viewer/PropsTable.tsx`**
Tabell med kolumner: Prop, Typ, Default, Required, Beskrivning. Renderar automatiskt från `PropDefinition[]`.

**4. `src/shared/design-system/viewer/CodeBlock.tsx`**
Kodblock med `<pre><code>` och copy-knapp (kopierar till clipboard). Visar genererad kod baserat på aktuella prop-värden.

**5. `src/shared/design-system/viewer/ComponentViewer.tsx`**
Wrapper med tre flikar (Tabs):
- **Canvas**: Renderar komponent med aktuella props + ControlsPanel vid sidan
- **Code**: Visar CodeBlock med genererad JSX
- **Props**: Visar PropsTable

Tar emot en `ComponentDefinition` och hanterar prop-state internt.

**6. `src/shared/design-system/viewer/index.ts`**
Barrel-export av alla viewer-komponenter + typer.

**7. `src/shared/design-system/definitions/buttonDefinition.ts`**
`ComponentDefinition` för Button:
- Props: variant (select: default/secondary/destructive/outline/ghost/link), size (select: default/sm/lg/icon), disabled (boolean), children (text)
- Icon-size specialfall: visar `<Loader2>` istället för text

**8. `src/shared/design-system/definitions/badgeDefinition.ts`**
`ComponentDefinition` för Badge:
- Props: variant (select: default/secondary/destructive/success/outline/muted/info/warning/purple), size (select: default/icon), children (text)

**9. `src/shared/design-system/definitions/index.ts`**
Barrel-export.

**10. `src/shared/design-system/InteractiveShowcase.tsx`**
Renderar `ComponentViewer` för Button och Badge i sekvens med rubrik.

#### Ändrade filer

**11. `src/shared/design-system/index.tsx`**
Lägg till export av `InteractiveShowcase`.

**12. `src/pages/design-system/DesignSystemPage.tsx`**
- Lägg till "Interaktiv"-flik (med `Play`-ikon) som ny första flik
- Ändra `defaultValue` till `"interactive"`
- Importera och rendera `InteractiveShowcase` i den nya fliken

#### Tekniska detaljer

- Alla nya filer placeras under `src/shared/design-system/` (FSD shared-lager)
- Återanvänder befintliga shadcn-komponenter: Tabs, Select, Switch, Input, Card, Table
- Kodgenerering: enkel string-interpolering baserat på aktuella prop-värden, inte AST
- Copy-funktion: `navigator.clipboard.writeText()`

