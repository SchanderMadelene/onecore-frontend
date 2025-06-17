
# Projektsammanställning - Fastighetsförvaltningssystem

## Översikt
Detta är ett React-baserat fastighetsförvaltningssystem byggt för att hantera fastigheter, byggnader, lägenheter och hyresgäster. Systemet är utvecklat med moderna webteknologier och fokuserar på användarvänlighet och skalbarhet.

## Teknikval

### Frontend Framework
- **React 18** med TypeScript för typsäkerhet
- **Vite** som build-verktyg för snabb utveckling
- **React Router DOM** för navigering mellan sidor

### Styling & UI
- **Tailwind CSS** som primärt CSS-ramverk
- **shadcn/ui** komponenter för konsistent UI
- **Lucide React** för ikoner
- **Recharts** för diagram och grafer
- **CSS Custom Properties** för temavariabler

### State Management & Data
- **TanStack React Query** för datahantering och caching
- **React Hook Form** med **Zod** för formulärhantering och validering
- Mock data för utveckling (inga externa API:er ännu)

### Utvecklingsverktyg
- **ESLint** för kodkvalitet
- **TypeScript** för typsäkerhet
- **Tailwind CSS** för responsiv design

## Kodstandard

### Filstruktur
```
src/
├── components/          # Återanvändbara komponenter
│   ├── ui/             # Grundläggande UI-komponenter (shadcn/ui)
│   ├── buildings/      # Byggnad-specifika komponenter
│   ├── properties/     # Fastighet-specifika komponenter
│   ├── residence/      # Lägenhet-specifika komponenter
│   ├── tenants/        # Hyresgäst-specifika komponenter
│   └── treeview/       # Navigationsträd komponenter
├── data/               # Mock data och API-simulering
├── hooks/              # Custom React hooks
├── pages/              # Sidkomponenter
├── types/              # TypeScript typdefinitioner
└── utils/              # Hjälpfunktioner
```

### Namnkonventioner
- **Komponenter**: PascalCase (ex: `PropertyDetailPage.tsx`)
- **Hooks**: camelCase med "use" prefix (ex: `usePropertyDetail.ts`)
- **Typer**: PascalCase (ex: `PropertyDetail`)
- **Filer**: kebab-case för utilities, PascalCase för komponenter

### Komponentstruktur
```typescript
// Standard komponentstruktur
import { ComponentProps } from "@/types/api";
import { Card } from "@/components/ui/card";

interface MyComponentProps {
  title: string;
  data?: SomeType;
}

export const MyComponent = ({ title, data }: MyComponentProps) => {
  // Logic här
  
  return (
    <Card>
      {/* JSX här */}
    </Card>
  );
};
```

### TypeScript Riktlinjer
- Alltid använd strikta typer
- Definiera interfaces för alla props
- Använd union types för begränsade värden
- Export typer från `@/types/api`

## Styling & Branding

### Färgschema
- **Primary**: `#1A1F2C` (mörk blå)
- **Secondary**: `#F6F7F9` (ljusgrå)
- **Accent**: `#6C87AB` (blå accent)
- **Muted**: `#F0F1F3` (neutral grå)

### Design Principer
- **Mobile-first** responsiv design
- **Konsistenta spacing** med Tailwind utilities
- **Subtle animationer** för bättre UX
- **Glassmorphism effekter** för moderna kort
- **Hover states** för interaktiva element

### UI Komponenter
- Använd **shadcn/ui** komponenter som bas
- **Card** komponenter för innehållsgrupper
- **Button** varianter: default, outline, ghost, destructive
- **Form** komponenter med validering
- **Toast** för notifikationer

## Funktionalitet

### Huvudmoduler

#### 1. Fastighetshantering (`/properties`)
- **Översikt**: Lista alla fastigheter med filter och sökning
- **Detaljvy**: Visa fastighetsinformation, byggnader och statistik
- **Byggnadslista**: Hantera byggnader inom fastighet
- **Underhållsenheter**: Teknisk information per byggnad

