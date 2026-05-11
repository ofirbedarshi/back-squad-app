import type { MissChecklist, MissChecklistInput } from './missChecklist.types'

export function createMissChecklist(input: MissChecklistInput): MissChecklist {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...input,
  }
}
