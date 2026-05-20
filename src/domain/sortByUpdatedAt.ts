import type { WithUpdatedAt } from './updatedAt.types'

/** Most recently updated first; stable tie-break by id. */
export function sortByUpdatedAtDesc<T extends WithUpdatedAt>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    if (diff !== 0) return diff
    return a.id.localeCompare(b.id)
  })
}
