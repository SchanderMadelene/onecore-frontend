# Skyddad identitet på kunder

Inget stöd finns idag. Denna iteration lägger grunden: en flagga på kund, en central maskningshjälpare som tar hänsyn till aktuell användarroll, och tillämpning på de tre prioriterade ytorna (hyresgäster, sökande, turnover). Backend-loggning lämnas till senare.

## Datamodell

Utöka `src/entities/tenant/types/tenant.ts` (och motsvarande sökande-typer i `features/rentals`):

```ts
protectedIdentity?: {
  level: 'sekretessmarkering' | 'skyddad-folkbokforing' | 'fingerade-uppgifter';
  since?: string;          // ISO-datum
  note?: string;            // ej obligatoriskt
}
```

Mocka flaggan på 2–3 hyresgäster och 1–2 sökande så vi kan demonstrera alla vyer.

## Rollmodell (mock)

Lägg en enkel hook `useCurrentUserRole()` i `src/shared/auth/` som returnerar en mockad roll – defaultar till `kvartersvard`. Roller som behövs nu:

- `kvartersvard` / `kundcenter` – maskerad vy
- `uthyrning` – maskerad vy, men ser att kontakt finns
- `forvaltning-admin` – ser allt + badge

Rollen ska vara togglebar i utvecklingsläge (t.ex. via befintliga beta-settings) så vi kan demo:a båda vyerna.

## Central maskningshjälpare

Ny modul `src/shared/protected-identity/`:

- `isProtected(person)` – boolean
- `maskName`, `maskPersonalNumber`, `maskPhone`, `maskEmail`, `maskAddress` – returnerar antingen riktigt värde eller "Skyddad identitet" / "•••" beroende på roll + flagga
- `<ProtectedIdentityBadge />` – semantisk Badge (variant warning), text "Skyddad identitet", tooltip med nivå
- `<MaskedField value role person field />` – wrapper för enskilda fält så vi slipper upprepa logik

## UI-tillämpning

**Hyresgäster (`features/tenants`)**
- `TenantCard`, `TenantInformationCard`, listvyer: namn ersätts av badge om maskerad roll, kontaktuppgifter → "•••"
- Detaljsidans header: badge bredvid namnet även när admin ser uppgifter

**Sökande / uthyrning (`features/rentals`)**
- `ApplicantsTable`, `ApplicantProfileModal`, `ApplicantActions`, `CustomerInformation`/`CustomerSearch` i interest-application
- I sökandelista: rad visar "Skyddad identitet" istället för namn för maskerade roller; köpoäng/yta etc. visas normalt
- Vid erbjudande-/kontraktsflöde: varning innan utskick (ingen e-post/SMS) – knappar disablade med tooltip för maskerad roll

**Turnover (`features/turnover`)**
- Listrad: badge ersätter namn, hemadress döljs, telefon döljs
- Återanvänd befintligt amber-varningsmönster (`TriangleAlert`) som idag används för säkerhetsvarningar – skyddad identitet får egen ikon/badge ovanför så de två varningarna inte blandas ihop

## Visuellt språk

- Använd `Badge` med varianten som ligger närmast befintlig "viktig"-markering (samma färgfamilj som turnover-säkerhetsvarning, men distinkt etikett).
- Maskerat värde: text "Skyddad identitet" i namnfält, `•••` i kontaktfält. Aldrig tom sträng.
- Konsekvent placering: badge alltid direkt efter namn/titel, aldrig som separat rad.

## Out of scope (nästa iteration)

- Backend-styrd rollmodell + access-loggning
- Postförmedling via Skatteverket
- Export/utskrifts-blockering
- Inställning i kunddetalj för att slå på/av flaggan
