# Ny rangordning av intresselistan (poängfria bostäder)

## Idag
Listan sorteras obehandlade överst, därefter äldst anmälan först. Numret i #-kolumnen är bara radens plats i listan.

## Ny ordning
Sökande rangordnas i tre steg:

1. **Önskat inflyttningsdatum** – tidigast först. Sökande utan angivet datum hamnar sist.
2. **Alla kontroller godkända** – sökande där boendereferens, kreditupplysning och betalningshistorik är godkända rankas före övriga vid samma inflyttningsdatum.
3. **Anmälningsdatum** – äldst först som sista avgörande faktor.

Statusen (Obehandlad/Kvitterad) påverkar inte längre ordningen. Obehandlade lyfts i stället fram genom sin gula statusbadge och räknaren "X obehandlade" som redan finns.

## Vad som räknas som godkänt
- Boendereferens: "Godkänd" eller "Referens krävs ej"
- Kreditupplysning: "Godkänd/låg risk"
- Betalningshistorik: "Inga anmärkningar"

Saknad eller ej behandlad uppgift räknas som ej godkänd.

## Förtydligande i gränssnittet
Texten ovanför tabellen byts till: "Rangordnad efter önskat inflyttningsdatum, därefter godkända kontroller och anmälningsdatum."

## Teknisk detalj
Ändringen görs i `sortedInterests` i `src/pages/rentals/PoangfriHousingDetailPage.tsx` med en hjälpfunktion som avgör om en sökandes kontroller är godkända. Inga datamodeller eller andra vyer påverkas; `rankById` och radnumreringen följer automatiskt den nya ordningen.
