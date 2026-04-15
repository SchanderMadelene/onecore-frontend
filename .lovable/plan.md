

## Plan: App-wide loading skeleton

Ersätt `<div className="p-4 text-sm text-muted-foreground">Laddar…</div>` med ett skeleton som efterliknar appens faktiska layout — navbar, sidebar och content area.

### Ny komponent: `src/shared/ui/app-loading-skeleton.tsx`

Renderar:
- En statisk navbar-skeleton (h-14, logotyp-plats + sökfält-skeleton + ikon-platser)
- En tvåkolumns-layout under: sidebar-skeleton (dold på mobil, 320px på desktop) med trädstruktur-liknande rader + en content-skeleton med kort/rubrik/textblock

Allt med `Skeleton`-komponenten och `animate-pulse`.

### Ändring i `src/App.tsx`

Rad 291: Byt `fallback` till `<AppLoadingSkeleton />`.

### Filer
| Fil | Ändring |
|---|---|
| `src/shared/ui/app-loading-skeleton.tsx` | Ny komponent |
| `src/App.tsx` | Importera och använd som Suspense fallback |

