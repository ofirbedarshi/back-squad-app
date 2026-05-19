import type { Nadbar, NadbarInput } from './nadbar.types'

export function createNadbar(input: NadbarInput): Nadbar {
  return {
    ...input,
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
  }
}

export function applyNadbarUpdate(existing: Nadbar, input: NadbarInput): Nadbar {
  return {
    ...input,
    id: existing.id,
    savedAt: existing.savedAt,
  }
}
