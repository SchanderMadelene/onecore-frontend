

# Favicon med stöd för dark/light mode

## Vad som görs

Uppdaterar `public/favicon.svg` så att OneCore-logotypen automatiskt anpassar sig till webbläsarens dark/light mode via CSS `prefers-color-scheme` inuti SVG-filen.

## Hur det fungerar

SVG-formatet stöder inbäddad CSS med media queries. Genom att lägga till en `<style>`-tagg i SVG-filen kan vi ändra `fill`-färgen beroende på om användaren har ljust eller mörkt läge i sin webbläsare.

- **Ljust läge**: Logotypen visas i blått (`#1200FF`) -- som idag
- **Mörkt läge**: Logotypen visas i vitt (`#FFFFFF`) för synlighet mot mörk bakgrund

## Tekniska detaljer

### Ändrad fil

| Fil | Ändring |
|-----|---------|
| `public/favicon.svg` | Lägg till `<style>` med `prefers-color-scheme: dark` som byter fill-färg |

### Resultat i SVG-filen

```xml
<svg ...>
  <style>
    path { fill: #1200FF; }
    @media (prefers-color-scheme: dark) {
      path { fill: #FFFFFF; }
    }
  </style>
  <!-- befintlig path utan fill-attribut -->
</svg>
```

### Webbläsarstöd

SVG-favicons med `prefers-color-scheme` stöds av Chrome, Firefox, Edge och Safari (moderna versioner). Ingen ändring behövs i `index.html` -- den befintliga `<link>`-taggen fungerar som den är.

