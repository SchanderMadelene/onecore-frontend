

# Lägg till saknade feature toggles på beta-sidan

## Sammanfattning
Tre feature toggles som redan finns definierade i `FeatureTogglesContext` och används i routing saknas på inställningssidan (`BetaSettings.tsx`):

1. **Hyreskontrakt** (`showLeaseContracts`) - Visa sidan för hyreskontrakt
2. **Förvaltningsområden** (`showPropertyAreas`) - Visa sidan för förvaltnings- och kvartersvärdsområden
3. **Ströfaktura underlag** (`showStrofakturaUnderlag`) - Visa sidan för ströfaktura underlag

## Vad som ändras

Alla tre toggles läggs till i `BetaSettings.tsx` i huvudsektionen (samma nivå som Besiktningar, Favoriter, etc.), placerade mellan "Favoriter" och "Dashboard-kort"-sektionen.

## Tekniska detaljer

### Fil: `src/components/settings/BetaSettings.tsx`

- Importera ikoner: `MapPin` (förvaltningsområden), `Receipt` eller `FileText` (ströfaktura)
- Lägg till tre nya toggle-block efter Favoriter-togglen (rad 588), med samma mönster som övriga toggles
- Varje toggle disabled om `!features.showNavigation`

Ordning:
1. Hyreskontrakt (FileText-ikon)
2. Ströfaktura underlag (Wallet-ikon, redan importerad)
3. Förvaltningsområden (MapPin-ikon, behöver importeras)

