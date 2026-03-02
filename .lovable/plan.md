

## Byt telefonlänkar till Button-komponenter

Ersätt de vanliga `<a>`-taggarna med `Button`-komponenter, samma mönster som i `LeaseContractActions.tsx` (`variant="ghost"`, `size="icon"`, `h-8 w-8`).

### Vad som andras

**`src/features/turnover/components/CombinedTurnoverTable.tsx`**

- Importera `Button` fran `@/components/ui/button`
- **Desktop (4 stallen):** Byt ut `<a href="tel:...">` till en layout med telefonnumret som text + en `Button variant="ghost" size="icon"` bredvid med Phone-ikon
- **Mobil (2 stallen):** Samma andringar, telefonnummer visas som text med en liten ringknapp bredvid

Monstret som anvands:
```tsx
<div className="flex items-center gap-1">
  <span className="text-xs text-muted-foreground">{phoneNumber}</span>
  <Button
    variant="ghost"
    size="icon"
    className="h-7 w-7"
    onClick={() => window.location.href = `tel:${phoneNumber}`}
    title="Ring"
  >
    <Phone className="h-3.5 w-3.5" />
  </Button>
</div>
```

Detta matchar hur telefon-knappar ser ut pa ovriga stallen i systemet (t.ex. hyreskontrakt-sidan).

