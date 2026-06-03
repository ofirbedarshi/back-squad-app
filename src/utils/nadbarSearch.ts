import type { Nadbar } from '../domain/nadbar.types'
import type { Target } from '../domain/target.types'
import { getNadbarCardDetails, getNadbarCardTitle } from './nadbarDisplay'

export function getNadbarSearchFields(nadbar: Nadbar, targets: Target[]): string[] {
  const { targetName } = getNadbarCardDetails(nadbar, targets)
  return [getNadbarCardTitle(nadbar), targetName]
}
