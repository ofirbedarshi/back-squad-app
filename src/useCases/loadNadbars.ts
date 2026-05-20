import { sortByUpdatedAtDesc } from '../domain/sortByUpdatedAt'
import type { Nadbar } from '../domain/nadbar.types'
import { loadNadbars } from '../storage/nadbarStorage'

export function loadNadbarsUseCase(): Nadbar[] {
  return sortByUpdatedAtDesc(loadNadbars())
}
