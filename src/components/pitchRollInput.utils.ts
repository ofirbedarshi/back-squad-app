import { z } from 'zod'

const pitchRollNumber = z
  .number({ error: 'יש להזין מספר' })
  .min(0, 'ערך מינימלי הוא 0')
  .max(10, 'ערך מקסימלי הוא 10')

const nullablePitchRollInput = z.union([z.null(), pitchRollNumber])

export const pitchRollSchema = nullablePitchRollInput
  .refine((v): v is number => v !== null, { message: 'יש להזין מספר' })
  .transform((v) => v)

export const optionalPitchRollSchema = nullablePitchRollInput
  .transform((v): number | undefined => (v === null ? undefined : v))
  .optional()

export function parsePitchRollInput(v: string): number | null {
  if (v === '' || v === null || v === undefined) return null
  const n = parseFloat(v)
  return isNaN(n) ? null : n
}

export const pitchRollOpts = { setValueAs: parsePitchRollInput }
