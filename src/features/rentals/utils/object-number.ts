/**
 * Generate a deterministic 12-digit object number formatted as XXX-XXX-XX-XXXX
 * (e.g. "406-704-00-0012"), seeded from the housing id so it stays stable
 * across renders. Used to display "objektsnummer" under the address in
 * housing tables, mirroring the parking spaces pattern.
 */
export function getHousingObjectNumber(id: string): string {
  // Simple deterministic hash → 12-digit numeric string
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  // Mix to spread across 12 digits
  const big = (BigInt(hash) * 2654435761n) % 1000000000000n;
  const digits = big.toString().padStart(12, "0");
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 12)}`;
}
