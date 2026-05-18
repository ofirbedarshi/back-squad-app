import type { Position } from './position.types'

/** Current station first; stable order for the rest. */
export function sortPositionsCurrentFirst(positions: Position[], currentId: string | undefined): Position[] {
  if (!currentId) return positions
  return [...positions].sort((a, b) => {
    if (a.id === currentId) return -1
    if (b.id === currentId) return 1
    return 0
  })
}
