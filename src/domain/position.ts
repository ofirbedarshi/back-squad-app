import type { Position, PositionInput } from './position.types'

export function createPosition(input: PositionInput): Position {
  return {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    stationName: input.stationName,
    coordinates: input.coordinates,
    altitude: input.altitude,
    aka: input.aka,
    launcherType: input.launcherType,
    vehicleId: input.vehicleId,
    pitch: input.pitch,
    roll: input.roll,
  }
}

export function applyPositionUpdate(existing: Position, input: PositionInput): Position {
  return {
    ...input,
    id: existing.id,
    savedAt: existing.savedAt,
  }
}
