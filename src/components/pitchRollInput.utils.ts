import { z } from 'zod'

export const pitchRollSchema = z
  .number({ error: 'יש להזין מספר' })
  .min(0, 'ערך מינימלי הוא 0')
  .max(10, 'ערך מקסימלי הוא 10')

export const optionalPitchRollSchema = pitchRollSchema.optional()
