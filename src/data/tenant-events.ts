// Mock data för kundhandelselogg
export interface TenantEvent {
  id: string;
  timestamp: string;
  type: 'system' | 'login' | 'profile_change' | 'contract' | 'payment' | 'support';
  title: string;
  description: string;
  user?: string; // Vem som utförde åtgärden
  metadata?: Record<string, any>;
}

export const mockTenantEvents: TenantEvent[] = [
  {
    id: "evt-001",
    timestamp: "2024-06-10T14:30:00",
    type: "login",
    title: "Inloggning",
    description: "Kunden loggade in i kundportalen",
    metadata: { ip: "192.168.1.100", device: "Chrome/Web" }
  },
  {
    id: "evt-002",
    timestamp: "2024-06-10T09:15:00",
    type: "profile_change",
    title: "Telefonnummer ändrat",
    description: "Telefonnummer uppdaterat från 070-123 45 67 till 070-987 65 43",
    user: "anna.andersson",
    metadata: { field: "phone", oldValue: "070-123 45 67", newValue: "070-987 65 43" }
  },
  {
    id: "evt-003",
    timestamp: "2024-06-09T16:45:00",
    type: "payment",
    title: "Hyra betald",
    description: "Hyra för juni 2024 har inkommit",
    metadata: { amount: 12500, period: "2024-06" }
  },
  {
    id: "evt-004",
    timestamp: "2024-06-08T11:20:00",
    type: "support",
    title: "Ärende skapat",
    description: "Kunden rapporterade vattenläcka i kök",
    user: "Support System",
    metadata: { caseId: "AE-2024-001", priority: "high" }
  },
  {
    id: "evt-005",
    timestamp: "2024-06-07T13:30:00",
    type: "system",
    title: "Påminnelse skickad",
    description: "Automatisk påminnelse om hyresbetalning skickad via e-post",
    metadata: { type: "reminder", channel: "email" }
  },
  {
    id: "evt-006",
    timestamp: "2024-06-05T10:00:00",
    type: "contract",
    title: "Kontrakt förlängt",
    description: "Hyreskontrakt förlängt till 2025-12-31",
    user: "Erik Johansson",
    metadata: { newEndDate: "2025-12-31", previousEndDate: "2024-12-31" }
  },
  {
    id: "evt-007",
    timestamp: "2024-06-03T08:45:00",
    type: "login",
    title: "Inloggning",
    description: "Kunden loggade in i kundportalen",
    metadata: { ip: "192.168.1.100", device: "Safari/Mobile" }
  },
  {
    id: "evt-008",
    timestamp: "2024-06-01T12:00:00",
    type: "system",
    title: "Hyresavi skickad",
    description: "Hyresavi för juni 2024 skickad via e-post",
    metadata: { type: "invoice", period: "2024-06", amount: 12500 }
  },
  {
    id: "evt-009",
    timestamp: "2024-05-28T14:15:00",
    type: "profile_change",
    title: "E-postadress ändrad",
    description: "E-postadress uppdaterad",
    user: "anna.andersson",
    metadata: { field: "email", oldValue: "old@example.com", newValue: "anna.andersson@example.com" }
  },
  {
    id: "evt-010",
    timestamp: "2024-05-25T16:30:00",
    type: "support",
    title: "Ärende löst",
    description: "Ärende AE-2024-001 har markerats som löst",
    user: "Maria Svensson",
    metadata: { caseId: "AE-2024-001", resolution: "Rörmokare har åtgärdat läckan" }
  }
];

// Funktion för att hämta händelser för en specifik kund
export const getTenantEvents = (personalNumber: string): TenantEvent[] => {
  // I en riktig applikation skulle detta göra en API-förfrågan
  return mockTenantEvents.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

