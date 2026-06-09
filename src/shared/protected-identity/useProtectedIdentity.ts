import { useRole, type UserRole } from "@/shared/contexts/RoleContext";
import { useFeatureToggles } from "@/shared/contexts/FeatureTogglesContext";
import type { ProtectedPerson } from "./types";

/**
 * Roller som ser kunduppgifter i klartext även när skyddad identitet är aktiv.
 * Övriga roller (kvartersvärd, kundcenter, uthyrning, besiktning, bosocial)
 * får maskerad vy. "general" används i utvecklingsläge och behandlas som admin.
 */
const ROLES_WITH_UNMASKED_ACCESS: ReadonlyArray<UserRole> = [
  "general",
  "forvaltningsadmin",
  "distriktschef",
];

export const MASKED_TEXT = "•••";
export const MASKED_NAME = "Skyddad identitet";

export interface ProtectedIdentityApi {
  /** Aktuell roll – exponeras för komponenter som vill grena ytterligare */
  role: UserRole;
  /** Har personen någon form av skyddad identitet? */
  isProtected: (person?: ProtectedPerson | null) => boolean;
  /** Ska aktuell användare se uppgifterna maskerade? */
  shouldMask: (person?: ProtectedPerson | null) => boolean;
  maskName: (value: string | undefined, person?: ProtectedPerson | null) => string;
  maskValue: (value: string | undefined, person?: ProtectedPerson | null) => string;
}

export function useProtectedIdentity(): ProtectedIdentityApi {
  const { currentRole } = useRole();
  const { features } = useFeatureToggles();
  const roleSeesUnmasked = ROLES_WITH_UNMASKED_ACCESS.includes(currentRole);
  const featureEnabled = features.showProtectedIdentity;

  const isProtected = (person?: ProtectedPerson | null) =>
    featureEnabled && !!person?.protectedIdentity;

  const shouldMask = (person?: ProtectedPerson | null) =>
    featureEnabled && isProtected(person) && !roleSeesUnmasked;

  return {
    role: currentRole,
    isProtected,
    shouldMask,
    maskName: (value, person) => (shouldMask(person) ? MASKED_NAME : value ?? ""),
    maskValue: (value, person) => (shouldMask(person) ? MASKED_TEXT : value ?? ""),
  };
}
