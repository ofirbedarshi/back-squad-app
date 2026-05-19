import { isValidNadbar, normalizeNadbar } from '../domain/nadbar'
import type { Nadbar } from '../domain/nadbar.types'
import { addNadbar } from '../storage/nadbarStorage'

export function addNadbarUseCase(nadbar: Nadbar): void {
  if (!isValidNadbar(nadbar)) {
    throw new Error('הנדבר לא תקין')
  }

  const normalized: Nadbar = {
    ...normalizeNadbar(nadbar),
    createdAt: nadbar.createdAt,
    updatedAt: new Date().toISOString(),
  }
  addNadbar(normalized)
}
