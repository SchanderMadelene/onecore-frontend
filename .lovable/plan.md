

## Korrigera mock-data: Separera skyddad identitet från säkerhetsvarning

Säkerhetsvarning (amber triangel, "Åk aldrig ensam") ska inte kopplas till "Skyddad Identitet" -- det är två olika saker. Mock-datan behöver uppdateras.

### Vad som ändras

**`src/features/turnover/data/mock-move-in-list.ts`**

- **Ta bort** `hasSecurityWarning: true` från posten "Skyddad Identitet" (mil-002) -- skyddad identitet är inte samma sak som säkerhetsvarning
- **Behåll** `hasSecurityWarning: true` på Khawam Rachid (mil-024) och Labo Yasmin (mil-026) som exempel på hyresgäster med säkerhetsvarning
- Eventuellt lägga till varningen på ytterligare en utflyttande hyresgäst (t.ex. Westin Tomas, mil-004) så att det finns exempel i båda listorna

### Resultat

- Skyddad identitet och säkerhetsvarning är tydligt separerade i mock-datan
- Amber-ikonen visas bara för hyresgäster där personal inte ska åka ensam
- Skyddad identitet kan implementeras separat i framtiden med egen markering

