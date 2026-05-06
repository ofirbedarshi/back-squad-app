import { z } from 'zod'
import type { CoordinateValue } from './coordinateInput.types'

export const coordinateValueSchema = z.object({
  east: z.string().regex(/^\d{6}$/, 'מזרחי: יש להזין 6 ספרות'),
  north: z.string().regex(/^\d{7}$/, 'צפוני: יש להזין 7 ספרות'),
})

export function normalizeCoordinateValue(value: CoordinateValue | number | string | undefined): CoordinateValue {
  if (!value) {
    return { east: '', north: '3' }
  }

  if (typeof value === 'object' && typeof value.east === 'string' && typeof value.north === 'string') {
    return {
      east: value.east.replace(/\D/g, '').slice(0, 6),
      north: value.north.replace(/\D/g, '').slice(0, 7) || '3',
    }
  }

  const rawDigits = String(value).replace(/\D/g, '')
  return {
    east: rawDigits.slice(0, 6),
    north: '3',
  }
}
