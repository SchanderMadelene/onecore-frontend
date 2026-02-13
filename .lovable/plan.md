

# Kommunikationslogg på kundkortet

## Vad ska byggas
En liten, alltid synlig logg som visas direkt under kundkortet (TenantCard) pa detaljsidan. Loggen visar SMS och e-post som skickats till kunden de senaste 48 timmarna.

## Designforslag

Loggen visas som en kompakt lista utan att ta for mycket plats. Om det inte finns nagra meddelanden visas texten "Inga meddelanden skickade senaste 48 timmarna".

Exempel pa hur en rad ser ut:

```text
SMS till 070-123 45 67 | 13 feb 13:42 | "Elavbrott i omradet..."
E-post till anna@mail.com | 12 feb 09:15 | "Planerat underhall"
```

- Varje rad visar: typ (SMS/E-post), mottagare (telefonnummer/e-post), tidpunkt, och en forhandsvisning av meddelandet (trunkerat)
- En liten rubrik: "Skickade meddelanden (senaste 48h)"
- Hela komponenten ar en enkel Card utan kollapsfunktion -- alltid oppen och synlig
- Responsiv: pa mobil visas raderna vertikalt istallet for horisontellt

## Teknisk losning

### 1. Datamodell - ny fil `src/features/tenants/data/communication-log.ts`
Skapa mockdata for skickade meddelanden med interfacet:

```typescript
interface SentMessage {
  id: string;
  type: 'sms' | 'email';
  recipient: string;       // telefonnummer eller e-post
  subject?: string;        // bara for e-post
  messagePreview: string;  // forsta ~50 tecken
  sentAt: string;          // ISO timestamp
  sentBy: string;          // anvandare som skickade
}
```

En funktion `getRecentMessages(personalNumber)` som filtrerar pa senaste 48h.

### 2. Komponent - ny fil `src/features/tenants/components/TenantCommunicationLog.tsx`
- Tar emot `personalNumber` som prop
- Hamtar meddelanden via `getRecentMessages()`
- Visar en kompakt Card med Badge for SMS/E-post
- Visar "Inga meddelanden..." om listan ar tom

### 3. Placering - andring i `src/pages/tenants/TenantDetailPage.tsx`
Laggs till direkt under TenantCard-sektionen, ovanfor flikarna/accordion. Pa sa vis syns den alltid oavsett vilken flik man ar pa.

### 4. Export - uppdatera `src/features/tenants/index.ts`
Exportera den nya komponenten.

