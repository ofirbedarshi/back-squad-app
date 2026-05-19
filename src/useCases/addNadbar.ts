import { addNadbar } from '../storage/nadbarStorage'
import type { Nadbar } from '../domain/nadbar.types'

export function addNadbarUseCase(nadbar: Nadbar): void {
  addNadbar(nadbar)
}
