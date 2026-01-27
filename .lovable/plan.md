

# Ändring: Flytta "Avser objektsnummer" till första raden

## Vad ska ändras
Fältet "Avser objektsnummer" ska flyttas från sin nuvarande position (efter "Text"-fältet) till att vara **första raden** i "Artikelinformation"-sektionen, direkt under rubriken.

## Nuvarande ordning i ArticleSection
1. Artikel + Artikelnummer (två kolumner)
2. Text
3. **Avser objektsnummer** ← ska flyttas
4. Antal + Pris (två kolumner)
5. Checkboxar (Administrativa kostnader, Hanteringsavgift)

## Ny ordning efter ändring
1. **Avser objektsnummer** ← ny position (första)
2. Artikel + Artikelnummer (två kolumner)
3. Text
4. Antal + Pris (två kolumner)
5. Checkboxar

## Implementation
Ändra `src/features/ekonomi/components/strofaktura/ArticleSection.tsx`:
- Flytta kodblocket för "Avser objektsnummer" (rad 101-109) till att ligga först i komponenten (efter öppnande `<div className="space-y-4">`)
- Fältet förblir redigerbart eftersom användaren kan behöva justera värdet som hämtats från kontraktet

## Fil som berörs
| Fil | Ändring |
|-----|---------|
| `src/features/ekonomi/components/strofaktura/ArticleSection.tsx` | Flytta "Avser objektsnummer" till första positionen |

Bakåtkompatibilitetsfilen `src/components/strofaktura/ArticleSection.tsx` behöver samma ändring för konsistens.

