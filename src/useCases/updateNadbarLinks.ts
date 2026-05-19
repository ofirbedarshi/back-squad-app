import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { updateNadbar } from '../storage/nadbarStorage'
import { applyNadbarLinksToNadbarUseCase } from './applyNadbarLinksToNadbar'
import { getNadbarByIdUseCase } from './getNadbarById'

export function updateNadbarLinksUseCase(id: string, links: NadbarLinksUpdate): Nadbar {
  const existing = getNadbarByIdUseCase(id)
  if (!existing) {
    throw new Error('הנדבר לא נמצא')
  }

  const updated = applyNadbarLinksToNadbarUseCase(existing, links)
  updateNadbar(updated)
  return updated
}
