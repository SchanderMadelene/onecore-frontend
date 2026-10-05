// Enkel in-memory-store för kreditkontroller som körts via bulkåtgärden
// "Gör kreditkontroll" på fliken Erbjud visning. Nyckel: `${listingId}:${applicantId}`.

export interface CreditCheckResult {
  status: "Godkänd/låg risk" | "Förhöjd risk" | "Hög risk";
  date: string;
}

const results = new Map<string, CreditCheckResult>();
let version = 0;

const key = (listingId: string, applicantId: number) => `${listingId}:${applicantId}`;

export const getCreditCheckVersion = () => version;

export const getCreditCheck = (
  listingId: string,
  applicantId: number,
): CreditCheckResult | undefined => results.get(key(listingId, applicantId));

/**
 * Kör kreditkontroll för valda sökande. Returnerar antal som faktiskt
 * uppdaterades (de som saknade kontroll eller hade "Ingen uppgift tillgänglig").
 * Mock: alla som kontrolleras får "Godkänd/låg risk" med dagens datum.
 */
export const runCreditChecks = (
  listingId: string,
  applicants: Array<{ id: number; currentStatus: string }>,
): number => {
  const today = new Date().toISOString().slice(0, 10);
  let updated = 0;
  for (const a of applicants) {
    if (a.currentStatus === "-" || a.currentStatus === "Ingen uppgift tillgänglig") {
      results.set(key(listingId, a.id), { status: "Godkänd/låg risk", date: today });
      updated++;
    }
  }
  version++;
  return updated;
};
