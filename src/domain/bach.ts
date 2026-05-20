import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { Bach, BachInput } from './bach.types'

export function createBach(input: BachInput): Bach {
  return createWithUpdatedAt(input)
}

export function applyBachUpdate(existing: Bach, input: BachInput): Bach {
  return applyWithUpdatedAt(existing, input)
}
