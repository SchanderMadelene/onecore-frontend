

# Byt favicon till OneCore-logotypen

## Vad som görs

Byter ut den nuvarande `favicon.ico` mot OneCore-symbolen (`onecore_simple_color.svg`) så att webbläsarfliken visar OneCore-logotypen.

## Steg

1. **Kopiera logotypen till public-mappen** -- Kopiera `src/assets/logos/simple/onecore_simple_color.svg` till `public/favicon.svg`
2. **Uppdatera `index.html`** -- Byt ut den befintliga favicon-referensen till den nya SVG-filen:
   ```html
   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
   ```

## Tekniska detaljer

- SVG-favicons stöds av alla moderna webbläsare och ger skarp rendering i alla storlekar
- Den befintliga `favicon.ico` kan tas bort eller behållas som fallback
- Filen `onecore_simple_color.svg` är symbol-varianten (utan text), vilket passar bäst i en liten flik

