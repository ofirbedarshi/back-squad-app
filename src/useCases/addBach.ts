import { createBach } from '../domain/bach'
import type { BachInput } from '../domain/bach.types'
import { addBach } from '../storage/bachStorage'

export function addBachUseCase(input: BachInput): void {
  const bach = createBach(input)
  addBach(bach)
}
