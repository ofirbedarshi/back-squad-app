import { nowIsoUtc } from './nowIsoUtc'
import type { WithUpdatedAt } from './updatedAt.types'

export function createWithUpdatedAt<T extends WithUpdatedAt>(
  input: Omit<T, keyof WithUpdatedAt>,
): T {
  return {
    ...input,
    id: crypto.randomUUID(),
    updatedAt: nowIsoUtc(),
  } as T
}
