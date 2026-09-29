# En gemensam lista för alla bostadsannonser – välj uthyrningsmetod när du publicerar

## Idé
Idag finns två separata flöden: Bostad (standard) och Poängfritt (en egen sida på `/rentals/housing/poangfritt`). Istället blir **Bostad** den enda platsen för alla annonser. En annons är neutral fram till publiceringen. Då väljer handläggaren **uthyrningsmetod: Standard eller Poängfri**. Metoden styr sedan vad som händer i resten av flödet.

```text
Publicera (gemensam)
   |-- välj uthyrningsmetod --|
   v                          v
Standard                   Poängfri
Publicerat nu -> Erbjud    Publicerat nu -> Kvittera
visning -> Visning ->      intresseanmälningar ->
Erbjud kontrakt            Erbjud kontrakt
   \__________ Historik __________/
```

## Vad användaren ser
1. **Fliken Publicera** – ingen skillnad mellan standard och poängfri. Utkast, granskning och Redo att publicera fungerar som idag.
2. **Dialogen Publicera** – får ett obligatoriskt val **Uthyrningsmetod** (Standard / Poängfri) som radioknappar. Ingen metod är förvald. Det valet finns också i Redigera annons som "planerad metod", så att det går att bestämma i förväg.
3. **Fliken Publicerat nu** – visar båda typerna i samma tabell. En ny kolumn **Uthyrningsmetod** visar metoden som en Tag (kategori, inte status), och det går att filtrera på metod.
4. **Detaljsidan** – anpassar sig efter metoden:
   - Standard: kölista sorterad efter köpoäng, erbjudandeomgångar och visning (som idag).
   - Poängfri: intresselista med Obehandlad/Kvittera och rangordning efter önskat inflyttningsdatum, godkända kontroller och anmälningsdatum (som idag på poängfri-sidan).
5. **Byta metod** – en standardannons som inte blev uthyrd kan publiceras om som Poängfri via åtgärden "Publicera om som poängfri". Den nya annonsen länkas till den gamla, så spårbarheten finns kvar.
6. **Sidomenyn** – den separata posten/sidan Poängfritt tas bort. Gamla länkar leder till Bostad, filtrerat på Poängfri.

## Steg (en sak i taget)
1. Lägg till fältet uthyrningsmetod på annonsen och ett metodval i publiceringsdialogen.
2. Samla båda typerna i "Publicerat nu" med kolumn och filter för metod.
3. Låt detaljsidan visa rätt lista och rätt åtgärder utifrån metoden, genom att återanvända de befintliga poängfria delarna.
4. Flytta över poängfri mockdata till den gemensamma listan, ta bort den separata sidan och peka om gamla adresser.
5. Lägg in åtgärden "Publicera om som poängfri" för annonser som inte blivit uthyrda.
6. Styr allt med en funktionsbrytare (`showRentalsUnifiedHousing`), så att det gamla flödet finns kvar tills det nya är godkänt.

## Förslag att bekräfta
- Metoden väljs vid publiceringen och **är låst medan annonsen är publicerad**. Byte sker bara genom att publicera om.
- Erbjud visning och Visning gäller bara Standard. För Poängfri går man direkt från intresselistan till Erbjud kontrakt.

## Teknisk sektion
- Typer: `rentalMethod: "standard" | "poangfri"` på `PublishedHousingSpace` och som valfri `plannedRentalMethod` på `UnpublishedHousingSpace`.
- `publishSpaces(ids, method)` i `unpublished-housing-store.ts`. `toPublished()` sätter metoden. För poängfri skapas intresseanmälningar av typen `PoangfriInterest` i stället för kösökande.
- `HousingRowActions`: publiceringsdialogen använder `RadioGroup` från shadcn, och bekräfta-knappen är avstängd tills en metod är vald. Primäråtgärden på Publicerat nu styrs av metoden.
- `useHousingStatus`: poängfria annonser hoppar över `ready_for_offer`/`offered`.
- `HousingDetailPage`: grenar på metoden och bäddar in listan och kvitteringslogiken som flyttas ut från `PoangfriHousingDetailPage` till en egen komponent under `features/rentals/components/poangfri/`.
- Routes: `/rentals/housing/poangfritt` och `/rentals/housing/poangfritt/:id` skickas vidare till `/rentals/housing?metod=poangfri` och `/rentals/housing/:id`.
- ResponsiveTable för listor och MobileAccordion på mobil.
