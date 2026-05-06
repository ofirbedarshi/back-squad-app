import { z } from 'zod'
import type { CoordinateValue } from './coordinateInput.types'

export const coordinateValueSchema = z.object({
  east: z.string().regex(/^\d{6}$/, 'מזרחי: יש להזין 6 ספרות'),
  north: z.string().regex(/^\d{7}$/, 'צפוני: יש להזין 7 ספרות'),
})

export function parseCoordinateString(value: string | undefined): CoordinateValue {
  if (!value) {
    return { east: '', north: '3' }
  }

  const [eastRaw = '', northRaw = ''] = String(value).split('/')
  const east = eastRaw.replace(/\D/g, '').slice(0, 6)
  const northDigits = northRaw.replace(/\D/g, '').slice(0, 7)

  return {
    east,
    north: northDigits || '3',
  }
}

export function normalizeCoordinateValue(value: CoordinateValue | undefined): CoordinateValue {
  if (!value) {
    return { east: '', north: '3' }
  }

  return {
    east: value.east.replace(/\D/g, '').slice(0, 6),
    north: value.north.replace(/\D/g, '').slice(0, 7) || '3',
  }
}
