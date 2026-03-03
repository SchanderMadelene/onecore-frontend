

# Nyckelkolumn for ut- och inflytt

Lagger till en smal kolumn pa bade utflytt- och inflyttsidan som visar om nycklar har lamnats in respektive hamtats ut. Kolumnen far en nyckelikon som rubrik och en kompakt badge ("Ja"/"Nej") i varje rad.

## Datamodell

**Fil:** `src/features/turnover/types/move-in-list-types.ts`

Lagg till ett nytt falt i `MoveInListChecklist`:

```text
keysHandled: boolean   // true = nycklar inlamnade (utflytt) / uthamtade (inflytt)
```

## Mockdata

**Fil:** `src/features/turnover/data/mock-move-in-list.ts`

Lagg till `keysHandled: true/false` i varje posts checklist-objekt. Satt nagra till `true` och resten till `false` for variation.

## Tabell (desktop)

**Fil:** `src/features/turnover/components/CombinedTurnoverTable.tsx`

Utflyttsidan -- ny kolumn mellan "Stadkontr." och noteringskolumnen:
- Rubrik: nyckelikon (`Key` fran lucide-react), ingen text, `w-[52px]` och `text-center`
- Cell: badge med "Ja" (gron/success) eller "Nej" (outline/gra), centrerad

Inflyttsidan -- ny kolumn mellan "Kontakt" och "Namn/Port":
- Samma rubrik och badge-logik

Kolumnerna anvander minimal bredd (`w-[52px]`) och centrerad text for att inte ta onodigt utrymme.

## Mobilvy

I `MobileAccordion`-innehallet laggs en rad per sektion (utflytt/inflytt) som visar nyckelstatus med badge, liknande hur "Namn/Port" redan visas.

## Teknisk detalj

Importerar `Key` fran `lucide-react` och ateranvander befintlig `Badge` fran `@/shared/ui/badge` med variant `success` for "Ja" och `outline` for "Nej".

