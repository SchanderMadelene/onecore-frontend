export interface MockStorageApplicant {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

const FIRST_NAMES = [
  "Astrid", "Bengt", "Cecilia", "David", "Elin", "Fredrik", "Gunilla",
  "Hampus", "Ingrid", "Johan", "Karin", "Lars", "Maja", "Nils", "Olivia",
  "Petter", "Quinn", "Rebecka", "Sven", "Tova", "Ulf", "Vera", "William",
];

const LAST_NAMES = [
  "Andersson", "Bergström", "Carlsson", "Dahl", "Ekström", "Forsberg",
  "Granlund", "Holm", "Isaksson", "Jonsson", "Karlsson", "Lindqvist",
  "Magnusson", "Nyström", "Ohlsson", "Pettersson",
];

function seeded(seed: string, salt: number): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = (h ^ seed.charCodeAt(i)) * 16777619;
  h = (h ^ salt) >>> 0;
  return h / 0xffffffff;
}

export function getMockApplicantsForStorage(
  storageSpaceId: string,
  count: number,
): MockStorageApplicant[] {
  const result: MockStorageApplicant[] = [];
  for (let i = 0; i < count; i++) {
    const fn = FIRST_NAMES[Math.floor(seeded(storageSpaceId, i * 3 + 1) * FIRST_NAMES.length)];
    const ln = LAST_NAMES[Math.floor(seeded(storageSpaceId, i * 3 + 2) * LAST_NAMES.length)];
    const phoneRoll = seeded(storageSpaceId, i * 3 + 3);
    const emailRoll = seeded(storageSpaceId, i * 3 + 4);

    const hasPhone = phoneRoll > 0.1;
    const hasEmail = emailRoll > 0.25;

    const phoneDigits = Math.floor(seeded(storageSpaceId, i * 7 + 5) * 9000000) + 1000000;
    const phone = hasPhone ? `070-${String(phoneDigits).slice(0, 3)} ${String(phoneDigits).slice(3, 7)}` : undefined;
    const email = hasEmail ? `${fn.toLowerCase()}.${ln.toLowerCase()}@example.se` : undefined;

    result.push({
      id: `${storageSpaceId}-app-${i + 1}`,
      name: `${fn} ${ln}`,
      phone,
      email,
    });
  }
  return result;
}
