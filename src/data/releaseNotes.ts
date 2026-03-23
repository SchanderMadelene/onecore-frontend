export type ReleaseCategory = 'information' | 'buggfix' | 'ny-funktion';

export interface ReleaseNote {
  id: string;
  category: ReleaseCategory;
  title: string;
  description: string;
  date: string;
}

export const releaseNotes: ReleaseNote[] = [
  {
    id: "9",
    category: "ny-funktion",
    title: "Förbättrad sökfunktion",
    description: "Sökfunktionen i fastighetsregistret har optimerats för snabbare och mer relevanta resultat.",
    date: "17 mar. 2026",
  },
  {
    id: "8",
    category: "buggfix",
    title: "Fix av notifieringar på mobil",
    description: "Push-notiser visas nu korrekt på alla mobilenheter.",
    date: "17 mar. 2026",
  },
  {
    id: "7",
    category: "ny-funktion",
    title: "Release Notes på startsidan",
    description: "Nu kan du se de senaste nyheterna och uppdateringarna direkt på startsidan.",
    date: "17 mar. 2026",
  },
  {
    id: "6",
    category: "information",
    title: "Hjälp-tooltip tillagd",
    description: "En diskret hjälpknapp finns nu under logotypen med kontaktinfo till David och Lina.",
    date: "17 mar. 2026",
  },
  {
    id: "5",
    category: "buggfix",
    title: "Korrigerad sortering i uthyrningslistan",
    description: "Sorteringen på datum fungerar nu korrekt i uthyrningsvyn.",
    date: "10 mar. 2026",
  },
  {
    id: "4",
    category: "ny-funktion",
    title: "Studentboenden-flik i Ut- & inflytt",
    description: "En ny flik för studentboenden har lagts till med förenklad checklist.",
    date: "5 mar. 2026",
  },
  {
    id: "3",
    category: "information",
    title: "Planerat underhåll 8 mars",
    description: "Systemet kommer vara otillgängligt mellan 06:00-08:00 för uppgradering.",
    date: "3 mar. 2026",
  },
  {
    id: "2",
    category: "buggfix",
    title: "Fixat mobilvy för besiktningar",
    description: "Besiktningsprotokollet visas nu korrekt på mindre skärmar.",
    date: "25 feb. 2026",
  },
  {
    id: "1",
    category: "ny-funktion",
    title: "Ströfaktura underlag",
    description: "Ny funktion för att hantera underlag för ströfakturering.",
    date: "18 feb. 2026",
  },
];
