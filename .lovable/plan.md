

## Plan: Desktop/Mobil-toggle i Responsiva Showcasen

### Problem
Komponenterna (`ResponsiveTable`, `MobileTabs`, etc.) använder `useIsMobile()` som läser den faktiska viewport-bredden. Det går inte att visa mobilversionen utan att faktiskt krympa viewporten.

### Lösning: MobileOverrideContext

Lägg till ett React Context som `useIsMobile()` kollar först. Om en override är satt, returnera den istället för att läsa viewporten. I showcasen wrappas varje demo i en provider med en toggle-knapp.

### Ändringar

**1. `src/shared/hooks/use-mobile.tsx`** — Lägg till `MobileOverrideContext` och `MobileOverrideProvider`. Uppdatera `useIsMobile()` så att den returnerar context-värdet om det finns, annars viewport-baserat som idag. Ingen påverkan på resten av systemet — context är `undefined` som default.

```text
MobileOverrideContext (undefined = använd viewport)
       │
  useIsMobile()
       │
  override !== undefined ? override : window.innerWidth < 768
```

**2. `src/shared/design-system/ResponsiveShowcase.tsx`** — Uppdatera `DemoWrapper` med:
- En toggle-grupp (Desktop / Mobil) i headern bredvid titeln
- Wrappa `children` i `MobileOverrideProvider` med `isMobile={true|false}` baserat på valt läge
- Default: "Desktop"-läge
- Behåll kodexempel och beskrivning som idag

Toggle-knapparna använder befintliga `ToggleGroup`/`ToggleGroupItem` från shadcn med `Monitor` och `Smartphone`-ikoner från Lucide.

### Påverkan
- **Noll påverkan** på resten av systemet — utan provider returnerar `useIsMobile()` exakt samma som idag
- Alla 6 responsiva demos får togglen automatiskt via `DemoWrapper`

