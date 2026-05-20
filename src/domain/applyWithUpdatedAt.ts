import { nowIsoUtc } from './nowIsoUtc'
import type { WithUpdatedAt } from './updatedAt.types'

export function applyWithUpdatedAt<T extends WithUpdatedAt>(
  existing: T,
  input: Omit<T, keyof WithUpdatedAt>,
): T {
  return {
    ...input,
    id: existing.id,
    updatedAt: nowIsoUtc(),
  } as T
}
