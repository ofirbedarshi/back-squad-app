import type { Nadbar } from '../domain/nadbar.types'
import { getNadbarCardTitle } from './nadbarDisplay'

export function getNadbarSearchFields(nadbar: Nadbar): string[] {
  return [getNadbarCardTitle(nadbar)]
}
