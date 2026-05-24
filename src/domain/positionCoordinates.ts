import type { PositionCoordinates } from './position.types'

export function validatePositionCoordinates(coords: PositionCoordinates): void {
  if (!/^\d{6}$/.test(coords.east)) {
    throw new Error('מזרחי: יש להזין 6 ספרות')
  }

  if (!/^\d{7}$/.test(coords.north)) {
    throw new Error('צפוני: יש להזין 7 ספרות')
  }

  if (!/^\d{1,2}$/.test(coords.palach)) {
    throw new Error('פלח: יש להזין עד 2 ספרות')
  }
}
