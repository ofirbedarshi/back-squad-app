import { isValidNadbar, normalizeNadbar } from '../domain/nadbar'
import { nowIsoUtc } from '../domain/nowIsoUtc'
import type { Nadbar } from '../domain/nadbar.types'
import { updateNadbar } from '../storage/nadbarStorage'
import { getNadbarByIdUseCase } from './getNadbarById'

export function updateNadbarUseCase(nadbar: Nadbar): Nadbar {
  const existing = getNadbarByIdUseCase(nadbar.id)
  if (!existing) {
    throw new Error('הנדבר לא נמצא')
  }

  if (!isValidNadbar(nadbar)) {
    throw new Error('הנדבר לא תקין')
  }

  const normalized: Nadbar = {
    ...normalizeNadbar(nadbar),
    updatedAt: nowIsoUtc(),
  }
  updateNadbar(normalized)
  return normalized
}
