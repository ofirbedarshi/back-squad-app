export type LauncherType = 'vehicle' | 'infantry'

export interface PositionCoordinates {
  east: string
  north: string
  palach: string
}

export interface SectorBoundary {
  compass?: number
  target?: number
}

export interface Sector {
  left?: SectorBoundary
  right?: SectorBoundary
}

export interface Obstacle {
  compass?: number
  target?: number
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
  primarySector?: Sector
  secondarySector?: Sector
  obstacles?: Obstacle[]
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
  primarySector?: Sector
  secondarySector?: Sector
  obstacles?: Obstacle[]
}
