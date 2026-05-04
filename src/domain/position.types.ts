export type LauncherType = 'vehicle' | 'infantry'

export interface PositionInput {
  stationName: string
  coordinates: number
  altitude: number
  aka: number
  launcherType: LauncherType
  vehicleId?: string
  pitchAndRoll: number
}

export interface Position {
  id: string
  savedAt: string
  stationName: string
  coordinates: number
  altitude: number
  aka: number
  launcherType: LauncherType
  vehicleId?: string
  pitchAndRoll: number
}
