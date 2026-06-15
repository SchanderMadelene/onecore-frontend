## Justering av SelectTrigger för konsekvent dropdown-alignment

### Problem
Dropdown i InspectorCell ser olika ut beroende på namnets längd. Kortare namn (Anna, Maria) hamnar till vänster, medan längre namn (Johanna Svensson) truncherats med `line-clamp-1` vilket ger ett centrerat/collapse-intryck.

### Åtgärder
1. **src/shared/ui/select.tsx** — Ersätt `[&>span]:line-clamp-1` med `[&>span]:truncate [&>span]:text-left` på `SelectTrigger`. Detta ger konsekvent vänsterjustering och korrekt ellipsis-trunkering i alla Select-komponenter.

2. **src/features/inspections/components/InspectorCell.tsx** — Ändra `w-40` till `w-44` på `<SelectTrigger>` så längre namn får plats utan trunkering, men med förbättrade trunkerings-stilar vid behov.

### Resultat
Alla InspectorCell-rader visar text vänsterjusterad med chevron-ikonen konsekvent till höger, oavsett namnlängd.