import type { PositionCoordinates } from './position.types'

export interface AttackLogInput {
  targetId?: string
  stationPositionId?: string
  indicatorId?: string
  targetName: string
  date: string
  wasAttacked?: 'yes' | 'no'
  hit?: boolean
  result?: string
  time?: string
  launcherType?: string
  launcherId?: number
  aka?: string
  pitch?: number
  roll?: number
  vehicleEncryptionMethod?: string
  hivePosition?: string
  generation?: 'a' | 'b'
  stationCoordinates?: PositionCoordinates
  altitude?: number
  targetCoordinates?: PositionCoordinates
  stationTargetRange?: number
  stationTargetAzimuth?: number
  stationTargetAltitudeDiff?: number
  indicatorFactor?: number
  indicatorMeans?: string
  indicatorCoordinates?: PositionCoordinates
  indicatorTargetAzimuth?: number
  indicatorRange?: number
  apexAngle?: number
  spotSizeWithoutSpread?: number
  targetFront?: string
  wallAzimuth?: number
  spotSizeWithSpread?: number
  cloudBaseAltitude?: number
  windSpeed?: number
  flightPath?: string
  offset?: number
  directionality?: string
  fuseType?: string
}

export interface AttackLog extends AttackLogInput {
  id: string
  savedAt: string
}
