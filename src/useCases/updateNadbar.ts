import { applyNadbarUpdate } from '../domain/nadbar'
import { loadNadbars, updateNadbar } from '../storage/nadbarStorage'
import type { NadbarInput } from '../domain/nadbar.types'

export function updateNadbarUseCase(id: string, input: NadbarInput): void {
  const nadbars = loadNadbars()
  const existing = nadbars.find((item) => item.id === id)
  if (!existing) throw new Error(`Nadbar with id "${id}" not found`)
  const updated = applyNadbarUpdate(existing, input)
  updateNadbar(updated)
}
