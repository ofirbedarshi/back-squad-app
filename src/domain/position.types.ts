export type LauncherType = 'vehicle' | 'infantry'

export interface PositionCoordinates {
  east: string
  north: string
  palach: string
}

export interface PositionInput {
  stationName: string
  coordinates: PositionCoordinates
  altitude: number
  aka: number
  launcherType: LauncherType
  vehicleId?: string
  pitch: number
  roll: number
}

export interface Position {
  id: string
  savedAt: string
  stationName: string
  coordinates: PositionCoordinates
  altitude: number
  aka: number
  launcherType: LauncherType
  vehicleId?: string
  pitch: number
  roll: number
}
