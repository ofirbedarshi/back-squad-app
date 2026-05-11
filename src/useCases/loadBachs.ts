import type { Bach } from '../domain/bach.types'
import { loadBachs } from '../storage/bachStorage'

export function loadBachsUseCase(): Bach[] {
  return loadBachs()
}
