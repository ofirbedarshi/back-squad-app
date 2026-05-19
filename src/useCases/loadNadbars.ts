import { loadNadbars } from '../storage/nadbarStorage'
import type { Nadbar } from '../domain/nadbar.types'

export function loadNadbarsUseCase(): Nadbar[] {
  return loadNadbars()
}
