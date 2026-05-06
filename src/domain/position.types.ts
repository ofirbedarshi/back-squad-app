export type LauncherType = 'vehicle' | 'infantry'

export interface PositionInput {
  stationName: string
  coordinates: number
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
  coordinates: number
  altitude: number
  aka: number
  launcherType: LauncherType
  vehicleId?: string
  pitch: number
  roll: number
}
