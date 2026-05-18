export const AZIMUTH_DEGREE_MIN = 0
export const AZIMUTH_DEGREE_MAX = 359.9

export const AZIMUTH_MUST_BE_NUMBER_MESSAGE = 'יש להזין מספר'
export const AZIMUTH_MIN_MESSAGE = 'ערך מינימלי הוא 0'
export const AZIMUTH_MAX_MESSAGE = 'ערך מקסימלי הוא 359.9'

export function isAzimuthDegreeInRange(value: number): boolean {
  return value >= AZIMUTH_DEGREE_MIN && value <= AZIMUTH_DEGREE_MAX
}

/** Parses a trimmed string to degrees; returns undefined when empty. */
export function parseAzimuthDegreeString(raw: string): number | undefined {
  const trimmed = raw.trim()
  if (trimmed === '') return undefined
  const n = Number(trimmed)
  if (!Number.isFinite(n)) return undefined
  return n
}

export function validateAzimuthDegreeValue(
  value: unknown,
  options: { required: boolean },
): true | string {
  if (typeof value === 'number') {
    if (Number.isNaN(value)) {
      return options.required ? AZIMUTH_MUST_BE_NUMBER_MESSAGE : true
    }
    if (!isAzimuthDegreeInRange(value)) {
      if (value < AZIMUTH_DEGREE_MIN) return AZIMUTH_MIN_MESSAGE
      return AZIMUTH_MAX_MESSAGE
    }
    return true
  }

  if (typeof value !== 'string') {
    return options.required ? AZIMUTH_MUST_BE_NUMBER_MESSAGE : true
  }

  const trimmed = value.trim()
  if (trimmed === '') {
    return options.required ? 'שדה חובה' : true
  }

  const parsed = parseAzimuthDegreeString(trimmed)
  if (parsed === undefined) {
    return AZIMUTH_MUST_BE_NUMBER_MESSAGE
  }

  if (!isAzimuthDegreeInRange(parsed)) {
    if (parsed < AZIMUTH_DEGREE_MIN) return AZIMUTH_MIN_MESSAGE
    return AZIMUTH_MAX_MESSAGE
  }

  return true
}
