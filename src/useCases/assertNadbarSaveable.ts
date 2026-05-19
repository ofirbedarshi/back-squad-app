import { assertNadbarLinksForSave, NADBAR_SAVE_LINKS_REQUIRED_MESSAGE } from '../domain/nadbar'
import type { Nadbar } from '../domain/nadbar.types'
import { loadIndicators } from '../storage/indicatorStorage'
import { loadPositions } from '../storage/positionStorage'
import { loadTargets } from '../storage/targetStorage'

export function assertNadbarSaveableUseCase(nadbar: Nadbar): void {
  assertNadbarLinksForSave(nadbar.links)

  const { pointerId, targetId, positionId } = nadbar.links!
  const hasPointer = loadIndicators().some((indicator) => indicator.id === pointerId)
  const hasTarget = loadTargets().some((target) => target.id === targetId)
  const hasPosition = loadPositions().some((position) => position.id === positionId)

  if (!hasPointer || !hasTarget || !hasPosition) {
    throw new Error(NADBAR_SAVE_LINKS_REQUIRED_MESSAGE)
  }
}
