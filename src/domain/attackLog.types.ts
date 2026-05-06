export interface AttackLogInput {
  targetName: string
  date: string
  wasAttacked?: 'yes' | 'no'
  hit?: boolean
  result?: string
  time?: string
  launcherType?: string
  launcherId?: number
  aka?: string
  pitch?: string
  roll?: string
  vehicleEncryptionMethod?: string
  hivePosition?: string
  generation?: 'a' | 'b'
  stationCoordinates?: number
  altitude?: number
  targetCoordinates?: number
  stationTargetRange?: number
  stationTargetAzimuth?: number
  stationTargetAltitudeDiff?: number
  indicatorFactor?: number
  indicatorMeans?: string
  indicatorCoordinates?: number
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
