import type { PositionCoordinates } from './position.types'
import type {
  RangeHeightTargetMockNameInput,
  RangeHeightTargetMockPlacementInput,
} from './rangeHeightTargetMock.types'

function formatSignedMeters(value: number): string {
  return value > 0 ? `+${value}` : String(value)
}

export function assertValidRangeHeightInput(rangeMeters: number, heightDifferenceMeters: number): void {
  if (!Number.isFinite(rangeMeters) || rangeMeters <= 0) {
    throw new Error('טווח למטרה חייב להיות מספר חיובי')
  }
  if (!Number.isFinite(heightDifferenceMeters)) {
    throw new Error('הפרש גובה חייב להיות מספר תקין')
  }
}

export function buildRangeHeightMockTargetCoordinates(
  input: RangeHeightTargetMockPlacementInput,
): PositionCoordinates {
  const east = Number(input.positionCoordinates.east)
  const north = Number(input.positionCoordinates.north)
  if (Number.isNaN(east) || Number.isNaN(north)) {
    throw new Error('נ"צ עמדה לא תקין')
  }

  return {
    east: String(east),
    north: String(north + input.rangeMeters),
    palach: input.positionCoordinates.palach,
  }
}

export function formatRangeHeightMockTargetName(input: RangeHeightTargetMockNameInput): string {
  return `בדיקת היתכנות: טווח ${input.rangeMeters} | הפרש ${formatSignedMeters(input.heightDifferenceMeters)}`
}

export function formatRangeHeightMockTargetDescription(input: RangeHeightTargetMockNameInput): string {
  return `מטרת בדיקה מטווח/הפרש גובה — טווח: ${input.rangeMeters} מ׳, הפרש: ${formatSignedMeters(input.heightDifferenceMeters)} מ׳`
}
