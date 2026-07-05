export const PRACTICE_AREAS = [
  { value: "corporate", label: "Mercantil / Corporativo" },
  { value: "labor", label: "Laboral" },
  { value: "tax", label: "Fiscal" },
  { value: "criminal", label: "Penal" },
  { value: "civil", label: "Civil" },
  { value: "administrative", label: "Administrativo" },
  { value: "intellectual_property", label: "Propiedad intelectual" },
  { value: "constitutional", label: "Amparo / Constitucional" },
  { value: "other", label: "Otro" },
] as const;

export type PracticeArea = (typeof PRACTICE_AREAS)[number]["value"];

const VALID_VALUES = new Set<string>(PRACTICE_AREAS.map((area) => area.value));

export function sanitizePracticeArea(raw: unknown): PracticeArea | null {
  if (typeof raw !== "string") return null;
  return VALID_VALUES.has(raw) ? (raw as PracticeArea) : null;
}
