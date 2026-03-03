

# Anonymisera mockdata i ut- och inflyttslistan

Ersätter alla `tenantName` och `tenantPhone` i filen `src/features/turnover/data/mock-move-in-list.ts` med tydligt fiktiva värden. Adresser, kontraktsnummer och övrig data behålls som de är (de behövs för att tabellen ska se realistisk ut).

## Ändringar

**Fil:** `src/features/turnover/data/mock-move-in-list.ts`

Alla 28 poster (14 utflyttningar + 14 inflyttningar) får nya fiktiva namn och telefonnummer:

| ID | Nuvarande namn | Nytt namn | Nytt telefonnr |
|----|----------------|-----------|----------------|
| mil-001 | Lindberg Maria | Ekberg Maja | 070-111 11 11 |
| mil-002 | Skyddad Identitet | Skyddad Identitet *(behålls)* | 070-000 00 00 *(behålls)* |
| mil-003 | Axelsson André | Holmgren Anton | 070-222 22 22 |
| mil-004 | Westin Tomas | Vikström Tore | 070-333 33 33 |
| mil-005 | Johansson Lars | Falk Lennart | 070-444 44 44 |
| mil-006 | Pettersson Eva | Björk Elsa | 070-555 55 55 |
| mil-007 | Nilsson Fatima | Nordlund Fatou | 070-666 66 66 |
| mil-008 | Bergström Karin | Dahl Klara | 070-777 77 77 |
| mil-009 | Eriksson Sven | Hagen Stefan | 070-888 88 88 |
| mil-010 | Gustafsson Mikael | Eklund Martin | 070-999 99 99 |
| mil-011 | Olsson Henrik | Rydberg Hugo | 070-121 21 21 |
| mil-012 | Ström Anna | Lind Astrid | 070-131 31 31 |
| mil-013 | Sandberg Lena | Kvarnström Lotta | 070-141 41 41 |
| mil-014 | Dahlin Per | Forsell Patrik | 070-151 51 51 |
| mil-020 | Khalil Mohammed | Osman Malik | 070-161 61 61 |
| mil-021 | Ahmed Sameer | Yilmaz Samir | 070-171 71 71 |
| mil-022 | Li Meenah | Tran Mai | 070-181 81 81 |
| mil-023 | Al Hendi Sara | Bakir Selma | 070-191 91 91 |
| mil-024 | Khawam Rachid | Haddad Rami | 070-212 12 12 |
| mil-025 | Sjögren Lisa | Åberg Linnea | 070-232 32 32 |
| mil-026 | Labo Yasmin | Abdi Yara | 070-242 42 42 |
| mil-027 | Andersson Johan | Granberg Joel | 070-252 52 52 |
| mil-028 | Tesfay Kokob | Tekie Kemal | 070-262 62 62 |
| mil-029 | Andersson Morgan | Sjöblom Mattias | 070-272 72 72 |
| mil-030 | Mohamed Samira | Hussein Sabina | 070-282 82 82 |
| mil-031 | Hemström Billy | Wiklund Björn | 070-292 92 92 |
| mil-032 | Berggren David | Nyman Daniel | 070-303 03 03 |
| mil-033 | Mirembe Rebecca | Kamara Rosa | 070-313 13 13 |

Inga andra filer eller komponenter behöver ändras -- alla komponenter läser namn och telefonnummer dynamiskt från denna mockdata-fil.

