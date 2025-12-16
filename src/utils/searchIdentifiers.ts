// Identifier patterns for Swedish systems
export type IdentifierType = 
  | 'personnummer'
  | 'telefonnummer'
  | 'fakturanummer'
  | 'kontraktsnummer'
  | 'objektsnummer'
  | 'arendenummer'
  | 'nyckelnummer';

export interface IdentifierMatch {
  type: IdentifierType;
  label: string;
  normalizedValue: string;
  confidence: 'high' | 'medium';
}

// Regex patterns for different identifier types
const PATTERNS: Record<IdentifierType, { regex: RegExp; label: string }> = {
  personnummer: {
    // YYYYMMDD-XXXX or YYMMDD-XXXX
    regex: /^(19|20)?\d{6}[-]?\d{4}$/,
    label: 'Personnummer'
  },
  telefonnummer: {
    // Swedish phone numbers: 07X-XXX XX XX, +46, etc.
    regex: /^(\+46|0)[\s-]?7[\d\s-]{7,12}$|^0[\d\s-]{8,12}$/,
    label: 'Telefonnummer'
  },
  fakturanummer: {
    // Invoice numbers - numeric strings 5-15 digits or with prefix
    regex: /^(F|FAK)?[\s-]?\d{5,15}$/i,
    label: 'Fakturanummer'
  },
  kontraktsnummer: {
    // Contract numbers: XX20YY-NNN or similar patterns
    regex: /^[A-Z]{2}\d{2,4}[-]?\d{2,5}$/i,
    label: 'Kontraktsnummer'
  },
  objektsnummer: {
    // Object numbers: LGH-XXX, #NNNNN, OBJ-XXX
    regex: /^(LGH|OBJ|#)[-]?\d{3,6}$/i,
    label: 'Objektsnummer'
  },
  arendenummer: {
    // Case numbers: SA-2024-001, IN-2024-002
    regex: /^[A-Z]{2}[-]?\d{4}[-]?\d{1,5}$/i,
    label: 'Ärendenummer'
  },
  nyckelnummer: {
    // Key numbers: NK-001, BN-142
    regex: /^[A-Z]{2}[-]?\d{2,5}$/i,
    label: 'Nyckelnummer'
  }
};

// Priority order for detection (more specific patterns first)
const DETECTION_ORDER: IdentifierType[] = [
  'personnummer',
  'arendenummer',
  'kontraktsnummer',
  'objektsnummer',
  'nyckelnummer',
  'fakturanummer',
  'telefonnummer'
];

/**
 * Detects if a query matches a known identifier pattern
 */
export function detectIdentifierType(query: string): IdentifierMatch | null {
  const normalized = query.trim().replace(/\s+/g, '');
  
  if (normalized.length < 3) return null;

  for (const type of DETECTION_ORDER) {
    const { regex, label } = PATTERNS[type];
    if (regex.test(normalized)) {
      return {
        type,
        label,
        normalizedValue: normalizeIdentifier(normalized, type),
        confidence: getConfidence(normalized, type)
      };
    }
  }

  return null;
}

/**
 * Normalizes an identifier to a standard format for matching
 */
function normalizeIdentifier(value: string, type: IdentifierType): string {
  switch (type) {
    case 'personnummer':
      // Normalize to YYYYMMDD-XXXX
      const cleaned = value.replace(/[-\s]/g, '');
      if (cleaned.length === 10) {
        // YYMMDD-XXXX -> YYYYMMDD-XXXX
        const year = parseInt(cleaned.substring(0, 2));
        const prefix = year > 24 ? '19' : '20';
        return `${prefix}${cleaned.substring(0, 6)}-${cleaned.substring(6)}`;
      }
      return `${cleaned.substring(0, 8)}-${cleaned.substring(8)}`;
    
    case 'telefonnummer':
      // Remove all non-digits except leading +
      return value.replace(/[^\d+]/g, '');
    
    default:
      // Remove spaces, keep hyphens
      return value.replace(/\s+/g, '').toUpperCase();
  }
}

/**
 * Determines confidence level based on pattern specificity
 */
function getConfidence(value: string, type: IdentifierType): 'high' | 'medium' {
  switch (type) {
    case 'personnummer':
      // High confidence if full 12-digit format
      return value.replace(/[-\s]/g, '').length >= 10 ? 'high' : 'medium';
    
    case 'arendenummer':
    case 'objektsnummer':
      // High confidence if has clear prefix
      return /^(SA|IN|LGH|OBJ|#)/i.test(value) ? 'high' : 'medium';
    
    case 'telefonnummer':
      // High confidence if starts with +46 or 07
      return /^(\+46|07)/.test(value) ? 'high' : 'medium';
    
    default:
      return 'medium';
  }
}

/**
 * Gets the entity type that typically uses this identifier
 */
export function getEntityTypeForIdentifier(type: IdentifierType): string {
  switch (type) {
    case 'personnummer':
    case 'telefonnummer':
      return 'customer';
    case 'fakturanummer':
      return 'invoice';
    case 'kontraktsnummer':
      return 'document';
    case 'objektsnummer':
      return 'residence';
    case 'arendenummer':
      return 'case';
    case 'nyckelnummer':
      return 'key';
    default:
      return 'customer';
  }
}
