
# Plan: Utöka Designsystemet till en Storybook-liknande Upplevelse

## Bakgrund

Ert nuvarande designsystem är strukturerat som enkla showcases med visuella exempel. Det saknar dock de interaktiva och tekniska dokumentationsfunktioner som gör Storybook så kraftfullt.

**Nuvarande struktur:**
- Färgpalett med CSS-variabelreferenser
- Typografi-exempel
- Komponent-showcases (Button, Badge, Forms, etc.)
- Grid-system demonstration
- Ikon-bibliotek

**Vad Storybook erbjuder:**
- Interaktiva kontroller för att ändra props i realtid
- Teknisk dokumentation med props-tabeller
- Isolerade komponent-vyer
- Sökbar komponent-navigation
- Kodexempel med copy-funktion

## Föreslagen Lösning

Jag föreslår att vi bygger ett "OneCore Design System" som tar det bästa från Storybook men är skräddarsytt för ert team - användarvänligt för icke-tekniska användare men med tekniska detaljer tillgängliga för utvecklare.

### Ny Struktur

```text
/design-system
├── Översikt (Dashboard)
├── Varumärke
│   ├── Logotyper
│   └── Färger
├── Grundstenar
│   ├── Typografi
│   ├── Ikoner
│   └── Grid
└── Komponenter
    ├── Knappar
    ├── Badges
    ├── Formulär
    ├── Tabeller
    └── ...
```

### Huvudfunktioner

**1. Interaktiv Komponent-vy**
Varje komponent får en dedikerad vy med:
- **Canvas** - Visuell förhandsvisning av komponenten
- **Kontroller** - Dropdown/toggles för att ändra variant, size, etc.
- **Kodexempel** - Visar aktuell kod baserat på valda props
- **Props-dokumentation** - Tabell med alla tillgängliga props

**2. Användarvänlig Navigation**
- Sidopanel med sökfunktion
- Kategoriserade komponenter
- Snabbnavigering mellan relaterade komponenter

**3. Tre Visningslägen**
- **Enkel** - Bara visuella exempel (för designers/projektledare)
- **Utvecklare** - Full teknisk dokumentation med props och kod
- **Interaktiv** - Live-redigering av props

## Implementation

### Steg 1: Grundläggande Infrastruktur

Nya filer:

| Fil | Beskrivning |
|-----|-------------|
| `ComponentViewer.tsx` | Wrapper med Canvas + Kontroller + Kod |
| `PropsTable.tsx` | Visar props med typ, default, beskrivning |
| `CodeBlock.tsx` | Syntax-highlightad kod med copy-knapp |
| `ControlsPanel.tsx` | Dynamiska kontroller för props |
| `DesignSystemSidebar.tsx` | Sökbar navigation |

### Steg 2: Komponent-dokumentationsformat

Varje komponent dokumenteras med metadata:

```text
Button
├── Varianter: default, secondary, destructive, outline, ghost, link
├── Storlekar: default, sm, lg, icon
├── Props: variant, size, asChild, disabled, className
└── Användning: "Primär interaktionsknapp för formulär och actions"
```

### Steg 3: Interaktiva Kontroller

Användaren kan:
- Välja variant via dropdown
- Toggla disabled-state
- Ändra storlek
- Se koden uppdateras i realtid

### Steg 4: Ny Sidlayout

Omstrukturera DesignSystemPage med:
- Vänster: Sökbar sidebar med komponentträd
- Mitt: Komponent-canvas med förhandsvisning
- Höger: Props-panel och kontroller (på desktop)

## Tekniska Detaljer

### ComponentViewer-struktur

ComponentViewer blir hjärtat i systemet och hanterar:
- Rendering av komponent med aktuella props
- Generering av kodexempel baserat på props
- Synkronisering mellan kontroller och canvas

### Props-metadata

Vi skapar ett enkelt format för att beskriva props:

```text
PropDefinition:
  - name: "variant"
  - type: "default | secondary | destructive | ..."
  - default: "default"
  - description: "Visuell stil för knappen"
  - control: "select"
```

### Sökfunktion

Sökning indexerar:
- Komponentnamn
- Props
- Beskrivningar
- Kategorier

## Visuell Design

- Behåller befintlig design med Card-komponenter
- Lägger till subtle hover-effekter
- Copy-knappar för kod
- Toggle för att växla mellan visningslägen
- Responsiv layout som fungerar på alla enheter

## Fördelar

| För Utvecklare | För Designers/Projektledare |
|----------------|----------------------------|
| Props-dokumentation | Visuella exempel |
| Kopierbara kodexempel | Enkel navigation |
| Tekniska specifikationer | Sök och filtrera |
| API-referens | Användningsriktlinjer |

## Prioritering

1. **Fas 1**: ComponentViewer + PropsTable + CodeBlock
2. **Fas 2**: Sidebar med sök + navigationsstruktur
3. **Fas 3**: Interaktiva kontroller
4. **Fas 4**: Dokumentation för alla befintliga komponenter

Detta ger er ett kraftfullt men lättanvänt designsystem som växer med projektet.
