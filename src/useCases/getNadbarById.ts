import { loadNadbarsUseCase } from './loadNadbars'
import type { Nadbar } from '../domain/nadbar.types'

export function getNadbarByIdUseCase(id: string): Nadbar | undefined {
  return loadNadbarsUseCase().find((nadbar) => nadbar.id === id)
}
