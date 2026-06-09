import type { PositionCoordinates } from './position.types'

export interface AttackLogInput {
  targetId?: string
  stationPositionId?: string
  indicatorId?: string
  targetName: string
  date: string
  wasAttacked?: 'yes' | 'no'
  hit?: boolean
  result?: 'פרגול' | 'הפוכה' | 'טוניס'
  notes?: string
  time?: string
  launcherType?: string
  launcherId?: number
  aka?: string
  pitch?: number
  roll?: number
  vehicleEncryptionMethod?: string[]
  hivePosition?: number
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
  targetFront?: 'חזית' | 'גג'
  wallAzimuth?: number
  spotSizeWithSpread?: number
  cloudBaseAltitude?: number
  /** Unit for `cloudBaseAltitude` — display metadata only; value is not converted. */
  cloudBaseAltitudeUnit?: 'מטר' | 'רגל'
  windSpeed?: number
  flightPath?: string
  offset?: 'למעלה' | 'למטה' | 'ימינה' | 'שמאלה'
  directionality?: 'ימינה' | 'שמאלה'
  fuseType?: 'הקשה' | 'השהייה קצרה' | 'השהייה ארוכה'
}

export interface AttackLog extends AttackLogInput {
  id: string
  updatedAt: string
}
