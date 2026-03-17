

## Plan: Välkomstinfo som tooltip

Ersätter det stora välkomstkortet med en liten hjälp-ikon (HelpCircle) under logotypen. Vid hover visas kontaktinformationen (David och Lina) i en tooltip.

### Ändringar i `src/pages/Index.tsx`

1. **Ta bort** hela det stora Card-blocket med "Vi är glada att ha dig här" (ca rad 135-165)
2. **Lägg till** en liten centrerad hjälp-knapp under header-sektionen:
   - `HelpCircle`-ikon med texten "Behöver du hjälp?" i `text-muted-foreground`
   - Wrappas i en `Tooltip` som vid hover visar: "Kontakta David eller Lina om du behöver hjälp"
3. Importera `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` och `HelpCircle`

Resultatet blir en ren startsida där hjälpinfo finns ett hover bort, utan att ta plats.

