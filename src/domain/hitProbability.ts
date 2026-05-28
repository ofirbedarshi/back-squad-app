import type {
  FireFeasibilityFlightPath,
  FireFeasibilityFlightPathPercentByPath,
} from './fireFeasibility.types.ts'
import {
  dataMaps as hitProbabilityDataMaps,
  heights as hitProbabilityHeightsMeters,
  ranges as hitProbabilityRangesMeters,
} from '../../data/fire-feasibility/hit-probability.js'
import { findNearestBucket } from '../utils/findNearestBucket.ts'
import type {
  HitProbabilityDataMapKey,
  HitProbabilityLookupDebugContext,
  HitProbabilityLookupInput,
  HitProbabilityLookupResult,
  HitProbabilityRoundingContext,
} from './hitProbability.types.ts'

const HIT_PROBABILITY_RANGES_METERS = hitProbabilityRangesMeters
const HIT_PROBABILITY_HEIGHT_DIFFERENCES_METERS = hitProbabilityHeightsMeters
const HIT_PROBABILITY_DATA_MAPS = hitProbabilityDataMaps as Record<HitProbabilityDataMapKey, number[][]>

const FLIGHT_PATH_TO_DATA_MAP_KEY: Record<FireFeasibilityFlightPath, HitProbabilityDataMapKey> = {
  flat: 'FLAT',
  low: 'LOW',
  lofted: 'LOFTED',
  '+lofted': 'LOFTED_PLUS',
}

function assertFiniteMeters(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} לא תקין`)
  }
}

export function buildHitProbabilityLogs(
  debug: HitProbabilityLookupDebugContext,
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath,
): string[] {
  const tieText = (tieUsed: boolean): string => (tieUsed ? 'כן (נבחר באקט עליון)' : 'לא')

  return [
    'חישוב סיכויי פגיעה (lookup):',
    `- טווח גולמי: ${debug.range.rawValue} מ׳ | באקט נבחר: ${debug.range.selectedValue} מ׳ | אינדקס: ${debug.range.selectedIndex} | tie: ${tieText(debug.range.tieUsed)}`,
    `- הפרש גובה גולמי: ${debug.heightDifference.rawValue} מ׳ | באקט נבחר: ${debug.heightDifference.selectedValue} מ׳ | אינדקס: ${debug.heightDifference.selectedIndex} | tie: ${tieText(debug.heightDifference.tieUsed)}`,
    `- אחוזים לפי מסלול: L=${percentByFlightPath.lofted}% | L+=${percentByFlightPath['+lofted']}% | Low=${percentByFlightPath.low}% | F=${percentByFlightPath.flat}%`,
  ]
}

export function calculateHitProbabilityByFlightPath(
  input: HitProbabilityLookupInput,
): HitProbabilityLookupResult {
  assertFiniteMeters(input.positionToTargetRangeMeters, 'טווח עמדה-מטרה')
  assertFiniteMeters(input.positionToTargetHeightDifferenceMeters, 'הפרש גבהים עמדה-מטרה')

  const range: HitProbabilityRoundingContext = findNearestBucket(
    input.positionToTargetRangeMeters,
    HIT_PROBABILITY_RANGES_METERS,
  )
  const heightDifference: HitProbabilityRoundingContext = findNearestBucket(
    input.positionToTargetHeightDifferenceMeters,
    HIT_PROBABILITY_HEIGHT_DIFFERENCES_METERS,
  )

  const readPercent = (flightPath: FireFeasibilityFlightPath): number => {
    const mapKey = FLIGHT_PATH_TO_DATA_MAP_KEY[flightPath]
    return HIT_PROBABILITY_DATA_MAPS[mapKey][heightDifference.selectedIndex][range.selectedIndex]
  }

  return {
    percentByFlightPath: {
      lofted: readPercent('lofted'),
      '+lofted': readPercent('+lofted'),
      low: readPercent('low'),
      flat: readPercent('flat'),
    },
    debug: {
      range,
      heightDifference,
    },
  }
}
