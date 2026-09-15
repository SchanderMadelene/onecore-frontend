# "Publicera från" i redigera annons

## Varför den är låst

Låset är avsiktligt. 2026-05-05 gavs instruktionen att inputen "Publicera från" kan vara disabled, och den sattes då medvetet till inaktiverad. Det är ingen bugg och inget som bör ändras utan ny instruktion.

## Förslag

Ingen ändring i koden. Fältet förblir låst enligt tidigare beslut.

Om du i stället vill låsa upp det: gör det bara för annonser som inte är publicerade ännu (Utkast / Behöver granskning / Redo att publicera), och visa en hjälptext "Annonsen är redan publicerad" för publicerade annonser där fältet fortsatt är låst. Tekniskt: prop `isPublished` in till `EditableFormSection.tsx` från `EditHousingDialog.tsx` baserat på annonsens status.
