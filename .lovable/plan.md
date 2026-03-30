

## Plan: Lägg till mockdata med accepterat erbjudande

Uppdatera mockdatan i `src/features/rentals/hooks/useHousingListing.ts` så att den första sökanden (Maria Andersson, högst köpoäng) har `offerResponse.status: "Accepterat"` med ett datum. Detta gör att "Koppla kontrakt"-knappen syns i tabellen.

### Ändring

**`src/features/rentals/hooks/useHousingListing.ts`** — rad 95–97:

Ändra Maria Anderssons `offerResponse` från `"Väntar på svar"` till:
```ts
offerResponse: {
  status: "Accepterat" as const,
  date: "2024-02-10"
}
```

Ingen annan fil behöver ändras.

