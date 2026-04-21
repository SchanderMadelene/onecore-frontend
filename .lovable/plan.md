

## Lägg till TODO-kommentar om kundroller

### Ändring
I `src/features/rentals/components/interest-application/CustomerInformation.tsx`, lägg till en TODO-kommentar ovanför `badge`-konstanten som dokumenterar att den binära visningen ("Hyresgäst"/"Sökande") ska utökas till att visa fulla `customerRoles` (Hyresgäst, Sökande, Andrahandshyresgäst, Kontaktperson, Tidigare hyresgäst, Nyttjare, God man) som `Tag`-komponenter — att stämmas av med användaren innan implementation.

Samma kommentar läggs i `src/features/rentals/components/interest-application/CustomerSearch.tsx` där badge-visningen sker i sökresultaten, så att båda ställena fångas vid framtida genomgång.

### Påverkan
Ingen funktionell förändring — endast kodkommentarer som påminnelse.

