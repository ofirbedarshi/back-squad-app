import { z } from 'zod'
import {
  PITCH_ROLL_INVALID_AT_OR_BELOW,
  PITCH_ROLL_MAX,
  PITCH_ROLL_MAX_MESSAGE,
  PITCH_ROLL_MIN_MESSAGE,
  PITCH_ROLL_MUST_BE_NUMBER_MESSAGE,
  parsePitchRollString,
} from '../domain/pitchRoll'

const pitchRollNumber = z
  .number({ error: PITCH_ROLL_MUST_BE_NUMBER_MESSAGE })
  .gt(PITCH_ROLL_INVALID_AT_OR_BELOW, PITCH_ROLL_MIN_MESSAGE)
  .max(PITCH_ROLL_MAX, PITCH_ROLL_MAX_MESSAGE)

const pitchRollInput = z.union([z.undefined(), pitchRollNumber])

export const pitchRollSchema = pitchRollInput
  .refine((v): v is number => v !== undefined, { message: PITCH_ROLL_MUST_BE_NUMBER_MESSAGE })
  .transform((v) => v)

export function parsePitchRollInput(v: string): number | undefined {
  return parsePitchRollString(v)
}

export const pitchRollOpts = { setValueAs: parsePitchRollInput }
