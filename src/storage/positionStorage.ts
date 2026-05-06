import type { Position } from '../domain/position.types'
import { positionEvents, POSITION_EVENTS } from '../shared/positionEvents'

const POSITIONS_KEY = 'positions'
const CURRENT_POSITION_ID_KEY = 'currentPositionId'

function notifyPositionStorageChanged(): void {
  positionEvents.emit(POSITION_EVENTS.CURRENT_CHANGED)
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
  localStorage.setItem(CURRENT_POSITION_ID_KEY, id)
  notifyPositionStorageChanged()
}

export function loadCurrentPosition(): Position | null {
  const currentId = localStorage.getItem(CURRENT_POSITION_ID_KEY)
  if (!currentId) return null
  return readPositions().find((p) => p.id === currentId) ?? null
}

export function updatePosition(updated: Position): void {
  const positions = readPositions()
  const next = positions.map((pos) => (pos.id === updated.id ? updated : pos))
  writePositions(next)
}

export function loadPositions(): Position[] {
  return readPositions()
}
