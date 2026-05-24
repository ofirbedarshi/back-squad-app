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

/** Row from storage: archive-only save may omit current-position fields until completed in UI. */
export interface Position {
  id: string
  updatedAt: string
  stationName: string
  coordinates: PositionCoordinates
  altitude: number
  aka?: number
  launcherType?: LauncherType
  vehicleId?: string
  pitch?: number
  roll?: number
  primarySector?: Sector
  secondarySector?: Sector
  obstacles?: Obstacle[]
}

/** Initial values for position forms (base required; rest filled later e.g. promote-to-current). */
export type PositionFormInitialShape = Pick<
  PositionInput,
  'stationName' | 'coordinates' | 'altitude'
> &
  Partial<Omit<PositionInput, 'stationName' | 'coordinates' | 'altitude'>>