#### 2. Byggnadshantering (`/properties/:property/:building`)
- **Byggnadsinformation**: Grunddata, adresser, uppgångar
- **Lägenhetslista**: Alla lägenheter i byggnaden
- **Entréer/Uppgångar**: Gruppering av lägenheter

#### 3. Lägenhetshantering (`/properties/:property/:building/:id`)
- **Grundinformation**: Lägenhetskod, yta, hyra, kontraktsstatus
- **Hyresgästinformation**: Aktuella och historiska hyresgäster
- **Besiktningar**: Dokumentation av lägenhetens skick
- **Ärenden**: Felanmälningar och underhållsärenden
- **Dokument**: Bilagor och handlingar

#### 4. Hyresgästhantering (`/tenants`)
- **Kundregister**: Alla kunder (hyresgäster + sökande)
- **Kontraktsstatus**: Gällande, uppsagda, kommande kontrakt
- **Kontaktinformation**: Telefon, e-post, personnummer
- **Andrahandsuthyrning**: Spårning av sekundära hyresgäster

#### 5. Besiktningssystem
- **Strukturerade besiktningar**: Rum-för-rum dokumentation
- **Tillståndsbedömning**: Skala 1-5 för olika komponenter
- **Historik**: Spårning av förändringar över tid
- **Fotografering**: Dokumentation med bilder

#### 6. Ärendehantering
- **Kategorisering**: Olika typer av ärenden
- **Tillståndshantering**: Öppet, pågående, avslutat
- **Prioritering**: Kritisk, hög, normal, låg
- **Kommentarer**: Kommunikation och uppföljning

### Dataflöde

#### Mock Data Struktur
```typescript
// Exempel på datarelationer
Property -> Building[] -> Apartment[] -> Tenant[]
Residence -> Room[] -> Component[] -> Inspection[]
Tenant -> Contract[] -> Order[]
```

#### Query Management
- **TanStack Query** för data caching
- **Optimistic updates** för bättre UX
- **Error handling** med toast notifikationer
- **Loading states** för alla data operations

## Responsiv Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Layout Strategi
- **Mobile-first** med progressive enhancement
- **Flexbox/Grid** för layout
- **Collapsible navigation** på mobile
- **Accordion patterns** för komplex data på små skärmar

## Utvecklingsflöde

### Ny Funktionalitet
1. **Definiera typer** i `@/types/api`
2. **Skapa mock data** i `@/data/`
3. **Bygg komponenter** i relevant modul
4. **Lägg till routing** i `App.tsx`
5. **Implementera hooks** för datahantering
6. **Lägg till i navigation** via `treeData.ts`

### Best Practices
- **Små, fokuserade komponenter** (< 50 rader)
- **Custom hooks** för logik återanvändning
- **Conditional rendering** för feature flags
- **Error boundaries** för robusthet
- **Console logging** för debugging

### Testing
- **TypeScript compilation** som första test
- **Manual testing** i utvecklingsmiljö
- **Responsive testing** på olika skärmstorlekar

## Framtida Utveckling

### Potentiella Förbättringar
- **Backend integration** (Supabase rekommenderas)
- **Autentisering** och rollbaserad åtkomst
- **Real-time updates** för ärendehantering
- **Avancerad sökning** och filtering
- **Rapporter och analytics**
- **Mobile app** (React Native)
- **Offline support** med service workers

### Skalbarhet
- **Komponentbibliotek** för återanvändning
- **State management** för större applikationer
- **API abstraktion** för backend flexibility
- **Internationalisering** (i18n) support

## Troubleshooting

### Vanliga Problem
- **TypeScript errors**: Kontrollera typdefinitioner i `@/types/api`
- **Routing issues**: Verifiera paths i `treeData.ts` och `App.tsx`
- **Styling conflicts**: Använd Tailwind classes konsekvent
- **Data loading**: Kontrollera mock data struktur

### Debug Tips
- Använd React DevTools för komponentstruktur
- Console.log för dataflöde debugging
- Network tab för query analysis
- Responsive design mode för mobile testing

---

**Senast uppdaterad**: 2024-06-17
**Version**: 1.0
**Kontakt**: Se projektet på Lovable för support
