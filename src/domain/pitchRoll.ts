export const PITCH_ROLL_MAX = 10
export const PITCH_ROLL_INVALID_AT_OR_BELOW = -10
export const PITCH_ROLL_WARNING_HIGH = 5
export const PITCH_ROLL_WARNING_LOW = -5

export const PITCH_ROLL_MUST_BE_NUMBER_MESSAGE = 'יש להזין מספר'
export const PITCH_ROLL_MIN_MESSAGE = 'ערך לא יכול להיות -10 ומטה'
export const PITCH_ROLL_MAX_MESSAGE = 'ערך מקסימלי הוא 10'

export type PitchRollVisualState = 'normal' | 'warning' | 'invalid'

export function isPitchRollInRange(value: number): boolean {
  return value > PITCH_ROLL_INVALID_AT_OR_BELOW && value <= PITCH_ROLL_MAX
}

export function isPitchRollInvalidValue(value: number): boolean {
  return value <= PITCH_ROLL_INVALID_AT_OR_BELOW || value > PITCH_ROLL_MAX
}

export function isPitchRollWarningValue(value: number): boolean {
  if (!isPitchRollInRange(value)) return false
  return value >= PITCH_ROLL_WARNING_HIGH || value < PITCH_ROLL_WARNING_LOW
}

export function getPitchRollVisualState(value: number | undefined): PitchRollVisualState {
  if (typeof value !== 'number' || Number.isNaN(value)) return 'normal'
  if (isPitchRollInvalidValue(value)) return 'invalid'
  if (isPitchRollWarningValue(value)) return 'warning'
  return 'normal'
}

export function parsePitchRollString(raw: string): number | undefined {
  if (raw === '' || raw === null || raw === undefined) return undefined
  const n = parseFloat(raw)
  return Number.isNaN(n) ? undefined : n
}

export function validatePitchRollValue(
  value: unknown,
  options: { required: boolean },
): true | string {
  if (value === undefined || value === '' || (typeof value === 'number' && Number.isNaN(value))) {
    return options.required ? PITCH_ROLL_MUST_BE_NUMBER_MESSAGE : true
  }

  const n = typeof value === 'number' ? value : Number(value)
  if (Number.isNaN(n)) return PITCH_ROLL_MUST_BE_NUMBER_MESSAGE
  if (n <= PITCH_ROLL_INVALID_AT_OR_BELOW) return PITCH_ROLL_MIN_MESSAGE
  if (n > PITCH_ROLL_MAX) return PITCH_ROLL_MAX_MESSAGE
  return true
}

export function assertPitchRollInRange(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label}: ${PITCH_ROLL_MUST_BE_NUMBER_MESSAGE}`)
  }
  if (value <= PITCH_ROLL_INVALID_AT_OR_BELOW) {
    throw new Error(`${label}: ${PITCH_ROLL_MIN_MESSAGE}`)
  }
  if (value > PITCH_ROLL_MAX) {
    throw new Error(`${label}: ${PITCH_ROLL_MAX_MESSAGE}`)
  }
}

export function assertOptionalPitchRollInRange(value: number | undefined, label: string): void {
  if (value === undefined) return
  assertPitchRollInRange(value, label)
}

export function assertPositionPitchRoll(input: { pitch: number; roll: number }): void {
  assertPitchRollInRange(input.pitch, 'Pitch')
  assertPitchRollInRange(input.roll, 'Roll')
}

export function assertOptionalPitchRollFields(input: { pitch?: number; roll?: number }): void {
  assertOptionalPitchRollInRange(input.pitch, 'Pitch')
  assertOptionalPitchRollInRange(input.roll, 'Roll')
}

export function assertAttackLogPitchRoll(input: { pitch?: number; roll?: number }): void {
  assertOptionalPitchRollFields(input)
}
