import { StrofakturaArtikel } from "@/types/strofaktura";

export const strofakturaArticles: StrofakturaArtikel[] = [
  { artikelnummer: "369400", namn: "Varmvatten, debitering", standardPris: 0 },
  { artikelnummer: "329007", namn: "Nycklar", standardPris: 250 },
  { artikelnummer: "324100", namn: "Besiktningskostnader", standardPris: 0 },
  { artikelnummer: "321100", namn: "Reparation lägenhet", standardPris: 0 },
  { artikelnummer: "321200", namn: "Målning lägenhet", standardPris: 0 },
  { artikelnummer: "321300", namn: "Golvslipning", standardPris: 0 },
  { artikelnummer: "322100", namn: "Städning", standardPris: 1500 },
  { artikelnummer: "322200", namn: "Storstädning", standardPris: 3500 },
  { artikelnummer: "323100", namn: "Fönsterputsning", standardPris: 800 },
  { artikelnummer: "325100", namn: "Låsbyte", standardPris: 1200 },
  { artikelnummer: "325200", namn: "Extranyckel", standardPris: 150 },
  { artikelnummer: "326100", namn: "Sophantering", standardPris: 500 },
  { artikelnummer: "327100", namn: "Vattenavstängning", standardPris: 400 },
  { artikelnummer: "328100", namn: "Elinstallation", standardPris: 0 },
  { artikelnummer: "329100", namn: "Administrativ avgift", standardPris: 300 },
  { artikelnummer: "329200", namn: "Förseningsavgift", standardPris: 250 },
];

export const getArticleByNumber = (artikelnummer: string): StrofakturaArtikel | undefined => {
  return strofakturaArticles.find(a => a.artikelnummer === artikelnummer);
};
