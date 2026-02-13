
# Förbättra mobila accordions

## Problem
De mobila accordion-raderna ser platta och tråkiga ut — liten padding, ingen bakgrundsfärg, och inte tillräckligt tydliga som interaktiva element.

## Lösning
Ge varje accordion-rad mer visuell vikt och tydligare interaktivitet:

- Öka padding i triggern från `px-2 py-2` till `px-4 py-3.5` för bättre touchyta
- Lägg till `bg-white` på varje item så de sticker ut mot sidans bakgrund
- Ge den öppna/aktiva raden en subtil markering med vänsterborder i primärfärg
- Lägg till en mjuk skuggeffekt (`shadow-sm`) för att ge djupkänsla
- Öka typsnittsstorleken något och ge chevron-ikonen mer kontrast

## Teknisk ändring

Enbart en fil behöver ändras: `src/components/ui/mobile-accordion.tsx`

### Före
```
AccordionItem className="rounded-lg border border-slate-200"
AccordionTrigger className="px-2 py-2"
```

### Efter
```
AccordionItem className="rounded-lg border border-slate-200 bg-white shadow-sm 
  data-[state=open]:border-l-[3px] data-[state=open]:border-l-blue-500"
AccordionTrigger className="px-4 py-3.5"
```

Innehållets padding uppdateras också fran `px-0 pb-2` till `px-4 pb-4` for att matcha triggerns indrag.

Ändringen påverkar alla ställen i systemet där MobileAccordion används, vilket ger konsekvent förbättring överallt.
