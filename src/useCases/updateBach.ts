import { applyBachUpdate } from '../domain/bach'
import type { Bach, BachInput } from '../domain/bach.types'
import { updateBach } from '../storage/bachStorage'

export function updateBachUseCase(existing: Bach, input: BachInput): void {
  updateBach(applyBachUpdate(existing, input))
}
