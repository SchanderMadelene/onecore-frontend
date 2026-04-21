/**
 * Generate a deterministic 12-digit object number formatted as XXX-XXX-XX-XXXX
 * (e.g. "406-704-00-0012"), seeded from an id so it stays stable across
 * renders. Used to display "objektsnummer" under the address in housing and
 * parking tables.
 */
export function getObjectNumber(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  const big = (BigInt(hash) * 2654435761n) % 1000000000000n;
  const digits = big.toString().padStart(12, "0");
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 12)}`;
}

// Backwards-compatible alias used by housing tables.
export const getHousingObjectNumber = getObjectNumber;
