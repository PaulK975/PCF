export interface ILocalizedLabel {
  languageCode: number;
  label: string;
}

function isLocalizedLabelArray(value: unknown): value is ILocalizedLabel[] {
  return Array.isArray(value) && value.every(
    entry => typeof entry === 'object' && entry !== null &&
      typeof (entry as ILocalizedLabel).languageCode === 'number' &&
      typeof (entry as ILocalizedLabel).label === 'string'
  );
}

/**
 * Resolves the Label property value for the given user language.
 * Accepts either a plain string (used as-is) or a JSON-encoded array of
 * { languageCode, label } entries, matched against languageId with an
 * English (1033) fallback, then the first entry, then "".
 */
export function resolveLocalizedLabel(raw: string | null | undefined, languageId: number): string {
  if (!raw) {
    return "";
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return raw;
  }

  if (!isLocalizedLabelArray(parsed)) {
    return raw;
  }

  if (parsed.length === 0) {
    return "";
  }

  const exactMatch = parsed.find(entry => entry.languageCode === languageId);
  if (exactMatch) {
    return exactMatch.label;
  }

  return parsed[0].label;
}
