import { applyWithUpdatedAt } from './applyWithUpdatedAt'
import { createWithUpdatedAt } from './createWithUpdatedAt'
import type { MissChecklist, MissChecklistInput } from './missChecklist.types'

export function createMissChecklist(input: MissChecklistInput): MissChecklist {
  return createWithUpdatedAt(input)
}

export function applyMissChecklistUpdate(existing: MissChecklist, input: MissChecklistInput): MissChecklist {
  return applyWithUpdatedAt(existing, input)
}
