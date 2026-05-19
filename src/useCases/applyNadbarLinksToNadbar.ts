import { applyNadbarLinks } from '../domain/nadbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { loadIndicators } from '../storage/indicatorStorage'
import { loadTargets } from '../storage/targetStorage'

export function applyNadbarLinksToNadbarUseCase(nadbar: Nadbar, links: NadbarLinksUpdate): Nadbar {
  if (links.pointerId) {
    const hasPointer = loadIndicators().some((indicator) => indicator.id === links.pointerId)
    if (!hasPointer) {
      throw new Error('המציין שנבחר לא נמצא')
    }
  }

  if (links.targetId) {
    const hasTarget = loadTargets().some((target) => target.id === links.targetId)
    if (!hasTarget) {
      throw new Error('המטרה שנבחרה לא נמצאה')
    }
  }

  return applyNadbarLinks(nadbar, links)
}
