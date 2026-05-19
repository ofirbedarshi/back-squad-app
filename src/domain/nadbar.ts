import { NADBAR_TYPES, type Nadbar, type NadbarInput, type NadbarType } from './nadbar.types'

export function isNadbarType(value: string): value is NadbarType {
  return (NADBAR_TYPES as readonly string[]).includes(value)
}

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
