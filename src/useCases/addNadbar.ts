import { createNadbar } from '../domain/nadbar'
import { addNadbar } from '../storage/nadbarStorage'
import type { NadbarInput } from '../domain/nadbar.types'

export function addNadbarUseCase(input: NadbarInput): void {
  const nadbar = createNadbar(input)
  addNadbar(nadbar)
}
