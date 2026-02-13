
export interface SentMessage {
  id: string;
  type: 'sms' | 'email';
  recipient: string;
  subject?: string;
  messagePreview: string;
  sentAt: string;
  sentBy: string;
  personalNumber: string;
}

// Mock data - timestamps relative to now for 48h filtering
const now = new Date();
const hoursAgo = (h: number) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();

const mockMessages: SentMessage[] = [
  {
    id: "msg-1",
    type: "sms",
    recipient: "070-123 45 67",
    messagePreview: "Elavbrott i området. Vi arbetar med att åtgärda felet...",
    sentAt: hoursAgo(2),
    sentBy: "Maria Johansson",
    personalNumber: "19850101-1234",
  },
  {
    id: "msg-2",
    type: "email",
    recipient: "anna.andersson@email.com",
    subject: "Planerat underhåll",
    messagePreview: "Hej! Vi vill informera om planerat underhåll i ert område den 15 februari...",
    sentAt: hoursAgo(18),
    sentBy: "Karl Pettersson",
    personalNumber: "19850101-1234",
  },
  {
    id: "msg-3",
    type: "sms",
    recipient: "070-123 45 67",
    messagePreview: "Påminnelse: Besiktning av din lägenhet imorgon kl 10:00.",
    sentAt: hoursAgo(36),
    sentBy: "Maria Johansson",
    personalNumber: "19850101-1234",
  },
  {
    id: "msg-4",
    type: "email",
    recipient: "erik.karlsson@email.com",
    subject: "Vattenavstängning",
    messagePreview: "Information om planerad vattenavstängning torsdag 14 feb kl 08-12...",
    sentAt: hoursAgo(5),
    sentBy: "Lisa Svensson",
    personalNumber: "19900215-5678",
  },
  // Old message (>48h) - should be filtered out
  {
    id: "msg-5",
    type: "sms",
    recipient: "070-123 45 67",
    messagePreview: "Gammalt meddelande som inte ska visas.",
    sentAt: hoursAgo(72),
    sentBy: "Maria Johansson",
    personalNumber: "19850101-1234",
  },
];

export const getRecentMessages = (personalNumber: string): SentMessage[] => {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
  return mockMessages
    .filter(m => m.personalNumber === personalNumber && new Date(m.sentAt) > cutoff)
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime());
};
