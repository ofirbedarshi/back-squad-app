import { z } from 'zod'

const pitchRollNumber = z
  .number({ error: 'יש להזין מספר' })
  .min(0, 'ערך מינימלי הוא 0')
  .max(10, 'ערך מקסימלי הוא 10')

const pitchRollInput = z.union([z.undefined(), pitchRollNumber])

export const pitchRollSchema = pitchRollInput
  .refine((v): v is number => v !== undefined, { message: 'יש להזין מספר' })
  .transform((v) => v)

export const optionalPitchRollSchema = pitchRollInput.optional()

export function parsePitchRollInput(v: string): number | undefined {
  if (v === '' || v === null || v === undefined) return undefined
  const n = parseFloat(v)
  return isNaN(n) ? undefined : n
}

export const pitchRollOpts = { setValueAs: parsePitchRollInput }
