import { MessageTemplate } from "@/features/communication/types/messageTemplate";

export const messageTemplates: MessageTemplate[] = [
  {
    id: "driftstorning-elavbrott",
    name: "Elavbrott",
    category: "Driftstörningar",
    smsContent: "Hej! Just nu är det elavbrott på {adress}. Vi arbetar med felsökning. Beräknad åtgärd: {tid}. Vid frågor: 021-39 33 00. /Mimer",
    emailSubject: "Information om elavbrott - {adress}",
    emailContent: `Hej,

Vi vill informera dig om att det just nu är ett elavbrott som påverkar din adress.

Adress: {adress}
Upptäckt: {datum} kl {tid}
Beräknad åtgärd: Så snart som möjligt

Vi arbetar aktivt med att lokalisera och åtgärda felet. Du behöver inte göra något, men tänk på att hålla kyl och frys stängda för att bevara kylan.

Vid frågor, kontakta oss på 021-39 33 00.

Med vänlig hälsning,
Mimer`
  },
  {
    id: "bostadserbjudande-standard",
    name: "Bostadserbjudande – Standard",
    category: "Uthyrning",
    smsContent: "Hej {namn}! Du har fått ett erbjudande om bostad på {adress}. Svara senast {svarsdatum}. Logga in på Mina sidor för mer information. /Mimer",
    emailSubject: "Erbjudande om bostad – {adress}",
    emailContent: `Hej {namn},

Vi har glädjen att erbjuda dig bostaden på {adress}.

Svara senast: {svarsdatum}
Visning: {visningsdatum} kl {visningstid}
Visningsvärd: {visningsvard}

Logga in på Mina sidor för att tacka ja eller nej till erbjudandet.

Med vänlig hälsning,
Mimer`
  },
  {
    id: "bostadserbjudande-korttid",
    name: "Bostadserbjudande – Korttidskontrakt",
    category: "Uthyrning",
    smsContent: "Hej {namn}! Du har fått ett korttidserbjudande på {adress}. Svara senast {svarsdatum}. /Mimer",
    emailSubject: "Korttidserbjudande – {adress}",
    emailContent: `Hej {namn},

Vi erbjuder dig ett korttidskontrakt på {adress}.

Svara senast: {svarsdatum}
Visning: {visningsdatum} kl {visningstid}
Visningsvärd: {visningsvard}

Med vänlig hälsning,
Mimer`
  }
];
