import type { Position } from '../domain/position.types'
import { positionEvents, POSITION_EVENTS } from '../shared/positionEvents'

const POSITIONS_KEY = 'positions'
const CURRENT_POSITION_ID_KEY = 'currentPositionId'
const REFERENCE_POSITION_ID_KEY = 'referencePositionId'

function notifyCurrentPositionChanged(): void {
  positionEvents.emit(POSITION_EVENTS.CURRENT_CHANGED)
}

function notifyReferencePositionChanged(): void {
  positionEvents.emit(POSITION_EVENTS.REFERENCE_CHANGED)
}

function getExplicitReferencePositionId(): string | null {
  return localStorage.getItem(REFERENCE_POSITION_ID_KEY)
}

function referenceResolutionAffectedByPositionUpdate(updatedPositionId: string): boolean {
  const explicitRefId = getExplicitReferencePositionId()
  if (explicitRefId) {
    return updatedPositionId === explicitRefId
  }
  const currentId = localStorage.getItem(CURRENT_POSITION_ID_KEY)
  return currentId === updatedPositionId
}

function readPositions(): Position[] {
  const raw = localStorage.getItem(POSITIONS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Position[]
  } catch {
    return []
  }
}

function writePositions(positions: Position[]): void {
  localStorage.setItem(POSITIONS_KEY, JSON.stringify(positions))
}

export function addPosition(position: Position): void {
  const positions = readPositions()
  positions.push(position)
  writePositions(positions)
}

export function setCurrentPositionId(id: string): void {
  const hadExplicitReference = Boolean(getExplicitReferencePositionId())
  localStorage.setItem(CURRENT_POSITION_ID_KEY, id)
  notifyCurrentPositionChanged()
  if (!hadExplicitReference) {
    notifyReferencePositionChanged()
  }
}

export function setReferencePositionId(id: string | null): void {
  if (id === null) {
    localStorage.removeItem(REFERENCE_POSITION_ID_KEY)
  } else {
    localStorage.setItem(REFERENCE_POSITION_ID_KEY, id)
  }
  notifyReferencePositionChanged()
}

export function loadCurrentPosition(): Position | null {
  const currentId = localStorage.getItem(CURRENT_POSITION_ID_KEY)
  if (!currentId) return null
  return readPositions().find((p) => p.id === currentId) ?? null
}

/** Resolved reference: explicit saved id if set and found; otherwise falls back to current position. */
export function loadReferencePosition(): Position | null {
  const explicitId = getExplicitReferencePositionId()
  if (explicitId) {
    const fromList = readPositions().find((p) => p.id === explicitId)
    if (fromList) {
      return fromList
    }
  }
  return loadCurrentPosition()
}

export function updatePosition(updated: Position): void {
  const positions = readPositions()
  const next = positions.map((pos) => (pos.id === updated.id ? updated : pos))
  writePositions(next)
  if (referenceResolutionAffectedByPositionUpdate(updated.id)) {
    notifyReferencePositionChanged()
  }
}

export function loadPositions(): Position[] {
  return readPositions()
}
