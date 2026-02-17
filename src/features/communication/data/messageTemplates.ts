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
  }
];
